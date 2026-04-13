import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

describe('CustomBreadcrumbs Component', () => {
  it('renders heading when provided', () => {
    render(<CustomBreadcrumbs heading="Dashboard" />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders without heading', () => {
    const { container } = render(<CustomBreadcrumbs />);
    expect(container).toBeInTheDocument();
  });

  it('renders action element', () => {
    const action = <button>Create New</button>;
    render(<CustomBreadcrumbs heading="Users" action={action} />);

    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Create New')).toBeInTheDocument();
  });

  it('renders more links when provided', () => {
    const moreLinks = [
      'https://example.com/doc1',
      'https://example.com/doc2',
    ];

    render(<CustomBreadcrumbs heading="Docs" moreLink={moreLinks} />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', 'https://example.com/doc1');
    expect(links[1]).toHaveAttribute('href', 'https://example.com/doc2');
  });

  it('opens more links in new tab', () => {
    const moreLinks = ['https://example.com'];

    render(<CustomBreadcrumbs moreLink={moreLinks} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener');
  });

  it('applies custom sx styles', () => {
    render(
      <CustomBreadcrumbs heading="Test" sx={{ backgroundColor: 'red' }} data-testid="breadcrumbs" />
    );

    const breadcrumbs = screen.getByTestId('breadcrumbs');
    expect(breadcrumbs).toBeInTheDocument();
  });

  it('applies slot props', () => {
    render(
      <CustomBreadcrumbs
        heading="Test"
        slotProps={{
          heading: { color: 'primary' },
          action: { backgroundColor: 'blue' },
        }}
      />
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('renders heading and action together', () => {
    const action = <button>Action</button>;

    render(<CustomBreadcrumbs heading="Page Title" action={action} />);

    expect(screen.getByText('Page Title')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('does not render more links section when not provided', () => {
    render(<CustomBreadcrumbs heading="Test" />);

    const lists = screen.queryByRole('list');
    expect(lists).not.toBeInTheDocument();
  });

  it('handles empty more links array', () => {
    render(<CustomBreadcrumbs heading="Test" moreLink={[]} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
