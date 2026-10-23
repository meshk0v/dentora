import type { ReactNode } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';

interface Props {
  name: string;
  value: string;
  checked: boolean;
  onSelect: () => void;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}

/** Карточка-вариант на базе нативного radio: работает стрелками клавиатуры и со скринридерами. */
export function OptionCard({ name, value, checked, onSelect, children, disabled, className }: Props) {
  return (
    <label
      className={cn(
        'relative flex cursor-pointer rounded-2xl border bg-cream-50 transition-all duration-200 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-sea-500 has-[:focus-visible]:ring-offset-2',
        checked ? 'border-ink-900 shadow-[0_0_0_1px_theme(colors.ink.900)]' : 'border-cream-300 hover:border-ink-300',
        disabled && 'cursor-not-allowed opacity-45 hover:border-cream-300',
        className,
      )}
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={onSelect} disabled={disabled} className="sr-only" />
      {children}
      {checked && (
        <span className="absolute right-3 top-3 flex h-6 w-6 animate-scale-in items-center justify-center rounded-full bg-ink-900 text-cream-50" aria-hidden>
          <Check className="h-3.5 w-3.5" />
        </span>
      )}
    </label>
  );
}
