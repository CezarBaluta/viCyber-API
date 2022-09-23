
var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const { News } = require("../database_models/models.js");


router.get("/news", (req, res) => {
    News.find({}, (err, news) => {
    if (news === null) {
        console.log(err);
    } else {
        res.json(news);
    }
    });
});

router.get("/news/order", async (req,res) => {
    var news = await News.find({},{_id:1});
    res.json(news);
});

router.get("/news/:id", async (req,res) => {
        const newsId = req.params.id;
        var news = await News.findOne({_id:newsId});
        res.json(news);
});

module.exports = router;
