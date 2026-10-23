import { CalendarCheck, ClipboardCheck, MessagesSquare, ScanFace } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

const steps = [
  { icon: CalendarCheck, title: 'Запись', text: 'Онлайн или по телефону. Выбираете услугу, врача и удобное время.' },
  { icon: MessagesSquare, title: 'Знакомство', text: 'Врач выслушивает жалобы и пожелания, отвечает на вопросы.' },
  { icon: ScanFace, title: 'Диагностика', text: 'Осмотр и, при необходимости, снимки или 3D-сканирование.' },
  { icon: ClipboardCheck, title: 'План лечения', text: 'Обсуждаете варианты, этапы и ориентировочную стоимость.' },
];

export function FirstVisit() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-20 text-cream-50 lg:py-28" aria-labelledby="visit-title">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-sea-400/50 to-transparent" aria-hidden />
      <div className="container">
        <Reveal className="mb-14 max-w-2xl">
          <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-sea-300">Первое посещение</p>
          <h2 id="visit-title" className="text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-5xl">
            Четыре шага <span className="font-serif font-medium italic text-sea-300">без неожиданностей</span>
          </h2>
        </Reveal>
        <ol className="grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 90} className="bg-ink-950 p-7 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="font-serif text-5xl italic text-white/15">0{i + 1}</span>
                <Icon className="h-6 w-6 text-sea-300" aria-hidden />
              </div>
              <h3 className="mt-10 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-300">{text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
