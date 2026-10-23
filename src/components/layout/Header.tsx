import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { CalendarCheck, Menu, Phone, X } from 'lucide-react';
import { clinic } from '@/data/clinic';
import { cn } from '@/lib/cn';
import { ButtonLink } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { mainNav } from './nav';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header className={cn('sticky top-0 z-50 transition-all duration-300', scrolled || open ? 'border-b border-cream-300/80 bg-cream-100/85 backdrop-blur-xl' : 'border-b border-transparent bg-transparent')}>
      <div className="container flex h-[72px] items-center justify-between gap-6">
        <Link to="/" aria-label={`${clinic.name} — на главную`} className="shrink-0 rounded-xl">
          <Logo />
        </Link>

        <nav aria-label="Основная навигация" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn('relative rounded-full px-4 py-2 text-sm font-medium transition', isActive ? 'bg-ink-900/[.06] text-ink-900' : 'text-ink-500 hover:text-ink-900')
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={clinic.phoneHref} className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-ink-800 transition hover:text-sea-600 xl:flex">
            <Phone className="h-4 w-4 text-sea-500" aria-hidden />
            {clinic.phone}
          </a>
          <ButtonLink to="/booking" size="sm" className="hidden sm:inline-flex" icon={<CalendarCheck className="h-4 w-4" aria-hidden />}>
            Записаться
          </ButtonLink>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-cream-300 bg-cream-50 text-ink-900 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-[72px] z-40 animate-fade-in overflow-y-auto bg-cream-100 lg:hidden">
          <nav aria-label="Мобильная навигация" className="container flex min-h-full flex-col py-6">
            <ul className="space-y-1">
              {[{ to: '/', label: 'Главная' }, ...mainNav].map((item, i) => (
                <li key={item.to} className="animate-fade-up" style={{ animationDelay: `${i * 35}ms` }}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) => cn('flex items-center justify-between rounded-2xl px-4 py-4 text-2xl font-semibold transition', isActive ? 'bg-cream-50 text-ink-900' : 'text-ink-500')}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="mt-auto space-y-3 border-t border-cream-300 pt-6">
              <a href={clinic.phoneHref} className="flex items-center gap-3 px-4 text-lg font-semibold">
                <Phone className="h-5 w-5 text-sea-500" aria-hidden /> {clinic.phone}
              </a>
              <p className="px-4 text-sm text-ink-400">Телефон демонстрационный</p>
              <ButtonLink to="/booking" size="lg" className="w-full">
                Записаться на приём
              </ButtonLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
