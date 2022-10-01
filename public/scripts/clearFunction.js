function  clearForm(){
    document.getElementById("titleForm").value = "";
    document.getElementById("contentForm").value = "";
    var smallImages = document.getElementsByClassName("smallImgDiv");
    var length = smallImages.length;
    for(var j=1;j<length;j++){
        smallImages[1].remove();
    }
}