export function validateMealName(name: string): string | null {
  if (name.trim().length === 0) {
    return 'Yemek adı boş olamaz';
  }
  return null;
}