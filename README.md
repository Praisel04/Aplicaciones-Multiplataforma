<h1 align="center">🗂️ Task Manager App</h1>
<p align="center">
  <em>Lista de tareas minimalista, accesible y sin dependencias — HTML + CSS + JavaScript</em>
</p>

<p align="center">
  <img alt="HTML5" src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=fff&style=for-the-badge">
  <img alt="CSS3"  src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=fff&style=for-the-badge">
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000&style=for-the-badge">
  <img alt="A11y" src="https://img.shields.io/badge/Accessible-A11y-2E7D32?style=for-the-badge">
</p>

---

## ✨ Descripción
**Task Manager App** permite **añadir**, **marcar como completadas** y **eliminar** tareas.  
Incluye **persistencia** con LocalStorage, **contador** de tareas y **feedback accesible** (región `aria-live` con `role="status"`).  
Funciona con **HTML/CSS/JS vanilla** y se abre con doble clic (no requiere servidor).

---

## 📓 Tabla de Contenidos
- [Demo](#-demo)
- [Cómo ejecutar](#-cómo-ejecutar)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Requisitos cubiertos](#-requisitos-cubiertos)
- [Licencia](#-licencia)

---

## 📸 Demo
<p align="center">
  <!-- Sustituye esta ruta cuando tengas tu gif/captura -->
  <img src="/pec1/docs/demo1.png" alt="Demo de la aplicación" width="720">
</p>

---

## 🚀 Cómo ejecutar
1. **Descarga o clona** el repo.  
2. Abre `index.html` con doble clic.  
3. Escribe una tarea y pulsa <kbd>Enter</kbd> (o clic en **Add Task**).

> Opcional: servir localmente
```bash
# Python 3
python -m http.server 8080

# Node
npx serve .
