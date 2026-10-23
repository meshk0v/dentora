import { Armchair, ClipboardList, Microscope, ShieldCheck } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { SmartImage } from '@/components/ui/SmartImage';

const items = [
  { icon: Microscope, title: 'Цифровая диагностика', text: 'КТ, 3D-сканирование и снимки помогают врачу точнее спланировать лечение.' },
  { icon: ClipboardList, title: 'План до начала лечения', text: 'Вы заранее видите этапы и ориентировочную стоимость и можете обсудить варианты.' },
  { icon: ShieldCheck, title: 'Стерильность и протоколы', text: 'Обработка и стерилизация инструментов по установленным стандартам.' },
  { icon: Armchair, title: 'Комфортная атмосфера', text: 'Спокойные интерьеры и время приёма, забронированное именно для вас.' },
];

export function Advantages() {
  return (
    <section className="py-20 lg:py-28" aria-labelledby="adv-title">
      <div className="container">
        <SectionHeading eyebrow="Почему DENTORA" title={<span id="adv-title">Спокойствие на <span className="accent">каждом</span> этапе</span>} align="center" />
        <div className="grid gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="relative flex h-full min-h-[360px] flex-col justify-between overflow-hidden rounded-3xl bg-ink-900 p-8 text-cream-50 sm:p-10">
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sea-500/25 blur-3xl" aria-hidden />
              <p className="relative text-sm font-semibold uppercase tracking-[0.18em] text-sea-300">Наш принцип</p>
              <blockquote className="relative mt-8 font-serif text-3xl italic leading-snug sm:text-4xl">
                «Пациент должен понимать, что и зачем мы делаем, — до того, как сядет в кресло».
              </blockquote>
            </div>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {items.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 70}>
                <div className="card h-full p-6 sm:p-7">
                  <Icon className="h-6 w-6 text-sea-500" aria-hidden />
                  <h3 className="mt-5 text-lg font-semibold text-ink-900">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="lg:col-span-12">
            <SmartImage name="interior-1" alt="Светлый лечебный кабинет клиники" wrapperClassName="aspect-[16/7] rounded-3xl sm:aspect-[16/5]" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
