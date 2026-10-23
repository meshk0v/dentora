import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { AdminDashboard } from '@/features/admin/AdminDashboard';
import { ButtonLink } from '@/components/ui/Button';
import { Plus } from 'lucide-react';

export default function AdminPage() {
  useDocumentTitle('Админ-панель (демо)');
  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold sm:text-4xl">Записи пациентов</h1>
          <p className="mt-2 text-ink-500">Демонстрационные заявки, созданные через онлайн-запись в этом браузере.</p>
        </div>
        <ButtonLink to="/booking" icon={<Plus className="h-4 w-4" aria-hidden />}>Новая запись</ButtonLink>
      </div>
      <AdminDashboard />
    </>
  );
}
