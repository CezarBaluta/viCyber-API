
var addButton = document.getElementById("Add");
var editButton = document.getElementById("Edit");

var editNews = document.getElementById("editNews");
var addNews = document.getElementById("addNews");

var loadMoreNews = document.getElementById("loadMoreNews");

var firstClickOnEdit = false;

addButton.addEventListener("click",() => {
    editNews.classList.toggle("hide");
    addNews.classList.toggle("hide");
    ///clear function
});

editButton.addEventListener("click",() => {
    if(firstClickOnEdit === false){
        firstClickOnEdit = true;
        renderNews();
    }
    editNews.classList.toggle("hide");
    addNews.classList.toggle("hide");
});

loadMoreNews.addEventListener("click",()=>{
    renderNews()
});


