import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Send } from 'lucide-react';
import type { Appointment, BookingDraft } from '@/types';
import { serviceById } from '@/data/services';
import { doctorById } from '@/data/doctors';
import { createAppointment, StorageError } from '@/lib/storage';
import { doctorsForService } from '@/lib/schedule';
import { validateName, validatePhone } from '@/lib/validation';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { StepIndicator, STEP_LABELS } from './StepIndicator';
import { BookingSummary } from './BookingSummary';
import { ServiceStep } from './steps/ServiceStep';
import { DoctorStep } from './steps/DoctorStep';
import { DateStep } from './steps/DateStep';
import { TimeStep } from './steps/TimeStep';
import { ContactStep, type ContactErrors } from './steps/ContactStep';
import { ReviewStep } from './steps/ReviewStep';
import { SuccessStep } from './steps/SuccessStep';

const STEP_TEXT = [
  'Выберите услугу — стоимость и длительность указаны ориентировочно.',
  'Выберите врача или доверьте выбор клинике.',
  'Доступные даты построены по демонстрационному графику.',
  'Выберите удобный интервал.',
  'Оставьте имя и телефон — больше ничего не нужно.',
  'Проверьте данные перед созданием демо-записи.',
  '',
];

const empty: BookingDraft = { serviceId: null, doctorId: null, date: null, time: null, patientName: '', phone: '', comment: '' };

