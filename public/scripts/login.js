var signUpButton = document.getElementById("sign-up");
var signInButton = document.getElementById("sign-in");


var containers = document.getElementsByClassName("container");

signUpButton.addEventListener("click",() => {
    containers[0].classList.toggle("hide");
    containers[1].classList.toggle("hide");
});
signInButton.addEventListener("click",() => {
    containers[0].classList.toggle("hide");
    containers[1].classList.toggle("hide");
});