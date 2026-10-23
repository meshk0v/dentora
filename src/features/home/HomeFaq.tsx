import { ArrowRight } from 'lucide-react';
import { faq } from '@/data/faq';
import { Accordion } from '@/components/ui/Accordion';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';

export function HomeFaq() {
  return (
    <section className="bg-cream-200/50 py-20 lg:py-28" aria-labelledby="faq-title">
      <div className="container grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow mb-4">Вопросы</p>
          <h2 id="faq-title" className="text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-5xl">
            Отвечаем <span className="accent">заранее</span>
          </h2>
          <p className="mt-4 text-lg text-ink-500">Самое важное о записи, лечении и оплате.</p>
          <ButtonLink to="/faq" variant="outline" className="mt-8">
            Все вопросы <ArrowRight className="h-4 w-4" aria-hidden />
          </ButtonLink>
        </Reveal>
        <Reveal delay={100}>
          <Accordion items={faq.filter((f) => f.group !== 'О сайте').slice(0, 5)} />
        </Reveal>
      </div>
    </section>
  );
}
