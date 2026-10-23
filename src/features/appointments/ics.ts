import type { Appointment } from '@/types';
import { clinic } from '@/data/clinic';
import { serviceById } from '@/data/services';

/** Файл .ics для добавления демо-записи в календарь. Генерируется в браузере. */
export function downloadIcs(a: Appointment) {
  const service = serviceById(a.serviceId);
  const [y, m, d] = a.date.split('-').map(Number);
  const [hh, mm] = a.time.split(':').map(Number);
  const start = new Date(y, m - 1, d, hh, mm);
  const end = new Date(start.getTime() + (service?.durationMin ?? 30) * 60000);
  const fmt = (dt: Date) => dt.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const body = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:-//${clinic.name}//Demo//RU`,
    'BEGIN:VEVENT',
    `UID:${a.id}@dentora.demo`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:[ДЕМО] ${service?.title ?? 'Приём'} — ${clinic.name}`,
    'DESCRIPTION:Демонстрационная запись. Не передана в клинику.',
    `LOCATION:${clinic.city}\\, ${clinic.address}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  const url = URL.createObjectURL(new Blob([body], { type: 'text/calendar;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = `dentora-${a.id}.ics`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
