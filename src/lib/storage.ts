import type { Appointment, AppointmentStatus } from '@/types';

const KEY = 'dentora.demo.appointments.v1';
const EVENT = 'dentora:appointments';

export class StorageError extends Error {}

function isAppointment(x: unknown): x is Appointment {
  if (!x || typeof x !== 'object') return false;
  const a = x as Record<string, unknown>;
  return typeof a.id === 'string' && typeof a.serviceId === 'string' && typeof a.date === 'string' && typeof a.time === 'string' && typeof a.status === 'string';
}

export function loadAppointments(): Appointment[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isAppointment) : [];
  } catch {
    // Недоступный или повреждённый localStorage — работаем с пустым списком
    return [];
  }
}

function save(list: Appointment[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    throw new StorageError('Не удалось сохранить данные в браузере. Возможно, включён приватный режим или хранилище переполнено.');
  }
  window.dispatchEvent(new Event(EVENT));
}

function uid() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID().slice(0, 8).toUpperCase();
  return Math.random().toString(36).slice(2, 10).toUpperCase();
}

export function createAppointment(data: Omit<Appointment, 'id' | 'status' | 'createdAt' | 'updatedAt' | 'demo'>): Appointment {
  const now = new Date().toISOString();
  const appt: Appointment = { ...data, id: `DM-${uid()}`, status: 'new', createdAt: now, updatedAt: now, demo: true };
  save([appt, ...loadAppointments()]);
  return appt;
}

export function updateAppointmentStatus(id: string, status: AppointmentStatus) {
  save(loadAppointments().map((a) => (a.id === id ? { ...a, status, updatedAt: new Date().toISOString() } : a)));
}

export function deleteAppointment(id: string) {
  save(loadAppointments().filter((a) => a.id !== id));
}

export function replaceAppointments(list: Appointment[]) {
  save(list);
}

export function clearAppointments() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    throw new StorageError('Не удалось очистить хранилище браузера.');
  }
  window.dispatchEvent(new Event(EVENT));
}

export function subscribeAppointments(cb: () => void) {
  const onStorage = (e: StorageEvent) => e.key === KEY && cb();
  window.addEventListener(EVENT, cb);
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener('storage', onStorage);
  };
}
