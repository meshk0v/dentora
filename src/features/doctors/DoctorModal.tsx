import { CalendarCheck, CalendarDays } from 'lucide-react';
import type { Doctor } from '@/types';
import { categoryById, services } from '@/data/services';
import { Modal } from '@/components/ui/Modal';
import { SmartImage } from '@/components/ui/SmartImage';
import { ButtonLink } from '@/components/ui/Button';
import { Link } from 'react-router-dom';

const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export function DoctorModal({ doctor, onClose }: { doctor: Doctor | null; onClose: () => void }) {
  const related = doctor ? services.filter((s) => doctor.specialties.includes(s.category)).slice(0, 6) : [];
  return (
    <Modal open={!!doctor} onClose={onClose} title={doctor?.name ?? 'Профиль врача'} hideTitle size="xl" bodyClassName="p-0">
      {doctor && (
        <div className="grid md:grid-cols-[0.9fr_1.1fr]">
          <SmartImage name={doctor.photo} alt={`${doctor.name}, ${doctor.role}`} wrapperClassName="aspect-[4/3] md:aspect-auto md:h-full" loading="eager" />
          <div className="flex flex-col gap-6 p-6 sm:p-8">
            <div>
              <p className="eyebrow mb-3">{doctor.role}</p>
              <p className="text-3xl font-semibold text-ink-900 sm:text-4xl">{doctor.name}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {doctor.specialties.map((s) => (
                  <span key={s} className="rounded-full bg-sea-50 px-2.5 py-1 text-xs font-semibold text-sea-700">{categoryById[s].short}</span>
                ))}
              </div>
            </div>
            <p className="leading-relaxed text-ink-500">{doctor.bio}</p>
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-ink-400">Направления работы</h3>
              <ul className="grid gap-2 sm:grid-cols-2">
                {doctor.focus.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-ink-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-sea-500" aria-hidden /> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-ink-400">
                <CalendarDays className="h-4 w-4" aria-hidden /> Дни приёма
              </h3>
              <div className="flex gap-1.5">
                {weekdays.map((d, i) => {
                  const on = doctor.workDays.includes(i + 1);
                  return (
                    <span key={d} className={on ? 'flex h-9 w-9 items-center justify-center rounded-xl bg-ink-900 text-xs font-semibold text-cream-50' : 'flex h-9 w-9 items-center justify-center rounded-xl bg-cream-200 text-xs text-ink-300'}>
                      {d}
                    </span>
                  );
                })}
              </div>
            </div>
            {related.length > 0 && (
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-ink-400">Услуги</h3>
                <div className="flex flex-wrap gap-2">
                  {related.map((s) => (
                    <Link key={s.id} to={`/services/${s.id}`} onClick={onClose} className="rounded-full border border-cream-300 px-3 py-1.5 text-sm text-ink-700 transition hover:border-ink-900">
                      {s.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <ButtonLink to={`/booking?doctor=${doctor.id}`} size="lg" onClick={onClose} icon={<CalendarCheck className="h-5 w-5" aria-hidden />} data-autofocus>
              Записаться к специалисту
            </ButtonLink>
          </div>
        </div>
      )}
    </Modal>
  );
}
