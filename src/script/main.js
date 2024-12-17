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

// Estrelinhas de Feedback
/*
document.querySelectorAll('.star-rating input').forEach((radio) => {
    radio.addEventListener('change', (event) => {
      const rating = event.target.value;
      alert(`Você avaliou com ${rating} estrelas!`);
      // Aqui você pode enviar a avaliação para um servidor ou processá-la
    });
});
*/

// Concluição do Envio

function envOk(){
    alert("Obrigado pelo seu feedback!")
}


// Slide Do Cardapio
let conts = 1
document.getElementById("radio1C").checked = true;

setInterval(function(){
    nextImg();
}, 4000)

function nextImg(){
    conts++
    if(conts>4){
        conts=1
    }
    document.getElementById("radio"+conts+"C").checked = true;
}