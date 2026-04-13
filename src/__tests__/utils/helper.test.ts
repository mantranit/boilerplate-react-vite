import { describe, it, expect } from 'vitest';
import { flattenArray, flattenDeep, orderBy } from 'src/utils/helper';

describe('Helper Utilities', () => {
  describe('flattenArray', () => {
    it('flattens nested array structure', () => {
      const data = [
        { id: 1, name: 'Item 1', children: [{ id: 2, name: 'Item 2' }] },
        { id: 3, name: 'Item 3' },
      ];

      const result = flattenArray(data);
      expect(result).toHaveLength(3);
      expect(result.map((item: any) => item.id)).toEqual([1, 3, 2]);
    });

    it('handles deeply nested structures', () => {
      const data = [
        {
          id: 1,
          children: [
            { id: 2, children: [{ id: 3 }] },
          ],
        },
      ];

      const result = flattenArray(data);
      expect(result).toHaveLength(3);
    });

    it('handles array without children', () => {
      const data = [{ id: 1 }, { id: 2 }];
      const result = flattenArray(data);
      expect(result).toHaveLength(2);
    });

    it('handles empty array', () => {
      const result = flattenArray([]);
      expect(result).toHaveLength(0);
    });

    it('uses custom key for children', () => {
      const data = [
        { id: 1, items: [{ id: 2 }] },
      ];

      const result = flattenArray(data, 'items');
      expect(result).toHaveLength(2);
    });
  });

  describe('flattenDeep', () => {
    it('flattens deeply nested arrays', () => {
      const nested = [1, [2, [3, [4, 5]]]];
      const result = flattenDeep(nested);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('handles already flat array', () => {
      const flat = [1, 2, 3];
      const result = flattenDeep(flat);
      expect(result).toEqual([1, 2, 3]);
    });

    it('handles empty array', () => {
      const result = flattenDeep([]);
      expect(result).toEqual([]);
    });

    it('returns empty array for non-array input', () => {
      const result = flattenDeep(null as any);
      expect(result).toEqual([]);
    });

    it('flattens mixed arrays', () => {
      const mixed = [1, [2, 3], [4, [5, 6]]];
      const result = flattenDeep(mixed);
      expect(result).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  describe('orderBy', () => {
    const data = [
      { name: 'Charlie', age: 30 },
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 35 },
    ];

    it('sorts by single property ascending', () => {
      const result = orderBy(data, ['name'], ['asc']);
      expect(result[0].name).toBe('Alice');
      expect(result[1].name).toBe('Bob');
      expect(result[2].name).toBe('Charlie');
    });

    it('sorts by single property descending', () => {
      const result = orderBy(data, ['age'], ['desc']);
      expect(result[0].age).toBe(35);
      expect(result[1].age).toBe(30);
      expect(result[2].age).toBe(25);
    });

    it('sorts by multiple properties', () => {
      const multiData = [
        { category: 'A', value: 2 },
        { category: 'B', value: 1 },
        { category: 'A', value: 1 },
      ];

      const result = orderBy(multiData, ['category', 'value'], ['asc', 'asc']);
      expect(result[0]).toEqual({ category: 'A', value: 1 });
      expect(result[1]).toEqual({ category: 'A', value: 2 });
      expect(result[2]).toEqual({ category: 'B', value: 1 });
    });

    it('handles empty array', () => {
      const result = orderBy([], ['name'], ['asc']);
      expect(result).toEqual([]);
    });

    it('does not mutate original array', () => {
      const original = [...data];
      orderBy(data, ['name'], ['asc']);
      expect(data).toEqual(original);
    });
  });
});
