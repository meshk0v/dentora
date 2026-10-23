import { Link } from 'react-router-dom';
import { CalendarPlus, CheckCircle2, LayoutDashboard, RotateCcw } from 'lucide-react';
import type { Appointment } from '@/types';
import { serviceById } from '@/data/services';
import { doctorById } from '@/data/doctors';
import { clinic } from '@/data/clinic';
import { formatDateLong } from '@/lib/format';
import { Button, buttonClass } from '@/components/ui/Button';
import { DemoNotice } from '@/components/ui/DemoNotice';
import { downloadIcs } from '../ics';

export function SuccessStep({ appointment, onRestart }: { appointment: Appointment; onRestart: () => void }) {
  const s = serviceById(appointment.serviceId);
  const d = doctorById(appointment.doctorId);
  return (
    <div className="text-center">
      <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-sea-200 opacity-40 [animation-iteration-count:2]" aria-hidden />
        <span className="relative flex h-20 w-20 animate-scale-in items-center justify-center rounded-full bg-sea-500 text-white">
          <CheckCircle2 className="h-10 w-10" aria-hidden />
        </span>
      </div>
      <h2 className="text-3xl font-semibold text-ink-900">Демо-запись создана</h2>
      <p className="mx-auto mt-3 max-w-md text-ink-500">
        {appointment.patientName}, сценарий записи пройден. В реальной клинике администратор связался бы с вами для подтверждения.
      </p>

      <div className="mx-auto mt-8 max-w-md overflow-hidden rounded-3xl border border-cream-300 bg-cream-50 text-left">
        <div className="flex items-center justify-between bg-ink-900 px-6 py-4 text-cream-50">
          <span className="text-sm text-ink-300">Номер записи</span>
          <span className="font-mono text-sm font-semibold tracking-wider">{appointment.id}</span>
        </div>
        <dl className="space-y-3 px-6 py-5 text-sm">
          <Row label="Услуга" value={s?.title ?? '—'} />
          <Row label="Специалист" value={d?.name ?? 'Любой доступный'} />
          <Row label="Дата и время" value={`${formatDateLong(appointment.date)}, ${appointment.time}`} />
          <Row label="Адрес" value={`${clinic.city}, ${clinic.address}`} />
        </dl>
      </div>

      <DemoNotice className="mx-auto mt-6 max-w-md text-left">
        Запись сохранена только в localStorage этого браузера и <b>не передана в клинику</b>. Её можно посмотреть в демо-панели администратора.
      </DemoNotice>

      <div className="mt-8 flex flex-col justify-center gap-2 sm:flex-row sm:flex-wrap">
        <Button variant="outline" onClick={() => downloadIcs(appointment)} icon={<CalendarPlus className="h-4 w-4" aria-hidden />}>
          В календарь (.ics)
        </Button>
        <Link to="/admin" className={buttonClass('outline')}>
          <LayoutDashboard className="h-4 w-4" aria-hidden /> Открыть админ-панель
        </Link>
        <Button onClick={onRestart} icon={<RotateCcw className="h-4 w-4" aria-hidden />}>
          Новая запись
        </Button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-ink-400">{label}</dt>
      <dd className="text-right font-semibold text-ink-900 first-letter:uppercase">{value}</dd>
    </div>
  );
}
