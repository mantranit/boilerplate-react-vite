import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTabs } from 'src/hooks/use-tabs';

describe('useTabs', () => {
  it('initializes with default value', () => {
    const { result } = renderHook(() => useTabs('tab1'));
    expect(result.current.value).toBe('tab1');
  });

  it('initializes with numeric value', () => {
    const { result } = renderHook(() => useTabs(0));
    expect(result.current.value).toBe(0);
  });

  it('changes value with onChange', () => {
    const { result } = renderHook(() => useTabs('tab1'));

    act(() => {
      result.current.onChange(null, 'tab2');
    });

    expect(result.current.value).toBe('tab2');
  });

  it('updates value with setValue', () => {
    const { result } = renderHook(() => useTabs('tab1'));

    act(() => {
      result.current.setValue('tab3');
    });

    expect(result.current.value).toBe('tab3');
  });

  it('handles multiple value changes', () => {
    const { result } = renderHook(() => useTabs(0));

    act(() => {
      result.current.onChange(null, 1);
    });
    expect(result.current.value).toBe(1);

    act(() => {
      result.current.onChange(null, 2);
    });
    expect(result.current.value).toBe(2);

    act(() => {
      result.current.setValue(0);
    });
    expect(result.current.value).toBe(0);
  });

  it('maintains stable onChange reference', () => {
    const { result, rerender } = renderHook(() => useTabs('tab1'));

    const initialOnChange = result.current.onChange;

    act(() => {
      result.current.onChange(null, 'tab2');
    });

    rerender();

    expect(result.current.onChange).toBe(initialOnChange);
  });
});
