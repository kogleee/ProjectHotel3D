let reg = document.querySelector("#reg")
let login = document.querySelector("#log")
let container = document.querySelector(".container")

reg.addEventListener("click", ()=>{
    container.classList.add("active")
})

login.addEventListener("click", ()=>{
    container.classList.remove("active")
})