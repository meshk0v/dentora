import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { ButtonLink } from '@/components/ui/Button';

export default function NotFoundPage() {
  useDocumentTitle('Страница не найдена');
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-serif text-8xl italic text-sea-300">404</p>
      <h1 className="mt-4 text-3xl font-semibold">Страница не найдена</h1>
      <p className="mt-3 max-w-md text-ink-500">Возможно, ссылка устарела. Вернитесь на главную или перейдите к записи.</p>
      <div className="mt-8 flex gap-3">
        <ButtonLink to="/" variant="outline">На главную</ButtonLink>
        <ButtonLink to="/booking">Записаться</ButtonLink>
      </div>
    </div>
  );
}
