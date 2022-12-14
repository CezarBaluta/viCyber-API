const mongoose = require("mongoose");
const express = require("express");

const newsSchema = new mongoose.Schema({
    _id: Number,
    title: String,
    content: String,
    photosLinks: [],
    onMainPage: Boolean,
});

module.exports = newsSchema;
