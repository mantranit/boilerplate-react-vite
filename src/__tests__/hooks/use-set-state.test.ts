import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSetState } from 'src/hooks/use-set-state';

describe('useSetState', () => {
  it('initializes with default state', () => {
    const initialState = { name: 'test', count: 0 };
    const { result } = renderHook(() => useSetState(initialState));

    expect(result.current.state).toEqual(initialState);
  });

  it('updates state with partial update', () => {
    const { result } = renderHook(() => useSetState({ name: 'test', count: 0 }));

    act(() => {
      result.current.setState({ count: 5 });
    });

    expect(result.current.state).toEqual({ name: 'test', count: 5 });
  });

  it('updates state with function updater', async () => {
    const { result } = renderHook(() => useSetState({ count: 0 }));

    act(() => {
      result.current.setState({ count: result.current.state.count + 1 });
    });

    expect(result.current.state.count).toBe(1);
  });

  it('merges multiple updates', () => {
    const { result } = renderHook(() => useSetState({ name: 'test', count: 0, active: false }));

    act(() => {
      result.current.setState({ count: 1 });
    });

    act(() => {
      result.current.setState({ active: true });
    });

    expect(result.current.state).toEqual({ name: 'test', count: 1, active: true });
  });

  it('resets to initial state', () => {
    const initialState = { name: 'test', count: 0 };
    const { result } = renderHook(() => useSetState(initialState));

    act(() => {
      result.current.setState({ count: 10, name: 'changed' });
    });

    act(() => {
      result.current.onResetState(); // Changed from resetState to onResetState
    });

    expect(result.current.state).toEqual(initialState);
  });
});
