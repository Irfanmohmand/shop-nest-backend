const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hello Guys</h1>")
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is runing on port ${port} `)
})