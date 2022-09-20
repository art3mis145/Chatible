const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log("server running on port ", port);
  io.on("connection", (socket) => {
    console.log(socket.id);
  });
});
