var toEdit = document.getElementById("toEdit");

var addButton = document.getElementById("Add");
var editButton = document.getElementById("Edit");

var editNews = document.getElementById("editNews");
var addNews = document.getElementById("addNews");

var loadMoreNews = document.getElementById("loadMoreNews");

var firstClickOnEdit = false;

addButton.addEventListener("click",() => {

    editNews.classList.add("hide");
    addNews.classList.remove("hide");
    toEdit.value = false;
    clearForm();
});

editButton.addEventListener("click",() => {
    clearForm();
    if(firstClickOnEdit === false){
        firstClickOnEdit = true;
        renderNews();
    }
    toEdit.value = true;
    editNews.classList.remove("hide");
    addNews.classList.add("hide");
});

loadMoreNews.addEventListener("click",()=>{
    renderNews()
});


