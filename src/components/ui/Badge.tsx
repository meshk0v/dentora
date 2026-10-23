import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Tone = 'neutral' | 'sea' | 'amber' | 'green' | 'rose' | 'ink';
const tones: Record<Tone, string> = {
  neutral: 'bg-cream-200 text-ink-600',
  sea: 'bg-sea-50 text-sea-700 ring-1 ring-inset ring-sea-100',
  amber: 'bg-amber-50 text-amber-800 ring-1 ring-inset ring-amber-200',
  green: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200',
  rose: 'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200',
  ink: 'bg-ink-900 text-cream-50',
};

export function Badge({ tone = 'neutral', children, className }: { tone?: Tone; children: ReactNode; className?: string }) {
  return <span className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold', tones[tone], className)}>{children}</span>;
}

export function DemoBadge({ className }: { className?: string }) {
  return (
    <Badge tone="amber" className={className}>
      Демо-данные
    </Badge>
  );
}
