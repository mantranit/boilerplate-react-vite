import { useMemo, useState, useCallback, createContext, ReactNode } from 'react';

import { useLocalStorage } from 'src/hooks/use-local-storage';

import { STORAGE_KEY } from '../config-settings';
import { defaultFont } from 'src/theme/core/typography';

// ----------------------------------------------------------------------

export const SettingsContext = createContext<any>({
  colorScheme: 'light',
  direction: 'ltr',
  contrast: 'default',
  navLayout: 'vertical',
  primaryColor: 'red',
  navColor: 'integrate',
  compactLayout: true,
  fontFamily: defaultFont,
});

export const SettingsConsumer = SettingsContext.Consumer;

// ----------------------------------------------------------------------
export type TSettingsProviderProps = {
  children: ReactNode;
  settings: any;
};

export function SettingsProvider({ children, settings }: TSettingsProviderProps) {
  const values = useLocalStorage(STORAGE_KEY, settings);

  const [openDrawer, setOpenDrawer] = useState(false);

  const onToggleDrawer = useCallback(() => {
    setOpenDrawer((prev) => !prev);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  const memoizedValue = useMemo(
    () => ({
      ...values.state,
      canReset: values.canReset,
      onReset: values.resetState,
      onUpdate: values.setState,
      onUpdateField: values.setField,
      openDrawer,
      onCloseDrawer,
      onToggleDrawer,
    }),
    [
      values.state,
      values.setField,
      values.setState,
      values.canReset,
      values.resetState,
      openDrawer,
      onCloseDrawer,
      onToggleDrawer,
    ]
  );

  return <SettingsContext.Provider value={memoizedValue}>{children}</SettingsContext.Provider>;
}
