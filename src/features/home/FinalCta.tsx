import { CalendarCheck, Phone } from 'lucide-react';
import { clinic } from '@/data/clinic';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { SmartImage } from '@/components/ui/SmartImage';

export function FinalCta() {
  return (
    <section className="pb-20 lg:pb-28">
      <div className="container">
        <Reveal>
          <div className="relative overflow-hidden rounded-[36px] bg-sea-700 text-cream-50">
            <SmartImage name="interior-2" alt="" wrapperClassName="absolute inset-0 bg-sea-700" className="opacity-25 mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-r from-sea-800 via-sea-800/85 to-sea-700/40" aria-hidden />
            <div className="relative grid gap-8 p-8 sm:p-12 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:p-16">
              <div>
                <h2 className="text-3xl font-semibold leading-[1.1] sm:text-5xl">
                  Начните с <span className="font-serif font-medium italic text-sea-200">консультации</span>
                </h2>
                <p className="mt-4 max-w-lg text-lg text-sea-100">Выберите удобное время онлайн — это займёт пару минут. Врач осмотрит, ответит на вопросы и предложит варианты.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch xl:flex-row">
                <ButtonLink to="/booking?service=first-consultation" size="lg" variant="light" icon={<CalendarCheck className="h-5 w-5" aria-hidden />}>
                  Записаться на приём
                </ButtonLink>
                <a href={clinic.phoneHref} className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-cream-50/30 px-7 font-semibold text-cream-50 transition hover:bg-cream-50/10">
                  <Phone className="h-4 w-4" aria-hidden /> Позвонить
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
