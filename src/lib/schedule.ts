import { clinic } from '@/data/clinic';
import { doctors } from '@/data/doctors';
import { serviceById } from '@/data/services';
import type { Appointment, Doctor } from '@/types';
import { isoWeekday, parseISODate, toISODate } from './format';

/**
 * Демонстрационное расписание: интервалы строятся по часам работы из конфига
 * и рабочим дням врачей. Это НЕ реальная занятость специалистов.
 * Исключаются только прошедшее время и интервалы, уже занятые демо-записями в этом браузере.
 */

function toMin(hhmm: string) {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}
function toHHMM(min: number) {
  return `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`;
}

function hoursFor(weekday: number) {
  const h = clinic.hours.find((x) => x.days.includes(weekday));
  if (!h || h.open === '—') return null;
  return { open: toMin(h.open), close: toMin(h.close) };
}

export function doctorsForService(serviceId: string | null): Doctor[] {
  const s = serviceById(serviceId);
  if (!s) return doctors;
  return doctors.filter((d) => d.specialties.includes(s.category));
}

function candidateDoctors(serviceId: string, doctorId: string | 'any') {
  return doctorId === 'any' ? doctorsForService(serviceId) : doctors.filter((d) => d.id === doctorId);
}

export interface DayOption {
  iso: string;
  date: Date;
  available: boolean;
}

export function bookingDays(serviceId: string, doctorId: string | 'any', from = new Date()): DayOption[] {
  const docs = candidateDoctors(serviceId, doctorId);
  const days: DayOption[] = [];
  const start = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  for (let i = 0; i < clinic.bookingHorizonDays; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const wd = isoWeekday(d);
    const iso = toISODate(d);
    const available = !!hoursFor(wd) && docs.some((doc) => doc.workDays.includes(wd)) && slotsFor(serviceId, doctorId, iso, [], from).some((s) => s.available);
    days.push({ iso, date: d, available });
  }
  return days;
}

export interface SlotOption {
  time: string;
  available: boolean;
}

export function slotsFor(serviceId: string, doctorId: string | 'any', iso: string, booked: Appointment[], now = new Date()): SlotOption[] {
  const date = parseISODate(iso);
  const wd = isoWeekday(date);
  const hours = hoursFor(wd);
  if (!hours) return [];
  const docs = candidateDoctors(serviceId, doctorId).filter((d) => d.workDays.includes(wd));
  if (!docs.length) return [];
  const duration = Math.max(serviceById(serviceId)?.durationMin ?? 30, 30);
  const isToday = toISODate(now) === iso;
  const nowMin = now.getHours() * 60 + now.getMinutes() + 60; // запись не позже чем за час
  const active = booked.filter((a) => a.date === iso && a.status !== 'cancelled');

  const result: SlotOption[] = [];
  for (let t = hours.open; t + duration <= hours.close; t += clinic.slotStepMin) {
    const time = toHHMM(t);
    const past = isToday && t < nowMin;
    const atTime = active.filter((a) => a.time === time);
    // Запись «к любому врачу» занимает одного из подходящих специалистов
    const busy = atTime.filter((a) => a.doctorId === null || docs.some((d) => d.id === a.doctorId)).length;
    const free = doctorId === 'any' ? busy < docs.length : !atTime.some((a) => a.doctorId === doctorId);
    result.push({ time, available: !past && free });
  }
  return result;
}
