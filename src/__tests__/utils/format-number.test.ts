import { describe, it, expect } from 'vitest';
import { fNumber, fCurrency } from 'src/utils/format-number';

describe('Format Number Utilities', () => {
  describe('fNumber', () => {
    it('formats numbers with commas', () => {
      expect(fNumber(1000, {})).toBe('1,000');
    });

    it('formats decimal numbers', () => {
      expect(fNumber(1234.56, {})).toBe('1,234.56');
    });

    it('returns empty string for null', () => {
      expect(fNumber(null, {})).toBe('');
    });

    it('returns empty string for NaN', () => {
      expect(fNumber(NaN, {})).toBe('');
    });
  });

  describe('fCurrency', () => {
    it('formats currency with dollar sign', () => {
      const result = fCurrency(1000, {});
      expect(result).toContain('1,000');
      expect(result).toContain('$');
    });

    it('returns empty string for null', () => {
      expect(fCurrency(null, {})).toBe('');
    });
  });
});
