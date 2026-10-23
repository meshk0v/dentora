import { ShieldAlert } from 'lucide-react';
import { Input, Textarea } from '@/components/ui/Field';
import { formatPhone } from '@/lib/phone';

export interface ContactErrors {
  patientName?: string | null;
  phone?: string | null;
}

interface Props {
  name: string;
  phone: string;
  comment: string;
  errors: ContactErrors;
  onChange: (patch: { patientName?: string; phone?: string; comment?: string }) => void;
  onBlur: (field: 'patientName' | 'phone') => void;
}

export function ContactStep({ name, phone, comment, errors, onChange, onBlur }: Props) {
  return (
    <div className="space-y-5">
      <div className="flex items-start gap-3 rounded-2xl bg-cream-200/60 p-4 text-sm text-ink-600">
        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-ink-400" aria-hidden />
        Это демо: данные сохраняются только в вашем браузере. Можно ввести вымышленные имя и номер. Не указывайте медицинские сведения.
      </div>
      <Input
        label="Имя"
        name="name"
        autoComplete="given-name"
        value={name}
        maxLength={60}
        placeholder="Например, Алексей"
        onChange={(e) => onChange({ patientName: e.target.value })}
        onBlur={() => onBlur('patientName')}
        error={errors.patientName}
        data-autofocus
      />
      <Input
        label="Телефон"
        name="tel"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        value={phone}
        placeholder="+7 (900) 000-00-00"
        onFocus={() => !phone && onChange({ phone: '+7' })}
        onChange={(e) => onChange({ phone: formatPhone(e.target.value) })}
        onBlur={() => onBlur('phone')}
        error={errors.phone}
        hint="Формат: +7 и 10 цифр"
      />
      <Textarea
        label="Комментарий (необязательно)"
        value={comment}
        maxLength={300}
        placeholder="Удобный способ связи, пожелания по визиту"
        onChange={(e) => onChange({ comment: e.target.value })}
        hint={`${comment.length}/300`}
      />
    </div>
  );
}
