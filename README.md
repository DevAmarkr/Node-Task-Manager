# Task Manager

A simple task management application built with Node.js, Express, MongoDB, and socket.io for real-time updates.

## Installation

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Set up environment variables: The .env file must have been shared on mail please have a look
4. Start the server: `npm start`.

## Usage

- Create, update, and delete tasks.
- Real-time updates using WebSocket.
- Rate limiter (per IP-address 100 requests in 15 minutes)

## API Documentation

[API Document is here](https://www.postman.com/medpiperrok/workspace/demo-projects/collection/5757442-a354ec77-6276-4e89-88db-2ab8329430f9?action=share&creator=5757442)

## Folder Structure

Node-Task-Manager/
- server.js is the entry point of your application.
- src/ directory contains all the source code.
- Inside src/, there are folders for controllers, routes, models, services, and middlewares.
- Each of these folders contains two files: task.js and auth.js, representing respective functionalities.

## NodeJs Package/Library used in this project

`"bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.18.2",
    "express-rate-limit": "^7.1.5",
    "helmet": "^7.1.0",
    "joi": "^17.12.2",
    "joi-password-complexity": "^5.2.0",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.2.0",
    "morgan": "^1.10.0",
    "socket.io": "^4.7.4"`

## Endpoits

- ### Task (All Routes Are Protected So Please Send JWT Token In Header As Auth Key)
`POST:  http://localhost:3210/api/task/create {"title":"", "description":""}`

`GET:   http://localhost:3210/api/task`

`PATCH:  http://localhost:3210/api/task/update-status/:taskId {"status": true}`

`PATCH:  http://localhost:3210/api/task/modify/:taskId {"description":"", or add any field}`

`DELETE:  http://localhost:3210/api/task/delete/:taskId`

- ### Auth
`POST:  http://localhost:3210/api/auth/registration { "name":"", "email":"","password":""}`

`POST:   http://localhost:3210/api/auth/login { "email":"", "password":""}`

- NOTE: `Please connect Websocket server through Postman and pass JWT token for validation in the header as auth key and listen to welcome, and notify events for real-time updates`

## Real-Time updates with webSocket flow

  ###  Client Side
  -  The client-side application (e.g., a web browser or Postman) establishes a WebSocket connection with the server
  -  Upon successful connection, the client will send an authentication token to the server for authentication
  -  After authentication, the server will send an initial list of tasks to the client

  ###  Server-Side
  -  The server, upon receiving a connection request from a client, establishes a WebSocket connection.
  -  The server authenticates the client by verifying the authentication token provided
  -  Once authenticated, the server will send the initial list of tasks to the client
  -  The server sets up a MongoDB Change Stream using Task.watch() to monitor changes in the tasks collection.
  -  Whenever there's a change (insert, update, delete) in the tasks collection, the change event is captured by the change stream
  -  The server broadcasts the updated list of tasks to the owner of the task connected to the server via the WebSocket connection via notify event.


## License

This project is licensed under the MIT License

## Contact

For inquiries, contact at [amar.dev2214@gmail.com].

## Thank You
