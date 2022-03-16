const express = require("express");
const app = express();
const port = 3000;
const mainTag = require("./src/main/router.js");
const headerTag = require("./src/header/router.js");

app.use(express.static(__dirname + "/../client"));
app.use("/main", mainTag);
app.use("/header", headerTag);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/../client/index.html");
});

app.listen(process.env.PORT || port);
