import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from 'src/hooks/use-local-storage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('initializes with initial state', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    expect(result.current.state).toBe('initial');
  });

  it('initializes with object state', () => {
    const initialState = { name: 'test', count: 0 };
    const { result } = renderHook(() => useLocalStorage('test-obj', initialState));
    expect(result.current.state).toEqual(initialState);
  });

  it('updates state and saves to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    act(() => {
      result.current.setState('updated');
    });

    expect(result.current.state).toBe('updated');
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify('updated'));
  });

  it('updates object state with setState', () => {
    const { result } = renderHook(() => useLocalStorage('test-obj', { name: 'test', count: 0 }));

    act(() => {
      result.current.setState({ count: 5 });
    });

    expect(result.current.state).toEqual({ name: 'test', count: 5 });
  });

  it('updates specific field with setField', () => {
    const { result } = renderHook(() => useLocalStorage('test-obj', { name: 'test', count: 0 }));

    act(() => {
      result.current.setField('name', 'updated');
    });

    expect(result.current.state.name).toBe('updated');
    expect(result.current.state.count).toBe(0);
  });

  it('resets to initial state', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    act(() => {
      result.current.setState('changed');
    });
    expect(result.current.state).toBe('changed');

    act(() => {
      result.current.resetState();
    });

    expect(result.current.state).toBe('initial');
    expect(localStorage.getItem('test-key')).toBeNull();
  });

  it('indicates canReset correctly', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    expect(result.current.canReset).toBe(false);

    act(() => {
      result.current.setState('changed');
    });

    expect(result.current.canReset).toBe(true);

    act(() => {
      result.current.resetState();
    });

    expect(result.current.canReset).toBe(false);
  });

  it('restores value from localStorage on mount', () => {
    localStorage.setItem('test-key', JSON.stringify('stored-value'));

    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    // Wait for effect to run
    expect(result.current.state).toBe('stored-value');
  });

  it('merges stored object with initial state', () => {
    const initialState = { name: 'test', count: 0, extra: 'value' };
    localStorage.setItem('test-obj', JSON.stringify({ count: 10 }));

    const { result } = renderHook(() => useLocalStorage('test-obj', initialState));

    // The stored value should be merged with initial state
    expect(result.current.state.count).toBe(10);
  });
});
