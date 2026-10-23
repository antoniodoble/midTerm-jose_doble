import { validateUsername } from "../validacion.js";
import { saveSession } from "../storage.js";

export function setupLoginForm(onSuccess) {
  const form = document.querySelector("#profile-form");
  const usernameInput = document.querySelector("#username");
  const usernameError = document.querySelector("#username-error");
  const submitBtn = document.querySelector("#start-btn");

  let selectedPokemon = null; // Se actualizará al seleccionar del buscador

  // Validación en tiempo real del username
  usernameInput.addEventListener("input", () => {
    const validation = validateUsername(usernameInput.value);

    if (!validation.isValid) {
      usernameError.textContent = validation.message;
      usernameError.classList.add("visible");
    } else {
      usernameError.textContent = "";
      usernameError.classList.remove("visible");
    }

    checkFormState();
  });

  // Habilitar o deshabilitar botón de envío
  function checkFormState() {
    const isUserValid = validateUsername(usernameInput.value).isValid;
    const hasPokemon = selectedPokemon !== null;

    submitBtn.disabled = !(isUserValid && hasPokemon);
  }

  // Función para que el módulo del buscador asigne el Pokémon seleccionado
  window.setSelectedPokemonForProfile = (pokemon) => {
    selectedPokemon = pokemon;
    checkFormState();
  };

  // Manejo del Submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const usernameVal = usernameInput.value.trim();
    const userValidation = validateUsername(usernameVal);

    if (!userValidation.isValid || !selectedPokemon) {
      return;
    }

    const userProfile = {
      username: usernameVal,
      favoritePokemon: {
        id: selectedPokemon.id,
        name: selectedPokemon.name,
        image: selectedPokemon.image,
      },
    };

    saveSession(userProfile);
    onSuccess(userProfile);
  });
}
