
var addButton = document.getElementById("Add");
var editButton = document.getElementById("Edit");

var editNews = document.getElementById("editNews");
var addNews = document.getElementById("addNews");

var firstClickOnEdit = false;

addButton.addEventListener("click",() => {
    editNews.classList.toggle("hide");
    addNews.classList.toggle("hide");
});

editButton.addEventListener("click",() => {
    if(firstClickOnEdit === false){
        firstClickOnEdit = true;
        renderNews();
    }
    editNews.classList.toggle("hide");
    addNews.classList.toggle("hide");
});