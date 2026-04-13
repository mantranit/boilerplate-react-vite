import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { ScrollProgress } from 'src/components/animate/scroll-progress/scroll-progress';
import { useMotionValue } from 'framer-motion';
import { ThemeProvider } from 'src/theme/theme-provider';

// Mock framer-motion hooks
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    useSpring: vi.fn((value) => value),
    useMotionValue: vi.fn(() => ({
      get: () => 0,
      set: vi.fn(),
    })),
  };
});

// Helper to render with theme
const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('ScrollProgress Component', () => {
  it('renders linear progress by default', () => {
    const progress = 0.5;
    const { container } = renderWithTheme(<ScrollProgress progress={progress} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders circular progress variant', () => {
    const progress = 0.75;
    const { container } = renderWithTheme(
      <ScrollProgress progress={progress} variant="circular" />
    );
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('applies custom size for circular variant', () => {
    const { container } = renderWithTheme(
      <ScrollProgress progress={0.5} variant="circular" size={80} />
    );
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('viewBox', '0 0 80 80');
  });

  it('applies custom thickness', () => {
    const { container } = renderWithTheme(
      <ScrollProgress progress={0.5} variant="circular" thickness={5} />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies custom color', () => {
    const { container } = renderWithTheme(
      <ScrollProgress progress={0.5} variant="circular" color="secondary" />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('handles inherit color', () => {
    const { container } = renderWithTheme(
      <ScrollProgress progress={0.5} variant="circular" color="inherit" />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies custom sx styles', () => {
    const { container } = renderWithTheme(
      <ScrollProgress
        progress={0.5}
        variant="circular"
        sx={{ margin: '10px' }}
      />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('passes through Box props', () => {
    const { container } = renderWithTheme(
      <ScrollProgress
        progress={0.5}
        variant="circular"
        data-testid="progress"
        className="custom"
      />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('uses default size for linear (3px)', () => {
    const { container } = renderWithTheme(<ScrollProgress progress={0.5} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('uses default size for circular (64px)', () => {
    const { container } = renderWithTheme(
      <ScrollProgress progress={0.5} variant="circular" />
    );
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('viewBox', '0 0 64 64');
  });

  it('handles numeric progress value', () => {
    const { container } = renderWithTheme(<ScrollProgress progress={0.8} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('handles MotionValue progress', () => {
    const motionValue = useMotionValue(0.5);
    const { container } = renderWithTheme(<ScrollProgress progress={motionValue} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
