import { useState } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { PageHeader } from '@/components/layout/PageHeader';
import { ServiceCatalog } from '@/features/services/ServiceCatalog';
import { PriceTable } from '@/features/services/PriceTable';
import { cn } from '@/lib/cn';

export default function ServicesPage() {
  useDocumentTitle('Услуги и цены');
  const [view, setView] = useState<'cards' | 'prices'>('cards');
  return (
    <>
      <PageHeader eyebrow="Услуги и цены" title={<>Понятные услуги и <span className="accent">прозрачные</span> цены</>} text="Найдите нужное направление, изучите этапы и запишитесь на консультацию." crumbs={[{ label: 'Услуги и цены' }]}>
        <p className="max-w-2xl text-sm text-ink-400">Цены указаны ориентировочно. Итоговую стоимость определяет врач после осмотра.</p>
      </PageHeader>
      <div className="container py-12 lg:py-16">
        <div className="mb-6 flex justify-end">
          <div className="inline-flex rounded-full border border-cream-300 bg-cream-50 p-1" role="group" aria-label="Вид">
            {[
              { id: 'cards' as const, label: 'Каталог', icon: LayoutGrid },
              { id: 'prices' as const, label: 'Прайс-лист', icon: List },
            ].map(({ id, label, icon: Icon }) => (
              <button key={id} type="button" aria-pressed={view === id} onClick={() => setView(id)} className={cn('flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition', view === id ? 'bg-ink-900 text-cream-50' : 'text-ink-500 hover:text-ink-900')}>
                <Icon className="h-4 w-4" aria-hidden /> {label}
              </button>
            ))}
          </div>
        </div>
        {view === 'cards' ? <ServiceCatalog /> : <PriceTable />}
      </div>
    </>
  );
}
