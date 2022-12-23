/*
 * @Author: sunheng
 * @Date: 2022-12-21 15:53:45
 * @LastEditors: sunheng
 * @LastEditTime: 2022-12-21 15:59:25
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

server.listen(5000, () => {
  console.log("我在运行服务器，端口号为5000");
});
