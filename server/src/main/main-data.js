const express = require("express");
const homeBanerData = require("./home-banner");
const router = express.Router();

router.get("/homeBanner", (req, res) => {
  res.json(JSON.stringify(homeBanerData));
});

module.exports = router;
