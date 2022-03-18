const express = require("express");
const headerEventCategoryData = require("./header-main-tag");
const searchBarMenuData = require("./search-bar-menu");
const router = express.Router();

router.get("/eventCategory", (req, res) => {
  res.json(JSON.stringify(headerEventCategoryData));
});

router.get("/searchBarMenu", (req, res) => {
  res.json(JSON.stringify(searchBarMenuData));
});
module.exports = router;
