const fs = require("fs");
const options = require("./options/db_sqlite");
const knex = require("knex")(options);
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: "true" }));

const server = http.createServer(app);
const io = new Server(server);

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/data", (req, res) => {
  knex
    .from("chats")
    .select("*")
    .then((rows) => {
      res.json(rows);
    });
});

io.on("connection", (socket) => {
  socket.on("chat-in", (data) => {
    const time = new Date().toLocaleTimeString();
    const dataOut = {
      msj: data.msj,
      userName: data.userName,
      time,
    };
    knex("chats")
      .insert(dataOut)
      .then(() => console.log("se enviaron los chats"))
      .catch((e) => console.log(e));
    io.sockets.emit("chat-out", dataOut);
  });
});
// socket.on("tiping", (userName) => {
//   const tiping = { tiping: userName };
//   fs.writeFileSync("tipingNow/tipingNow.json", JSON.stringify(tiping));
//   socket.broadcast.emit("tiping", tiping);
// });

server.listen(8080, () => {
  console.log("Running...");
});
