import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MotionViewport } from 'src/components/animate/motion-viewport';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from 'src/theme/create-theme';

// Mock useResponsive
vi.mock('src/hooks/use-responsive', () => ({
  useResponsive: vi.fn(() => false), // Default to not small screen
}));

const theme = createTheme({});

describe('MotionViewport Component', () => {
  it('renders children content', () => {
    render(
      <ThemeProvider theme={theme}>
        <MotionViewport>
          <div>Viewport Content</div>
        </MotionViewport>
      </ThemeProvider>
    );
    expect(screen.getByText('Viewport Content')).toBeInTheDocument();
  });

  it('renders with disableAnimate prop', () => {
    render(
      <ThemeProvider theme={theme}>
        <MotionViewport disableAnimate={false}>
          <span data-testid="child">Child</span>
        </MotionViewport>
      </ThemeProvider>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('applies custom sx styles', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <MotionViewport sx={{ padding: '20px' }}>
          Content
        </MotionViewport>
      </ThemeProvider>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('passes through Box props', () => {
    render(
      <ThemeProvider theme={theme}>
        <MotionViewport data-testid="viewport" className="custom">
          <div>Test</div>
        </MotionViewport>
      </ThemeProvider>
    );
    const element = screen.getByTestId('viewport');
    expect(element).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(
      <ThemeProvider theme={theme}>
        <MotionViewport ref={ref}>
          <div>Content</div>
        </MotionViewport>
      </ThemeProvider>
    );
    expect(ref.current).toBeTruthy();
  });

  it('handles multiple children', () => {
    render(
      <ThemeProvider theme={theme}>
        <MotionViewport>
          <div>First</div>
          <div>Second</div>
        </MotionViewport>
      </ThemeProvider>
    );
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });
});
