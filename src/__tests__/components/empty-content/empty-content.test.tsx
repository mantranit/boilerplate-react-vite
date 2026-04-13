import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EmptyContent } from 'src/components/empty-content/empty-content';

describe('EmptyContent Component', () => {
  it('renders with default props', () => {
    render(<EmptyContent />);
    expect(screen.getByText('No data')).toBeInTheDocument();
    expect(screen.getByAltText('empty content')).toBeInTheDocument();
  });

  it('renders with custom title', () => {
    render(<EmptyContent title="No items found" />);
    expect(screen.getByText('No items found')).toBeInTheDocument();
  });

  it('renders with description', () => {
    render(
      <EmptyContent 
        title="No data" 
        description="Try adjusting your filters" 
      />
    );
    expect(screen.getByText('No data')).toBeInTheDocument();
    expect(screen.getByText('Try adjusting your filters')).toBeInTheDocument();
  });

  it('renders with custom image URL', () => {
    render(<EmptyContent imgUrl="/custom-empty.svg" />);
    const img = screen.getByAltText('empty content');
    expect(img).toHaveAttribute('src', '/custom-empty.svg');
  });

  it('renders without title when title is empty string', () => {
    render(<EmptyContent title="" />);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('renders with action element', () => {
    const action = <button>Reload</button>;
    render(<EmptyContent action={action} />);
    expect(screen.getByText('Reload')).toBeInTheDocument();
  });
});
