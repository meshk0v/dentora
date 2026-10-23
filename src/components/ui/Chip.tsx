import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface Props {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  count?: number;
}

export function Chip({ active, onClick, children, count }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium transition',
        active ? 'border-ink-900 bg-ink-900 text-cream-50' : 'border-cream-300 bg-cream-50 text-ink-600 hover:border-ink-300 hover:text-ink-900',
      )}
    >
      {children}
      {count !== undefined && <span className={cn('text-xs tabular-nums', active ? 'text-cream-300' : 'text-ink-300')}>{count}</span>}
    </button>
  );
}
