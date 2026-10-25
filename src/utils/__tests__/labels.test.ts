import { describe, expect, it } from '@jest/globals';
import { labelOf } from '../labels';

const options = [
  { value: 'a', label: 'Alfa' },
  { value: 'b', label: 'Beta' },
];

describe('labelOf', () => {
  it('değere karşılık gelen yazıyı döner', () => {
    expect(labelOf(options, 'a')).toBe('Alfa');
  });

  it('bilinmeyen değer için değerin kendisini döner', () => {
    expect(labelOf(options, 'z')).toBe('z');
  });
});