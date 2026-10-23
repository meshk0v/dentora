import { useMemo } from 'react';
import { Sun, Sunrise, Sunset } from 'lucide-react';
import { slotsFor } from '@/lib/schedule';
import { useAppointments } from '@/hooks/useAppointments';
import { formatDateLong } from '@/lib/format';
import { cn } from '@/lib/cn';

interface Props {
  serviceId: string;
  doctorId: string | 'any';
  date: string;
  value: string | null;
  onChange: (t: string) => void;
}

const groups = [
  { label: 'Утро', icon: Sunrise, test: (h: number) => h < 12 },
  { label: 'День', icon: Sun, test: (h: number) => h >= 12 && h < 17 },
  { label: 'Вечер', icon: Sunset, test: (h: number) => h >= 17 },
];

export function TimeStep({ serviceId, doctorId, date, value, onChange }: Props) {
  const booked = useAppointments();
  const slots = useMemo(() => slotsFor(serviceId, doctorId, date, booked), [serviceId, doctorId, date, booked]);
  const free = slots.filter((s) => s.available).length;

  return (
    <div>
      <p className="mb-6 text-sm text-ink-500">
        <span className="font-semibold text-ink-900 first-letter:uppercase">{formatDateLong(date)}</span> · доступно интервалов: {free}
      </p>
      {free === 0 ? (
        <p className="rounded-2xl bg-cream-200/60 p-6 text-center text-sm text-ink-500">На эту дату свободных интервалов нет. Вернитесь назад и выберите другую дату.</p>
      ) : (
        <div className="space-y-6" role="radiogroup" aria-label="Время приёма">
          {groups.map((g) => {
            const items = slots.filter((s) => g.test(Number(s.time.slice(0, 2))));
            if (!items.length) return null;
            return (
              <div key={g.label}>
                <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-400">
                  <g.icon className="h-3.5 w-3.5" aria-hidden /> {g.label}
                </p>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                  {items.map((s) => {
                    const selected = value === s.time;
                    return (
                      <button
                        key={s.time}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        disabled={!s.available}
                        aria-label={`${s.time}${s.available ? '' : ', недоступно'}`}
                        onClick={() => onChange(s.time)}
                        className={cn(
                          'h-12 rounded-xl border text-sm font-semibold tabular-nums transition',
                          selected ? 'border-ink-900 bg-ink-900 text-cream-50' : s.available ? 'border-cream-300 bg-cream-50 text-ink-800 hover:border-ink-400' : 'cursor-not-allowed border-dashed border-cream-300 text-ink-200 line-through',
                        )}
                      >
                        {s.time}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <p className="mt-6 text-xs leading-relaxed text-ink-400">
        Интервалы построены по демонстрационному графику и не отражают реальную занятость врачей. Недоступны прошедшее время и интервалы, уже занятые вашими демо-записями.
      </p>
    </div>
  );
}
