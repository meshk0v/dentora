import { Link } from 'react-router-dom';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { clinic, DEMO_NOTE } from '@/data/clinic';
import { categories } from '@/data/services';
import { Logo } from '@/components/ui/Logo';
import { mainNav } from './nav';

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-950 text-ink-200">
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-sea-500/10 blur-3xl" aria-hidden />
      <div className="container relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-300">{clinic.tagline}. Внимательный подход и понятная информация на каждом этапе.</p>
          <Link to="/booking" className="mt-6 inline-flex rounded-full bg-sea-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sea-400">
            Записаться онлайн
          </Link>
        </div>
        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">Разделы</h3>
          <ul className="space-y-2.5 text-sm">
            {mainNav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="transition hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/admin" className="transition hover:text-white">
                Панель администратора (демо)
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">Направления</h3>
          <ul className="space-y-2.5 text-sm">
            {categories.slice(0, 6).map((c) => (
              <li key={c.id}>
                <Link to={`/services?category=${c.id}`} className="transition hover:text-white">
                  {c.short}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">Контакты</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-sea-300" aria-hidden />
              <a href={clinic.phoneHref} className="hover:text-white">{clinic.phone}</a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-sea-300" aria-hidden />
              <a href={`mailto:${clinic.email}`} className="hover:text-white">{clinic.email}</a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sea-300" aria-hidden />
              {clinic.city}, {clinic.address}
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-sea-300" aria-hidden />
              <span>{clinic.hours.map((h) => `${h.label}: ${h.open === '—' ? 'выходной' : `${h.open}–${h.close}`}`).join(' · ')}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-3 py-6 text-xs leading-relaxed text-ink-400 md:flex-row md:items-center md:justify-between">
          <p className="max-w-3xl">{DEMO_NOTE} Информация на сайте не является медицинской рекомендацией.</p>
          <p className="shrink-0">© {new Date().getFullYear()} {clinic.name} · демо-проект</p>
        </div>
      </div>
    </footer>
  );
}
