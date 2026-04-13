import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SearchNotFound } from 'src/components/search-not-found/search-not-found';

describe('SearchNotFound Component', () => {
  it('displays "Please enter keywords" when query is empty', () => {
    render(<SearchNotFound />);
    expect(screen.getByText('Please enter keywords')).toBeInTheDocument();
  });

  it('displays "Please enter keywords" when query is null', () => {
    render(<SearchNotFound query={null} />);
    expect(screen.getByText('Please enter keywords')).toBeInTheDocument();
  });

  it('displays search query in the message', () => {
    render(<SearchNotFound query="test search" />);
    expect(screen.getByText(/"test search"/)).toBeInTheDocument();
    expect(screen.getByText(/No results found for/)).toBeInTheDocument();
  });

  it('displays "Not found" heading', () => {
    render(<SearchNotFound query="example" />);
    expect(screen.getByText('Not found')).toBeInTheDocument();
  });

  it('displays helpful suggestion message', () => {
    render(<SearchNotFound query="example" />);
    expect(screen.getByText(/Try checking for typos/)).toBeInTheDocument();
  });

  it('applies custom sx styles', () => {
    const { container } = render(
      <SearchNotFound query="test" sx={{ backgroundColor: 'red' }} />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('passes through Box props', () => {
    render(
      <SearchNotFound
        query="test"
        data-testid="search-not-found"
        className="custom"
      />
    );
    const element = screen.getByTestId('search-not-found');
    expect(element).toBeInTheDocument();
  });

  it('formats query as strong text', () => {
    const { container } = render(<SearchNotFound query="my query" />);
    const strong = container.querySelector('strong');
    expect(strong).toBeInTheDocument();
    expect(strong).toHaveTextContent('"my query"');
  });
});
