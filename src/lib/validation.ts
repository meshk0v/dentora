import { isValidPhone } from './phone';

export function validateName(name: string): string | null {
  const v = name.trim();
  if (!v) return 'Укажите имя';
  if (v.length < 2) return 'Имя слишком короткое';
  if (v.length > 60) return 'Имя слишком длинное';
  if (!/^[A-Za-zА-Яа-яЁё\s'-]+$/.test(v)) return 'Используйте только буквы, пробел и дефис';
  return null;
}

export function validatePhone(phone: string): string | null {
  if (!phone || phone === '+7') return 'Укажите номер телефона';
  if (!isValidPhone(phone)) return 'Номер должен содержать 10 цифр после +7';
  return null;
}
