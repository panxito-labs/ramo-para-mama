/* ================================================================
   ✉️  ACÁ ESTÁN LOS TEXTOS DE LAS CARTAS  ✉️
   ---------------------------------------------------------------
   Cuando quieras cambiar lo que dice cada carta, editá SOLO este
   bloque de CONFIGURACIÓN (de "titulo" hasta el final de CARTAS).

   Reglas:
   · Cada carta tiene un "titulo" y un "texto".
   · Dentro del texto, una línea en blanco crea un párrafo nuevo.
   · Podés usar emojis (🌷 💛 ✨) sin problema.
   · Se crean tantos sobres como cartas haya en la lista.
   ================================================================ */

const CONFIG = {
  titulo: "Feliz Día del Profe",
  subtitulo: "Un ramo de flores y tres cartas para la mejor profe 💐",
  pie: "Te quiero, Mamá 💛",

  cartas: [
    {
      titulo: "¡MAMII FELIZ DÍA DEL PROFEE! <33",
      imagen: "img/imagencarta1.jpg",
      texto:
        "Te amo con todo mi corazón. Nadie como yo (excepto mi hermano y mi papá jeje) sabe la pasión y la entrega que le pones a tu trabajo. Tienes un talento y vocación admirables y hermosos.\n\n" +
        "Gracias por ser mi mayor ejemplo y mi inspiración cada día. Quiero llegar a ser la mitad de la gran persona y profesional que eres tú. te amo te adoro y te admiro!!",
    },
    {
      titulo: "Para mi amada profesora",
      imagen: "img/imagencarta2.jpg",
      texto:
        "Porque la educación es reservada sólo para quienes tienen el don.\n\n" +
        "FELIZ DÍA MI AMADA PROFESORA",
    },
    {
      titulo: "Feliz día, profesora mami",
      imagen: "img/imagencarta3.jpg",
      texto:
        "Solo quería decirte lo mucho que me inspiras todos los días. Eres demasiado bakán en lo que haces y la pasión que le pones a tu trabajo se nota a kilómetros.\n\n" +
        "Al punto que si tú te vas de ese liceo se cae a pedazos, eres como el titán Atlas pero que sosteniendo todo el colegio sobre tus hombros.\n\n" +
        "Profesoras con tu vocación y entrega valen oro. Te quiero mucho y te mereces la mejor celebración.",
    },
  ],
};

/* ================================================================
   A partir de acá está la "mecánica" de la página.
   No hace falta tocar nada de esto.
   ================================================================ */

