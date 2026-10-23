import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface Props {
  eyebrow: string;
  title: ReactNode;
  text?: ReactNode;
  crumbs?: { to?: string; label: string }[];
  children?: ReactNode;
}

export function PageHeader({ eyebrow, title, text, crumbs, children }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-cream-300/70">
      <div className="grain pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-sea-100/70 blur-3xl" aria-hidden />
      <div className="container relative pb-12 pt-10 sm:pb-16 sm:pt-14">
        {crumbs && (
          <nav aria-label="Хлебные крошки" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-400">
              <li><Link to="/" className="hover:text-ink-900">Главная</Link></li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                  {c.to ? <Link to={c.to} className="hover:text-ink-900">{c.label}</Link> : <span aria-current="page" className="text-ink-700">{c.label}</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <p className="eyebrow mb-4 animate-fade-up">{eyebrow}</p>
        <h1 className="max-w-3xl animate-fade-up text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl" style={{ animationDelay: '60ms' }}>
          {title}
        </h1>
        {text && <p className="mt-5 max-w-2xl animate-fade-up text-lg leading-relaxed text-ink-500" style={{ animationDelay: '120ms' }}>{text}</p>}
        {children && <div className="mt-8 animate-fade-up" style={{ animationDelay: '180ms' }}>{children}</div>}
      </div>
    </section>
  );
}
