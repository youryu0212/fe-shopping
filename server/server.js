const express = require("express");
const app = express();
const port = 3000;
const mainTag = require("./src/main/main-data.js");

app.use(express.static(__dirname + "/../client"));
app.use("/main", mainTag);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/../client/index.html");
});

app.listen(port);
