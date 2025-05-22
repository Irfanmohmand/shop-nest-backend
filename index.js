const express = require("express");
const dotenv = require("dotenv");
const { readdirSync } = require("fs");
const { connectDb } = require("./connection");
const cors = require("cors");

dotenv.config();

const app = express();


// making connection with frontend using cors
app.use(cors());
// Without using json the json file not be supported
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello Guys</h1>")
})


// Auth Routes
// const authRoute = require("./routes/authRoute");
// app.use("/api", authRoute)
readdirSync("./routes").map((route) => {
  app.use("/api", require(`./routes/${route}`))
})


const port = process.env.PORT || 3000;

connectDb()

app.listen(port, () => {
  console.log(`Server is runing on port ${port} `)
})