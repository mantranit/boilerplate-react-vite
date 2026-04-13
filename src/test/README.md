# Testing Setup

This project uses **Vitest** and **React Testing Library** for unit and integration testing.

## Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Writing Tests

### Basic Component Test

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MyComponent } from './my-component';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Using Test Utils with Providers

For components that need Redux store or React Router:

```tsx
import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '@/test/test-utils';
import { MyConnectedComponent } from './my-connected-component';

describe('MyConnectedComponent', () => {
  it('renders with Redux store', () => {
    renderWithProviders(<MyConnectedComponent />, {
      initialState: { user: { name: 'Test User' } }
    });
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });
});
```

### Testing User Interactions

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen, userEvent } from '@/test/test-utils';
import { Button } from './button';

describe('Button', () => {
  it('handles click events', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
```

### Mocking

```tsx
import { describe, it, expect, vi } from 'vitest';

// Mock a module
vi.mock('@/services/api', () => ({
  fetchUser: vi.fn(() => Promise.resolve({ id: 1, name: 'Test' }))
}));

// Mock a function
const mockFn = vi.fn();
mockFn.mockReturnValue(42);
```

## Test File Structure

All test files are organized in `src/__tests__/` directory:

```
src/__tests__/
├── hooks/           # Hook tests
├── utils/           # Utility function tests
├── components/      # Component tests
│   ├── animate/     # Animation component tests
│   ├── hook-form/   # Form component tests
│   └── ...          # Other component subdirectories
└── routes/          # Route utility tests
```

- Test files use `.test.ts` or `.test.tsx` extension
- Directory structure mirrors the source code organization
- Vitest automatically discovers and runs all test files

### File Organization
- `src/__tests__/hooks/` - Tests for custom React hooks
- `src/__tests__/utils/` - Tests for utility functions
- `src/__tests__/components/` - Tests for React components
- `src/__tests__/routes/` - Tests for routing utilities
- `src/test/` - Test configuration and utilities:
  - `setup.ts` - Global test setup
  - `test-utils.tsx` - Custom render functions and utilities
  - Shared mocks and fixtures

## Coverage

Coverage reports are generated in `coverage/` directory when running `npm run test:coverage`.

Aim for:
- **Statements**: 80%+
- **Branches**: 75%+
- **Functions**: 80%+
- **Lines**: 80%+

## Best Practices

1. **Test user behavior, not implementation details**
   - Use `getByRole`, `getByLabelText` over `getByTestId`
   - Test what users see and do

2. **Keep tests simple and focused**
   - One concept per test
   - Clear test descriptions

3. **Use proper assertions**
   - `expect(element).toBeInTheDocument()`
   - `expect(element).toHaveTextContent('...')`
   - `expect(fn).toHaveBeenCalledWith(...)`

4. **Avoid testing implementation details**
   - Don't test internal state
   - Test the component's public interface

5. **Use proper cleanup**
   - Tests are automatically cleaned up after each test
   - Use `afterEach` for custom cleanup if needed

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
