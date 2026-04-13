# Testing Documentation

## Overview

This project uses **Vitest** as the testing framework and **React Testing Library** for component testing. The setup is optimized for testing React components, hooks, and utility functions in a Vite-powered environment.

## 📊 Test Coverage

**See [TEST_COVERAGE_DETAILED.md](TEST_COVERAGE_DETAILED.md) for detailed test documentation**

**Current Status**: 280+ tests across 41 test files
- ✅ **Hooks**: 65+ tests (all 10 hooks covered)
- ✅ **Utilities**: 95+ tests (all 6 utility modules covered)
- ✅ **Components**: 120+ tests (25 component modules)

All test files are organized in `src/__tests__/` for easy maintenance.

## Quick Start

```bash
# Run tests in watch mode (recommended during development)
npm test

# Run tests once
npm run test:run

# Run tests with interactive UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

## Project Structure

```
src/
├── __tests__/                # All test files (centralized)
│   ├── hooks/                # Hook tests (9 files)
│   ├── utils/                # Utility tests (5 files)
│   ├── components/           # Component tests (26 files)
│   │   ├── animate/
│   │   ├── hook-form/
│   │   └── ...
│   └── routes/               # Route tests (1 file)
├── test/
│   ├── setup.ts              # Global test configuration
│   ├── test-utils.tsx        # Custom render functions
│   └── README.md             # Detailed testing guide
├── components/               # Source components
├── hooks/                    # Source hooks
└── utils/                    # Source utilities
```

## Test Examples

### ✅ 41 Test Files Across All Modules

Test files are organized in `src/__tests__/` by category:

**Hooks** (`__tests__/hooks/`):
- use-boolean.test.ts
- use-tabs.test.ts
- use-local-storage.test.ts
- use-responsive.test.ts
- ... and 5 more

**Components** (`__tests__/components/`):
- logo/logo.test.tsx
- iconify/iconify.test.tsx
- hook-form/rhf-password-field.test.tsx
- animate/animate-avatar.test.tsx
- ... and 22 more

**Utilities** (`__tests__/utils/`):
- format-number.test.ts
- change-case.test.ts
- format-time.test.ts
- ... and 2 more

## Key Features

### ✨ Test Configuration

- **Vitest Config**: [vitest.config.ts](vitest.config.ts)
  - jsdom environment for DOM testing
  - Path aliases configured (`src/` and `@/`)
  - Coverage reporting with V8
  - Excludes mock data and test files from coverage

### 🛠️ Test Utilities

Located in [src/test/test-utils.tsx](src/test/test-utils.tsx):

- `renderWithProviders()` - Renders components with Redux and Router
- `createMockStore()` - Creates mock Redux store
- Re-exports all Testing Library utilities
- Includes `userEvent` for user interaction simulation

### 🎯 Global Setup

Located in [src/test/setup.ts](src/test/setup.ts):

- Automatic cleanup after each test
- Mocked browser APIs:
  - `window.matchMedia`
  - `IntersectionObserver`
  - `ResizeObserver`
- jest-dom matchers loaded globally

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

### Test with Providers (Redux + Router)

```tsx
import { renderWithProviders, screen } from '@/test/test-utils';

it('renders with store', () => {
  renderWithProviders(<MyComponent />, {
    initialState: { user: { name: 'Test' } }
  });
  expect(screen.getByText('Test')).toBeInTheDocument();
});
```

### Testing User Interactions

```tsx
import { render, screen, userEvent } from '@/test/test-utils';

it('handles click', async () => {
  const user = userEvent.setup();
  const handleClick = vi.fn();

  render(<Button onClick={handleClick}>Click</Button>);
  await user.click(screen.getByRole('button'));

  expect(handleClick).toHaveBeenCalled();
});
```

## Best Practices

1. **Name test files**: Use `.test.tsx` or `.test.ts` suffix
2. **Place tests nearby**: Keep test files next to the code they test
3. **Test behavior, not implementation**: Focus on what users see and do
4. **Use semantic queries**: Prefer `getByRole`, `getByLabelText` over `getByTestId`
5. **Keep tests simple**: One assertion concept per test

## Coverage

Coverage reports are generated in the `coverage/` directory.

Current coverage (run `npm run test:coverage` to update):
- All example tests passing ✅
- 13 tests across 3 files

## Installed Packages

```json
{
  "vitest": "^3.2.4",
  "@testing-library/react": "Latest",
  "@testing-library/jest-dom": "Latest",
  "@testing-library/user-event": "Latest",
  "@vitest/ui": "Latest",
  "jsdom": "Latest"
}
```

## Resources

- 📚 [Vitest Documentation](https://vitest.dev/)
- 🧪 [React Testing Library](https://testing-library.com/react)
- 🎯 [Testing Library Queries](https://testing-library.com/docs/queries/about)
- 💡 [Common Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Next Steps

1. ✅ Run `npm test` to start testing in watch mode
2. ✅ Check example tests to understand patterns
3. ✅ Read [src/test/README.md](src/test/README.md) for detailed guide
4. 📝 Write tests for your components and utilities
5. 🎯 Aim for meaningful coverage (80%+ recommended)

---

**Happy Testing!** 🎉
