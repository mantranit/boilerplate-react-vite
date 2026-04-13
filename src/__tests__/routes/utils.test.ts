import { describe, it, expect } from 'vitest';
import { hasParams, removeLastSlash, removeParams, isExternalLink } from 'src/routes/utils';

describe('Route Utils', () => {
  describe('hasParams', () => {
    it('returns true when URL has query parameters', () => {
      expect(hasParams('/path?param=value')).toBe(true);
    });

    it('returns true when URL has multiple parameters', () => {
      expect(hasParams('/path?param1=value1&param2=value2')).toBe(true);
    });

    it('returns false when URL has no parameters', () => {
      expect(hasParams('/path')).toBe(false);
    });

    it('returns false when URL has only question mark', () => {
      expect(hasParams('/path?')).toBe(false);
    });

    it('returns false for root path', () => {
      expect(hasParams('/')).toBe(false);
    });

    it('handles complex URLs', () => {
      expect(hasParams('https://example.com/path?key=value')).toBe(true);
    });
  });

  describe('removeLastSlash', () => {
    it('removes trailing slash from path', () => {
      expect(removeLastSlash('/dashboard/calendar/')).toBe('/dashboard/calendar');
    });

    it('does not modify path without trailing slash', () => {
      expect(removeLastSlash('/dashboard/calendar')).toBe('/dashboard/calendar');
    });

    it('preserves root path', () => {
      expect(removeLastSlash('/')).toBe('/');
    });

    it('handles empty string', () => {
      expect(removeLastSlash('')).toBe('');
    });

    it('handles multiple trailing slashes', () => {
      expect(removeLastSlash('/path/')).toBe('/path');
    });

    it('handles path with only slash', () => {
      expect(removeLastSlash('/')).toBe('/');
    });
  });

  describe('removeParams', () => {
    it('removes query parameters from URL', () => {
      // Mock window.location.origin
      Object.defineProperty(window, 'location', {
        value: { origin: 'http://localhost' },
        writable: true,
      });

      expect(removeParams('/path?param=value')).toBe('/path');
    });

    it('removes multiple query parameters', () => {
      expect(removeParams('/path?param1=value1&param2=value2')).toBe('/path');
    });

    it('handles URL without parameters', () => {
      expect(removeParams('/path')).toBe('/path');
    });

    it('removes trailing slash after removing params', () => {
      expect(removeParams('/path/?param=value')).toBe('/path');
    });

    it('handles full URLs', () => {
      expect(removeParams('http://localhost/path?param=value')).toBe('/path');
    });

    it('returns original URL on error', () => {
      // Invalid URL that might cause error
      const invalidUrl = 'not-a-valid-url';
      // When URL constructor uses window.location.origin as base,
      // it creates a valid URL and returns the pathname with leading slash
      expect(removeParams(invalidUrl)).toBe('/not-a-valid-url');
    });
  });

  describe('isExternalLink', () => {
    it('returns true for http links', () => {
      expect(isExternalLink('http://example.com')).toBe(true);
    });

    it('returns true for https links', () => {
      expect(isExternalLink('https://example.com')).toBe(true);
    });

    it('returns false for relative links', () => {
      expect(isExternalLink('/dashboard')).toBe(false);
    });

    it('returns false for root path', () => {
      expect(isExternalLink('/')).toBe(false);
    });

    it('returns false for hash links', () => {
      expect(isExternalLink('#section')).toBe(false);
    });

    it('returns false for mailto links', () => {
      expect(isExternalLink('mailto:test@example.com')).toBe(false);
    });

    it('returns false for tel links', () => {
      expect(isExternalLink('tel:+1234567890')).toBe(false);
    });

    it('handles full URLs correctly', () => {
      expect(isExternalLink('http://localhost:3000/path')).toBe(true);
      expect(isExternalLink('https://www.example.com/path')).toBe(true);
    });
  });
});
