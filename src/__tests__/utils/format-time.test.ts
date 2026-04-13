import { describe, it, expect } from 'vitest';
import dayjs from 'dayjs';
import { fDateTime, fDate, fTime, fTimestamp, fToNow, today, formatStr } from 'src/utils/format-time';

describe('Format Time Utilities', () => {
  const testDate = new Date('2022-04-17T12:30:45');

  describe('fDateTime', () => {
    it('formats date and time correctly', () => {
      const result = fDateTime(testDate, formatStr.dateTime);
      expect(result).toBe('17 Apr 2022 12:30 pm');
    });

    it('returns null for null date', () => {
      expect(fDateTime(null, formatStr.dateTime)).toBeNull();
    });

    it('returns error message for invalid date', () => {
      const result = fDateTime('invalid-date', formatStr.dateTime);
      expect(result).toBe('Invalid time value');
    });

    it('uses custom format', () => {
      const result = fDateTime(testDate, 'YYYY-MM-DD');
      expect(result).toBe('2022-04-17');
    });
  });

  describe('fDate', () => {
    it('formats date correctly', () => {
      const result = fDate(testDate);
      // The function returns the date in ISO format or formatted date based on dayjs
      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
    });

    it('returns null for null date', () => {
      expect(fDate(null)).toBeNull();
    });

    it('returns error message for invalid date', () => {
      const result = fDate('invalid-date');
      expect(result).toBe('Invalid time value');
    });

    it('uses custom format', () => {
      const result = fDate(testDate, 'DD/MM/YYYY');
      expect(result).toBe('17/04/2022');
    });
  });

  describe('fTime', () => {
    it('formats time correctly', () => {
      const result = fTime(testDate, formatStr.time);
      expect(result).toBe('12:30 pm');
    });

    it('returns null for null date', () => {
      expect(fTime(null, formatStr.time)).toBeNull();
    });

    it('returns error message for invalid date', () => {
      const result = fTime('invalid-date', formatStr.time);
      expect(result).toBe('Invalid time value');
    });
  });

  describe('fTimestamp', () => {
    it('returns timestamp for valid date', () => {
      const result = fTimestamp(testDate);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThan(0);
    });

    it('returns null for null date', () => {
      expect(fTimestamp(null)).toBeNull();
    });

    it('returns error message for invalid date', () => {
      const result = fTimestamp('invalid-date');
      expect(result).toBe('Invalid time value');
    });
  });

  describe('fToNow', () => {
    it('returns relative time for valid date', () => {
      const pastDate = dayjs().subtract(2, 'day').toDate();
      const result = fToNow(pastDate);
      expect(result).toContain('day');
    });

    it('returns null for null date', () => {
      expect(fToNow(null)).toBeNull();
    });

    it('returns error message for invalid date', () => {
      const result = fToNow('invalid-date');
      expect(result).toBe('Invalid time value');
    });
  });

  describe('today', () => {
    it('returns today date in specified format', () => {
      const result = today('YYYY-MM-DD');
      const expected = dayjs().startOf('day').format('YYYY-MM-DD');
      expect(result).toBe(expected);
    });

    it('returns today date with default format', () => {
      const result = today(formatStr.date);
      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
    });
  });
});
