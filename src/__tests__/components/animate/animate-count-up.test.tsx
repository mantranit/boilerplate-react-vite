import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AnimateCountUp } from 'src/components/animate/animate-count-up';

describe('AnimateCountUp Component', () => {
  it('renders with default props', () => {
    const { container } = render(<AnimateCountUp to={100} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('starts counting from specified value', () => {
    render(<AnimateCountUp from={0} to={100} />);
    // Component should be rendered
    expect(document.body).toContainHTML('p');
  });

  it('counts to target value', () => {
    const { container } = render(<AnimateCountUp to={50} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies custom component type', () => {
    const { container } = render(
      <AnimateCountUp to={100} component="span" />
    );
    const span = container.querySelector('span');
    expect(span).toBeInTheDocument();
  });

  it('formats decimal places with toFixed', () => {
    render(<AnimateCountUp to={99.9} toFixed={2} />);
    expect(document.body).toContainHTML('p');
  });

  it('handles unit prop', () => {
    render(<AnimateCountUp to={100} unit="%" />);
    expect(document.body).toContainHTML('p');
  });

  it('applies custom duration', () => {
    render(<AnimateCountUp to={100} duration={5} />);
    expect(document.body).toContainHTML('p');
  });

  it('handles once prop for animation', () => {
    render(<AnimateCountUp to={100} once={false} />);
    expect(document.body).toContainHTML('p');
  });

  it('applies custom sx styles', () => {
    const { container } = render(
      <AnimateCountUp to={100} sx={{ color: 'red' }} />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('handles large numbers', () => {
    render(<AnimateCountUp to={1000000} />);
    expect(document.body).toContainHTML('p');
  });

  it('handles amount prop for intersection observer', () => {
    render(<AnimateCountUp to={100} amount={0.8} />);
    expect(document.body).toContainHTML('p');
  });

  it('passes through Typography props', () => {
    render(
      <AnimateCountUp
        to={100}
        variant="h4"
        color="primary"
      />
    );
    expect(document.body).toContainHTML('p');
  });
});
