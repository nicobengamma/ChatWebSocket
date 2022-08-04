const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const fs = require("fs");
const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: "true" }));

const server = http.createServer(app);
const io = new Server(server);
const chats = require("./chats/chats.json");

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/data", (req, res) => {
  const data = chats;
  res.json({ data });
});

io.on("connection", (socket) => {
  console.log("somebody connected");
  socket.on("chat-in", (data) => {
    const time = new Date().toLocaleTimeString();
    const dataOut = {
      msj: data.msj,
      userName: data.userName,
      time,
    };
    chats.push(dataOut);
    fs.writeFileSync("chats/chats.json", JSON.stringify(chats));
    console.log(dataOut);
    io.sockets.emit("chat-out", dataOut);
  });
});

server.listen(8080, () => {
  console.log("Running...");
});
