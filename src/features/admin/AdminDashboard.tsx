import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, ChevronRight, Database, Inbox, RotateCcw, SearchX } from 'lucide-react';
import type { Appointment, AppointmentStatus } from '@/types';
import { useAppointments } from '@/hooks/useAppointments';
import { clearAppointments, deleteAppointment, replaceAppointments, StorageError, updateAppointmentStatus } from '@/lib/storage';
import { serviceById } from '@/data/services';
import { doctorById } from '@/data/doctors';
import { formatDateShort } from '@/lib/format';
import { cn } from '@/lib/cn';
import { Badge } from '@/components/ui/Badge';
import { Button, buttonClass } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { EmptyState } from '@/components/ui/EmptyState';
import { Modal } from '@/components/ui/Modal';
import { SearchInput } from '@/components/ui/SearchInput';
import { useToast } from '@/components/ui/Toast';
import { AppointmentDetails } from './AppointmentDetails';
import { buildSeed } from './seed';
import { statusMeta, statusOrder } from './status';

type Confirm = { kind: 'delete'; id: string } | { kind: 'reset' } | null;

export function AdminDashboard() {
  const list = useAppointments();
  const { notify } = useToast();
  const [q, setQ] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState<AppointmentStatus | 'all'>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<Confirm>(null);

  const counts = useMemo(() => {
    const c: Record<AppointmentStatus, number> = { new: 0, confirmed: 0, completed: 0, cancelled: 0 };
    list.forEach((a) => c[a.status]++);
    return c;
  }, [list]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return list
      .filter((a) => (!term || a.patientName.toLowerCase().includes(term)) && (!date || a.date === date) && (status === 'all' || a.status === status))
      .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));
  }, [list, q, date, status]);

  const selected = list.find((a) => a.id === selectedId) ?? null;
  const hasFilters = !!q || !!date || status !== 'all';

  const run = (fn: () => void, ok: string) => {
    try {
      fn();
      notify({ tone: 'success', title: ok });
    } catch (e) {
      notify({ tone: 'error', title: 'Действие не выполнено', text: e instanceof StorageError ? e.message : undefined });
    }
  };

  const onConfirm = () => {
    if (!confirm) return;
    if (confirm.kind === 'delete') {
      run(() => deleteAppointment(confirm.id), 'Запись удалена');
      setSelectedId(null);
    } else {
      run(clearAppointments, 'Демо-данные сброшены');
      setSelectedId(null);
    }
    setConfirm(null);
  };

  return (
    <div className="space-y-8">
      {/* Счётчики */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <StatCard label="Всего записей" value={list.length} active={status === 'all'} onClick={() => setStatus('all')} dark />
        {statusOrder.map((s) => (
          <StatCard key={s} label={statusMeta[s].label} value={counts[s]} dot={statusMeta[s].dot} active={status === s} onClick={() => setStatus(status === s ? 'all' : s)} />
        ))}
      </div>

      {/* Панель фильтров */}
      <div className="card flex flex-col gap-3 p-4 lg:flex-row lg:items-center">
        <SearchInput value={q} onChange={setQ} placeholder="Поиск по имени пациента" label="Поиск по имени" className="lg:flex-1" />
        <div className="grid grid-cols-2 gap-3 lg:flex">
          <label className="relative">
            <span className="sr-only">Фильтр по дате</span>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-12 w-full rounded-full border border-cream-300 bg-cream-50 px-4 text-sm text-ink-800 focus:border-sea-500 focus:outline-none focus:ring-4 focus:ring-sea-100 lg:w-44" />
          </label>
          <label>
            <span className="sr-only">Фильтр по статусу</span>
            <select value={status} onChange={(e) => setStatus(e.target.value as AppointmentStatus | 'all')} className="h-12 w-full rounded-full border border-cream-300 bg-cream-50 px-4 text-sm text-ink-800 focus:border-sea-500 focus:outline-none focus:ring-4 focus:ring-sea-100 lg:w-52">
              <option value="all">Все статусы</option>
              {statusOrder.map((s) => (
                <option key={s} value={s}>{statusMeta[s].label}</option>
              ))}
            </select>
          </label>
        </div>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={() => { setQ(''); setDate(''); setStatus('all'); }}>
            Сбросить
          </Button>
        )}
      </div>

      {/* Список */}
      {list.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="Записей пока нет"
          text="Пройдите сценарий онлайн-записи или заполните панель тестовыми данными, чтобы увидеть, как она работает."
          action={
            <div className="flex flex-col gap-2 sm:flex-row">
              <Link to="/booking" className={buttonClass('primary')}>Создать запись</Link>
              <Button variant="outline" icon={<Database className="h-4 w-4" aria-hidden />} onClick={() => run(() => replaceAppointments(buildSeed()), 'Добавлены тестовые записи')}>
                Заполнить примерами
              </Button>
            </div>
          }
        />
      ) : filtered.length === 0 ? (
        <EmptyState icon={SearchX} title="Нет записей по фильтру" text="Измените условия поиска." action={<Button variant="outline" onClick={() => { setQ(''); setDate(''); setStatus('all'); }}>Сбросить фильтры</Button>} />
      ) : (
        <div className="card overflow-hidden">
          <div className="hidden grid-cols-[1.2fr_1.4fr_1.1fr_.9fr_1fr_24px] gap-4 border-b border-cream-300 bg-cream-100 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-ink-400 md:grid">
            <span>Пациент</span><span>Услуга</span><span>Врач</span><span>Дата</span><span>Статус</span><span />
          </div>
          <ul className="divide-y divide-cream-300/70">
            {filtered.map((a) => (
              <Row key={a.id} a={a} onOpen={() => setSelectedId(a.id)} />
            ))}
          </ul>
          <p className="border-t border-cream-300 px-6 py-3 text-xs text-ink-400" aria-live="polite">Показано {filtered.length} из {list.length}</p>
        </div>
      )}

      {list.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-dashed border-cream-400 p-5">
          <p className="text-sm text-ink-500">Демо-данные хранятся только в этом браузере.</p>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" icon={<Database className="h-4 w-4" aria-hidden />} onClick={() => run(() => replaceAppointments([...list.filter((a) => !a.id.startsWith('DM-SEED')), ...buildSeed()]), 'Тестовые записи обновлены')}>
              Добавить примеры
            </Button>
            <Button variant="outline" size="sm" className="text-rose-600 hover:border-rose-500" icon={<RotateCcw className="h-4 w-4" aria-hidden />} onClick={() => setConfirm({ kind: 'reset' })}>
              Сбросить демо-данные
            </Button>
          </div>
        </div>
      )}

      <Modal open={!!selected} onClose={() => setSelectedId(null)} title={selected ? `Запись: ${selected.patientName}` : 'Запись'} size="md">
        {selected && (
          <AppointmentDetails
            appointment={selected}
            onStatus={(s) => run(() => updateAppointmentStatus(selected.id, s), `Статус: ${statusMeta[s].label}`)}
            onDelete={() => setConfirm({ kind: 'delete', id: selected.id })}
          />
        )}
      </Modal>

      <ConfirmDialog
        open={!!confirm}
        danger
        title={confirm?.kind === 'reset' ? 'Сбросить все демо-данные?' : 'Удалить запись?'}
        text={confirm?.kind === 'reset' ? 'Все демонстрационные записи будут удалены из этого браузера. Действие нельзя отменить.' : 'Демонстрационная запись будет удалена без возможности восстановления.'}
        confirmLabel={confirm?.kind === 'reset' ? 'Сбросить' : 'Удалить'}
        onConfirm={onConfirm}
        onCancel={() => setConfirm(null)}
      />
    </div>
  );
}

