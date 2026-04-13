import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Image } from 'src/components/image/image';

describe('Image Component', () => {
  it('renders image with src and visibleByDefault', () => {
    render(<Image src="/test-image.jpg" alt="Test Image" visibleByDefault />);
    const img = screen.getByAltText('Test Image');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/test-image.jpg');
  });

  it('renders with default alt text', () => {
    render(<Image src="/test-image.jpg" visibleByDefault />);
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
  });

  it('applies custom width and height', () => {
    render(<Image src="/test-image.jpg" width={300} height={200} alt="Test" visibleByDefault />);
    const img = screen.getByAltText('Test');
    expect(img).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Image src="/test-image.jpg" className="custom-image" alt="Test" visibleByDefault />);
    const wrapper = screen.getByAltText('Test').closest('.custom-image');
    expect(wrapper).toBeInTheDocument();
  });

  it('renders with ratio prop', () => {
    render(<Image src="/test-image.jpg" alt="Test" ratio="16/9" visibleByDefault />);
    const img = screen.getByAltText('Test');
    expect(img).toBeInTheDocument();
  });

  it('handles effect prop', () => {
    render(<Image src="/test-image.jpg" alt="Test" effect="opacity" visibleByDefault />);
    const img = screen.getByAltText('Test');
    expect(img).toBeInTheDocument();
  });
});
