import { describe, expect, it } from '@jest/globals';
import { toggleInList } from '../list';

describe('toggleInList', () => {
  it('listede yoksa öğeyi ekler', () => {
    expect(toggleInList(['a'], 'b')).toEqual(['a', 'b']);
  });

  it('listede varsa öğeyi çıkarır', () => {
    expect(toggleInList(['a', 'b'], 'a')).toEqual(['b']);
  });

  it('orijinal listeyi değiştirmez', () => {
    const original = ['a'];
    toggleInList(original, 'b');
    expect(original).toEqual(['a']);
  });
});