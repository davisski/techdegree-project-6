const express = require("express");
const router = express.Router();
const { projects } = require("../data/data.json");
const http = require('http');

/**
 * GET / - index page
 * @constant projects - Array of all project objects. 
 */
router.get("/", (req, res) => {
  res.render("index", { projects });
});

/**
 * GET /about - about page
 */
router.get("/about", (req, res) => {
  res.render("about");
});
/**
 * GET /projects/:id - individual project page
 * @param id - Specific identifier for project to get
 * @constant project - Individual project object
 * @constant err - Created error object
 * 
 */
router.get("/projects/:id", (req, res, next) => {
  const project = projects.find((project) => project.id === req.params.id);
  
  /**
   * Checks if project exists - if exists immediately renders project view with project object. If not then throws newly created error object.
   */
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
