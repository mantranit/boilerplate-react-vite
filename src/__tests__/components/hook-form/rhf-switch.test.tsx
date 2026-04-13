import { describe, it, expect } from 'vitest';
import { render, screen, userEvent } from '@/test/test-utils';
import { RHFSwitch } from 'src/components/hook-form/rhf-switch';
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

describe('RHFSwitch Component', () => {
  it('renders switch component', () => {
    render(
      <TestWrapper defaultValues={{ testSwitch: false }}>
        <RHFSwitch name="testSwitch" label="Test Switch" />
      </TestWrapper>
    );
    expect(screen.getByText('Test Switch')).toBeInTheDocument();
  });

  it('displays unchecked state', () => {
    render(
      <TestWrapper defaultValues={{ testSwitch: false }}>
        <RHFSwitch name="testSwitch" label="Test Switch" />
      </TestWrapper>
    );
    const switchElement = screen.getByRole('checkbox') as HTMLInputElement;
    expect(switchElement.checked).toBe(false);
  });

  it('displays checked state', () => {
    render(
      <TestWrapper defaultValues={{ testSwitch: true }}>
        <RHFSwitch name="testSwitch" label="Test Switch" />
      </TestWrapper>
    );
    const switchElement = screen.getByRole('checkbox') as HTMLInputElement;
    expect(switchElement.checked).toBe(true);
  });

  it('toggles on click', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper defaultValues={{ testSwitch: false }}>
        <RHFSwitch name="testSwitch" label="Test Switch" />
      </TestWrapper>
    );

    const switchElement = screen.getByRole('checkbox') as HTMLInputElement;
    expect(switchElement.checked).toBe(false);

    await user.click(switchElement);
    expect(switchElement.checked).toBe(true);
  });

  it('displays helper text', () => {
    render(
      <TestWrapper defaultValues={{ testSwitch: false }}>
        <RHFSwitch name="testSwitch" label="Test Switch" helperText="This is helper text" />
      </TestWrapper>
    );
    expect(screen.getByText('This is helper text')).toBeInTheDocument();
  });

  it('renders without label with aria-label', () => {
    render(
      <TestWrapper defaultValues={{ testSwitch: false }}>
        <RHFSwitch name="testSwitch" />
      </TestWrapper>
    );
    const switchElement = screen.getByRole('checkbox');
    expect(switchElement).toHaveAttribute('aria-label', 'Switch testSwitch');
  });

  it('handles multiple toggles', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper defaultValues={{ testSwitch: false }}>
        <RHFSwitch name="testSwitch" label="Test Switch" />
      </TestWrapper>
    );

    const switchElement = screen.getByRole('checkbox') as HTMLInputElement;

    await user.click(switchElement);
    expect(switchElement.checked).toBe(true);

    await user.click(switchElement);
    expect(switchElement.checked).toBe(false);

    await user.click(switchElement);
    expect(switchElement.checked).toBe(true);
  });
});
