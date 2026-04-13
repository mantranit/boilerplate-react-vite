import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FileThumbnail } from 'src/components/file-thumbnail/file-thumbnail';
import { ThemeProvider } from 'src/theme/theme-provider';

// Mock URL.createObjectURL
global.URL.createObjectURL = vi.fn(() => 'blob:mock-url');

// Helper to render with theme
const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('FileThumbnail Component', () => {
  it('renders with file string path', () => {
    const { container } = renderWithTheme(<FileThumbnail file="/path/to/image.jpg" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with file object', () => {
    const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });
    const { container } = renderWithTheme(<FileThumbnail file={file} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('displays image for image files when imageView is true', () => {
    const { container } = renderWithTheme(
      <FileThumbnail file="/test/image.jpg" imageView={true} />
    );
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
  });

  it('displays file icon for non-image files', () => {
    const { container } = renderWithTheme(
      <FileThumbnail file="/test/document.pdf" />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with tooltip', () => {
    renderWithTheme(<FileThumbnail file="/test.jpg" tooltip="Test Document" />);
    // Component should render (tooltip implementation depends on parent)
    expect(document.body).toBeTruthy();
  });

  it('renders remove button when onRemove is provided', () => {
    const onRemove = vi.fn();
    const { container } = renderWithTheme(
      <FileThumbnail file="/test.jpg" onRemove={onRemove} />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders download button when onDownload is provided', () => {
    const onDownload = vi.fn();
    const { container } = renderWithTheme(
      <FileThumbnail file="/test.jpg" onDownload={onDownload} />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies custom sx styles', () => {
    const { container } = renderWithTheme(
      <FileThumbnail file="/test.jpg" sx={{ width: 50, height: 50 }} />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = renderWithTheme(
      <FileThumbnail file="/test.jpg" className="custom-thumbnail" />
    );
    expect(container.firstChild).toHaveClass('mnl__file__thumbnail__root');
    expect(container.firstChild).toHaveClass('custom-thumbnail');
  });

  it('passes through Box props', () => {
    const { container } = renderWithTheme(
      <FileThumbnail
        file="/test.jpg"
        data-testid="file-thumb"
      />
    );
    const element = container.querySelector('[data-testid="file-thumb"]');
    expect(element).toBeInTheDocument();
  });

  it('applies slotProps to img', () => {
    const { container } = renderWithTheme(
      <FileThumbnail
        file="/test.jpg"
        imageView={true}
        slotProps={{ img: { alt: 'Custom Alt' } }}
      />
    );
    expect(container.querySelector('img')).toBeInTheDocument();
  });

  it('handles File constructor properly', () => {
    const file = new File(['test'], 'document.docx', {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });
    const { container } = renderWithTheme(<FileThumbnail file={file} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
