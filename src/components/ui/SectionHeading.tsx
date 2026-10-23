import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Reveal } from './Reveal';

interface Props {
  eyebrow: string;
  title: ReactNode;
  text?: ReactNode;
  action?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({ eyebrow, title, text, action, align = 'left', className }: Props) {
  return (
    <Reveal className={cn('mb-10 flex flex-col gap-6 md:mb-14', align === 'center' ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between', className)}>
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
        <p className="eyebrow mb-4">{eyebrow}</p>
        <h2 className="text-3xl font-semibold leading-[1.1] text-ink-900 sm:text-4xl lg:text-5xl">{title}</h2>
        {text && <p className="mt-4 text-base leading-relaxed text-ink-500 sm:text-lg">{text}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  );
}
