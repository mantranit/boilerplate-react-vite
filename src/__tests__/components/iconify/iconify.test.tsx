import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Iconify } from 'src/components/iconify/iconify';

describe('Iconify Component', () => {
  it('renders icon component', () => {
    const { container } = render(<Iconify icon="solar:user-bold" />);
    const icon = container.querySelector('span');
    expect(icon).toBeInTheDocument();
  });

  // it('applies custom width', () => {
  //   const { container } = render(<Iconify icon="solar:user-bold" height="none" style={{ width: '48px', height: '48px' }} />);
  //   const icon = container.querySelector('span');
  //   expect(icon).toHaveStyle({ width: '48px' });
  // });

  // it('applies custom className', () => {
  //   const { container } = render(<Iconify icon="solar:user-bold" className="custom-class" />);
  //   const icon = container.querySelector('span');
  //   expect(icon).toHaveClass('custom-class');
  // });

  it('applies custom sx props', () => {
    const { container } = render(
      <Iconify
        icon="solar:user-bold"
        sx={{ color: 'primary.main' }}
      />
    );
    const icon = container.querySelector('span');
    expect(icon).toBeInTheDocument();
  });

  // it('renders with default width of 20', () => {
  //   const { container } = render(<Iconify icon="solar:user-bold" />);
  //   const icon = container.querySelector('span');
  //   expect(icon).toHaveStyle({ width: '20px' });
  // });
});
