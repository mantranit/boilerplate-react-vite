import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Label } from 'src/components/label/label';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme as createMuiTheme } from '@mui/material/styles';

// Create a proper theme with vars for testing
const createTestTheme = () => {
  const baseTheme = createMuiTheme();
  return {
    ...baseTheme,
    vars: {
      palette: {
        text: {
          primary: '#000',
          secondary: '#666',
        },
        grey: {
          '500Channel': '128 128 128',
          '800': '#424242',
        },
        common: {
          white: '#fff',
        },
        primary: {
          dark: '#1976d2',
          light: '#42a5f5',
          mainChannel: '33 150 243',
        },
      },
    },
  };
};

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const theme = createTestTheme() as any;
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

describe('Label Component', () => {
  it('renders label with text', () => {
    render(
      <TestWrapper>
        <Label>test label</Label>
      </TestWrapper>
    );
    expect(screen.getByText('Test label')).toBeInTheDocument();
  });

  it('capitalizes first letter of string children', () => {
    render(
      <TestWrapper>
        <Label>hello world</Label>
      </TestWrapper>
    );
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('renders non-string children as-is', () => {
    render(
      <TestWrapper>
        <Label>
          <span data-testid="custom-content">Custom Content</span>
        </Label>
      </TestWrapper>
    );
    expect(screen.getByTestId('custom-content')).toBeInTheDocument();
  });
});
