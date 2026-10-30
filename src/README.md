# 🃏 PokeMemory - Práctica MidTerm M06/0612 Desarrollo Web en entorno cliente - DAW

- **Alumno:** José Antonio Doble Rodríguez
- **Repositorio de GitHub:** [https://github.com/antoniodoble/midTerm-jose_doble](https://github.com/antoniodoble/midTerm-jose_doble)
- **Despliegue de la aplicación:**
- **Vídeo de demostración:**

---

## 🚀 Descripción del Proyecto

PokeMemory es una aplicación web interactiva desarrollada como práctica entregable (_MidTerm_) para el CFGS de Desarrollo de Aplicaciones Web (DAW) en **La Salle**. M06/0612-Aula: Desarrollo web en entorno cliente. El juego consiste en el clásico reto de memoria (_Memory_) adaptado a la temática Pokémon, consumiendo datos directamente en tiempo real desde la **PokeAPI** mediante `fetch`.

## 🛠️ Tecnologías y Requisitos Técnicos

- **Vite** como empaquetador y entorno de desarrollo.
- **HTML5**, **CSS3** y **JavaScript (ES6+)** estructurado mediante módulos ES (`import`/`export`).
- **API nativa del navegador:**
  - `sessionStorage` para la gestión de la sesión activa del jugador y su perfil.
  - `localStorage` para la persistencia del historial de partidas y el ranking.
- **ESLint** para asegurar la calidad y limpieza del código fuente.

## ✨ Funcionalidades Principales

1. **Gestión de Perfil:** Creación de usuario (3-15 caracteres) y selección de Pokémon favorito mediante un buscador dinámico conectado a la PokeAPI.
2. **Sesión Persistente:** Mantenimiento de la sesión al recargar la página y opción de cierre de sesión conservando el historial.
3. **Lógica de Juego Robusta:** Tablero dinámico basado en parejas de Pokémon aleatorias sin repetir, con temporizador en tiempo real (minutos y segundos) y control estricto de eventos rápidos (bloqueo de selecciones simultáneas o terceras cartas).
4. **Ranking Dinámico:** Tabla de clasificación ordenada por mayor número de cartas y menor tiempo, con actualización en tiempo real tras finalizar la partida y resaltado visual del último resultado obtenido.

---

<!-- cgpt -->
