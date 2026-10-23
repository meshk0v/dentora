import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { clinic } from '@/data/clinic';
import { Reveal } from '@/components/ui/Reveal';

export function MapPlaceholder() {
  return (
    <div className="relative h-full min-h-[300px] overflow-hidden rounded-3xl bg-[#E9E4DA]" role="img" aria-label="Схематичная карта: место для подключения реальной карты">
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 600 400" aria-hidden>
        <g fill="none" stroke="#FFFDF9" strokeLinecap="round">
          <path d="M-20 300 C 120 260, 220 320, 360 250 S 560 180, 640 210" strokeWidth="22" />
          <path d="M150 -20 L 230 420" strokeWidth="14" />
          <path d="M420 -20 C 400 120, 470 260, 430 420" strokeWidth="12" />
          <path d="M-20 110 L 640 70" strokeWidth="9" />
          <path d="M-20 190 L 640 160" strokeWidth="6" />
          <path d="M300 -20 L 320 420" strokeWidth="6" />
        </g>
        <path d="M480 300 q40 -30 90 -10 v130 h-120 z" fill="#CFE3DF" />
        <circle cx="90" cy="60" r="36" fill="#CFE3DF" />
      </svg>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-ink-900 text-cream-50 shadow-lift">
          <span className="absolute inset-0 animate-ping rounded-full bg-ink-900/30" aria-hidden />
          <MapPin className="h-6 w-6" aria-hidden />
        </span>
      </div>
      <p className="absolute inset-x-4 bottom-4 rounded-2xl bg-cream-50/90 px-4 py-3 text-center text-xs text-ink-500 backdrop-blur">
        Схема-заглушка. Интерактивная карта подключается после указания реального адреса.
      </p>
    </div>
  );
}

export function ContactsBlock() {
  const items = [
    { icon: Phone, label: 'Телефон (демо)', value: clinic.phone, href: clinic.phoneHref },
    { icon: Mail, label: 'Почта (демо)', value: clinic.email, href: `mailto:${clinic.email}` },
    { icon: MapPin, label: 'Адрес (демо)', value: `${clinic.city}, ${clinic.address}` },
  ];
  return (
    <section className="py-20 lg:py-28" aria-labelledby="contacts-title">
      <div className="container grid gap-5 lg:grid-cols-[1fr_1.3fr]">
        <Reveal className="card flex flex-col p-8 sm:p-10">
          <p className="eyebrow mb-4">Контакты</p>
          <h2 id="contacts-title" className="text-3xl font-semibold sm:text-4xl">Как нас найти</h2>
          <ul className="mt-8 space-y-5">
            {items.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sea-50 text-sea-600"><Icon className="h-5 w-5" aria-hidden /></span>
                <div>
                  <p className="text-xs text-ink-400">{label}</p>
                  {href ? <a href={href} className="font-semibold text-ink-900 hover:text-sea-600">{value}</a> : <p className="font-semibold text-ink-900">{value}</p>}
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8 border-t border-cream-300 pt-6">
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-400"><Clock className="h-3.5 w-3.5" aria-hidden /> Часы работы</p>
            <dl className="space-y-2 text-sm">
              {clinic.hours.map((h) => (
                <div key={h.label} className="flex justify-between">
                  <dt className="text-ink-500">{h.label}</dt>
                  <dd className="font-semibold tabular-nums text-ink-900">{h.open === '—' ? 'выходной' : `${h.open} – ${h.close}`}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <MapPlaceholder />
        </Reveal>
      </div>
    </section>
  );
}
