/*
 * @Author: sunheng
 * @Date: 2022-12-21 15:53:45
 * @LastEditors: sunheng
 * @LastEditTime: 2022-12-22 13:47:37
 * @Description: 请填写简介
 */
const express = require("express");
const http = require("http");
const cors = require("cors");
// chushihua
const app = express();
const server = http.createServer(app);

app.use(cors());

//初始化io
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// 服务器socket链接
io.on("connection", (socket) => {
  socket.emit("me", socket.id);
  socket.on("disconnect", () => {
    socket.broadcast.emit("CallEnded");
  });
  socket.on("callUser", (data) => {
    io.to(data.idToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });
  socket.on("answerCall", (data) => {
    //将数据传递给通信的发起方
    console.log(data);
    io.to(data.to).emit("callAccepted", data.signal);
  });
});
server.listen(5000, () => {
  console.log("我在运行服务器，端口号为5000");
});
