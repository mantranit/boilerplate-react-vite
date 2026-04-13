import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import { BrowserRouter } from 'react-router-dom';
import { ReactNode } from 'react';

// Mock window.scrollTo
const scrollToMock = vi.fn();
window.scrollTo = scrollToMock;

const wrapper = ({ children }: { children: ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('useScrollToTop', () => {
  beforeEach(() => {
    scrollToMock.mockClear();
  });

  it('scrolls to top on mount', () => {
    renderHook(() => useScrollToTop(), { wrapper });

    expect(scrollToMock).toHaveBeenCalledWith(0, 0);
  });

  it('returns null', () => {
    const { result } = renderHook(() => useScrollToTop(), { wrapper });
    expect(result.current).toBeNull();
  });
});
