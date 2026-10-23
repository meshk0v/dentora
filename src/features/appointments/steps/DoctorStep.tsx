import { Users } from 'lucide-react';
import { doctorsForService } from '@/lib/schedule';
import { SmartImage } from '@/components/ui/SmartImage';
import { OptionCard } from '../OptionCard';

interface Props {
  serviceId: string;
  value: string | 'any' | null;
  onChange: (id: string | 'any') => void;
}

export function DoctorStep({ serviceId, value, onChange }: Props) {
  const list = doctorsForService(serviceId);
  return (
    <div role="radiogroup" aria-label="Специалист" className="grid gap-3 sm:grid-cols-2">
      <OptionCard name="doctor" value="any" checked={value === 'any'} onSelect={() => onChange('any')} className="sm:col-span-2">
        <div className="flex w-full items-center gap-4 p-4 pr-10">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sea-50 text-sea-600">
            <Users className="h-6 w-6" aria-hidden />
          </span>
          <div>
            <p className="font-semibold text-ink-900">Любой доступный специалист</p>
            <p className="text-sm text-ink-400">Больше вариантов времени — врача подберёт клиника</p>
          </div>
        </div>
      </OptionCard>
      {list.map((d) => (
        <OptionCard key={d.id} name="doctor" value={d.id} checked={value === d.id} onSelect={() => onChange(d.id)}>
          <div className="flex w-full items-center gap-4 p-4 pr-10">
            <SmartImage name={d.photo} alt="" wrapperClassName="h-14 w-14 shrink-0 rounded-2xl" />
            <div className="min-w-0">
              <p className="font-semibold text-ink-900">{d.name}</p>
              <p className="text-sm text-ink-400">{d.role}</p>
            </div>
          </div>
        </OptionCard>
      ))}
    </div>
  );
}
