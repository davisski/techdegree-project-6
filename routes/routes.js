const express = require("express");
const router = express.Router();
const { projects } = require("../data/projects.json");

router.get("/", (req, res) => {
  res.render("index", { projects });
});
router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
