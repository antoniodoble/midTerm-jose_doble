import { fetchRandomAnimatedSprite } from "../api.js";

/**
 * Carga un sprite animado aleatorio en la imagen de la landing.
 * Si la API falla, la landing sigue funcionando sin imagen.
 * @param {HTMLImageElement} imageElement
 */
export async function setupLandingSprite(imageElement) {
  const sprite = await fetchRandomAnimatedSprite();
  if (!sprite?.image) return;

  imageElement.src = sprite.image;
  imageElement.alt = `${sprite.name} animado`;
  imageElement.hidden = false;
}
