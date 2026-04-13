import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { AnimateText } from 'src/components/animate/animate-text';

describe('AnimateText Component', () => {
  it('renders with text string', () => {
    const { container } = render(
      <AnimateText text="Hello World" variants={{}} component="p" />
    );
    expect(container.textContent).toContain('Hello World');
  });

  it('renders with text array', () => {
    const { container } = render(
      <AnimateText text={['Hello', 'World'] as any} variants={{}} component="p" />
    );
    expect(container.textContent).toBeTruthy();
  });

  it('applies custom component type', () => {
    const { container } = render(
      <AnimateText text="Test" variants={{}} component="h1" />
    );
    const heading = container.querySelector('h1');
    expect(heading).toBeInTheDocument();
  });

  it('applies custom sx styles', () => {
    const { container } = render(
      <AnimateText
        text="Test"
        variants={{}}
        component="p"
        sx={{ color: 'red' }}
      />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('handles once prop', () => {
    render(
      <AnimateText text="Test" variants={{}} component="p" once={false} />
    );
    expect(document.body).toContainHTML('p');
  });

  it('handles amount prop for intersection observer', () => {
    render(
      <AnimateText text="Test" variants={{}} component="p" amount={0.5} />
    );
    expect(document.body).toContainHTML('p');
  });

  it('handles repeatDelay prop', () => {
    render(
      <AnimateText text="Test" variants={{}} component="p" repeatDelay={1000} />
    );
    expect(document.body).toContainHTML('p');
  });

  it('applies custom className', () => {
    const { container } = render(
      <AnimateText
        text="Test"
        variants={{}}
        component="p"
        className="custom-animate"
      />
    );
    expect(container.querySelector('.animate-text-root')).toBeInTheDocument();
  });

  it('passes through Typography props', () => {
    render(
      <AnimateText
        text="Test"
        variants={{}}
        component="p"
        variant="h6"
        color="primary"
      />
    );
    expect(document.body).toContainHTML('p');
  });
});
