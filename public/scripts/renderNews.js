const apiLink = "/api/news/";
const news = document.getElementsByClassName("news")[0];
const newsSection = document.getElementById("editNews")

async function renderNews(){
    var noOfNewsOnPage = document.getElementsByClassName("news").length-1;
    for(var i = 0;i<5;i++){
        var newsData = await fetch(apiLink + (noOfNewsOnPage+i));
        var newsDataJson = await newsData.json();

        if(newsData === null)
            break;
        var newNews= news.cloneNode(true);
        console.log(newsDataJson);
        newNews.getElementsByClassName('title')[0].innerText = newsDataJson.title;
        newNews.getElementsByClassName('newsContent')[0].innerText = newsDataJson.content;

        for(var j=0;j<newsDataJson.photosLinks.length;j++){
            var image= document.getElementsByClassName('newsImg')[0].cloneNode(true);
            image.src = newsDataJson.photosLinks[j];
            console.log(document.getElementsByClassName('newsImg')[0]);
            newNews.appendChild(image);
        }
        newNews.getElementsByClassName('newsImg')[0].remove();
        newsSection.appendChild(newNews);
    }
}