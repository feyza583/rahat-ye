import type { MealCategory, Severity, Symptom, TriggerTag } from '../types';

export const CATEGORY_OPTIONS: { value: MealCategory; label: string }[] = [
  { value: 'home', label: 'Evde Yapılmış' },
  { value: 'restaurant', label: 'Restoran' },
  { value: 'packaged', label: 'Paketli' },
];

export const TRIGGER_TAG_OPTIONS: { value: TriggerTag; label: string }[] = [
  { value: 'spicy', label: 'Acılı' },
  { value: 'dairy', label: 'Süt Ürünü' },
  { value: 'gluten', label: 'Gluten' },
  { value: 'fried', label: 'Kızartma' },
  { value: 'caffeine', label: 'Kafein' },
  { value: 'sweet', label: 'Tatlı' },
  { value: 'acidic', label: 'Asitli' },
];

export const SYMPTOM_OPTIONS: { value: Symptom; label: string }[] = [
  { value: 'bloating', label: 'Şişkinlik' },
  { value: 'reflux', label: 'Reflü' },
  { value: 'cramp', label: 'Mide Krampı' },
  { value: 'nausea', label: 'Bulantı' },
  { value: 'gas', label: 'Gaz' },
  { value: 'constipation', label: 'Bağırsak Düzensizliği' },
];

export const SEVERITY_LEVELS: Severity[] = [1, 2, 3, 4, 5];