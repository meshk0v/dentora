import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUp, CalendarCheck } from 'lucide-react';
import { cn } from '@/lib/cn';

/** Фиксированная кнопка записи на мобильных и кнопка «наверх». */
export function FloatingActions() {
  const [shown, setShown] = useState(false);
  const { pathname } = useLocation();
  const onBooking = pathname.startsWith('/booking');

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={cn(
          'fixed right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-cream-300 bg-cream-50/90 text-ink-800 shadow-lift backdrop-blur transition-all duration-300 hover:bg-ink-900 hover:text-cream-50 sm:bottom-6 sm:right-6',
          'bottom-24',
          shown ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
        )}
        aria-label="Наверх"
        tabIndex={shown ? 0 : -1}
      >
        <ArrowUp className="h-5 w-5" />
      </button>

      {!onBooking && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-cream-300/80 bg-cream-100/90 p-3 pb-[max(.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl sm:hidden">
          <Link to="/booking" className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink-900 text-sm font-semibold text-cream-50 active:scale-[.98]">
            <CalendarCheck className="h-4 w-4" aria-hidden /> Записаться на приём
          </Link>
        </div>
      )}
    </>
  );
}
