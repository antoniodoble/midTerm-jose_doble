// src/validacion.js

/**
 * Valida el nombre de usuario.
 * Obligatorio y de entre 3 y 15 caracteres.
 */
export function validateUsername(username) {
  const trimmed = username ? username.trim() : "";
  if (!trimmed) {
    return { isValid: false, message: "El nombre de usuario es obligatorio." };
  }
  if (trimmed.length < 3 || trimmed.length > 15) {
    return {
      isValid: false,
      message: "El nombre de usuario debe tener entre 3 y 15 caracteres.",
    };
  }
  return { isValid: true, message: "" };
}

/**
 * Valida el número de cartas para la partida.
 * Debe ser un número entero, positivo y par.
 */
export function validateCardsCount(cardsInput) {
  const num = Number(cardsInput);

  if (cardsInput === "" || cardsInput === null || cardsInput === undefined) {
    return { isValid: false, message: "Introduce el número de cartas." };
  }

  if (!Number.isInteger(num)) {
    return {
      isValid: false,
      message: "El número de cartas debe ser un número entero.",
    };
  }

  if (num <= 0) {
    return {
      isValid: false,
      message: "El número de cartas debe ser positivo (mayor que 0).",
    };
  }

  if (num % 2 !== 0) {
    return {
      isValid: false,
      message: "El número de cartas debe ser PAR (ej. 4, 8, 12, 16).",
    };
  }

  if (num > 20) {
    return {
      isValid: false,
      message: "El número máximo de cartas permitido es 20.",
    };
  }

  return { isValid: true, message: "" };
}
