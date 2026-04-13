import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useScrollOffSetTop } from 'src/hooks/use-scroll-offset-top';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  useScroll: () => ({
    scrollY: {
      on: vi.fn(),
      destroy: vi.fn(),
    },
  }),
  useMotionValueEvent: vi.fn((motionValue, event, handler) => {
    // Simulate scroll event
    if (event === 'change') {
      // Call handler immediately with test value
      setTimeout(() => handler(100), 0);
    }
  }),
}));

describe('useScrollOffSetTop', () => {
  it('initializes with offsetTop as false', () => {
    const { result } = renderHook(() => useScrollOffSetTop());

    expect(result.current.offsetTop).toBe(false);
    expect(result.current.elementRef).toBeDefined();
    expect(result.current.elementRef.current).toBeNull();
  });

  it('accepts custom top threshold', () => {
    const { result } = renderHook(() => useScrollOffSetTop(100));

    expect(result.current.elementRef).toBeDefined();
  });

  it('returns memoized value with elementRef and offsetTop', () => {
    const { result } = renderHook(() => useScrollOffSetTop(80));

    expect(result.current).toHaveProperty('elementRef');
    expect(result.current).toHaveProperty('offsetTop');
  });

  it('updates offsetTop based on scroll position', async () => {
    const { result } = renderHook(() => useScrollOffSetTop(50));

    // Wait for async scroll handler
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 10));
    });

    // After scroll event (scrollY > 50), offsetTop should be true
    expect(result.current.offsetTop).toBe(true);
  });

  it('handles element ref when provided', () => {
    const { result } = renderHook(() => useScrollOffSetTop(80));

    // Create a mock element
    const mockElement = document.createElement('div');

    act(() => {
      if (result.current.elementRef) {
        (result.current.elementRef as any).current = mockElement;
      }
    });

    expect(result.current.elementRef.current).toBe(mockElement);
  });

  it('returns stable reference when offsetTop does not change', () => {
    const { result, rerender } = renderHook(() => useScrollOffSetTop(80));

    const firstResult = result.current;

    rerender();

    const secondResult = result.current;

    // Memoized value should be the same if offsetTop hasn't changed
    expect(firstResult).toBe(secondResult);
  });
});
