import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { DemoNotice } from '@/components/ui/DemoNotice';
import { BookingWizard } from '@/features/appointments/BookingWizard';

export default function BookingPage() {
  useDocumentTitle('Онлайн-запись');
  return (
    <div className="container py-10 lg:py-14">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow mb-3">Онлайн-запись</p>
          <h1 className="text-4xl font-semibold sm:text-5xl">Запись на <span className="accent">приём</span></h1>
        </div>
        <DemoNotice className="lg:max-w-md">Демонстрационный сценарий: запись сохраняется только в вашем браузере и не передаётся в клинику.</DemoNotice>
      </div>
      <BookingWizard />
    </div>
  );
}
