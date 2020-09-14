const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
/**
 * @requires - App routes.
 */
const routes = require("./routes/routes");
/**
 * @static - Serving static files
 */
app.use("/static", express.static(path.join(__dirname, "/public")));
/**
 * @template - Sets application template engine
 */
app.set("view engine", "pug");

/**
 * @listens - On client HTTP requests.
 */
app.use(routes);

/***
 * App Middleware - Error handlers
 */
app.use((req, res, next) => {
    const err = new Error("Oops! That page is not found!");
    err.status = 404;
    err.code = http.STATUS_CODES[err.status];
    next(err);
});
  
app.use((err, req, res, next) => {
    if (err.status === 404) {
      res.status(err.status || 404);
      err.code = http.STATUS_CODES[err.status];
      err.message = err.message;
      return res.render("error", { err });
    } else if (err.status === 500) {
      res.status(err.status || 500);
      err.code = http.STATUS_CODES[err.status];
      err.message = "Something went wrong on server";
      res.render("error", { err });
    }
  });

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App is listening on port: ${port}`));
