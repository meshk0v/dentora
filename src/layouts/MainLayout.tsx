import { Outlet } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingActions } from '@/components/layout/FloatingActions';

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus(); }} className="sr-only z-[90] rounded-full bg-ink-900 px-4 py-2 text-cream-50 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Перейти к содержимому
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 pb-20 focus:outline-none sm:pb-0">
        <Outlet />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