export function BookingWizard() {
  const [params] = useSearchParams();
  const { notify } = useToast();
  const presetService = serviceById(params.get('service'))?.id ?? null;
  const presetDoctor = doctorById(params.get('doctor'))?.id ?? null;

  const [draft, setDraft] = useState<BookingDraft>(() => {
    const s = presetService;
    const d = presetDoctor && (!s || doctorsForService(s).some((x) => x.id === presetDoctor)) ? presetDoctor : null;
    return { ...empty, serviceId: s, doctorId: d };
  });
  // Если услуга передана ссылкой, начинаем сразу со второго шага
  const [step, setStep] = useState(() => (presetService ? (draft.doctorId ? 2 : 1) : 0));
  const [errors, setErrors] = useState<ContactErrors>({});
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Appointment | null>(null);
  const submitLock = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const top = topRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  const patch = (p: Partial<BookingDraft>) => setDraft((d) => ({ ...d, ...p }));

  const selectService = (id: string) =>
    setDraft((d) => {
      const keepDoctor = d.doctorId === 'any' || (d.doctorId && doctorsForService(id).some((x) => x.id === d.doctorId));
      return { ...d, serviceId: id, doctorId: keepDoctor ? d.doctorId : null, date: null, time: null };
    });
  const selectDoctor = (id: string | 'any') => patch({ doctorId: id, date: null, time: null });
  const selectDate = (iso: string) => patch({ date: iso, time: null });

  const validateContacts = () => {
    const e = { patientName: validateName(draft.patientName), phone: validatePhone(draft.phone) };
    setErrors(e);
    return !e.patientName && !e.phone;
  };

  const canNext = [!!draft.serviceId, !!draft.doctorId, !!draft.date, !!draft.time, true, true][step] ?? false;
  const blockedHint = ['Выберите услугу', 'Выберите специалиста', 'Выберите дату', 'Выберите время'][step];

  const next = () => {
    if (step === 4 && !validateContacts()) {
      notify({ tone: 'error', title: 'Проверьте контактные данные' });
      return;
    }
    if (step === 5) return submit();
    setStep((s) => Math.min(s + 1, 5));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = () => {
    if (submitLock.current) return;
    if (!consent) {
      setConsentError(true);
      return;
    }
    if (!draft.serviceId || !draft.doctorId || !draft.date || !draft.time || !validateContacts()) {
      notify({ tone: 'error', title: 'Не все данные заполнены', text: 'Вернитесь к нужному шагу и проверьте выбор.' });
      return;
    }
    submitLock.current = true;
    setSubmitting(true);
    try {
      const appt = createAppointment({
        serviceId: draft.serviceId,
        doctorId: draft.doctorId === 'any' ? null : draft.doctorId,
        date: draft.date,
        time: draft.time,
        patientName: draft.patientName.trim(),
        phone: draft.phone,
        comment: draft.comment.trim() || undefined,
      });
      setResult(appt);
      setStep(6);
      notify({ tone: 'success', title: 'Демо-запись сохранена', text: 'Данные остались в вашем браузере и не переданы в клинику.' });
    } catch (err) {
      submitLock.current = false;
      notify({ tone: 'error', title: 'Не удалось сохранить запись', text: err instanceof StorageError ? err.message : 'Произошла непредвиденная ошибка.' });
    } finally {
      setSubmitting(false);
    }
  };

  const restart = () => {
    setDraft(empty);
    setErrors({});
    setConsent(false);
    setConsentError(false);
    setResult(null);
    submitLock.current = false;
    setStep(0);
  };

  const isDone = step === 6 && result;

  return (
    <div ref={topRef} className="scroll-mt-24">
      <div className="mb-8">
        <StepIndicator current={step} />
      </div>
      <div className={isDone ? '' : 'grid gap-6 lg:grid-cols-[1fr_340px] lg:items-start'}>
        <section className="card min-w-0 p-5 sm:p-8" aria-labelledby="booking-step-title">
          {isDone ? (
            <SuccessStep appointment={result} onRestart={restart} />
          ) : (
            <>
              <header className="mb-6">
                <p className="text-sm font-medium text-sea-600">Шаг {step + 1} из {STEP_LABELS.length}</p>
                <h2 id="booking-step-title" ref={headingRef} tabIndex={-1} className="mt-1 text-2xl font-semibold text-ink-900 focus:outline-none sm:text-3xl">
                  {['Какая услуга вас интересует?', 'К кому записаться?', 'Выберите дату', 'Выберите время', 'Как к вам обращаться?', 'Проверьте запись'][step]}
                </h2>
                <p className="mt-2 text-sm text-ink-500">{STEP_TEXT[step]}</p>
              </header>

              <div key={step} className="animate-fade-up">
                {step === 0 && <ServiceStep value={draft.serviceId} presetDoctorId={draft.doctorId !== 'any' ? draft.doctorId : null} onChange={selectService} />}
                {step === 1 && draft.serviceId && <DoctorStep serviceId={draft.serviceId} value={draft.doctorId} onChange={selectDoctor} />}
                {step === 2 && draft.serviceId && draft.doctorId && <DateStep serviceId={draft.serviceId} doctorId={draft.doctorId} value={draft.date} onChange={selectDate} />}
                {step === 3 && draft.serviceId && draft.doctorId && draft.date && (
                  <TimeStep serviceId={draft.serviceId} doctorId={draft.doctorId} date={draft.date} value={draft.time} onChange={(t) => patch({ time: t })} />
                )}
                {step === 4 && (
                  <ContactStep
                    name={draft.patientName}
                    phone={draft.phone}
                    comment={draft.comment}
                    errors={errors}
                    onChange={(p) => {
                      patch(p);
                      if (p.patientName !== undefined && errors.patientName) setErrors((e) => ({ ...e, patientName: validateName(p.patientName!) }));
                      if (p.phone !== undefined && errors.phone) setErrors((e) => ({ ...e, phone: validatePhone(p.phone!) }));
                    }}
                    onBlur={(f) => {
                      const v = f === 'patientName' ? validateName(draft.patientName) : draft.phone && draft.phone !== '+7' ? validatePhone(draft.phone) : null;
                      setErrors((e) => ({ ...e, [f]: v }));
                    }}
                  />
                )}
                {step === 5 && (
                  <ReviewStep
                    draft={draft}
                    onEdit={setStep}
                    consent={consent}
                    onConsent={(v) => {
                      setConsent(v);
                      if (v) setConsentError(false);
                    }}
                    consentError={consentError}
                  />
                )}
              </div>

              <div className="sticky bottom-0 -mx-5 mt-8 flex items-center justify-between gap-3 border-t border-cream-300 bg-cream-50/95 px-5 py-4 backdrop-blur sm:static sm:mx-0 sm:bg-transparent sm:px-0 sm:pb-0 sm:backdrop-blur-none">
                <Button variant="ghost" onClick={back} disabled={step === 0 || submitting} icon={<ArrowLeft className="h-4 w-4" aria-hidden />}>
                  Назад
                </Button>
                <div className="flex items-center gap-3">
                  {!canNext && blockedHint && <span className="hidden text-sm text-ink-400 sm:inline">{blockedHint}</span>}
                  <Button
                    onClick={next}
                    disabled={!canNext}
                    loading={submitting}
                    variant={step === 5 ? 'accent' : 'primary'}
                    size="md"
                    className="min-w-[140px] whitespace-nowrap"
                    icon={step === 5 ? <Send className="h-4 w-4" aria-hidden /> : undefined}
                  >
                    {step === 5 ? (
                      submitting ? (
                        'Сохраняем…'
                      ) : (
                        <>
                          <span className="sm:hidden">Записаться</span>
                          <span className="hidden sm:inline">Создать демо-запись</span>
                        </>
                      )
                    ) : (
                      'Далее'
                    )}
                    {step < 5 && <ArrowRight className="h-4 w-4" aria-hidden />}
                  </Button>
                </div>
              </div>
            </>
          )}
        </section>
        {!isDone && (
          <aside className="hidden lg:sticky lg:top-24 lg:block">
            <BookingSummary draft={draft} />
          </aside>
        )}
      </div>
    </div>
  );
}
