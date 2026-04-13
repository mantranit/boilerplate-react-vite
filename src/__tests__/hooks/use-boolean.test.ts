import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useBoolean } from 'src/hooks/use-boolean';

describe('useBoolean', () => {
  it('initializes with default value false', () => {
    const { result } = renderHook(() => useBoolean());
    expect(result.current.value).toBe(false);
  });

  it('initializes with custom value', () => {
    const { result } = renderHook(() => useBoolean(true));
    expect(result.current.value).toBe(true);
  });

  it('sets value to true with onTrue', () => {
    const { result } = renderHook(() => useBoolean(false));

    act(() => {
      result.current.onTrue();
    });

    expect(result.current.value).toBe(true);
  });

  it('sets value to false with onFalse', () => {
    const { result } = renderHook(() => useBoolean(true));

    act(() => {
      result.current.onFalse();
    });

    expect(result.current.value).toBe(false);
  });

  it('toggles value with onToggle', () => {
    const { result } = renderHook(() => useBoolean(false));

    act(() => {
      result.current.onToggle();
    });
    expect(result.current.value).toBe(true);

    act(() => {
      result.current.onToggle();
    });
    expect(result.current.value).toBe(false);
  });

  it('sets value directly with setValue', () => {
    const { result } = renderHook(() => useBoolean(false));

    act(() => {
      result.current.setValue(true);
    });
    expect(result.current.value).toBe(true);

    act(() => {
      result.current.setValue(false);
    });
    expect(result.current.value).toBe(false);
  });

  it('maintains stable function references', () => {
    const { result, rerender } = renderHook(() => useBoolean(false));

    const initialOnTrue = result.current.onTrue;
    const initialOnFalse = result.current.onFalse;
    const initialOnToggle = result.current.onToggle;

    rerender();

    expect(result.current.onTrue).toBe(initialOnTrue);
    expect(result.current.onFalse).toBe(initialOnFalse);
    expect(result.current.onToggle).toBe(initialOnToggle);
  });
});
