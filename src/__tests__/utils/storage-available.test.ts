import { describe, it, expect, beforeEach, vi } from 'vitest';
import { localStorageAvailable, localStorageGetItem } from 'src/utils/storage-available';

describe('Storage Available Utilities', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('localStorageAvailable', () => {
    it('returns true when localStorage is available', () => {
      expect(localStorageAvailable()).toBe(true);
    });

    it('returns false when localStorage throws error', () => {
      const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
      setItemSpy.mockImplementation(() => {
        throw new Error('QuotaExceededError');
      });

      expect(localStorageAvailable()).toBe(false);

      setItemSpy.mockRestore();
    });
  });

  describe('localStorageGetItem', () => {
    it('gets item from localStorage', () => {
      localStorage.setItem('test-key', 'test-value');
      const result = localStorageGetItem('test-key');
      expect(result).toBe('test-value');
    });

    it('returns default value when item does not exist', () => {
      const result = localStorageGetItem('non-existent-key', 'default');
      expect(result).toBe('default');
    });

    it('returns empty string as default when not specified', () => {
      const result = localStorageGetItem('non-existent-key');
      expect(result).toBe('');
    });

    it('returns stored value instead of default when item exists', () => {
      localStorage.setItem('test-key', 'stored-value');
      const result = localStorageGetItem('test-key', 'default');
      expect(result).toBe('stored-value');
    });

    it('handles empty string values', () => {
      localStorage.setItem('test-key', '');
      const result = localStorageGetItem('test-key', 'default');
      expect(result).toBe('default');
    });
  });
});
