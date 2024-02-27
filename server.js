const helmet = require("helmet");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const { createServer } = require("http");
const socket = require("socket.io");
const jwt = require("jsonwebtoken")
const taskRouter = require("./src/routers/task");
const authRouter = require("./src/routers/auth");
const mongoose = require("mongoose")
const Task = require("./src/models/task")

class Server {
  constructor() {
    this.app = express();
    this.httpServer = createServer(this.app);
    this.io = new socket.Server(this.httpServer, {
      cors: {
        origin: "*",
      },
      pingInterval: 5000,
      pingTimeout: 20000,
    });
    this.app.set("io", this.io);
    this.connectToDatabase()
    this.initMiddleware();
    this.setupRoutes();
    this.setupSocket()
  }

  async connectToDatabase() {
    try {
      await mongoose.connect(process.env.MONGO_URL, {
        dbName: process.env.DB_NAME
      });
      console.log('Database connected!!');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
    }
  }

  setupRoutes() {
    this.app.use("/api", (req, res, next) => {
      if (req.originalUrl === "/api") {
        res.status(200).send("OK");
      } else {
        next();
      }
    });
    this.app.use("/api/task", taskRouter);
    this.app.use("/api/auth", authRouter);

    // catch 404 and forward to error handler
    this.handleError();
  }

  handleError() {
    this.app.use("*", (req, res, next) => {
      res.status(404).send("Route Not Found 404");
    });
  }

  initMiddleware() {
    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(express.urlencoded({ limit: "50mb", extended: false }));
    this.app.use(
      morgan(":method :url :status :response-time ms - :res[content-length]")
    );
    this.app.use(helmet());
    this.app.use(cors({ origin: true, credentials: true }));
  }

  setupSocket() {
    const users = []
    this.io.on('connection', async (socket) => {
      console.log('A client connected');
      const token = socket.handshake.headers.authorization;
      if (!token) {
        console.log('Authentication error')
      }
      jwt.verify(token, process.env.SEC_TOK, (err, decoded) => {
        if (err) {
          console.log('Authentication error')
        }
        // Add the decoded user information to the socket object for later use
        socket.user = decoded;
        if (users.indexOf(socket.user.userId) === -1) {
          users.push(socket.user.userId)
        }
      })
      let tasks = await Task.find({ owner_id: socket.user.userId })
      socket.emit("welcome", { data: tasks })

      const changeStream = Task.watch();
      changeStream.on('change', async (change) => {
        const { operationType, fullDocument } = change;
        console.log(operationType, 'operation')
        if (String(fullDocument?.owner_id) === socket?.user?.userId && operationType === "insert") {
          this.io.emit('notify', {
            message: "New Task Created",
            title: fullDocument?.title,
            created_at: fullDocument?.created_at
          });
        }
        if (operationType === "update") {
          const { documentKey, updateDescription } = change
          const task = await Task.findOne({ _id: documentKey?._id })
          if (String(task?.owner_id) === socket?.user?.userId && updateDescription?.updatedFields?.hasOwnProperty("completed")) {
            this.io.emit('notify', {
              message: "Task Status Changed",
              data: task
            });
          }
          if (String(task?.owner_id) === socket?.user?.userId && !updateDescription?.updatedFields?.hasOwnProperty("completed")) {
            this.io.emit('notify', {
              message: "Task Modified",
              data: task
            });
          }
        }

        if (operationType === "delete") {
          const { documentKey } = change
          if (users.indexOf(socket?.user?.userId) !== -1) {
            console.log("I am in")
            this.io.emit('notify', {
              message: "Task Deleted",
              data: null
            });
          }
        }
      });

      // Handle socket events here
      socket.on('disconnect', () => {
        console.log('A client disconnected');
        const index = users.indexOf(socket.user.userId)
        users.splice(index, 1)
      });
    });
  }

  start(port) {
    try {
      this.httpServer.listen(port, () => {
        console.log(`Server listening on port ${port}`);
      });
    } catch (error) {
      console.log("END");
    }
  }
}
const server = new Server();
server.start(process.env.PORT);
