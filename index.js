// Accuire installed packages
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const session = require("express-session");

// Accuire dotenv package also set configuration variables
require("dotenv").config();

// Store express configuration on server using app
const app = express();
// Call http library to create an server with express
const http = require("http").createServer(app);

// Setup Static directory to serve up
app.use(express.static(path.join(__dirname, "public")));

// Setup EJS views engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//parsing middlewares
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Express session
app.use(
  session({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    resave: true,
    httpOnly: true,
    saveUninitialized: true,
  })
);

// Routes set
app.use("/", require("./routes/index"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("File Not Found");
  err.status = 404;
  next(err);
});

const PORT = process.env.PORT;
http.listen(PORT, console.log(`Server Listen on Port ${PORT} open >> http://localhost:${PORT}/`));
