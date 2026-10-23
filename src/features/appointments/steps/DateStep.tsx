import { useMemo } from 'react';
import { bookingDays } from '@/lib/schedule';
import { isoWeekday, toISODate } from '@/lib/format';
import { cn } from '@/lib/cn';

interface Props {
  serviceId: string;
  doctorId: string | 'any';
  value: string | null;
  onChange: (iso: string) => void;
}

const WD = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export function DateStep({ serviceId, doctorId, value, onChange }: Props) {
  const days = useMemo(() => bookingDays(serviceId, doctorId), [serviceId, doctorId]);
  // Выравниваем сетку по понедельнику
  const lead = isoWeekday(days[0].date) - 1;
  const today = toISODate(new Date());
  const anyAvailable = days.some((d) => d.available);

  return (
    <div>
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2" role="radiogroup" aria-label="Дата приёма">
        {WD.map((w) => (
          <div key={w} className="pb-1 text-center text-xs font-semibold uppercase tracking-wider text-ink-300" aria-hidden>{w}</div>
        ))}
        {Array.from({ length: lead }).map((_, i) => <div key={`lead-${i}`} aria-hidden />)}
        {days.map((d) => {
          const selected = value === d.iso;
          const label = d.date.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' });
          const showMonth = d.date.getDate() === 1 || d === days[0];
          return (
            <button
              key={d.iso}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={`${label}${d.available ? '' : ', нет приёма'}`}
              disabled={!d.available}
              onClick={() => onChange(d.iso)}
              className={cn(
                'relative flex aspect-square flex-col items-center justify-center rounded-2xl border text-sm transition-all sm:aspect-[1.15]',
                selected ? 'border-ink-900 bg-ink-900 text-cream-50 shadow-lift' : d.available ? 'border-cream-300 bg-cream-50 text-ink-900 hover:border-ink-400' : 'cursor-not-allowed border-transparent bg-transparent text-ink-200 line-through',
              )}
            >
              <span className="text-base font-semibold sm:text-lg">{d.date.getDate()}</span>
              {showMonth && <span className={cn('text-[10px] uppercase', selected ? 'text-cream-300' : 'text-ink-400')}>{d.date.toLocaleDateString('ru-RU', { month: 'short' })}</span>}
              {d.iso === today && <span className={cn('absolute bottom-1.5 h-1 w-1 rounded-full', selected ? 'bg-sea-300' : 'bg-sea-500')} aria-hidden />}
            </button>
          );
        })}
      </div>
      <div className="mt-5 flex flex-wrap gap-4 text-xs text-ink-400">
        <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-sea-500" /> сегодня</span>
        <span className="flex items-center gap-1.5"><span className="line-through">12</span> нет приёма по графику (демо)</span>
      </div>
      {!anyAvailable && <p className="mt-4 rounded-2xl bg-cream-200/60 p-4 text-sm text-ink-500">В ближайшие дни нет подходящих дат. Попробуйте выбрать другого специалиста.</p>}
    </div>
  );
}
