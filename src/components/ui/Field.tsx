import { forwardRef, useId, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/cn';

const control =
  'w-full rounded-2xl border bg-cream-50 px-4 text-ink-900 placeholder:text-ink-300 transition focus:outline-none focus:ring-4';
const ok = 'border-cream-300 focus:border-sea-500 focus:ring-sea-100';
const bad = 'border-rose-400 focus:border-rose-500 focus:ring-rose-100';

interface WrapProps {
  label: string;
  error?: string | null;
  hint?: ReactNode;
  id: string;
  children: ReactNode;
}

function Wrap({ label, error, hint, id, children }: WrapProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-semibold text-ink-800">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-err`} role="alert" className="flex items-center gap-1.5 text-sm text-rose-600">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden /> {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-sm text-ink-400">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | null;
  hint?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ label, error, hint, className, id, ...rest }, ref) {
  const auto = useId();
  const fid = id ?? auto;
  return (
    <Wrap label={label} error={error} hint={hint} id={fid}>
      <input
        ref={ref}
        id={fid}
        aria-invalid={!!error || undefined}
        aria-describedby={error ? `${fid}-err` : hint ? `${fid}-hint` : undefined}
        className={cn(control, 'h-12', error ? bad : ok, className)}
        {...rest}
      />
    </Wrap>
  );
});

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string | null;
  hint?: ReactNode;
}

export function Textarea({ label, error, hint, className, id, ...rest }: TextareaProps) {
  const auto = useId();
  const fid = id ?? auto;
  return (
    <Wrap label={label} error={error} hint={hint} id={fid}>
      <textarea id={fid} className={cn(control, 'min-h-[96px] py-3', error ? bad : ok, className)} {...rest} />
    </Wrap>
  );
}
