import { Component, type ErrorInfo, type ReactNode } from 'react';
import { RotateCcw } from 'lucide-react';

const RELOAD_FLAG = 'dentora.chunk-reload';

/** Файлы страниц не загрузились — обычно вкладка открыта со старой версией сайта после обновления. */
function isChunkError(error: Error) {
  return /dynamically imported module|Importing a module script failed|Loading chunk|error loading dynamically/i.test(error.message);
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack);
    if (isChunkError(error)) {
      try {
        // Перезагружаем, чтобы получить новую версию, но не чаще раза в 10 секунд — иначе возможен цикл
        const last = Number(sessionStorage.getItem(RELOAD_FLAG) ?? 0);
        if (Date.now() - last > 10_000) {
          sessionStorage.setItem(RELOAD_FLAG, String(Date.now()));
          window.location.reload();
        }
      } catch {
        /* sessionStorage недоступен — просто показываем экран ошибки */
      }
    }
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-cream-100 px-6 text-center">
        <h1 className="text-2xl font-semibold text-ink-900">Не удалось загрузить страницу</h1>
        <p className="mt-3 max-w-sm text-ink-500">Возможно, сайт обновился. Перезагрузите страницу.</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-ink-900 px-6 text-sm font-semibold text-cream-50"
        >
          <RotateCcw className="h-4 w-4" aria-hidden /> Перезагрузить
        </button>
      </div>
    );
  }
}
