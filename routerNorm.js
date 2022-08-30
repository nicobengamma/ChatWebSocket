const express = require("express");
const options = require("./options/db_sqlite");
const app = express();
const knex = require("knex")(options);
const { normalize, schema } = require("normalizr");

app.get("/data", (req, res) => {
  const userSchema = new schema.Entity("userName");
  const userList = new schema.Entity("msj", {
    username: userSchema,
    time: userSchema,
    msj: userSchema,
  });

  knex
    .from("chats")
    .select("*")
    .then((r) => {
      const data = r;
      const dataNormalizada = normalize(data, userList);
      console.log(JSON.stringify(dataNormalizada));
    });
});

app.listen(8080);
