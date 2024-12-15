// Botão de Navegaão da Página 

const hamburger = document.querySelector(".mobile");
const navMenu = document.querySelector(".list");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Slide Do Cardapio
let cont = 1
document.getElementById("radio1").checked = true;

setInterval(function(){
    nextImg();
}, 4000)

function nextImg(){
    cont++
    if(cont>4){
        cont=1
    }
    document.getElementById("radio"+cont).checked = true;
}