function StatCard({ label, value, dot, active, onClick, dark }: { label: string; value: number; dot?: string; active: boolean; onClick: () => void; dark?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'rounded-3xl border p-5 text-left transition',
        dark ? 'border-ink-900 bg-ink-900 text-cream-50' : 'border-cream-300 bg-cream-50 hover:border-ink-300',
        active && !dark && 'border-ink-900 shadow-[0_0_0_1px_theme(colors.ink.900)]',
        active && dark && 'ring-4 ring-ink-900/15',
      )}
    >
      <span className={cn('flex items-center gap-2 text-xs font-medium', dark ? 'text-ink-300' : 'text-ink-400')}>
        {dot && <span className={cn('h-2 w-2 rounded-full', dot)} aria-hidden />}
        {label}
      </span>
      <span className="mt-3 block text-3xl font-semibold tabular-nums">{value}</span>
    </button>
  );
}

function Row({ a, onOpen }: { a: Appointment; onOpen: () => void }) {
  const s = serviceById(a.serviceId);
  const d = doctorById(a.doctorId);
  const m = statusMeta[a.status];
  return (
    <li>
      <button type="button" onClick={onOpen} className="grid w-full grid-cols-[1fr_auto] gap-x-4 gap-y-1 px-6 py-4 text-left transition hover:bg-cream-100 md:grid-cols-[1.2fr_1.4fr_1.1fr_.9fr_1fr_24px] md:items-center">
        <span className="min-w-0">
          <span className="block truncate font-semibold text-ink-900">{a.patientName}</span>
          <span className="block font-mono text-xs text-ink-400">{a.id}</span>
        </span>
        <span className="justify-self-end md:hidden"><Badge tone={m.tone}>{m.label}</Badge></span>
        <span className="truncate text-sm text-ink-700">{s?.title ?? '—'}</span>
        <span className="hidden truncate text-sm text-ink-500 md:block">{d?.name ?? 'Любой'}</span>
        <span className="flex items-center gap-1.5 text-sm text-ink-500 md:text-ink-700">
          <CalendarDays className="h-3.5 w-3.5 md:hidden" aria-hidden />
          {formatDateShort(a.date)}, {a.time}
        </span>
        <span className="hidden md:block"><Badge tone={m.tone}>{m.label}</Badge></span>
        <ChevronRight className="hidden h-4 w-4 text-ink-300 md:block" aria-hidden />
      </button>
    </li>
  );
}
