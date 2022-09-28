const apiLink = "/api/news/";
const apiDeleteLink = "dashboard/news/delete/";
const news = document.getElementsByClassName("news")[0];
const newsSection = document.getElementById("editNews");
var orderOfNews;
var orderOfNewsData;
var fetched = false;

async function renderNews(){
    if(!fetched){
        fetched = true;
        orderOfNews = await fetch(apiLink + "order");
        orderOfNewsData = await orderOfNews.json();
    }
    var noOfNewsOnPage = document.getElementsByClassName("news").length-1;
    if(orderOfNewsData === undefined || noOfNewsOnPage === orderOfNewsData.length){
        document.getElementById("loadMoreNews").remove();
        return;
    }
    for(var i = 0;i < 5 && noOfNewsOnPage+i < orderOfNewsData.length;i++){
        var newsData = await fetch(apiLink + (orderOfNewsData[noOfNewsOnPage+i]._id));
        var newsDataJson = await newsData.json();
        var newNews= news.cloneNode(true);
        newNews.getElementsByClassName('title')[0].innerText = newsDataJson.title;
        newNews.getElementsByClassName('newsContent')[0].innerText = newsDataJson.content;

        for(var j=0;j<newsDataJson.photosLinks.length;j++){
            var image= document.getElementsByClassName('newsImg')[0].cloneNode(true);
            image.src = newsDataJson.photosLinks[j];
            console.log(document.getElementsByClassName('newsImg')[0]);
            newNews.appendChild(image);
        }
        newNews.getElementsByClassName("deleteButton")[0].href = apiDeleteLink + orderOfNewsData[noOfNewsOnPage+i]._id;
        newNews.getElementsByClassName("editNewsButton")[0].id = newsDataJson._id;
        var button = newNews.getElementsByClassName("editNewsButton")[0];
        button.addEventListener("click",event => {
            
            addToForm(event.target.id);
           // console.log(newNews.getElementsByClassName('id')[0].innerText);
        });
        newNews.getElementsByClassName('newsImg')[0].remove();
        newsSection.appendChild(newNews);
        newsSection.insertBefore(newNews,loadMoreNews);
    }
    noOfNewsOnPage = document.getElementsByClassName("news").length-1
    if(noOfNewsOnPage === orderOfNewsData.length){
        document.getElementById("loadMoreNews").remove();
    }
}