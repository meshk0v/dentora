import { CalendarCheck, Cpu, Eye, HeartHandshake, Leaf } from 'lucide-react';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { PageHeader } from '@/components/layout/PageHeader';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SmartImage } from '@/components/ui/SmartImage';
import { Gallery } from '@/features/home/Gallery';
import { FirstVisit } from '@/features/home/FirstVisit';

const values = [
  { icon: Eye, title: 'Прозрачность', text: 'План и ориентировочная стоимость — до начала лечения.' },
  { icon: HeartHandshake, title: 'Внимание', text: 'Время на вопросы и объяснения на каждом приёме.' },
  { icon: Cpu, title: 'Технологичность', text: 'Цифровая диагностика и планирование.' },
  { icon: Leaf, title: 'Комфорт', text: 'Спокойная атмосфера и бережный подход.' },
];

export default function AboutPage() {
  useDocumentTitle('О клинике');
  return (
    <>
      <PageHeader eyebrow="О клинике" title={<>Стоматология, где <span className="accent">всё понятно</span></>} text="DENTORA — современная частная клиника, где каждый этап лечения объясняют заранее." crumbs={[{ label: 'О клинике' }]} />
      <section className="container grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <Reveal>
          <SmartImage name="consultation" alt="Врач объясняет результаты диагностики" wrapperClassName="aspect-[5/4] rounded-[32px]" />
        </Reveal>
        <Reveal delay={100}>
          <h2 className="text-3xl font-semibold sm:text-4xl">Наш подход</h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-600">
            <p>Мы верим, что хорошая стоматология начинается с разговора. Врач выясняет, что беспокоит пациента, объясняет результаты диагностики и предлагает варианты — с понятными этапами и стоимостью.</p>
            <p>Решение о лечении принимается вместе: без давления и навязанных услуг.</p>
          </div>
        </Reveal>
      </section>
      <section className="container pb-16 lg:pb-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 70}>
              <div className="card h-full p-7">
                <Icon className="h-6 w-6 text-sea-500" aria-hidden />
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <FirstVisit />
      <Gallery />
      <div className="container pb-20 text-center">
        <ButtonLink to="/booking" size="lg" icon={<CalendarCheck className="h-5 w-5" aria-hidden />}>Записаться на приём</ButtonLink>
      </div>
    </>
  );
}
