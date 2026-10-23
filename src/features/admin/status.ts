import type { AppointmentStatus } from '@/types';

export const statusMeta: Record<AppointmentStatus, { label: string; tone: 'sea' | 'green' | 'neutral' | 'rose'; dot: string }> = {
  new: { label: 'Новая', tone: 'sea', dot: 'bg-sea-500' },
  confirmed: { label: 'Подтверждена (демо)', tone: 'green', dot: 'bg-emerald-500' },
  completed: { label: 'Завершена', tone: 'neutral', dot: 'bg-ink-400' },
  cancelled: { label: 'Отменена', tone: 'rose', dot: 'bg-rose-500' },
};

export const statusOrder: AppointmentStatus[] = ['new', 'confirmed', 'completed', 'cancelled'];
