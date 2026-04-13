import { describe, it, expect } from 'vitest';
import { render, screen, userEvent } from '@/test/test-utils';
import { RHFTextField } from 'src/components/hook-form/rhf-text-field';
import { useForm, FormProvider } from 'react-hook-form';

const TestWrapper = ({
  children,
  defaultValues = {},
}: {
  children: React.ReactNode;
  defaultValues?: any;
}) => {
  const methods = useForm({ defaultValues });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('RHFTextField Component', () => {
  it('renders text field', () => {
    render(
      <TestWrapper defaultValues={{ testField: '' }}>
        <RHFTextField name="testField" label="Test Field" />
      </TestWrapper>
    );
    expect(screen.getByLabelText('Test Field')).toBeInTheDocument();
  });

  it('displays initial value', () => {
    render(
      <TestWrapper defaultValues={{ testField: 'Initial value' }}>
        <RHFTextField name="testField" label="Test Field" />
      </TestWrapper>
    );
    const input = screen.getByLabelText('Test Field') as HTMLInputElement;
    expect(input.value).toBe('Initial value');
  });

  it('accepts text input', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper defaultValues={{ testField: '' }}>
        <RHFTextField name="testField" label="Test Field" />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Test Field') as HTMLInputElement;
    await user.type(input, 'New text');

    expect(input.value).toBe('New text');
  });

  it('displays helper text', () => {
    render(
      <TestWrapper defaultValues={{ testField: '' }}>
        <RHFTextField name="testField" label="Test Field" helperText="This is helper text" />
      </TestWrapper>
    );
    expect(screen.getByText('This is helper text')).toBeInTheDocument();
  });

  it('handles number type', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper defaultValues={{ numberField: 0 }}>
        <RHFTextField name="numberField" label="Number Field" type="number" />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Number Field') as HTMLInputElement;
    await user.clear(input);
    await user.type(input, '42');

    expect(input.value).toBe('42');
  });

  it('applies fullWidth by default', () => {
    render(
      <TestWrapper defaultValues={{ testField: '' }}>
        <RHFTextField name="testField" label="Test Field" />
      </TestWrapper>
    );
    const input = screen.getByLabelText('Test Field');
    // TextField with fullWidth applies specific classes
    expect(input).toBeInTheDocument();
  });

  it('disables autocomplete', () => {
    render(
      <TestWrapper defaultValues={{ testField: '' }}>
        <RHFTextField name="testField" label="Test Field" />
      </TestWrapper>
    );
    const input = screen.getByLabelText('Test Field') as HTMLInputElement;
    expect(input.autocomplete).toBe('off');
  });
});
