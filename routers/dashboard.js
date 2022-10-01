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
    callback(null, process.env.TMPPATH);
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
  if(req.body.toEdit==="true"){
    var photosLinksArray = [];
    var photos = req.files;
    var j = 0;

   

    var newsId = req.body.idToEdit;
    var newsToEdit = await News.findOne({_id:newsId});
    for(var i=0;i<newsToEdit.photosLinks.length;i++){
      var photoToKeep = "oldPhoto" + i;
        if(req.body[photoToKeep]!=undefined){
          photosLinksArray[j] = newsToEdit.photosLinks[i];
          j++;
        }
    }
    for(photo of photos){
      var link = await dashboardFunctions.getLink(photo);
      photosLinksArray[j++] = link;
    }
    var updateDocument = {
      $set: {
      _id:id,
      title:req.body.title,
      content:req.body.content,
      photosLinks:photosLinksArray,
      },
    };
    const result = await News.updateOne(
      newsToEdit,
      updateDocument
    );
    res.redirect("/dashboard");
  }
  else{
    var photosLinksArray = [];
    var id = await dashboardFunctions.generateId(News);
    var i = 0;
    var photos = req.files;
    for(photo of photos){
    var link = await dashboardFunctions.getLink(photo);
    photosLinksArray[i++] = link;
    }
    
    const news = new News({
      _id:id,
      title:req.body.title,
      content:req.body.content,
      photosLinks:photosLinksArray,
    });
    news.save();
    res.redirect("/dashboard");
  }
});


router.get("/news/delete/:id", async (req,res) => {
  const newsId = req.params.id;
  var news = await News.findOneAndDelete({_id:newsId});
  res.redirect("/dashboard");
});

module.exports = router;
