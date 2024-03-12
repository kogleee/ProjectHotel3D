let burger = document.getElementById("burger");
let closeBurger = document.getElementById("close-burger");
let menu = document.querySelector(".header--menuBtn");

if (window.innerWidth < 560) {
  let favourite = document.querySelector(".header--favourite");
  favourite.innerHTML = "<a href=''>Избранное</a>";
}

burger.addEventListener("click", () => {
  menu.classList.toggle("active");
});

closeBurger.addEventListener("click", () => {
  menu.classList.remove("active");
});

let rub = document.querySelector(".header--rub");
let rubModal = document.querySelector("#rub-modal");
rub.addEventListener("mousemover", (e) => {
  if (e.target == rub || e.target == rubModal) {
    rubModal.style.display = "block";
  } else {
    rubModal.style.display = "none";
  }
});
