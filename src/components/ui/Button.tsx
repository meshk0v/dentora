import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'accent' | 'light' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 select-none disabled:pointer-events-none disabled:opacity-50 active:scale-[.98]';
const variants: Record<Variant, string> = {
  primary: 'bg-ink-900 text-cream-50 hover:bg-ink-800 shadow-[0_8px_20px_-8px_rgba(19,28,44,.5)]',
  accent: 'bg-sea-500 text-white hover:bg-sea-600 shadow-[0_8px_20px_-8px_rgba(61,138,134,.6)]',
  light: 'bg-cream-50 text-ink-900 hover:bg-white shadow-[0_8px_20px_-8px_rgba(0,0,0,.35)]',
  outline: 'border border-ink-200 bg-cream-50/70 text-ink-900 hover:border-ink-900 hover:bg-cream-50',
  ghost: 'text-ink-700 hover:bg-ink-50 hover:text-ink-900',
  danger: 'bg-rose-600 text-white hover:bg-rose-700',
};
const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-14 px-7 text-base',
};

export function buttonClass(variant: Variant = 'primary', size: Size = 'md', className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant, size, loading, icon, className, children, disabled, type = 'button', ...rest },
  ref,
) {
  return (
    <button ref={ref} type={type} className={buttonClass(variant, size, className)} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
      {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : icon}
      {children}
    </button>
  );
});

interface ButtonLinkProps extends LinkProps {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
}

export function ButtonLink({ variant, size, icon, className, children, ...rest }: ButtonLinkProps) {
  return (
    <Link className={buttonClass(variant, size, className)} {...rest}>
      {icon}
      {children}
    </Link>
  );
}
