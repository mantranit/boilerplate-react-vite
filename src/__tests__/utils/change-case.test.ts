import { describe, it, expect } from 'vitest';
import { paramCase, snakeCase, sentenceCase } from 'src/utils/change-case';

describe('Change Case Utilities', () => {
  describe('paramCase', () => {
    it('converts string to param-case', () => {
      expect(paramCase('Hello World')).toBe('hello-world');
    });

    it('removes special characters', () => {
      expect(paramCase('Hello@World!')).toBe('helloworld');
    });

    it('handles multiple spaces', () => {
      expect(paramCase('Hello   World')).toBe('hello-world');
    });

    it('keeps numbers', () => {
      expect(paramCase('Test 123')).toBe('test-123');
    });

    it('handles already lowercase strings', () => {
      expect(paramCase('test')).toBe('test');
    });

    it('handles empty string', () => {
      expect(paramCase('')).toBe('');
    });
  });

  describe('snakeCase', () => {
    it('converts string to snake_case', () => {
      expect(snakeCase('Hello World')).toBe('hello_world');
    });

    it('removes special characters', () => {
      expect(snakeCase('Hello@World!')).toBe('helloworld');
    });

    it('handles multiple spaces', () => {
      expect(snakeCase('Hello   World')).toBe('hello_world');
    });

    it('keeps numbers', () => {
      expect(snakeCase('Test 123')).toBe('test_123');
    });

    it('handles already lowercase strings', () => {
      expect(snakeCase('test')).toBe('test');
    });

    it('handles empty string', () => {
      expect(snakeCase('')).toBe('');
    });
  });

  describe('sentenceCase', () => {
    it('capitalizes first letter', () => {
      expect(sentenceCase('hello world')).toBe('Hello world');
    });

    it('handles already capitalized string', () => {
      expect(sentenceCase('Hello World')).toBe('Hello World');
    });

    it('handles single character', () => {
      expect(sentenceCase('h')).toBe('H');
    });

    it('handles empty string', () => {
      expect(sentenceCase('')).toBe('');
    });

    it('handles numbers', () => {
      expect(sentenceCase('123 test')).toBe('123 test');
    });
  });
});
