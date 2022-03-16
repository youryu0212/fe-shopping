const express = require("express");
const headerEventCategoryData = require("./header-main-tag");
const router = express.Router();

router.get("/eventCategory", (req, res) => {
  res.json(JSON.stringify(headerEventCategoryData));
});

module.exports = router;
