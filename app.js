require("dotenv").config();
const path = require('path')
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");
const multer = require("multer");
var fs = require("fs");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const LocalStrategy = require("passport-local").Strategy;
var ImageKit = require("imagekit");


var adminRoutes = require("./routers/login_admin.js");
var homeRoutes = require("./routers/home.js");
var dashboardRoutes = require("./routers/dashboard");


const { Admin } = require("./database_models/models");

///////////////////////////

const app = express();

app.use(express.static('public'));
app.use('/static', express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(
    session({
    secret: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(Admin.authenticate()));

passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());


////////// mongoose connection

const CONNECTION_URL =
  "mongodb+srv://" +
  process.env.MONGO_ADMIN +
  ":" +
  process.env.MONGO_PASSWORD +
  "@vicyber.qyaaveu.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((error) => console.log(error.message));


////////// main routes

app.use("/", homeRoutes);
app.use("/admin", adminRoutes);
app.use("/dashboard", dashboardRoutes);