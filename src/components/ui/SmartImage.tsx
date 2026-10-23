import { useState, type ImgHTMLAttributes } from 'react';
import { ImageOff } from 'lucide-react';
import { img } from '@/lib/assets';
import { cn } from '@/lib/cn';

interface Props extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  /** Имя файла из public/images без расширения */
  name: string;
  wrapperClassName?: string;
}

/** Изображение с плейсхолдером на время загрузки и аккуратным fallback при ошибке. */
export function SmartImage({ name, alt, className, wrapperClassName, loading = 'lazy', ...rest }: Props) {
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  return (
    <div className={cn(!/\b(absolute|fixed)\b/.test(wrapperClassName ?? '') && 'relative', 'overflow-hidden bg-cream-200', wrapperClassName)}>
      {state === 'loading' && (
        <div className="absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-cream-50/60 to-transparent" />
        </div>
      )}
      {state === 'error' ? (
        <div className="grain flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-cream-200 to-sea-50 text-ink-300" role="img" aria-label={alt}>
          <ImageOff className="h-6 w-6" aria-hidden />
          <span className="text-xs">Изображение недоступно</span>
        </div>
      ) : (
        <img
          src={img(name)}
          alt={alt}
          loading={loading}
          decoding="async"
          onLoad={() => setState('ready')}
          onError={() => setState('error')}
          className={cn('h-full w-full object-cover transition-opacity duration-500', state === 'ready' ? 'opacity-100' : 'opacity-0', className)}
          {...rest}
        />
      )}
    </div>
  );
}
