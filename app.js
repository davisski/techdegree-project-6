const express = require("express");
const app = express();
const path = require("path");

/**
 * @requires - app routes.
 */
const routes = require("./routes/routes");
/**
 * @static
 */
app.use("/static", express.static(path.join(__dirname, "/public")));
/**
 * @template
 */
app.set("view engine", "pug");

/**
 * @listens - On client HTTP requests.
 */
app.use(routes);

app.listen(3000, () => console.log("App is running"));
