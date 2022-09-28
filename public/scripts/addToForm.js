var smallImage = document.getElementById("imagesInFormTemplate");
var smallImagesSection = document.getElementById("smallImagesSection");

async function addToForm(id) {
    console.log(id);
    var newsData = await fetch(apiLink + (id));
    var data = await newsData.json();
    console.log(data);
    editNews.classList.toggle("hide");
    addNews.classList.toggle("hide");
    document.getElementById("titleForm").value = data.title;
    document.getElementById("contentForm").value = data.content;
    for(var i = 0;i<data.photosLinks.length;i++){
        var newSmallImage = smallImage.cloneNode(true);
        newSmallImage.children[1].src = data.photosLinks[i];
        newSmallImage.classList.remove("hide");
        newSmallImage.id = "";
        newSmallImage.getElementsByClassName("AClass")[0].addEventListener("click",event => {
            if(event.target.parentNode.parentNode.id != "smallImagesSection")
                event.target.parentNode.parentNode.remove();
            else
                event.target.parentNode.remove();            
        });
        smallImagesSection.appendChild(newSmallImage);
        smallImagesSection.insertBefore(newSmallImage,smallImage);
    }
}

