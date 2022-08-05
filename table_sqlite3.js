const options = require("./options/db_sqlite");
const knex = require("knex")(options);

knek.schema
  .createTable("chats", (table) => {
    table.date("time");
    table.string("userName");
    table.string("msj");
  })
  .then(() => console.log("tabla creada"))
  .catch((e) => console.log(e))
  .finally(() => {
    knex.destroy();
  });
