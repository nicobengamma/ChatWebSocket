const express = require("express");
const { faker } = require("@faker-js/faker");

const app = express();

function createPeople() {
  return {
    nombre: faker.commerce.productName(),
    precio: faker.commerce.price(),
    img: faker.commerce.productDescription(),
  };
}

app.get("/api/productos-test", (req, res) => {
  const cant = req.query.cant || 5;
  const productos = [];
  for (let index = 0; index < cant; index++) {
    productos.push(createPeople());
  }
  res.json(productos);
});
console.log("Listo");
app.listen(8080);
