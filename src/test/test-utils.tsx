import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

// Create a mock store for testing
export const createMockStore = (initialState = {}, reducers = {}) => {
  // Provide a default empty reducer if none provided
  const defaultReducer = (state = {}) => state;
  
  return configureStore({
    reducer: Object.keys(reducers).length > 0 ? reducers : { app: defaultReducer },
    preloadedState: initialState,
  });
};

// Custom render function with common providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialState?: any;
  store?: ReturnType<typeof createMockStore>;
  route?: string;
}

export const renderWithProviders = (
  ui: ReactElement,
  {
    initialState = {},
    store = createMockStore(initialState),
    route = '/',
    ...renderOptions
  }: CustomRenderOptions = {}
) => {
  window.history.pushState({}, 'Test page', route);

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  };

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};

// Re-export everything from testing library
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
