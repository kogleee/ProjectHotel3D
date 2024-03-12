let burger = document.getElementById("burger");
let closeBurger = document.getElementById("close-burger");
let menu = document.querySelector(".header--menuBtn");

if (window.innerWidth < 560) {
  let favourite = document.querySelector(".header--favourite");
  favourite.innerHTML = "<a href='../favourite/index.html'>Избранное</a>";
}

burger.addEventListener("click", () => {
  menu.classList.toggle("active");
});

closeBurger.addEventListener("click", () => {
  menu.classList.remove("active");
});
