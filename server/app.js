const express = require("express");
const path = require('path');
const route = require(path.join(__dirname, "routes", "router.js"))
const morgan = require('morgan')
const errorHandler = require(path.join(__dirname, "middleware", "errorHandler.js"))
const app = express();

app.use(morgan("short"))
app.use(express.json())
app.use("/api", route)
app.use(errorHandler)


app.listen(3000);
