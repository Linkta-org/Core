import { MemoryRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';
import CssBaseline from '@mui/material/CssBaseline';
import Theme from './customTheme';

import type { ReactElement } from 'react';
import type { RenderOptions } from '@testing-library/react';

// Create a new QueryClient instance with test-specific settings
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
      },
    },
  });

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  path?: string;
  route?: string;
}

/**
 * Custom render function that wraps components with necessary providers
 * and routing configuration
 */
const customRender = (
  ui: ReactElement,
  { path = '/*', route = '/', ...options }: CustomRenderOptions = {},
) => {
  const queryClient = createTestQueryClient();
  const user = userEvent.setup();

  // Wrapper component that provides all necessary context providers
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={[route]}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={Theme}>
          <CssBaseline />
          <Routes>
            <Route
              path={path}
              element={children}
            />
          </Routes>
        </ThemeProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );

  return {
    user,
    queryClient,
    ...render(ui, { wrapper: Wrapper, ...options }),
  };
};

// Re-export everything from testing-library
export * from '@testing-library/react';
export { customRender as render };
