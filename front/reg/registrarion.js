//анимации
let reg = document.querySelector("#reg")
let log = document.querySelector("#log")
let container = document.querySelector(".container")

reg.addEventListener("click", ()=>{
    container.classList.add("active")
})

log.addEventListener("click", ()=>{
    container.classList.remove("active")
})


let phoneReg = document.querySelector("#phone-reg")
let phoneLog = document.querySelector("#phone-log")

let regPanel = document.querySelector(".left")
let logPanel = document.querySelector(".right")

phoneReg.addEventListener("click", ()=>{
    regPanel.style.display = "flex";
    logPanel.style.display = "none";
})

phoneLog.addEventListener("click", ()=>{
    regPanel.style.display = "none";
    logPanel.style.display = "flex";
})

//валидация и отправка данных
let registration = document.querySelector("#registration")
let login = document.querySelector("#login")




