const mongoose = require("mongoose");
const express = require("express");

const photoSchema = new mongoose.Schema({
    _id: Number,
    img: {
        data: Buffer,
        contentType: String,
    },
})