import { Link, Outlet } from 'react-router-dom';
import { ArrowLeft, ShieldOff } from 'lucide-react';
import { LogoMark } from '@/components/ui/Logo';
import { clinic } from '@/data/clinic';

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-cream-100">
      <div className="bg-amber-100 text-amber-950">
        <div className="container flex items-center gap-2 py-2 text-xs sm:text-sm">
          <ShieldOff className="h-4 w-4 shrink-0" aria-hidden />
          <span><b>Прототип без серверной авторизации.</b> Данные хранятся в localStorage браузера и не защищены. Не вводите реальные медицинские сведения.</span>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-cream-300 bg-cream-50/90 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between gap-4">
          <Link to="/admin" className="flex items-center gap-3">
            <LogoMark className="h-8 w-8" />
            <span className="leading-tight">
              <span className="block text-sm font-extrabold tracking-[0.18em]">{clinic.logoText}</span>
              <span className="block text-xs text-ink-400">Панель управления · демо</span>
            </span>
          </Link>
          <Link to="/" className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-ink-500 hover:bg-cream-200 hover:text-ink-900">
            <ArrowLeft className="h-4 w-4" aria-hidden /> <span><span className="hidden sm:inline">Вернуться на </span>сайт</span>
          </Link>
        </div>
      </header>
      <main id="main" className="container py-8 lg:py-10">
        <Outlet />
      </main>
    </div>
  );
}
