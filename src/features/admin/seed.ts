import type { Appointment, AppointmentStatus } from '@/types';
import { doctors } from '@/data/doctors';
import { services } from '@/data/services';
import { toISODate } from '@/lib/format';

const names = ['Алексей Тестов', 'Мария Пример', 'Иван Демо', 'Ольга Образцова', 'Пётр Шаблонов', 'Анна Макетова', 'Сергей Пробный', 'Елена Черновая'];
const statuses: AppointmentStatus[] = ['new', 'new', 'confirmed', 'confirmed', 'completed', 'cancelled', 'new', 'confirmed'];

/** Набор вымышленных записей для демонстрации панели. */
export function buildSeed(): Appointment[] {
  const now = new Date();
  return names.map((name, i) => {
    const service = services[(i * 3) % services.length];
    const doc = doctors.find((d) => d.specialties.includes(service.category));
    const date = new Date(now);
    date.setDate(now.getDate() + (statuses[i] === 'completed' ? -3 - i : i + 1));
    const created = new Date(now.getTime() - (i + 1) * 3600_000 * 5);
    return {
      id: `DM-SEED${String(i + 1).padStart(2, '0')}`,
      serviceId: service.id,
      doctorId: i % 4 === 3 ? null : doc?.id ?? null,
      date: toISODate(date),
      time: ['09:30', '11:00', '12:30', '14:00', '15:30', '17:00', '18:30', '10:00'][i],
      patientName: name,
      phone: `+7 (900) 000-00-${String(10 + i)}`,
      comment: i % 3 === 0 ? 'Тестовый комментарий для демонстрации' : undefined,
      status: statuses[i],
      createdAt: created.toISOString(),
      updatedAt: created.toISOString(),
      demo: true,
    };
  });
}
