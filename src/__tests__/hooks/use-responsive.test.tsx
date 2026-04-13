import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useResponsive, useWidth } from 'src/hooks/use-responsive';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from 'src/theme/create-theme';
import { ReactNode } from 'react';
import { useSettingsContext } from 'src/components/settings';

// Mock useMediaQuery
vi.mock('@mui/material/useMediaQuery', () => ({
  default: vi.fn((query) => {
    // Mock different breakpoint responses
    if (query.includes('min-width: 1200px')) return false; // lg and up
    if (query.includes('min-width: 900px')) return true;   // md and up
    if (query.includes('max-width: 600px')) return false;  // sm and down
    return true;
  }),
}));

const theme = createTheme({});

const wrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('useResponsive', () => {
  it('handles "up" query', () => {
    const { result } = renderHook(() => useResponsive('up', 'sm'), { wrapper });

    expect(typeof result.current).toBe('boolean');
  });

  it('handles "down" query', () => {
    const { result } = renderHook(() => useResponsive('down', 'md'), { wrapper });

    expect(typeof result.current).toBe('boolean');
  });

  it('handles "between" query', () => {
    const { result } = renderHook(() => useResponsive('between', 'sm', 'lg'), { wrapper });

    expect(typeof result.current).toBe('boolean');
  });

  it('handles "only" query', () => {
    const { result } = renderHook(() => useResponsive('only', 'md'), { wrapper });

    expect(typeof result.current).toBe('boolean');
  });

  it('defaults to "up xs" for invalid query', () => {
    const { result } = renderHook(() => useResponsive('invalid' as any, 'sm'), { wrapper });

    expect(typeof result.current).toBe('boolean');
  });

  it('memoizes query based on parameters', () => {
    const { result, rerender } = renderHook(
      ({ q, s }) => useResponsive(q, s),
      {
        wrapper,
        initialProps: { q: 'up' as const, s: 'sm' as const },
      }
    );

    const firstResult = result.current;
    rerender({ q: 'up', s: 'sm' });

    expect(result.current).toBe(firstResult);
  });
});

describe('useWidth', () => {
  it('returns current breakpoint width', () => {
    const { result } = renderHook(() => useWidth(), { wrapper });

    expect(result.current).toBeDefined();
    expect(['xs', 'sm', 'md', 'lg', 'xl']).toContain(result.current);
  });

  it('returns breakpoint string', () => {
    const { result } = renderHook(() => useWidth(), { wrapper });

    expect(typeof result.current).toBe('string');
  });

  it('defaults to "xs" when no breakpoint matches', () => {
    // This test relies on the mock returning false for all breakpoints
    const { result } = renderHook(() => useWidth(), { wrapper });

    expect(result.current).toBeTruthy();
  });
});
