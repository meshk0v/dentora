import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { PageHeader } from '@/components/layout/PageHeader';
import { DemoNotice } from '@/components/ui/DemoNotice';
import { DoctorCatalog } from '@/features/doctors/DoctorCatalog';

export default function DoctorsPage() {
  useDocumentTitle('Врачи');
  return (
    <>
      <PageHeader eyebrow="Специалисты" title={<>Врачи <span className="accent">DENTORA</span></>} text="Выберите специалиста по направлению, изучите профиль и запишитесь онлайн." crumbs={[{ label: 'Врачи' }]}>
        <DemoNotice className="max-w-2xl">Демонстрационные профили: имена вымышлены, фотографии стоковые. Стаж, квалификация, лицензии и достижения не указаны и должны быть добавлены реальной клиникой.</DemoNotice>
      </PageHeader>
      <div className="container py-12 lg:py-16">
        <DoctorCatalog />
      </div>
    </>
  );
}
