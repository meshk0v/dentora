import { useMemo, useState } from 'react';
import { categories, services } from '@/data/services';
import { doctorById } from '@/data/doctors';
import { formatDuration, formatPrice } from '@/lib/format';
import { SearchInput } from '@/components/ui/SearchInput';
import { categoryIcons } from '@/features/services/categoryIcons';
import { OptionCard } from '../OptionCard';

interface Props {
  value: string | null;
  presetDoctorId: string | null;
  onChange: (id: string) => void;
}

export function ServiceStep({ value, presetDoctorId, onChange }: Props) {
  const [q, setQ] = useState('');
  const presetDoctor = doctorById(presetDoctorId);
  const [onlyDoctor, setOnlyDoctor] = useState(!!presetDoctor);

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return services.filter(
      (s) => (!term || s.title.toLowerCase().includes(term) || s.summary.toLowerCase().includes(term)) && (!onlyDoctor || !presetDoctor || presetDoctor.specialties.includes(s.category)),
    );
  }, [q, onlyDoctor, presetDoctor]);

  return (
    <div className="space-y-6">
      <SearchInput value={q} onChange={setQ} placeholder="Найти услугу" label="Поиск услуги" />
      {presetDoctor && (
        <label className="flex cursor-pointer items-center gap-3 text-sm text-ink-600">
          <input type="checkbox" checked={onlyDoctor} onChange={(e) => setOnlyDoctor(e.target.checked)} className="h-4 w-4 rounded accent-sea-600" />
          Показывать только услуги специалиста: <b className="text-ink-900">{presetDoctor.name}</b>
        </label>
      )}
      {list.length === 0 && <p className="rounded-2xl bg-cream-200/60 p-6 text-center text-sm text-ink-500">По запросу «{q}» услуг не найдено.</p>}
      <div role="radiogroup" aria-label="Услуга" className="space-y-6">
        {categories.map((c) => {
          const items = list.filter((s) => s.category === c.id);
          if (!items.length) return null;
          const Icon = categoryIcons[c.id];
          return (
            <fieldset key={c.id}>
              <legend className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-400">
                <Icon className="h-3.5 w-3.5" aria-hidden /> {c.title}
              </legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {items.map((s) => (
                  <OptionCard key={s.id} name="service" value={s.id} checked={value === s.id} onSelect={() => onChange(s.id)}>
                    <div className="w-full p-4 pr-10">
                      <p className="font-semibold text-ink-900">{s.title}</p>
                      <p className="mt-1 line-clamp-2 text-sm text-ink-400">{s.summary}</p>
                      <p className="mt-3 flex flex-wrap gap-x-3 text-sm">
                        <span className="font-semibold text-ink-800">{formatPrice(s.priceFrom, s.priceTo)}</span>
                        {s.durationMin && <span className="text-ink-400">{formatDuration(s.durationMin)}</span>}
                      </p>
                    </div>
                  </OptionCard>
                ))}
              </div>
            </fieldset>
          );
        })}
      </div>
    </div>
  );
}
