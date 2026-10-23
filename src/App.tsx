import { lazy, Suspense } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { AdminLayout } from '@/layouts/AdminLayout';
import { ToastProvider } from '@/components/ui/Toast';
import { ScrollToTopOnNavigate } from '@/components/layout/ScrollRestoration';
import { Skeleton } from '@/components/ui/Skeleton';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import HomePage from '@/pages/HomePage';

const ServicesPage = lazy(() => import('@/pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('@/pages/ServiceDetailPage'));
const DoctorsPage = lazy(() => import('@/pages/DoctorsPage'));
const BookingPage = lazy(() => import('@/pages/BookingPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ContactsPage = lazy(() => import('@/pages/ContactsPage'));
const FaqPage = lazy(() => import('@/pages/FaqPage'));
const AdminPage = lazy(() => import('@/pages/AdminPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

function PageFallback() {
  return (
    <div className="container space-y-6 py-14" aria-busy="true" aria-label="Загрузка страницы">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-12 w-2/3 max-w-xl" />
      <Skeleton className="h-5 w-1/2 max-w-md" />
      <div className="grid gap-5 pt-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-64 rounded-3xl" />)}
      </div>
    </div>
  );
}

/**
 * HashRouter: адреса вида /dentora/#/doctors. GitHub Pages всегда отдаёт index.html,
 * поэтому обновление любой вложенной страницы не приводит к 404.
 */
export default function App() {
  return (
    <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ToastProvider>
        <ScrollToTopOnNavigate />
        <ErrorBoundary>
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="services" element={<ServicesPage />} />
                <Route path="services/:id" element={<ServiceDetailPage />} />
                <Route path="doctors" element={<DoctorsPage />} />
                <Route path="booking" element={<BookingPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="contacts" element={<ContactsPage />} />
                <Route path="faq" element={<FaqPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
              <Route path="admin" element={<AdminLayout />}>
                <Route index element={<AdminPage />} />
              </Route>
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </ToastProvider>
    </HashRouter>
  );
}
