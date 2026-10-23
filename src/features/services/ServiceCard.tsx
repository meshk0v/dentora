import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';
import type { Service } from '@/types';
import { categoryById } from '@/data/services';
import { formatDuration, formatPrice } from '@/lib/format';
import { categoryIcons } from './categoryIcons';

export function ServiceCard({ service }: { service: Service }) {
  const Icon = categoryIcons[service.category];
  return (
    <article className="group relative flex h-full flex-col rounded-3xl border border-cream-300/80 bg-cream-50 p-6 transition duration-300 hover:-translate-y-1 hover:border-sea-200 hover:shadow-lift">
      <div className="mb-6 flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sea-50 text-sea-600 transition group-hover:bg-sea-500 group-hover:text-white">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <span className="text-xs font-medium text-ink-400">{categoryById[service.category].short}</span>
      </div>
      <h3 className="text-xl font-semibold text-ink-900">
        <Link to={`/services/${service.id}`} className="after:absolute after:inset-0 after:rounded-3xl focus:outline-none focus-visible:after:ring-2 focus-visible:after:ring-sea-500">
          {service.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{service.summary}</p>
      <div className="mt-6 flex items-end justify-between gap-4 border-t border-cream-300/80 pt-4">
        <div>
          <p className="text-base font-semibold text-ink-900">{formatPrice(service.priceFrom, service.priceTo)}</p>
          {service.durationMin && (
            <p className="mt-0.5 flex items-center gap-1 text-xs text-ink-400">
              <Clock className="h-3 w-3" aria-hidden /> {formatDuration(service.durationMin)}
            </p>
          )}
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-300 text-ink-700 transition group-hover:border-ink-900 group-hover:bg-ink-900 group-hover:text-cream-50" aria-hidden>
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </article>
  );
}
