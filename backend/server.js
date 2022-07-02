const { data } = require("./data.js");
const express = require("express");
const app = express();
app.listen(4000, () => {
  console.log("server is running in port 4000");
});
app.get("/products", (req, res) => {
  res.send(data.products);
});
app.get("/product", (req, res) => {
  const id = req.query.id;
  const re = data.products.find((item) => item.id == id);
  res.send(re);
  console.log(re);
  console.log(id);
});
app.get("/cart", (req, res) => {
  const id = req.query.id;
  const re = data.products.find((item) => item.id == id);
  res.send(re);
  console.log(re);
  console.log(id);
});
app.get("/", (req, res) => {
  res.send(data.products);
});
