const express = require("express");
const app = express();

const http = require("http");
const server = http.Server(app);

const socketIO = require("socket.io");
const io = socketIO(server);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log("server running on ", port);
});

// io.on("connection", (socket) => {
//   socket.on("join", (data) => {
//     socket.join(data.room);
//     socket.broadcast.to(data.room).emit("new user join");
//   });
// });
