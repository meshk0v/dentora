import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { PageHeader } from '@/components/layout/PageHeader';
import { DoctorCatalog } from '@/features/doctors/DoctorCatalog';

export default function DoctorsPage() {
  useDocumentTitle('Врачи');
  return (
    <>
      <PageHeader eyebrow="Специалисты" title={<>Врачи <span className="accent">DENTORA</span></>} text="Выберите специалиста по направлению, изучите профиль и запишитесь онлайн." crumbs={[{ label: 'Врачи' }]} />
      <div className="container py-12 lg:py-16">
        <DoctorCatalog />
      </div>
    </>
  );
}
