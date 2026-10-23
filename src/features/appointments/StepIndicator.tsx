import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';

export const STEP_LABELS = ['Услуга', 'Врач', 'Дата', 'Время', 'Контакты', 'Проверка', 'Готово'];

export function StepIndicator({ current }: { current: number }) {
  const pct = (current / (STEP_LABELS.length - 1)) * 100;
  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-sm sm:hidden">
        <span className="font-semibold text-ink-900">{STEP_LABELS[current]}</span>
        <span className="text-ink-400">Шаг {current + 1} из {STEP_LABELS.length}</span>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-cream-300 sm:hidden" aria-hidden>
        <div className="h-full rounded-full bg-sea-500 transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
      <ol className="hidden items-center sm:flex" aria-label="Шаги записи">
        {STEP_LABELS.map((label, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <li key={label} className="flex flex-1 items-center last:flex-none" aria-current={active ? 'step' : undefined}>
              <div className="flex items-center gap-2.5">
                <span
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-300',
                    done && 'bg-sea-500 text-white',
                    active && 'bg-ink-900 text-cream-50 ring-4 ring-ink-900/10',
                    !done && !active && 'border border-cream-400 bg-cream-50 text-ink-300',
                  )}
                >
                  {done ? <Check className="h-4 w-4" aria-hidden /> : i + 1}
                </span>
                <span className={cn('hidden text-sm font-medium lg:inline', active ? 'text-ink-900' : done ? 'text-ink-600' : 'text-ink-300')}>
                  {label}
                  <span className="sr-only">{done ? ' — выполнено' : active ? ' — текущий шаг' : ''}</span>
                </span>
              </div>
              {i < STEP_LABELS.length - 1 && (
                <span className="mx-3 h-px flex-1 bg-cream-300" aria-hidden>
                  <span className="block h-full bg-sea-500 transition-all duration-500" style={{ width: done ? '100%' : '0%' }} />
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
