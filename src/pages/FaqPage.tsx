import { useState } from 'react';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { faq } from '@/data/faq';
import type { FaqItem } from '@/types';
import { PageHeader } from '@/components/layout/PageHeader';
import { Accordion } from '@/components/ui/Accordion';
import { Chip } from '@/components/ui/Chip';
import { ButtonLink } from '@/components/ui/Button';

const groups: FaqItem['group'][] = ['Запись', 'Лечение', 'Оплата', 'О сайте'];

export default function FaqPage() {
  useDocumentTitle('Частые вопросы');
  const [group, setGroup] = useState<FaqItem['group'] | null>(null);
  const items = group ? faq.filter((f) => f.group === group) : faq;
  return (
    <>
      <PageHeader eyebrow="FAQ" title={<>Частые <span className="accent">вопросы</span></>} text="Если не нашли ответ — позвоните в клинику или запишитесь на консультацию." crumbs={[{ label: 'Вопросы' }]} />
      <div className="container max-w-4xl py-12 lg:py-16">
        <div className="scrollbar-none -mx-4 mb-8 flex gap-2 overflow-x-auto px-4" role="group" aria-label="Темы вопросов">
          <Chip active={!group} onClick={() => setGroup(null)}>Все</Chip>
          {groups.map((g) => <Chip key={g} active={group === g} onClick={() => setGroup(g)}>{g}</Chip>)}
        </div>
        <Accordion key={group ?? 'all'} items={items} />
        <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl bg-cream-200/60 p-8 text-center">
          <p className="text-lg font-semibold">Остались вопросы?</p>
          <ButtonLink to="/booking?service=first-consultation">Записаться на консультацию</ButtonLink>
        </div>
      </div>
    </>
  );
}
