var express = require("express");
const mongoose = require("mongoose");
const adminSchema = require("./admin");

const Admin = new mongoose.model("admin", adminSchema);

module.exports = { Admin };
