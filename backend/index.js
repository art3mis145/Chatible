const express = require("express");
const app = express();
// const firebase = require("firebase");
// const firebaseConfig = {
//   apiKey: "AIzaSyDCyszMfOZeALtQaSZRV1TZRQyDoPEG4S4",
//   authDomain: "video-testing-562ed.firebaseapp.com",
//   projectId: "video-testing-562ed",
//   storageBucket: "video-testing-562ed.appspot.com",
//   messagingSenderId: "598769240048",
//   appId: "1:598769240048:web:3ba71c19c01f0b891e3f35",
//   measurementId: "G-ZMTMMS0PYF",
// };
// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
  },
});

const userinfo = [];
httpServer.listen(3000, () => {
  console.log("server running... ");
  io.on("connection", (socket) => {
    socket.on("NGUOI_DUNG_DANG_KI", (user) => {
      socket.peerId = user.peerId;
      const isExist = userinfo.some((e) => e.ten === user.ten);
      if (isExist) {
        return socket.emit("DANG_KI_THAT_BAI");
      }
      userinfo.push(user);
      socket.emit("DANH_SACH_NGUOI_DUNG", userinfo);
      socket.broadcast.emit("CO_NGUOI_DUNG_MOI", user);
    });
    socket.on("disconnect", () => {
      const index = userinfo.findIndex((user) => user.peerId === socket.peerId);
      userinfo.slice(index, 1);
      io.emit("AI_DO_NGAT_KET_NOI", socket.peerId);
    });
  });
});
