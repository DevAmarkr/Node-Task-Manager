const helmet = require("helmet");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const { createServer } = require("http");
const socket = require("socket.io");
const connectDB = require("./settings/db");
//Route imports
const taskRouter = require("./src/routers/task");

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
    this.initMiddleware();
    this.setupRoutes();
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
    // catch 404 and forward to error handler
    this.handleError();
  }

  handleError() {
    this.app.use("*", (req, res, next) => {
      res.status(404).send(Response.error("Route Not Found", 404, ""));
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

  start(port) {
    try {
      this.app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
        connectDB();
      });
    } catch (error) {
      console.log("END");
      process.exit(0);
    }
  }
}
const server = new Server();
server.start(process.env.PORT);
