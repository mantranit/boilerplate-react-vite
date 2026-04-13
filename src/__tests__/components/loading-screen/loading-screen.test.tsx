import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingScreen } from 'src/components/loading-screen/loading-screen';

describe('LoadingScreen Component', () => {
  it('renders loading screen', () => {
    render(<LoadingScreen data-testid="loading-screen" />);
    expect(screen.getByTestId('loading-screen')).toBeInTheDocument();
  });

  it('renders linear progress indicator', () => {
    render(<LoadingScreen />);
    const progress = document.querySelector('.MuiLinearProgress-root');
    expect(progress).toBeInTheDocument();
  });

  it('renders in portal when portal prop is true', () => {
    render(<LoadingScreen portal data-testid="loading-screen" />);
    expect(screen.getByTestId('loading-screen')).toBeInTheDocument();
  });

  it('renders normally when portal prop is false', () => {
    render(<LoadingScreen portal={false} data-testid="loading-screen" />);
    expect(screen.getByTestId('loading-screen')).toBeInTheDocument();
  });

  it('applies custom sx styles', () => {
    render(
      <LoadingScreen 
        sx={{ backgroundColor: 'red' }} 
        data-testid="loading-screen"
      />
    );
    const screen_element = screen.getByTestId('loading-screen');
    expect(screen_element).toBeInTheDocument();
  });

  it('spreads additional props', () => {
    render(
      <LoadingScreen 
        data-testid="loading-screen"
        aria-label="Loading content"
      />
    );
    const screen_element = screen.getByTestId('loading-screen');
    expect(screen_element).toHaveAttribute('aria-label', 'Loading content');
  });
});