(function () {
  "use strict";

  const cartas = CONFIG.cartas;
  const contenedorSobres = document.getElementById("sobres");
  const fondoCarta = document.getElementById("fondo-carta");
  const tituloCarta = document.getElementById("carta-titulo");
  const textoCarta = document.getElementById("carta-texto");
  const imagenCarta = document.getElementById("carta-imagen");
  const indiceCarta = document.getElementById("carta-indice");
  const botonCerrar = document.getElementById("cerrar");
  const botonAnterior = document.getElementById("anterior");
  const botonSiguiente = document.getElementById("siguiente");

  let indiceActual = 0;
  let botonQueAbrio = null;

  // Título, subtítulo y pie
  document.getElementById("titulo").textContent = CONFIG.titulo;
  document.getElementById("subtitulo").textContent = CONFIG.subtitulo;
  document.getElementById("pie").textContent = CONFIG.pie;

  // Posiciones de los sobres sobre el ramo (porcentajes del contenedor)
  // Forma de arco sobre el lazo: 1 y 3 a los lados, 2 al medio (un poco más arriba)
  const POSICIONES = [
    { x: "22%", y: "56%" },
    { x: "50%", y: "51%" },
    { x: "78%", y: "56%" },
  ];

  // Crear los sobres
  cartas.forEach(function (carta, i) {
    const pos = POSICIONES[i] || { x: "50%", y: "50%" };
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "sobre";
    boton.style.setProperty("--x", pos.x);
    boton.style.setProperty("--y", pos.y);
    boton.setAttribute("aria-label", "Abrir la carta " + (i + 1) + " de " + cartas.length);
    boton.dataset.indice = String(i);

    boton.innerHTML =
      '<svg class="sobre-svg" viewBox="0 0 120 92" aria-hidden="true">' +
        '<g class="sobre-cartita">' +
          '<rect x="18" y="32" width="84" height="52" rx="4" fill="#ffffff" stroke="#e3cdae" stroke-width="2"/>' +
          '<path d="M30 44 H 90 M30 54 H 90 M30 64 H 74" stroke="#d9c3a0" stroke-width="2" stroke-linecap="round" fill="none"/>' +
        "</g>" +
        '<rect class="sobre-cuerpo" x="4" y="22" width="112" height="66" rx="6"/>' +
        '<path class="sobre-tapa" d="M4 28 L 60 62 L 116 28"/>' +
      "</svg>" +
      '<span class="sobre-numero" aria-hidden="true">' + (i + 1) + "</span>";

    let animando = false;
    boton.addEventListener("click", function () {
      if (animando) return; // evita dobles toques apilados
      animando = true;
      abrirConAnimacion(i, boton, function () { animando = false; });
    });

    contenedorSobres.appendChild(boton);
  });

  function marcarComoAbierta(i) {
    const boton = contenedorSobres.children[i];
    if (boton) boton.classList.add("abierta");
  }

  function pintarCarta(i) {
    const carta = cartas[i] || {};
    tituloCarta.textContent = carta.titulo || "";

    // Imagen de la carta (si no existe el archivo, queda oculta)
    if (carta.imagen) {
      imagenCarta.hidden = false;
      imagenCarta.src = carta.imagen;
      imagenCarta.onerror = function () {
        imagenCarta.hidden = true;
        imagenCarta.removeAttribute("src");
      };
    } else {
      imagenCarta.hidden = true;
      imagenCarta.removeAttribute("src");
    }

    textoCarta.innerHTML = "";
    const lineas = String(carta.texto || "").split("\n");
    lineas.forEach(function (linea) {
      if (linea.trim() === "") return;
      const p = document.createElement("p");
      p.textContent = linea;
      textoCarta.appendChild(p);
    });

    // Si la carta está en blanco, mostrá un Mensaje suave
    if (textoCarta.children.length === 0) {
      const p = document.createElement("p");
      p.className = "vacia";
      p.textContent = "✨ Acá va tu carta ✨";
      textoCarta.appendChild(p);
    }

    indiceCarta.textContent = i + 1 + " / " + cartas.length;
    marcarComoAbierta(i);
  }

  function abrirConAnimacion(i, boton, alTerminar) {
    // 1. El sobre se abre y el papel se desliza hacia arriba
    marcarComoAbierta(i);
    boton.classList.add("saliendo");

    const menosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const espera = menosMovimiento ? 0 : 750; // duración del papel que sale

    setTimeout(function () {
      boton.classList.remove("saliendo");
      abrirCarta(i, boton);
      if (typeof alTerminar === "function") alTerminar();
    }, espera);
  }

  function abrirCarta(i, boton) {
    indiceActual = i;
    botonQueAbrio = boton || null;
    pintarCarta(i);

    fondoCarta.hidden = false;
    // dejar que el navegador pinte el estado inicial antes de animar
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        fondoCarta.classList.add("visible");
      });
    });

    document.body.style.overflow = "hidden";
    botonCerrar.focus();
  }

  function cerrarCarta() {
    fondoCarta.classList.remove("visible");
    document.body.style.overflow = "";
    setTimeout(function () {
      fondoCarta.hidden = true;
    }, 280);

    if (botonQueAbrio) botonQueAbrio.focus();
  }

  function avanzar(paso) {
    indiceActual = (indiceActual + paso + cartas.length) % cartas.length;
    pintarCarta(indiceActual);
  }

  botonCerrar.addEventListener("click", cerrarCarta);
  botonAnterior.addEventListener("click", function () { avanzar(-1); });
  botonSiguiente.addEventListener("click", function () { avanzar(1); });

  fondoCarta.addEventListener("click", function (evento) {
    if (evento.target === fondoCarta) cerrarCarta();
  });

  document.addEventListener("keydown", function (evento) {
    if (fondoCarta.hidden) return;
    if (evento.key === "Escape") cerrarCarta();
    if (evento.key === "ArrowLeft") avanzar(-1);
    if (evento.key === "ArrowRight") avanzar(1);
  });

  // Pétalos que caen de fondo
  function crearPetalos() {
    const contenedor = document.getElementById("petalos");
    const menosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cantidad = menosMovimiento ? 0 : 15;

    for (let i = 0; i < cantidad; i++) {
      const petalo = document.createElement("span");
      petalo.className = "petalo";
      const ancho = 8 + Math.random() * 10;
      petalo.style.left = Math.random() * 100 + "%";
      petalo.style.width = ancho + "px";
      petalo.style.height = ancho * 1.4 + "px";
      petalo.style.opacity = String(0.35 + Math.random() * 0.45);
      petalo.style.background =
        "hsl(" + (338 + Math.random() * 28) + " 70% " + (70 + Math.random() * 14) + "%)";
      petalo.style.setProperty("--der", Math.random() * 160 - 80 + "px");
      petalo.style.animationDuration = 9 + Math.random() * 9 + "s";
      petalo.style.animationDelay = -Math.random() * 16 + "s";
      contenedor.appendChild(petalo);
    }
  }

  crearPetalos();
})();
