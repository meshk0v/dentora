import { ArrowRight, CalendarCheck, Cpu, FileText, HeartHandshake, MousePointerClick } from 'lucide-react';
import { clinic } from '@/data/clinic';
import { ButtonLink } from '@/components/ui/Button';
import { SmartImage } from '@/components/ui/SmartImage';

const perks = [
  { icon: Cpu, title: 'Современное оборудование', text: 'Цифровая диагностика и 3D-сканирование' },
  { icon: HeartHandshake, title: 'Индивидуальный подход', text: 'План лечения обсуждается с вами' },
  { icon: FileText, title: 'Прозрачная информация', text: 'Цены и этапы — до начала лечения' },
  { icon: MousePointerClick, title: 'Удобная онлайн-запись', text: 'Пара минут, без звонков' },
];

export function Hero() {
  const weekday = clinic.hours[0];
  return (
    <section className="relative overflow-hidden">
      <div className="grain pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" aria-hidden />
      <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-sea-100/60 blur-3xl" aria-hidden />
      <div className="container relative grid items-center gap-12 pb-16 pt-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-16 lg:pb-24 lg:pt-12">
        <div>
          <p className="eyebrow mb-6 animate-fade-up">{clinic.tagline}</p>
          <h1 className="animate-fade-up text-[2.75rem] font-semibold leading-[1.02] text-ink-900 sm:text-6xl xl:text-7xl" style={{ animationDelay: '60ms' }}>
            Ваша улыбка <br className="hidden sm:block" />
            заслуживает <span className="accent">лучшего</span>
          </h1>
          <p className="mt-6 max-w-lg animate-fade-up text-lg leading-relaxed text-ink-500" style={{ animationDelay: '120ms' }}>
            Современная стоматология, внимательные специалисты и комфортный подход к каждому пациенту.
          </p>
          <div className="mt-9 flex animate-fade-up flex-col gap-3 sm:flex-row" style={{ animationDelay: '180ms' }}>
            <ButtonLink to="/booking" size="lg" icon={<CalendarCheck className="h-5 w-5" aria-hidden />}>
              Записаться на приём
            </ButtonLink>
            <ButtonLink to="/doctors" size="lg" variant="outline">
              Наши специалисты <ArrowRight className="h-4 w-4" aria-hidden />
            </ButtonLink>
          </div>

          <ul className="mt-12 grid animate-fade-up grid-cols-2 gap-x-6 gap-y-6 border-t border-cream-300 pt-8" style={{ animationDelay: '260ms' }}>
            {perks.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cream-50 text-sea-600 shadow-soft ring-1 ring-cream-300">
                  <Icon className="h-[18px] w-[18px]" aria-hidden />
                </span>
                <span>
                  <span className="block text-sm font-semibold leading-snug text-ink-900">{title}</span>
                  <span className="mt-0.5 hidden text-xs leading-relaxed text-ink-400 sm:block">{text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative animate-fade-in lg:pl-4" style={{ animationDelay: '150ms' }}>
          <div className="relative mx-auto max-w-[520px]">
            <div className="absolute -inset-3 rotate-[-2.5deg] rounded-[40px] border border-cream-300 bg-cream-200/50" aria-hidden />
            <SmartImage
              name="hero"
              alt="Врач показывает пациенту снимок на мониторе в кабинете"
              loading="eager"
              wrapperClassName="relative aspect-[4/5] rounded-[36px] shadow-lift"
            />
            <div className="absolute -left-4 bottom-10 w-60 animate-fade-up rounded-3xl border border-white/60 bg-cream-50/90 p-4 shadow-lift backdrop-blur-md sm:-left-10" style={{ animationDelay: '500ms' }}>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ink-900 text-cream-50">
                  <CalendarCheck className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink-900">Онлайн-запись</p>
                  <p className="text-xs text-ink-400">услуга → врач → время</p>
                </div>
              </div>
              <div className="mt-3 flex gap-1" aria-hidden>
                {Array.from({ length: 7 }).map((_, i) => (
                  <span key={i} className={`h-1 flex-1 rounded-full ${i < 5 ? 'bg-sea-400' : 'bg-cream-300'}`} />
                ))}
              </div>
            </div>
            <div className="absolute -right-3 top-8 animate-fade-up rounded-2xl border border-white/60 bg-cream-50/90 px-4 py-3 shadow-lift backdrop-blur-md sm:-right-8" style={{ animationDelay: '650ms' }}>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">{weekday.label}</p>
              <p className="text-lg font-semibold tabular-nums text-ink-900">{weekday.open}–{weekday.close}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
