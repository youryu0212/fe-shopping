const express = require("express");
const homeBanerData = require("./home-baner");
const router = express.Router();

router.get("/homeBaner", (req, res) => {
  res.json(JSON.stringify(homeBanerData));
});

module.exports = router;
