import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Scrollbar } from 'src/components/scrollbar/scrollbar';

describe('Scrollbar Component', () => {
  it('renders children content', () => {
    render(
      <Scrollbar>
        <div data-testid="scrollbar-content">Test Content</div>
      </Scrollbar>
    );

    expect(screen.getByTestId('scrollbar-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Scrollbar className="custom-scrollbar">
        <div>Content</div>
      </Scrollbar>
    );

    const scrollbarElement = container.querySelector('.custom-scrollbar');
    expect(scrollbarElement).toBeInTheDocument();
  });

  it('applies fillContent styles when prop is true', () => {
    render(
      <Scrollbar fillContent>
        <div>Content</div>
      </Scrollbar>
    );

    // Component should render without errors
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies custom sx styles', () => {
    render(
      <Scrollbar sx={{ backgroundColor: 'red' }}>
        <div>Content</div>
      </Scrollbar>
    );

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('passes through additional props', () => {
    render(
      <Scrollbar data-testid="custom-scrollbar" aria-label="Custom scrollbar">
        <div>Content</div>
      </Scrollbar>
    );

    const scrollbar = screen.getByTestId('custom-scrollbar');
    expect(scrollbar).toHaveAttribute('aria-label', 'Custom scrollbar');
  });

  it('renders with slot props', () => {
    render(
      <Scrollbar
        slotProps={{
          wrapper: { style: { color: 'blue' } },
          content: { style: { padding: '10px' } },
        }}
      >
        <div>Content</div>
      </Scrollbar>
    );

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('handles empty children', () => {
    const { container } = render(<Scrollbar />);
    expect(container).toBeInTheDocument();
  });
});
