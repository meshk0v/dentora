import { Link } from 'react-router-dom';
import { categories, services } from '@/data/services';
import { formatDuration, formatPrice } from '@/lib/format';
import { categoryIcons } from './categoryIcons';

export function PriceTable() {
  return (
    <div className="space-y-6">
      {categories.map((c) => {
        const list = services.filter((s) => s.category === c.id);
        if (!list.length) return null;
        const Icon = categoryIcons[c.id];
        return (
          <section key={c.id} aria-labelledby={`price-${c.id}`} className="card overflow-hidden">
            <h3 id={`price-${c.id}`} className="flex items-center gap-3 border-b border-cream-300/80 px-6 py-4 text-base font-semibold">
              <Icon className="h-4 w-4 text-sea-500" aria-hidden /> {c.title}
            </h3>
            <ul className="divide-y divide-cream-300/70">
              {list.map((s) => (
                <li key={s.id}>
                  <Link to={`/services/${s.id}`} className="flex flex-col gap-1 px-6 py-4 transition hover:bg-cream-100 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                    <span className="font-medium text-ink-800">{s.title}</span>
                    <span className="flex items-center gap-4 text-sm">
                      {s.durationMin && <span className="text-ink-400">{formatDuration(s.durationMin)}</span>}
                      <span className="font-semibold tabular-nums text-ink-900">{formatPrice(s.priceFrom, s.priceTo)}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
