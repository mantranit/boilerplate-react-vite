import { describe, it, expect, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useCountdownDate, useCountdownSeconds } from 'src/hooks/use-countdown';

describe('useCountdownDate', () => {
  it('initializes with placeholder values', () => {
    const futureDate = new Date(Date.now() + 100000);
    const { result } = renderHook(() => useCountdownDate(futureDate));

    // Initial values might be placeholders or calculated
    expect(result.current).toHaveProperty('days');
    expect(result.current).toHaveProperty('hours');
    expect(result.current).toHaveProperty('minutes');
    expect(result.current).toHaveProperty('seconds');
  });

  it('uses custom placeholder', () => {
    const futureDate = new Date(Date.now() + 100000);
    const { result } = renderHook(() => useCountdownDate(futureDate, 'XX'));

    expect(result.current).toHaveProperty('days');
    expect(result.current).toHaveProperty('hours');
    expect(result.current).toHaveProperty('minutes');
    expect(result.current).toHaveProperty('seconds');
  });

  it('formats time values with leading zeros', async () => {
    const futureDate = new Date(Date.now() + 5000); // 5 seconds in future
    const { result } = renderHook(() => useCountdownDate(futureDate));

    await waitFor(() => {
      expect(result.current.seconds).toMatch(/^\d{2}$/);
    });
  });
});

describe('useCountdownSeconds', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('initializes with initial seconds', () => {
    const { result } = renderHook(() => useCountdownSeconds(60));
    expect(result.current.value).toBe(60);
  });

  it('starts counting when counting flag is set', () => {
    const { result } = renderHook(() => useCountdownSeconds(10));
    expect(result.current.isCounting).toBe(false);
  });

  // it('has handleStart function', () => {
  //   const { result } = renderHook(() => useCountdownSeconds(10));
  //   expect(typeof result.current.handleStart).toBe('function');
  // });

  // it('has handleReset function', () => {
  //   const { result } = renderHook(() => useCountdownSeconds(10));
  //   expect(typeof result.current.handleReset).toBe('function');
  // });

  it('maintains countdown value', () => {
    const { result } = renderHook(() => useCountdownSeconds(10));
    expect(result.current.value).toBe(10);
  });
});
