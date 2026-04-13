import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useEventListener } from 'src/hooks/use-event-listener';
import { createRef } from 'react';

describe('useEventListener', () => {
  it('attaches event listener to window by default', () => {
    const handler = vi.fn();
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    
    renderHook(() => useEventListener('click', handler));
    
    expect(addEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function), undefined);
    
    addEventListenerSpy.mockRestore();
  });

  it('removes event listener on unmount', () => {
    const handler = vi.fn();
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    
    const { unmount } = renderHook(() => useEventListener('click', handler));
    
    unmount();
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function));
    
    removeEventListenerSpy.mockRestore();
  });

  it('calls handler when event is triggered', () => {
    const handler = vi.fn();
    
    renderHook(() => useEventListener('click', handler));
    
    const clickEvent = new MouseEvent('click');
    window.dispatchEvent(clickEvent);
    
    expect(handler).toHaveBeenCalledWith(clickEvent);
  });

  it('attaches event listener to custom element', () => {
    const handler = vi.fn();
    const element = document.createElement('div');
    const elementRef = { current: element };
    const addEventListenerSpy = vi.spyOn(element, 'addEventListener');
    
    renderHook(() => useEventListener('click', handler, elementRef));
    
    expect(addEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function), undefined);
    
    addEventListenerSpy.mockRestore();
  });

  it('updates handler without re-attaching listener', () => {
    const handler1 = vi.fn();
    const handler2 = vi.fn();
    
    const { rerender } = renderHook(
      ({ handler }) => useEventListener('click', handler),
      { initialProps: { handler: handler1 } }
    );
    
    const clickEvent1 = new MouseEvent('click');
    window.dispatchEvent(clickEvent1);
    expect(handler1).toHaveBeenCalledTimes(1);
    
    rerender({ handler: handler2 });
    
    const clickEvent2 = new MouseEvent('click');
    window.dispatchEvent(clickEvent2);
    expect(handler2).toHaveBeenCalledTimes(1);
    expect(handler1).toHaveBeenCalledTimes(1); // Still only called once
  });

  it('passes options to addEventListener', () => {
    const handler = vi.fn();
    const options = { passive: true };
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    
    renderHook(() => useEventListener('scroll', handler, undefined, options));
    
    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function), options);
    
    addEventListenerSpy.mockRestore();
  });

  it('does nothing when element is null', () => {
    const handler = vi.fn();
    const elementRef = { current: null };
    
    // Should not throw
    expect(() => {
      renderHook(() => useEventListener('click', handler, elementRef));
    }).not.toThrow();
  });
});
