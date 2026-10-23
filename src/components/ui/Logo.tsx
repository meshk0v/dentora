import { clinic } from '@/data/clinic';
import { cn } from '@/lib/cn';

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn('h-9 w-9', className)} aria-hidden>
      <rect width="40" height="40" rx="12" className="fill-ink-900" />
      <path
        d="M13 11.5c-3 0-5 2.4-5 5.6 0 3.7 1.9 5.6 2.5 9.3.4 2.6 1.2 5.1 3.1 5.1 1.8 0 2-3 2.6-5.6.5-1.9 1.3-3.1 3.2-3.1h1.2c1.9 0 2.7 1.2 3.2 3.1.6 2.6.8 5.6 2.6 5.6 1.9 0 2.7-2.5 3.1-5.1.6-3.7 2.5-5.6 2.5-9.3 0-3.2-2-5.6-5-5.6-2.5 0-3.8 1.3-6.4 1.3s-3.9-1.3-6.6-1.3z"
        fill="none"
        strokeWidth="2.2"
        strokeLinejoin="round"
        className="stroke-sea-300"
      />
    </svg>
  );
}

export function Logo({ light }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className={cn('text-lg font-extrabold tracking-[0.2em]', light ? 'text-cream-50' : 'text-ink-900')}>{clinic.logoText}</span>
    </span>
  );
}
