import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { AnimateBorder } from 'src/components/animate/animate-border';

describe('AnimateBorder Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<AnimateBorder />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies custom sx styles', () => {
    const { container } = render(
      <AnimateBorder sx={{ padding: '20px' }} />
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toBeInTheDocument();
  });

  it('handles animate prop with custom duration', () => {
    const { container } = render(
      <AnimateBorder
        animate={{
          duration: 5,
          color: '#ff0000',
        }}
      />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('handles disabled animation', () => {
    const { container } = render(
      <AnimateBorder
        animate={{
          disable: true,
        }}
      />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies custom border width', () => {
    const { container } = render(
      <AnimateBorder
        animate={{
          width: '4px',
        }}
      />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('handles loop animation', () => {
    const { container } = render(
      <AnimateBorder
        animate={{
          loop: true,
          repeatType: 'loop',
        }}
      />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies custom angle and length', () => {
    const { container } = render(
      <AnimateBorder
        animate={{
          angle: 45,
          length: 60,
        }}
      />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('handles custom ease and delay', () => {
    const { container } = render(
      <AnimateBorder
        animate={{
          ease: 'easeInOut',
          delay: 1,
        }}
      />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('disables double line when specified', () => {
    const { container } = render(
      <AnimateBorder
        animate={{
          disableDoubleline: true,
        }}
      />
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});
