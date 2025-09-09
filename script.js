let paso = 0;
let respuestas = {};
let tecnologias = [];

const modal = document.getElementById("modal");
const preguntaEl = document.getElementById("pregunta");
const respuestaEl = document.getElementById("respuesta");
const botonModal = modal.querySelector("button");
const fondoArbolIzq = document.querySelector(".fondo-arbol.izquierda");
const fondoArbolDer = document.querySelector(".fondo-arbol.derecha");

function iniciarCuestionario() {
  paso = 0;
  mostrarAviso();
}

function mostrarAviso() {
  preguntaEl.textContent =
    "Las respuestas van a ser a través de seleccionar 1 o 2, según su consideración.";
  respuestaEl.style.display = "none"; // oculto input en paso 0
  respuestaEl.value = "";
  botonModal.textContent = "OK";
  modal.classList.add("visible");
  botonModal.focus(); // foco en el botón
}

function mostrarPregunta(texto) {
  preguntaEl.textContent = texto;
  respuestaEl.style.display = "block";
  respuestaEl.value = "";
  botonModal.textContent = "Enviar";
  modal.classList.add("visible");
  setTimeout(() => respuestaEl.focus(), 0); // foco en input
}

/**
 * Esta función se llama desde el botón del modal (onclick="enviarRespuesta()")
 */
function enviarRespuesta() {
  // Paso 0 → sólo avanzar
  if (paso === 0) {
    paso = 1;
    mostrarPregunta(
      "¿Quieres seguir hacia el área de Front-End (1) o hacia el área de Back-End (2)?"
    );
    return;
  }

  const input = respuestaEl.value.trim();

  // Validación general para pasos 1..3
  if (paso >= 1 && paso <= 3) {
    if (input !== "1" && input !== "2") {
      return; // no avanzar si no es 1 o 2
    }
  }

  // Paso 4 requiere texto no vacío
  if (paso === 4 && input === "") {
    return;
  }

  switch (paso) {
    case 1:
      // elegir área
      respuestas.area = input === "1" ? "Front-End" : "Back-End";

      // iluminar lado elegido
      if (input === "1") {
        fondoArbolIzq.style.filter = "grayscale(0%)";
        fondoArbolDer.style.filter = "grayscale(100%)";
      } else {
        fondoArbolIzq.style.filter = "grayscale(100%)";
        fondoArbolDer.style.filter = "grayscale(0%)";
      }

      paso = 2;
      mostrarPregunta(
        respuestas.area === "Front-End"
          ? "¿Quieres aprender React (1) o Vue (2)?"
          : "¿Quieres aprender C# (1) o Java (2)?"
      );
      break;

    case 2:
      // elegir lenguaje
      respuestas.lenguaje =
        respuestas.area === "Front-End"
          ? input === "1"
            ? "React"
            : "Vue"
          : input === "1"
          ? "C#"
          : "Java";

      paso = 3;
      mostrarPregunta(
        `¿Quieres seguir especializándote en ${respuestas.area} (1) o convertirte en Fullstack (2)?`
      );
      break;

    case 3:
      // especialización o fullstack
      respuestas.especializacion = input === "1" ? respuestas.area : "Fullstack";
      
      if (input === "2") {
    // 👉 Si eligió Fullstack, mostrar la imagen completa en color
    fondoArbolIzq.style.filter = "grayscale(0%)";
    fondoArbolDer.style.filter = "grayscale(0%)";
  }

      paso = 4;
      mostrarPregunta("¿Cuál tecnología te gustaría aprender?");
      break;

    case 4:
      // agrega tecnología
      tecnologias.push(input);
      paso = 5;
      mostrarPregunta(
        "¿Hay otra tecnología que quieras aprender? Escribe '1' para agregar otra o cualquier tecla para terminar"
      );
      break;

    case 5:
      if (input === "1") {
        paso = 4;
        mostrarPregunta("¿Cuál otra tecnología te gustaría aprender?");
      } else {
        modal.classList.remove("visible");

        alert(
          `Elegiste el área ${respuestas.area}, lenguaje ${respuestas.lenguaje}, ` +
            `te vas a especializar en ${respuestas.especializacion} y aprenderás: ${tecnologias.join(
              ", "
            )}`
        );

        // reinicio
        paso = 0;
        respuestas = {};
        tecnologias = [];
      }
      break;
  }

  // limpio el input si sigue abierto el modal
  if (modal.classList.contains("visible") && paso !== 0) {
    respuestaEl.value = "";
    setTimeout(() => respuestaEl.focus(), 0);
  }
}

// permitir Enter en input
respuestaEl.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    enviarRespuesta();
  }
});
