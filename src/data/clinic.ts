import type { ClinicConfig } from '@/types';

/**
 * Основные данные клиники. Чтобы адаптировать сайт под реальную клинику,
 * замените значения ниже и установите isDemo: false.
 * Все текущие контакты — заведомо демонстрационные.
 */
export const clinic: ClinicConfig = {
  name: 'DENTORA',
  tagline: 'Клиника современной стоматологии',
  logoText: 'DENTORA',
  phone: '+7 (000) 000-00-00',
  phoneHref: 'tel:+70000000000',
  email: 'hello@dentora.example',
  address: 'ул. Демонстрационная, 1',
  city: 'Город N',
  metro: 'Пример: 5 минут от центра',
  hours: [
    { label: 'Пн–Пт', days: [1, 2, 3, 4, 5], open: '09:00', close: '21:00' },
    { label: 'Сб', days: [6], open: '10:00', close: '18:00' },
    { label: 'Вс', days: [7], open: '—', close: '—' },
  ],
  slotStepMin: 30,
  bookingHorizonDays: 21,
  social: [
    { label: 'Telegram', href: '#' },
    { label: 'VK', href: '#' },
  ],
  isDemo: true,
};

export const DEMO_NOTE =
  'Демонстрационный сайт. Цены, описания, сроки, специалисты и контакты вымышлены и должны быть проверены и заменены клиникой перед использованием.';
