import type { ElementType, ReactNode } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { cn } from '@/lib/cn';

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
}

export function Reveal({ children, delay = 0, className, as: Tag = 'div' }: Props) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <Tag ref={ref} className={cn('reveal', visible && 'is-visible', className)} style={{ ['--delay' as string]: `${delay}ms` }}>
      {children}
    </Tag>
  );
}
