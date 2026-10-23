import { CalendarDays, Clock, MessageSquare, Phone, Stethoscope, Trash2, User } from 'lucide-react';
import type { Appointment, AppointmentStatus } from '@/types';
import { serviceById, categoryById } from '@/data/services';
import { doctorById } from '@/data/doctors';
import { formatDateLong, formatDateTime, formatPrice } from '@/lib/format';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';
import { statusMeta, statusOrder } from './status';

interface Props {
  appointment: Appointment;
  onStatus: (s: AppointmentStatus) => void;
  onDelete: () => void;
}

export function AppointmentDetails({ appointment: a, onStatus, onDelete }: Props) {
  const s = serviceById(a.serviceId);
  const d = doctorById(a.doctorId);
  const rows = [
    { icon: User, label: 'Пациент (демо)', value: a.patientName },
    { icon: Phone, label: 'Телефон', value: a.phone },
    { icon: Stethoscope, label: 'Услуга', value: s ? `${s.title} · ${categoryById[s.category].short}` : 'Услуга удалена из каталога' },
    { icon: User, label: 'Врач', value: d ? `${d.name}, ${d.role.toLowerCase()}` : 'Любой доступный специалист' },
    { icon: CalendarDays, label: 'Дата', value: formatDateLong(a.date) },
    { icon: Clock, label: 'Время', value: a.time },
  ];
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-sm font-semibold text-ink-500">{a.id}</span>
        {s && <span className="text-sm font-semibold text-ink-900">{formatPrice(s.priceFrom, s.priceTo)}</span>}
      </div>
      <dl className="grid gap-4 sm:grid-cols-2">
        {rows.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex gap-3">
            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-ink-300" aria-hidden />
            <div>
              <dt className="text-xs text-ink-400">{label}</dt>
              <dd className="text-sm font-semibold text-ink-900 first-letter:uppercase">{value}</dd>
            </div>
          </div>
        ))}
      </dl>
      {a.comment && (
        <div className="flex gap-3 rounded-2xl bg-cream-200/60 p-4 text-sm text-ink-600">
          <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-ink-300" aria-hidden /> {a.comment}
        </div>
      )}
      <fieldset>
        <legend className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-400">Статус записи</legend>
        <div className="grid grid-cols-2 gap-2">
          {statusOrder.map((st) => {
            const m = statusMeta[st];
            const active = a.status === st;
            return (
              <button
                key={st}
                type="button"
                aria-pressed={active}
                onClick={() => !active && onStatus(st)}
                className={cn('flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition', active ? 'border-ink-900 bg-ink-900 text-cream-50' : 'border-cream-300 bg-cream-50 text-ink-700 hover:border-ink-300')}
              >
                <span className={cn('h-2 w-2 shrink-0 rounded-full', m.dot)} aria-hidden /> {m.label}
              </button>
            );
          })}
        </div>
      </fieldset>
      <div className="flex flex-col gap-3 border-t border-cream-300 pt-5 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
        <span>Создана {formatDateTime(a.createdAt)} · изменена {formatDateTime(a.updatedAt)}</span>
        <Button variant="ghost" size="sm" onClick={onDelete} className="text-rose-600 hover:bg-rose-50 hover:text-rose-700" icon={<Trash2 className="h-4 w-4" aria-hidden />}>
          Удалить
        </Button>
      </div>
    </div>
  );
}
