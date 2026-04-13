import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BackToTop } from 'src/components/animate/back-to-top/back-to-top';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  useScroll: () => ({
    scrollYProgress: {
      on: vi.fn(),
      destroy: vi.fn(),
    },
  }),
  useMotionValueEvent: vi.fn((motionValue, event, handler) => {
    // Simulate scroll progress events
    if (event === 'change') {
      setTimeout(() => handler(0.5), 0); // 50% scroll -> below threshold
      setTimeout(() => handler(0.95), 10); // 95% scroll -> above threshold
    }
  }),
}));

const scrollToMock = vi.fn();
window.scrollTo = scrollToMock;

describe('BackToTop Component', () => {
  beforeEach(() => {
    scrollToMock.mockClear();
  });

  it('renders fab button', () => {
    render(<BackToTop />);
    const button = screen.getByLabelText('Back to top');
    expect(button).toBeInTheDocument();
  });

  it('scrolls to top when clicked', async () => {
    const user = userEvent.setup();
    render(<BackToTop />);
    
    const button = screen.getByLabelText('Back to top');
    await user.click(button);
    
    expect(scrollToMock).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('accepts custom value threshold', () => {
    render(<BackToTop value={80} />);
    const button = screen.getByLabelText('Back to top');
    expect(button).toBeInTheDocument();
  });

  it('applies custom sx styles', () => {
    render(<BackToTop sx={{ backgroundColor: 'red' }} />);
    const button = screen.getByLabelText('Back to top');
    expect(button).toBeInTheDocument();
  });

  it('passes through Fab props', () => {
    render(
      <BackToTop
        data-testid="back-to-top"
        color="secondary"
        size="small"
      />
    );
    const button = screen.getByTestId('back-to-top');
    expect(button).toBeInTheDocument();
  });

  it('renders with default value of 90%', () => {
    render(<BackToTop />);
    const button = screen.getByLabelText('Back to top');
    expect(button).toBeInTheDocument();
  });

  it('displays SVG icon', () => {
    const { container } = render(<BackToTop />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
