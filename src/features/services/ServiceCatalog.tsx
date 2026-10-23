import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchX } from 'lucide-react';
import { categories, services } from '@/data/services';
import type { ServiceCategoryId } from '@/types';
import { Chip } from '@/components/ui/Chip';
import { SearchInput } from '@/components/ui/SearchInput';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { ServiceCard } from './ServiceCard';

export function ServiceCatalog() {
  const [params, setParams] = useSearchParams();
  // Поле поиска держим в локальном состоянии, чтобы не терять символы при быстром вводе;
  // в URL запрос попадает с небольшой задержкой — ссылкой на результаты можно поделиться
  const urlQ = params.get('q') ?? '';
  const [q, setQ] = useState(urlQ);
  const written = useRef(urlQ);
  const cat = (params.get('category') as ServiceCategoryId | null) ?? null;

  const update = (patch: Record<string, string | null>) => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        Object.entries(patch).forEach(([k, v]) => (v ? next.set(k, v) : next.delete(k)));
        return next;
      },
      { replace: true },
    );
  };

  useEffect(() => {
    if (q === written.current) return;
    const t = window.setTimeout(() => {
      written.current = q;
      update({ q: q || null });
    }, 300);
    return () => window.clearTimeout(t);
  }, [q]);

  // Запрос изменился извне (переход по ссылке «Услуги», назад/вперёд) — подхватываем его
  useEffect(() => {
    if (urlQ !== written.current) {
      written.current = urlQ;
      setQ(urlQ);
    }
  }, [urlQ]);

  const bySearch = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return services;
    return services.filter((s) => [s.title, s.summary, s.description].some((t) => t.toLowerCase().includes(term)));
  }, [q]);

  const filtered = cat ? bySearch.filter((s) => s.category === cat) : bySearch;

  return (
    <div>
      <div className="sticky top-[72px] z-30 -mx-4 mb-8 border-b border-cream-300/70 bg-cream-100/90 px-4 py-4 backdrop-blur-xl sm:mx-0 sm:rounded-3xl sm:border sm:px-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <SearchInput value={q} onChange={setQ} placeholder="Поиск: имплант, гигиена, виниры…" label="Поиск услуги" className="lg:w-80" />
          <div className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-wrap lg:px-0" role="group" aria-label="Категории">
            <Chip active={!cat} onClick={() => update({ category: null })} count={bySearch.length}>
              Все
            </Chip>
            {categories.map((c) => (
              <Chip key={c.id} active={cat === c.id} onClick={() => update({ category: cat === c.id ? null : c.id })} count={bySearch.filter((s) => s.category === c.id).length}>
                {c.short}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">Найдено услуг: {filtered.length}</p>

      {filtered.length ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((s, i) => (
            <div key={s.id} className="animate-fade-up" style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}>
              <ServiceCard service={s} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={SearchX}
          title="Ничего не найдено"
          text="Попробуйте изменить запрос или выбрать другую категорию."
          action={<Button variant="outline" onClick={() => { setQ(''); written.current = ''; update({ q: null, category: null }); }}>Сбросить фильтры</Button>}
        />
      )}
    </div>
  );
}
