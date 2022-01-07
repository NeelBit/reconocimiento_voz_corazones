const entrada = document.querySelector(".entrada__input");
const btn_leer = document.querySelector(".btn-leer");
const btn_grabar = document.querySelector(".btn-grabar");
const salida_contenido = document.querySelector("#salida-contenido");
const corazon = document.querySelector(".corazones");

const reconocimiento_voz = window.SpeechRecognition || window.webkitSpeechRecognition;
const reconocimiento = new reconocimiento_voz();
reconocimiento.lang = "es";

/* lectura del texto  */
btn_leer.addEventListener("click", () => {
    const locutor = new SpeechSynthesisUtterance();
    const voz = window.speechSynthesis;
    locutor.text = entrada.value;
    voz.speak(locutor);

    // para probar sin mic
    //corazones();
})

/* reconocimiento de voz */
reconocimiento.onstart = () => {
    salida_contenido.innerHTML = "Estamos grabando la voz";
}

reconocimiento.onresult = (e) => {

    let arreglo_palabras = e.results[0][0].transcript.split(" ");

    if (arreglo_palabras.includes("acuerda")) {
        corazones();
        corazon.classList.remove("invisible");
    } else if (arreglo_palabras.includes("oscuro")) {
        document.body.style = "background-color: black;";
        document.querySelector("p").style = "color: white;";
    }

    salida_contenido.innerHTML = e.results[0][0].transcript;
}

btn_grabar.addEventListener("click", () => {
    reconocimiento.start();
})

function corazones() {
    let num = 10;

    let w = window.innerWidth;
    let h = window.innerHeight;

    let dirx = [];
    let diry = [];

    for (i = 0; i < num; i++) {
        //Crear corazon
        let heart = document.createElement("DIV");
        heart.className = "heart";
        document.body.appendChild(heart);
        //Asignar tamaño       
        let tam = Math.floor((Math.random() * 20) + 15);
        heart.style.width = tam + "px";
        heart.style.height = tam + "px";
        //Asignar posicion inicial
        let posy = Math.floor((Math.random() * 0.1 * h) + 0.8 * h);
        heart.style.top = posy + "rem";
        let posx = Math.floor((Math.random() * 0.8 * w) + 0.1 * h);
        heart.style.left = posx + "rem";
        //Crear vector direccion y id
        heart.id = "h" + i;
        diry[i] = Math.floor((Math.random() * 5) - 10);
        dirx[i] = Math.floor((Math.random() * 10) - 5);

        // borrar al hacer click
        heart.onclick = function() {
            this.style.display = "none";
        }
    }

    window.requestAnimationFrame(move);
    setInterval(function() {
        move()
    }, 60);

    function move() {
        for (i = 0; i < num; i++) {
            //Seleccion de corazon
            let heart = document.getElementById("h" + i);
            //Aumento de coordenadas
            let y = parseInt(heart.style.top) + diry[i];
            let x = parseInt(heart.style.left) + dirx[i];
            //Reinicio de coordenadas
            if (x > 0.8 * w) {
                x = 0.2 * w;
            }
            if (x < 0.2 * w) {
                x = 0.8 * w;
            }
            if (y < 0.2 * h) {
                y = 0.8 * h;
            }
            if (y > 0.8 * h) {
                y = 0.2 * w;
            }
            //Asignacion de coordenadas
            heart.style.top = y + "px";
            heart.style.left = x + "px";
        }
    }

}