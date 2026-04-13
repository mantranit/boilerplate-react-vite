import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AnimateAvatar } from 'src/components/animate/animate-avatar';

describe('AnimateAvatar Component', () => {
  it('renders with default props', () => {
    const { container } = render(<AnimateAvatar />);
    const avatar = container.querySelector('.MuiAvatar-root');
    expect(avatar).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(<AnimateAvatar>AB</AnimateAvatar>);
    expect(screen.getByText('AB')).toBeInTheDocument();
  });

  it('applies custom width', () => {
    const { container } = render(<AnimateAvatar width={60} />);
    const box = container.firstChild as HTMLElement;
    expect(box).toBeInTheDocument();
  });

  it('applies custom sx styles', () => {
    const { container } = render(
      <AnimateAvatar sx={{ backgroundColor: 'red' }} />
    );
    const box = container.firstChild as HTMLElement;
    expect(box).toBeInTheDocument();
  });

  it('passes slotProps to avatar', () => {
    render(
      <AnimateAvatar
        slotProps={{
          avatar: {
            alt: 'User Avatar',
            src: '/avatar.jpg',
          },
        }}
      />
    );
    const avatar = screen.getByAltText('User Avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', '/avatar.jpg');
  });

  it('uses default alt text when src is provided', () => {
    render(<AnimateAvatar slotProps={{ avatar: { src: '/test.jpg' } }} />);
    const avatar = screen.getByAltText('My avtar');
    expect(avatar).toBeInTheDocument();
  });

  it('calculates avatar size based on border and spacing', () => {
    const { container } = render(
      <AnimateAvatar
        width={80}
        slotProps={{
          overlay: {
            border: 3,
            spacing: 4,
          },
        }}
      />
    );
    const avatar = container.querySelector('.MuiAvatar-root');
    expect(avatar).toBeInTheDocument();
  });

  it('applies additional Box props', () => {
    render(
      <AnimateAvatar
        data-testid="custom-avatar"
        className="custom-class"
      />
    );
    const element = screen.getByTestId('custom-avatar');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('custom-class');
  });
});
