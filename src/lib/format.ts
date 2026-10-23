const rub = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 });

export function formatPrice(from: number, to?: number) {
  return to ? `${rub.format(from)} – ${rub.format(to)} ₽` : `от ${rub.format(from)} ₽`;
}

export function formatDuration(min?: number) {
  if (!min) return null;
  if (min < 60) return `≈ ${min} мин`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `≈ ${h} ч${m ? ` ${m} мин` : ''}`;
}

/** YYYY-MM-DD в локальном часовом поясе */
export function toISODate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function parseISODate(s: string) {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function formatDateLong(iso: string) {
  return parseISODate(iso).toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' });
}

export function formatDateShort(iso: string) {
  return parseISODate(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function formatDateTime(isoDateTime: string) {
  return new Date(isoDateTime).toLocaleString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

/** 1 = понедельник … 7 = воскресенье */
export function isoWeekday(d: Date) {
  return d.getDay() === 0 ? 7 : d.getDay();
}

export function plural(n: number, forms: [string, string, string]) {
  const n10 = n % 10;
  const n100 = n % 100;
  if (n10 === 1 && n100 !== 11) return forms[0];
  if (n10 >= 2 && n10 <= 4 && (n100 < 10 || n100 >= 20)) return forms[1];
  return forms[2];
}
