import { CalendarDays, Clock, Stethoscope, User, Wallet } from 'lucide-react';
import type { BookingDraft } from '@/types';
import { serviceById } from '@/data/services';
import { doctorById } from '@/data/doctors';
import { formatDateLong, formatDuration, formatPrice } from '@/lib/format';

export function BookingSummary({ draft }: { draft: BookingDraft }) {
  const service = serviceById(draft.serviceId);
  const doctor = draft.doctorId && draft.doctorId !== 'any' ? doctorById(draft.doctorId) : null;
  const rows = [
    { icon: Stethoscope, label: 'Услуга', value: service?.title },
    { icon: User, label: 'Специалист', value: draft.doctorId === 'any' ? 'Любой доступный' : doctor?.name },
    { icon: CalendarDays, label: 'Дата', value: draft.date ? formatDateLong(draft.date) : undefined },
    { icon: Clock, label: 'Время', value: draft.time ?? undefined },
  ];
  return (
    <div className="card p-6">
      <h2 className="mb-5 text-sm font-semibold uppercase tracking-wider text-ink-400">Ваша запись</h2>
      <dl className="space-y-4">
        {rows.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cream-200 text-ink-500">
              <Icon className="h-4 w-4" aria-hidden />
            </span>
            <div className="min-w-0">
              <dt className="text-xs text-ink-400">{label}</dt>
              <dd className={value ? 'text-sm font-semibold text-ink-900 first-letter:uppercase' : 'text-sm text-ink-300'}>{value ?? 'не выбрано'}</dd>
            </div>
          </div>
        ))}
      </dl>
      {service && (
        <div className="mt-5 flex items-center justify-between border-t border-cream-300 pt-4 text-sm">
          <span className="flex items-center gap-2 text-ink-400">
            <Wallet className="h-4 w-4" aria-hidden /> Демо-стоимость
          </span>
          <span className="text-right font-semibold text-ink-900">
            {formatPrice(service.priceFrom, service.priceTo)}
            {service.durationMin && <span className="block text-xs font-normal text-ink-400">{formatDuration(service.durationMin)}</span>}
          </span>
        </div>
      )}
    </div>
  );
}
