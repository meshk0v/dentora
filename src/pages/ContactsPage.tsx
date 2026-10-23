import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { PageHeader } from '@/components/layout/PageHeader';
import { DemoNotice } from '@/components/ui/DemoNotice';
import { ContactsBlock } from '@/features/home/ContactsBlock';
import { FinalCta } from '@/features/home/FinalCta';

export default function ContactsPage() {
  useDocumentTitle('Контакты');
  return (
    <>
      <PageHeader eyebrow="Контакты" title={<>Будем рады <span className="accent">видеть вас</span></>} crumbs={[{ label: 'Контакты' }]}>
        <DemoNotice className="max-w-2xl">Адрес, телефон и почта — демонстрационные и не принадлежат реальной клинике.</DemoNotice>
      </PageHeader>
      <div className="-mt-8 lg:-mt-12">
        <ContactsBlock />
      </div>
      <FinalCta />
    </>
  );
}
