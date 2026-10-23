import { Pencil } from 'lucide-react';
import type { BookingDraft } from '@/types';
import { serviceById } from '@/data/services';
import { doctorById } from '@/data/doctors';
import { formatDateLong, formatDuration, formatPrice } from '@/lib/format';

interface Props {
  draft: BookingDraft;
  onEdit: (step: number) => void;
  consent: boolean;
  onConsent: (v: boolean) => void;
  consentError: boolean;
}

export function ReviewStep({ draft, onEdit, consent, onConsent, consentError }: Props) {
  const s = serviceById(draft.serviceId);
  const d = draft.doctorId && draft.doctorId !== 'any' ? doctorById(draft.doctorId) : null;
  const rows: { label: string; value: string; step: number }[] = [
    { label: 'Услуга', value: s ? `${s.title} · ${formatPrice(s.priceFrom, s.priceTo)}${s.durationMin ? ` · ${formatDuration(s.durationMin)}` : ''}` : '—', step: 0 },
    { label: 'Специалист', value: draft.doctorId === 'any' ? 'Любой доступный специалист' : d ? `${d.name}, ${d.role.toLowerCase()}` : '—', step: 1 },
    { label: 'Дата', value: draft.date ? formatDateLong(draft.date) : '—', step: 2 },
    { label: 'Время', value: draft.time ?? '—', step: 3 },
    { label: 'Имя', value: draft.patientName.trim(), step: 4 },
    { label: 'Телефон', value: draft.phone, step: 4 },
  ];
  if (draft.comment.trim()) rows.push({ label: 'Комментарий', value: draft.comment.trim(), step: 4 });

  return (
    <div className="space-y-6">
      <dl className="divide-y divide-cream-300 overflow-hidden rounded-2xl border border-cream-300">
        {rows.map((r) => (
          <div key={r.label} className="flex items-start justify-between gap-4 bg-cream-50 px-5 py-4">
            <div className="min-w-0">
              <dt className="text-xs text-ink-400">{r.label}</dt>
              <dd className="mt-0.5 break-words font-semibold text-ink-900 first-letter:uppercase">{r.value}</dd>
            </div>
            <button type="button" onClick={() => onEdit(r.step)} className="flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-sea-600 hover:bg-sea-50" aria-label={`Изменить: ${r.label}`}>
              <Pencil className="h-3 w-3" aria-hidden /> Изменить
            </button>
          </div>
        ))}
      </dl>
      <div>
        <label className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 text-sm leading-relaxed transition ${consentError ? 'border-rose-300 bg-rose-50/60' : 'border-amber-200 bg-amber-50/60'}`}>
          <input type="checkbox" checked={consent} onChange={(e) => onConsent(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-ink-900" aria-describedby={consentError ? 'consent-err' : undefined} />
          <span className="text-amber-950">
            Я понимаю, что это <b>демонстрационная запись</b>: она сохранится только в моём браузере и <b>не будет передана в клинику</b>. Стоимость указана для демонстрации.
          </span>
        </label>
        {consentError && <p id="consent-err" role="alert" className="mt-2 text-sm text-rose-600">Подтвердите, что понимаете демонстрационный характер записи</p>}
      </div>
    </div>
  );
}
