import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen, userEvent } from '@/test/test-utils';
import { RHFPasswordField } from 'src/components/hook-form/rhf-password-field';
import { useForm, FormProvider } from 'react-hook-form';

// Wrapper component to provide form context
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    defaultValues: {
      password: '',
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('RHFPasswordField Component', () => {
  it('renders password field', () => {
    renderWithProviders(
      <TestWrapper>
        <RHFPasswordField name="password" label="Password" />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('toggles password visibility when icon is clicked', async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <TestWrapper>
        <RHFPasswordField name="password" label="Password" />
      </TestWrapper>
    );

    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
    const toggleButton = screen.getByRole('button');

    // Initially should be password type
    expect(passwordInput.type).toBe('password');

    // Click toggle button
    await user.click(toggleButton);

    // Should now be text type
    expect(passwordInput.type).toBe('text');

    // Click again to toggle back
    await user.click(toggleButton);

    // Should be password type again
    expect(passwordInput.type).toBe('password');
  });

  it('accepts text input', async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <TestWrapper>
        <RHFPasswordField name="password" label="Password" />
      </TestWrapper>
    );

    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;

    await user.type(passwordInput, 'mySecretPassword123');

    expect(passwordInput.value).toBe('mySecretPassword123');
  });
});
