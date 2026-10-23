export interface GalleryImage {
  src: string;
  alt: string;
  span?: 'wide' | 'tall';
}

export const gallery: GalleryImage[] = [
  { src: 'interior-1', alt: 'Светлый лечебный кабинет со стоматологическим креслом', span: 'wide' },
  { src: 'interior-3', alt: 'Стоматологическое кресло и рабочее место врача' },
  { src: 'diagnostics', alt: 'Анализ цифрового снимка на планшете', span: 'tall' },
  { src: 'interior-2', alt: 'Кабинет с современным оборудованием' },
  { src: 'consultation', alt: 'Врач объясняет результаты диагностики на мониторе' },
  { src: 'interior-4', alt: 'Уютный кабинет с панорамным окном' },
];
