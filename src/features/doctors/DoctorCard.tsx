import { CalendarCheck } from 'lucide-react';
import type { Doctor } from '@/types';
import { SmartImage } from '@/components/ui/SmartImage';
import { Button, ButtonLink } from '@/components/ui/Button';

interface Props {
  doctor: Doctor;
  onOpen: (d: Doctor) => void;
}

export function DoctorCard({ doctor, onOpen }: Props) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-cream-300/80 bg-cream-50 transition duration-300 hover:shadow-lift">
      <button type="button" onClick={() => onOpen(doctor)} className="relative block aspect-[4/5] overflow-hidden text-left" aria-label={`Профиль: ${doctor.name}`}>
        <SmartImage name={doctor.photo} alt={`${doctor.name}, ${doctor.role}`} wrapperClassName="h-full w-full" className="transition duration-700 group-hover:scale-[1.04]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-950/60 to-transparent" aria-hidden />
        <div className="absolute inset-x-5 bottom-5 text-cream-50">
          <p className="text-sm font-medium text-sea-100">{doctor.role}</p>
          <h3 className="text-2xl font-semibold">{doctor.name}</h3>
        </div>
      </button>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm leading-relaxed text-ink-500">{doctor.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Направления работы">
          {doctor.focus.slice(0, 3).map((f) => (
            <li key={f} className="rounded-full bg-cream-200 px-2.5 py-1 text-xs font-medium text-ink-600">{f}</li>
          ))}
        </ul>
        <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
          <Button variant="outline" size="sm" onClick={() => onOpen(doctor)}>Подробнее</Button>
          <ButtonLink to={`/booking?doctor=${doctor.id}`} size="sm" icon={<CalendarCheck className="h-4 w-4" aria-hidden />}>Записаться</ButtonLink>
        </div>
      </div>
    </article>
  );
}
