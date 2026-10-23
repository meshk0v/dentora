import { Baby, Gem, ScanLine, ShieldPlus, Smile, Sparkles, Stethoscope, Crown, type LucideIcon } from 'lucide-react';
import type { ServiceCategoryId } from '@/types';

export const categoryIcons: Record<ServiceCategoryId, LucideIcon> = {
  therapy: Stethoscope,
  hygiene: Sparkles,
  orthodontics: Smile,
  implantology: ShieldPlus,
  prosthetics: Crown,
  pediatric: Baby,
  aesthetic: Gem,
  diagnostics: ScanLine,
};
