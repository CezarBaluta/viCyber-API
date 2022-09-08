var express = require("express");
const mongoose = require("mongoose");

const adminSchema = require("./admin");
const newsSchema = require("./news");

const Admin = new mongoose.model("admin", adminSchema);
const News = new mongoose.model("news",newsSchema);

module.exports = { Admin, News };
