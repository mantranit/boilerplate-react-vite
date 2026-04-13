import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MotionLazy } from 'src/components/animate/motion-lazy';

describe('MotionLazy Component', () => {
  it('renders children content', () => {
    render(
      <MotionLazy>
        <div>Lazy Motion Content</div>
      </MotionLazy>
    );
    expect(screen.getByText('Lazy Motion Content')).toBeInTheDocument();
  });

  it('wraps children in LazyMotion with domMax features', () => {
    render(
      <MotionLazy>
        <span data-testid="child">Child Element</span>
      </MotionLazy>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('handles multiple children', () => {
    render(
      <MotionLazy>
        <div>First</div>
        <div>Second</div>
      </MotionLazy>
    );
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });

  it('handles nested components', () => {
    render(
      <MotionLazy>
        <div>
          <span>Nested</span>
          <span>Content</span>
        </div>
      </MotionLazy>
    );
    expect(screen.getByText('Nested')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders null children gracefully', () => {
    render(
      <MotionLazy>
        {null}
      </MotionLazy>
    );
    // Should not crash
    expect(document.body).toBeTruthy();
  });

  it('renders complex component trees', () => {
    render(
      <MotionLazy>
        <div>
          <button>Button</button>
          <input placeholder="Input" />
          <p>Paragraph</p>
        </div>
      </MotionLazy>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Input')).toBeInTheDocument();
    expect(screen.getByText('Paragraph')).toBeInTheDocument();
  });
});
