import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Logo } from 'src/components/logo/logo';
import { BrowserRouter } from 'react-router-dom';

// Helper to render with Router context
const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Logo Component', () => {
  it('renders the logo component', () => {
    renderWithRouter(<Logo />);
    const logo = screen.getByAltText(/logo/i);
    expect(logo).toBeInTheDocument();
  });

  it('renders single logo by default', () => {
    renderWithRouter(<Logo />);
    const logo = screen.getByAltText('Single logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders full logo when isSingle is false', () => {
    renderWithRouter(<Logo isSingle={false} />);
    const logo = screen.getByAltText('Full logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders with correct aria-label', () => {
    renderWithRouter(<Logo />);
    const logoLink = screen.getByLabelText('Logo');
    expect(logoLink).toBeInTheDocument();
  });
});
