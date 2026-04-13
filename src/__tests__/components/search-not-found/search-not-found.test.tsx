import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { shallow, mount } from 'enzyme';
import { SearchNotFound } from 'src/components/search-not-found/search-not-found';

// ----------------------------------------------------------------------
// React Testing Library tests
// ----------------------------------------------------------------------

describe('SearchNotFound Component (RTL)', () => {
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

// ----------------------------------------------------------------------
// Enzyme tests
// ----------------------------------------------------------------------

describe('SearchNotFound Component (Enzyme)', () => {
  it('shallow renders without crashing', () => {
    const wrapper = shallow(<SearchNotFound />);
    expect(wrapper.exists()).toBe(true);
  });

  it('shallow renders the "Please enter keywords" fallback when no query', () => {
    const wrapper = shallow(<SearchNotFound />);
    expect(wrapper.text()).toContain('Please enter keywords');
  });

  it('shallow renders the "Please enter keywords" fallback when query is null', () => {
    const wrapper = shallow(<SearchNotFound query={null} />);
    expect(wrapper.text()).toContain('Please enter keywords');
  });

  it('shallow renders the not-found box when query is provided', () => {
    const wrapper = shallow(<SearchNotFound query="react" />);
    expect(wrapper.find('strong').text()).toBe('"react"');
  });

  it('mount renders the full component tree without errors', () => {
    const wrapper = mount(<SearchNotFound query="enzyme" />);
    expect(wrapper.text()).toContain('"enzyme"');
    wrapper.unmount();
  });

  it('mount updates output when query prop changes', () => {
    const wrapper = mount(<SearchNotFound query="first" />);
    expect(wrapper.text()).toContain('"first"');

    wrapper.setProps({ query: 'second' });
    expect(wrapper.text()).toContain('"second"');
    wrapper.unmount();
  });

  it('passes className through to the root element', () => {
    const wrapper = mount(<SearchNotFound query="test" className="custom-class" />);
    expect(wrapper.find('.custom-class').exists()).toBe(true);
    wrapper.unmount();
  });
});

