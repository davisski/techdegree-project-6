const express = require("express");
const router = express.Router();
const { projects } = require("../data/data.json");
const http = require('http');

router.get("/", (req, res) => {
  res.render("index", { projects });
});
router.get("/about", (req, res) => {
  res.render("about");
});
router.get("/projects/:id", (req, res, next) => {
  const project = projects.find((project) => project.id === req.params.id);
  
  if (project) {
    res.render("project", { project });
  } else {
    const err = new Error(
      `Unfortunately project with id: ${req.params.id} does't exist!`
    );
    err.status = 404;
    err.code = http.STATUS_CODES[err.status];
    next(err);
  }
});
module.exports = router;
