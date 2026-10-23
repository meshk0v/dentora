import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';
import { CheckCircle2, Info, X, XCircle } from 'lucide-react';
import { cn } from '@/lib/cn';

type Tone = 'success' | 'error' | 'info';
interface ToastItem {
  id: number;
  tone: Tone;
  title: string;
  text?: string;
}

interface Ctx {
  notify: (t: Omit<ToastItem, 'id'>) => void;
}

const ToastContext = createContext<Ctx | null>(null);

const icons = { success: CheckCircle2, error: XCircle, info: Info };
const tones = { success: 'text-sea-500', error: 'text-rose-500', info: 'text-ink-400' };

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const seq = useRef(0);

  const dismiss = useCallback((id: number) => setItems((l) => l.filter((t) => t.id !== id)), []);
  const notify = useCallback(
    (t: Omit<ToastItem, 'id'>) => {
      const id = ++seq.current;
      setItems((l) => [...l.slice(-2), { ...t, id }]);
      window.setTimeout(() => dismiss(id), t.tone === 'error' ? 7000 : 4500);
    },
    [dismiss],
  );
  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-[80] flex flex-col items-center gap-2 px-4 sm:bottom-6 sm:left-auto sm:right-6 sm:top-auto sm:items-end" aria-live="polite" aria-atomic="false">
        {items.map((t) => {
          const Icon = icons[t.tone];
          return (
            <div key={t.id} role={t.tone === 'error' ? 'alert' : 'status'} className="pointer-events-auto flex w-full max-w-sm animate-fade-up items-start gap-3 rounded-2xl border border-cream-300 bg-cream-50 p-4 shadow-lift">
              <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', tones[t.tone])} aria-hidden />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-ink-900">{t.title}</p>
                {t.text && <p className="mt-0.5 text-sm text-ink-500">{t.text}</p>}
              </div>
              <button type="button" onClick={() => dismiss(t.id)} className="-m-1 rounded-full p-1 text-ink-300 hover:text-ink-900" aria-label="Закрыть уведомление">
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
}
