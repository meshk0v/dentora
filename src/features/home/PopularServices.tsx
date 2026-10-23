import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categories, services } from '@/data/services';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { SmartImage } from '@/components/ui/SmartImage';
import { ServiceCard } from '@/features/services/ServiceCard';
import { categoryIcons } from '@/features/services/categoryIcons';
import { formatPrice } from '@/lib/format';

export function PopularServices() {
  const popular = services.filter((s) => s.popular);
  const [featured, ...rest] = popular;
  return (
    <section className="py-20 lg:py-28" aria-labelledby="services-title">
      <div className="container">
        <SectionHeading
          eyebrow="Популярные услуги"
          title={<span id="services-title">Всё для здоровья <span className="accent">и красоты</span> улыбки</span>}
          text="Подробные описания, этапы визита и ориентировочные цены — ещё до первого приёма."
          action={<ButtonLink to="/services" variant="outline">Все услуги и цены <ArrowRight className="h-4 w-4" aria-hidden /></ButtonLink>}
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {featured && (
            <Reveal className="lg:row-span-2">
              <Link to={`/services/${featured.id}`} className="group relative flex h-full min-h-[420px] flex-col justify-end overflow-hidden rounded-3xl bg-ink-900 p-8 text-cream-50">
                <SmartImage name={featured.image ?? 'procedure'} alt="" wrapperClassName="absolute inset-0" className="opacity-60 transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-transparent" aria-hidden />
                <div className="relative">
                  <span className="rounded-full bg-cream-50/15 px-3 py-1 text-xs font-semibold backdrop-blur">Часто выбирают</span>
                  <h3 className="mt-4 text-3xl font-semibold">{featured.title}</h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-200">{featured.summary}</p>
                  <p className="mt-6 flex items-center justify-between border-t border-white/15 pt-4">
                    <span className="font-semibold">{formatPrice(featured.priceFrom, featured.priceTo)}</span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream-50 text-ink-900 transition group-hover:bg-sea-300"><ArrowRight className="h-4 w-4" aria-hidden /></span>
                  </p>
                </div>
              </Link>
            </Reveal>
          )}
          {rest.slice(0, 4).map((s, i) => (
            <Reveal key={s.id} delay={i * 70}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <div className="scrollbar-none -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
            {categories.map((c) => {
              const Icon = categoryIcons[c.id];
              return (
                <Link key={c.id} to={`/services?category=${c.id}`} className="flex shrink-0 items-center gap-2 rounded-full border border-cream-300 bg-cream-50 px-4 py-2.5 text-sm font-medium text-ink-600 transition hover:border-ink-900 hover:text-ink-900">
                  <Icon className="h-4 w-4 text-sea-500" aria-hidden /> {c.title}
                </Link>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
