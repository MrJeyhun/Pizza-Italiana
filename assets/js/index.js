//access hamburger button
var hamBtn = document.querySelector(".header-hamburgerBtn");
//acces navbar
var nav = document.querySelector(".header-nav");

hamBtn.addEventListener("click", function() {
  hamBtn.classList.toggle("active");
  nav.classList.toggle("active");
});
