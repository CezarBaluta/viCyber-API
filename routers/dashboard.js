var express = require("express");
var router = express.Router();
const isLoggedIn = require("../backend_scripts/isLoggedIn.js");
const mongoose = require("mongoose");
const multer = require("multer");
var fs = require("fs");
var ImageKit = require("imagekit");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const { News } = require("../database_models/models.js");
var dashboardFunctions = require("../backend_scripts/dashboardFunctions");


const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, "./tmp/");
  },

  filename: function (request, file, callback) {
    callback(null, file.fieldname + "-" + Math.random().toString().slice(2, 6));
  },
});
  

router.get("/",isLoggedIn, (req, res) => {
    res.render("dashboard");
});

const upload = multer({
    storage: storage,
  });

router.post("/", upload.any("photosArray"), async (req, res) => {
///photo handling
    var photosLinksArray = [];
    var id = await dashboardFunctions.generateId(News);
    var i = 0;
    var photos = req.files;
   for(photo of photos){
    var link = await dashboardFunctions.getLink(photo);
    photosLinksArray[i++] = link;
   }
    console.log(photosLinksArray);
    const news = new News({
      _id:id,
      title:req.body.title,
      content:req.body.content,
      photosLinks:photosLinksArray,
    });
    news.save();

    res.redirect("/dashboard");
 
});

module.exports = router;
