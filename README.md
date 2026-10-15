# 💐 Ramo de flores para Mamá · Día del Profe

Una página web con un ramo de flores dibujado a mano (SVG) y **tres cartas** escondidas en sobres que ella puede abrir una por una.

## 📁 Cómo está armado

```
index.html        → la página (el dibujo del ramo y la estructura)
css/estilos.css   → los colores, animaciones y el diseño de la carta
js/cartas.js      → LOS TEXTOS DE LAS CARTAS y la lógica de apertura
img/              → las fotos de cada carta (imagencarta1.png, etc.)
```

## ✏️ Cómo cambiar los textos de las cartas

Abrí `js/cartas.js` con el Bloc de notas (o cualquier editor). Arriba de todo hay un bloque que dice **"ACÁ ESTÁN LOS TEXTOS DE LAS CARTAS"**:

```js
cartas: [
  { titulo: "Primera carta", imagen: "img/imagencarta1.png", texto: "Lo que quieras decirle…" },
  { titulo: "Segunda carta", imagen: "img/imagencarta2.png", texto: "…" },
  { titulo: "Tercera carta", imagen: "img/imagencarta3.png", texto: "…" },
],
```

- Cada línea en blanco dentro del `texto` crea un **párrafo nuevo**.
- También podés cambiar el `titulo` principal de la página, el `subtitulo` y el `pie`.
- `imagen`: la foto que se muestra arriba del texto. Si el archivo no existe, la carta se abre igual sin foto. Mirá `img/LEEME.txt` para el nombre exacto.
- Si querés agregar una cuarta carta, sumá otro objeto a la lista y una posición más en `POSICIONES` (mismo archivo).

Guardá el archivo y recargá la página para ver los cambios.

## 👀 Cómo verla

Doble clic en `index.html` y se abre en el navegador. No necesita servidores ni instalar nada.

## 🌐 Cómo publicarla (para que la vea desde cualquier celular)

Con GitHub CLI ya instalado y logueado, desde esta carpeta:

```powershell
git init
git add .
git commit -m "Ramo de flores para Mamá"
gh repo create ramo-para-mama --public --source=. --push
gh api repos/{usuario}/ramo-para-mama/pages -X POST -f "source[branch]=main" -f "source[path]=/"
```

En un par de minutos va a estar en línea en `https://<usuario>.github.io/ramo-para-mama/`.

## 💡 Detalles de la página

- Las flores se mecen suavemente y caen pétalos de fondo.
- Los sobres se abren al pasar el mouse, y al tocarlos aparece la carta con lacre rojo.
- Se puede navegar entre cartas con los botones o con las flechas del teclado (`←` `→`), y cerrar con `Esc`.
- Funciona en celular y respeta la configuración de "reducir movimiento" del sistema.
