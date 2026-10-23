import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContactsBlock } from '@/features/home/ContactsBlock';
import { FinalCta } from '@/features/home/FinalCta';

export default function ContactsPage() {
  useDocumentTitle('Контакты');
  return (
    <>
      <PageHeader eyebrow="Контакты" title={<>Будем рады <span className="accent">видеть вас</span></>} crumbs={[{ label: 'Контакты' }]} />
      <div className="-mt-8 lg:-mt-12">
        <ContactsBlock />
      </div>
      <FinalCta />
    </>
  );
}
