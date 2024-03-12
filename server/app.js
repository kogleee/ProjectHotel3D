const express = require("express");
const path = require("path");
const route = require(path.join(__dirname, "routes", "router.js"));
const morgan = require("morgan");
const errorHandler = require(path.join(
  __dirname,
  "middleware",
  "errorHandler.js"
));
const app = express();

app.use(morgan("short"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "static")));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
app.use("/api", route);
app.use(errorHandler);

app.listen(3000);
