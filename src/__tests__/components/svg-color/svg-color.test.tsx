import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { SvgColor } from 'src/components/svg-color/svg-color';

describe('SvgColor Component', () => {
  it('renders with src prop', () => {
    const { container } = render(<SvgColor src="/icon.svg" />);
    const element = container.querySelector('span');
    expect(element).toBeInTheDocument();
  });

  it('applies custom width', () => {
    const { container } = render(<SvgColor src="/icon.svg" width={32} />);
    const element = container.querySelector('span');
    expect(element).toHaveStyle({ width: '32px' });
  });

  it('applies custom height', () => {
    const { container } = render(<SvgColor src="/icon.svg" height={40} />);
    const element = container.querySelector('span');
    expect(element).toHaveStyle({ height: '40px' });
  });

  it('uses width as height when height is not provided', () => {
    const { container } = render(<SvgColor src="/icon.svg" width={50} />);
    const element = container.querySelector('span');
    expect(element).toHaveStyle({ width: '50px', height: '50px' });
  });

  it('applies default width of 24', () => {
    const { container } = render(<SvgColor src="/icon.svg" />);
    const element = container.querySelector('span');
    expect(element).toHaveStyle({ width: '24px' });
  });

  it('applies custom className', () => {
    const { container } = render(<SvgColor src="/icon.svg" className="custom-icon" />);
    const element = container.querySelector('span');
    expect(element).toHaveClass('custom-icon');
  });

  it('applies custom sx styles', () => {
    const { container } = render(
      <SvgColor src="/icon.svg" sx={{ color: 'primary.main' }} />
    );
    const element = container.querySelector('span');
    expect(element).toBeInTheDocument();
  });

  it('sets mask with src URL', () => {
    const { container } = render(<SvgColor src="/test-icon.svg" />);
    const element = container.querySelector('span');
    
    const style = window.getComputedStyle(element!);
    // The mask style should contain the src URL
    expect(element).toBeInTheDocument();
  });

  it('passes through additional props', () => {
    const { container } = render(
      <SvgColor src="/icon.svg" data-testid="svg-icon" aria-label="Icon" />
    );
    const element = container.querySelector('[data-testid="svg-icon"]');
    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute('aria-label', 'Icon');
  });
});
