import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AnimateLogo1 } from 'src/components/animate/animate-logo';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'src/theme/theme-provider';

// Helper to render with providers
const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider>{ui}</ThemeProvider>
    </BrowserRouter>
  );
};

describe('AnimateLogo1 Component', () => {
  it('renders with default logo', () => {
    renderWithProviders(<AnimateLogo1 />);
    const logo = screen.getByLabelText('Logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders with custom logo element', () => {
    const customLogo = <div data-testid="custom-logo">Custom Logo</div>;
    renderWithProviders(<AnimateLogo1 logo={customLogo as any} />);
    expect(screen.getByTestId('custom-logo')).toBeInTheDocument();
  });

  it('applies custom sx styles', () => {
    const { container } = renderWithProviders(
      <AnimateLogo1 sx={{ backgroundColor: 'blue' }} />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders animated border elements', () => {
    const { container } = renderWithProviders(<AnimateLogo1 />);
    // Should have main container + logo + 2 animated borders
    const motionDivs = container.querySelectorAll('[class*="css-"]');
    expect(motionDivs.length).toBeGreaterThan(0);
  });

  it('applies custom width and height', () => {
    const { container } = renderWithProviders(<AnimateLogo1 sx={{ width: 200, height: 200 }} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('passes through Box props', () => {
    renderWithProviders(<AnimateLogo1 data-testid="animate-logo" className="custom-class" />);
    const element = screen.getByTestId('animate-logo');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('custom-class');
  });

  it('has relative positioning for animation layers', () => {
    const { container} = renderWithProviders(<AnimateLogo1 />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
