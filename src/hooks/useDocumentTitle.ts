import { useEffect } from 'react';
import { clinic } from '@/data/clinic';

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${clinic.name}` : `${clinic.name} — ${clinic.tagline}`;
  }, [title]);
}
