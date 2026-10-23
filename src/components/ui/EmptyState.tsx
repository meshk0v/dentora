import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

export function EmptyState({ icon: Icon, title, text, action }: { icon: LucideIcon; title: string; text?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-dashed border-cream-400 bg-cream-50/60 px-6 py-16 text-center">
      <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-sea-50 text-sea-600">
        <Icon className="h-6 w-6" aria-hidden />
      </span>
      <h3 className="text-lg font-semibold text-ink-900">{title}</h3>
      {text && <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-400">{text}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
