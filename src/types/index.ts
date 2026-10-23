export type ServiceCategoryId =
  | 'therapy'
  | 'hygiene'
  | 'orthodontics'
  | 'implantology'
  | 'prosthetics'
  | 'pediatric'
  | 'aesthetic'
  | 'diagnostics';

export interface ServiceCategory {
  id: ServiceCategoryId;
  title: string;
  short: string;
}

export interface Service {
  id: string;
  category: ServiceCategoryId;
  title: string;
  summary: string;
  description: string;
  /** Информационный перечень ситуаций, когда пациенты обычно обращаются с этим вопросом */
  indications: string[];
  steps: { title: string; text: string }[];
  /** Ориентировочная длительность одного визита в минутах (демо) */
  durationMin?: number;
  /** Демонстрационная цена «от», ₽ */
  priceFrom: number;
  priceTo?: number;
  popular?: boolean;
  image?: string;
}

export interface Doctor {
  id: string;
  name: string;
  role: string;
  specialties: ServiceCategoryId[];
  photo: string;
  summary: string;
  bio: string;
  focus: string[];
  /** Рабочие дни недели для демо-расписания: 1 = понедельник … 7 = воскресенье */
  workDays: number[];
}

export interface WorkingHours {
  label: string;
  days: number[];
  open: string;
  close: string;
}

export interface ClinicConfig {
  name: string;
  tagline: string;
  logoText: string;
  phone: string;
  phoneHref: string;
  email: string;
  address: string;
  city: string;
  metro?: string;
  hours: WorkingHours[];
  /** Шаг слотов онлайн-записи, мин */
  slotStepMin: number;
  /** На сколько дней вперёд открыта запись */
  bookingHorizonDays: number;
  social: { label: string; href: string }[];
  isDemo: boolean;
}

export type AppointmentStatus = 'new' | 'confirmed' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  serviceId: string;
  /** null — «любой доступный специалист» */
  doctorId: string | null;
  /** YYYY-MM-DD */
  date: string;
  /** HH:MM */
  time: string;
  patientName: string;
  phone: string;
  comment?: string;
  status: AppointmentStatus;
  createdAt: string;
  updatedAt: string;
  demo: true;
}

export interface BookingDraft {
  serviceId: string | null;
  doctorId: string | null | 'any';
  date: string | null;
  time: string | null;
  patientName: string;
  phone: string;
  comment: string;
}

export interface FaqItem {
  q: string;
  a: string;
  group: 'Запись' | 'Лечение' | 'Оплата' | 'О сайте';
}
