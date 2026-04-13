import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MotionContainer } from 'src/components/animate/motion-container';

describe('MotionContainer Component', () => {
  it('renders children content', () => {
    render(
      <MotionContainer>
        <div>Test Content</div>
      </MotionContainer>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders with action prop false (default)', () => {
    render(
      <MotionContainer>
        <span data-testid="child">Child</span>
      </MotionContainer>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('renders with action prop true', () => {
    render(
      <MotionContainer action={true}>
        <span data-testid="child">Child</span>
      </MotionContainer>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('handles animate prop with action', () => {
    render(
      <MotionContainer action={true} animate="visible">
        <div>Animated</div>
      </MotionContainer>
    );
    expect(screen.getByText('Animated')).toBeInTheDocument();
  });

  it('applies custom sx styles', () => {
    const { container } = render(
      <MotionContainer sx={{ padding: '20px' }}>
        Content
      </MotionContainer>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('passes through Box props', () => {
    render(
      <MotionContainer data-testid="motion-container" className="custom">
        <div>Test</div>
      </MotionContainer>
    );
    const element = screen.getByTestId('motion-container');
    expect(element).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(
      <MotionContainer ref={ref}>
        <div>Content</div>
      </MotionContainer>
    );
    expect(ref.current).toBeTruthy();
  });

  it('handles multiple children', () => {
    render(
      <MotionContainer>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
      </MotionContainer>
    );
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
    expect(screen.getByText('Third')).toBeInTheDocument();
  });
});
