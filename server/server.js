const express = require("express");
const app = express();
const port = 3000;

app.use(express.static(__dirname + "/../client"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/../client/index.html");
});

app.listen(port);
