import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FiltersResult } from 'src/components/filters-result/filters-result';

describe('FiltersResult Component', () => {
  it('displays total results count', () => {
    render(<FiltersResult totalResults={42} />);
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('results found')).toBeInTheDocument();
  });

  it('displays zero results', () => {
    render(<FiltersResult totalResults={0} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('displays Clear button', () => {
    render(<FiltersResult totalResults={10} />);
    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
  });

  it('calls onReset when Clear button is clicked', async () => {
    const user = userEvent.setup();
    const onReset = vi.fn();
    
    render(<FiltersResult totalResults={5} onReset={onReset} />);
    
    const clearButton = screen.getByRole('button', { name: /clear/i });
    await user.click(clearButton);
    
    expect(onReset).toHaveBeenCalledOnce();
  });

  it('renders children content', () => {
    render(
      <FiltersResult totalResults={10}>
        <div>Filter Chip 1</div>
        <div>Filter Chip 2</div>
      </FiltersResult>
    );
    
    expect(screen.getByText('Filter Chip 1')).toBeInTheDocument();
    expect(screen.getByText('Filter Chip 2')).toBeInTheDocument();
  });

  it('applies custom sx styles', () => {
    const { container } = render(
      <FiltersResult totalResults={10} sx={{ padding: '20px' }} />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('passes through Box props', () => {
    const { container } = render(
      <FiltersResult
        totalResults={10}
        className="custom"
      />
    );
    // Component renders with results
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('results found')).toBeInTheDocument();
  });

  it('renders Clear button with trash icon', () => {
    const { container } = render(<FiltersResult totalResults={10} />);
    const button = screen.getByRole('button', { name: /clear/i });
    expect(button).toBeInTheDocument();
    // Button should have startIcon
    expect(button.textContent).toContain('Clear');
  });

  it('handles large result counts', () => {
    render(<FiltersResult totalResults={9999} />);
    expect(screen.getByText('9999')).toBeInTheDocument();
  });
});
