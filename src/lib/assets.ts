/** Путь к изображению из public/images с учётом base (GitHub Pages подпапка). */
export function img(name: string) {
  return `${import.meta.env.BASE_URL}images/${name}.webp`;
}
