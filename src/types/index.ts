export type MealCategory = 'home' | 'restaurant' | 'packaged';
export type TriggerTag =
  | 'spicy'
  | 'dairy'
  | 'gluten'
  | 'fried'
  | 'caffeine'
  | 'sweet'
  | 'acidic'
export type Symptom =
  | 'bloating'
  | 'reflux'
  | 'cramp'
  | 'nausea'
  | 'gas'
  | 'constipation';
export type SyncStatus = 'pending' | 'synced' | 'failed';
export type Severity = 1 | 2 | 3 | 4 | 5;

export interface LogEntry {
  id: string;
  mealName: string;
  category: MealCategory;
  triggerTags: TriggerTag[];
  severity: Severity;
  symptoms: Symptom[];
  createdAt: string;
  syncStatus: SyncStatus;
}