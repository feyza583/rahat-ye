import { describe, expect, it } from '@jest/globals';
import { validateMealName } from '../validation';

describe('validateMealName', () => {
  it('boş yazı için hata mesajı döner', () => {
    expect(validateMealName('')).toBe('Yemek adı boş olamaz');
  });

  it('sadece boşluk için hata mesajı döner', () => {
    expect(validateMealName('   ')).toBe('Yemek adı boş olamaz');
  });

  it('geçerli yemek adı için null döner', () => {
    expect(validateMealName('Pilav')).toBeNull();
  });
});