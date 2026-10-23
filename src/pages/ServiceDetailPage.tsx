import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarCheck, Clock, Info, Wallet } from 'lucide-react';
import { categoryById, serviceById, services } from '@/data/services';
import { doctorsForService } from '@/lib/schedule';
import { formatDuration, formatPrice } from '@/lib/format';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { PageHeader } from '@/components/layout/PageHeader';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SmartImage } from '@/components/ui/SmartImage';
import { ServiceCard } from '@/features/services/ServiceCard';
import NotFoundPage from './NotFoundPage';

export default function ServiceDetailPage() {
  const { id } = useParams();
  const s = serviceById(id);
  useDocumentTitle(s?.title ?? 'Услуга не найдена');
  if (!s) return <NotFoundPage />;
  const cat = categoryById[s.category];
  const docs = doctorsForService(s.id);
  const related = services.filter((x) => x.category === s.category && x.id !== s.id).slice(0, 3);

  return (
    <>
      <PageHeader eyebrow={cat.title} title={s.title} text={s.summary} crumbs={[{ to: '/services', label: 'Услуги' }, { label: s.title }]} />
      <div className="container grid gap-10 py-12 lg:grid-cols-[1fr_380px] lg:py-16">
        <div className="space-y-12">
          {s.image && <SmartImage name={s.image} alt={s.title} wrapperClassName="aspect-[16/8] rounded-3xl" loading="eager" />}
          <Reveal>
            <h2 className="mb-4 text-2xl font-semibold">Об услуге</h2>
            <p className="text-lg leading-relaxed text-ink-600">{s.description}</p>
          </Reveal>
          <Reveal>
            <h2 className="mb-2 text-2xl font-semibold">Когда обращаются</h2>
            <p className="mb-5 flex items-center gap-2 text-sm text-ink-400"><Info className="h-4 w-4" aria-hidden /> Информационный перечень. Необходимость лечения определяет врач.</p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {s.indications.map((i) => (
                <li key={i} className="flex items-start gap-3 rounded-2xl border border-cream-300 bg-cream-50 p-4 text-ink-700">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sea-500" aria-hidden /> {i}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <h2 className="mb-6 text-2xl font-semibold">Этапы посещения</h2>
            <ol className="relative space-y-6 border-l border-cream-300 pl-8">
              {s.steps.map((st, i) => (
                <li key={st.title} className="relative">
                  <span className="absolute -left-[45px] flex h-8 w-8 items-center justify-center rounded-full border border-cream-300 bg-cream-50 text-xs font-bold text-ink-700">{i + 1}</span>
                  <h3 className="font-semibold text-ink-900">{st.title}</h3>
                  <p className="mt-1 text-ink-500">{st.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
          {docs.length > 0 && (
            <Reveal>
              <h2 className="mb-5 text-2xl font-semibold">Специалисты</h2>
              <div className="flex flex-wrap gap-3">
                {docs.map((d) => (
                  <Link key={d.id} to={`/doctors?profile=${d.id}`} className="flex items-center gap-3 rounded-full border border-cream-300 bg-cream-50 py-1.5 pl-1.5 pr-5 transition hover:border-ink-900">
                    <SmartImage name={d.photo} alt="" wrapperClassName="h-10 w-10 rounded-full" />
                    <span>
                      <span className="block text-sm font-semibold">{d.name}</span>
                      <span className="block text-xs text-ink-400">{d.role}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </Reveal>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card space-y-6 p-6 sm:p-8">
            <div>
              <p className="flex items-center gap-2 text-sm text-ink-400"><Wallet className="h-4 w-4" aria-hidden /> Стоимость</p>
              <p className="mt-1 text-3xl font-semibold text-ink-900">{formatPrice(s.priceFrom, s.priceTo)}</p>
            </div>
            {s.durationMin && (
              <div>
                <p className="flex items-center gap-2 text-sm text-ink-400"><Clock className="h-4 w-4" aria-hidden /> Длительность визита</p>
                <p className="mt-1 text-lg font-semibold text-ink-900">{formatDuration(s.durationMin)}</p>
              </div>
            )}
            <ButtonLink to={`/booking?service=${s.id}`} size="lg" className="w-full px-4 text-[15px]" icon={<CalendarCheck className="h-5 w-5" aria-hidden />}>
              Записаться на консультацию
            </ButtonLink>
            <p className="text-xs leading-relaxed text-ink-400">Стоимость и длительность ориентировочные и уточняются врачом после осмотра.</p>
          </div>
          <Link to="/services" className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-ink-500 hover:text-ink-900">
            <ArrowLeft className="h-4 w-4" aria-hidden /> Все услуги
          </Link>
        </aside>
      </div>
      {related.length > 0 && (
        <section className="border-t border-cream-300 bg-cream-200/40 py-16">
          <div className="container">
            <h2 className="mb-8 text-2xl font-semibold">Ещё в разделе «{cat.short}»</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => <ServiceCard key={r.id} service={r} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
