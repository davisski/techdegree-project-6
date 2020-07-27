const express = require("express");
const router = express.Router();
const { projects } = require("../data/data.json");

router.get("/", (req, res) => {
  res.render("index", { projects });
});
router.get("/about", (req, res) => {
  res.render("about");
});
router.get("/projects/:id", (req, res) => {
  const project = projects.find((project) => project.id === req.params.id);
  res.render("project", { project });
});
module.exports = router;
