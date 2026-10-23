import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { UserSearch } from 'lucide-react';
import { doctors } from '@/data/doctors';
import { categories } from '@/data/services';
import type { Doctor, ServiceCategoryId } from '@/types';
import { Chip } from '@/components/ui/Chip';
import { SearchInput } from '@/components/ui/SearchInput';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { DoctorCard } from './DoctorCard';
import { DoctorModal } from './DoctorModal';

export function DoctorCatalog() {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState('');
  const [spec, setSpec] = useState<ServiceCategoryId | null>(null);
  const openId = params.get('profile');
  const open = doctors.find((d) => d.id === openId) ?? null;

  const setOpen = (d: Doctor | null) => {
    const next = new URLSearchParams(params);
    if (d) next.set('profile', d.id);
    else next.delete('profile');
    setParams(next, { replace: true });
  };

  const usedSpecs = useMemo(() => categories.filter((c) => doctors.some((d) => d.specialties.includes(c.id))), []);
  const filtered = doctors.filter((d) => (!spec || d.specialties.includes(spec)) && d.name.toLowerCase().includes(q.trim().toLowerCase()));

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center">
        <SearchInput value={q} onChange={setQ} placeholder="Поиск по имени" label="Поиск врача по имени" className="lg:w-72" />
        <div className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-wrap lg:px-0" role="group" aria-label="Специализация">
          <Chip active={!spec} onClick={() => setSpec(null)}>Все специалисты</Chip>
          {usedSpecs.map((c) => (
            <Chip key={c.id} active={spec === c.id} onClick={() => setSpec(spec === c.id ? null : c.id)}>{c.short}</Chip>
          ))}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">Найдено специалистов: {filtered.length}</p>
      {filtered.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((d, i) => (
            <div key={d.id} className="animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
              <DoctorCard doctor={d} onOpen={setOpen} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState icon={UserSearch} title="Специалисты не найдены" text="Измените имя в поиске или выберите другую специализацию." action={<Button variant="outline" onClick={() => { setQ(''); setSpec(null); }}>Сбросить фильтры</Button>} />
      )}
      <DoctorModal doctor={open} onClose={() => setOpen(null)} />
    </div>
  );
}
