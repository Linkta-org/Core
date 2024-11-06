import React from 'react';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Theme from '@/utils/customTheme';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

interface CustomRenderOptions extends RenderOptions {
  routingOptions?: {
    initialEntries?: string[];
    initialIndex?: number;
  };
}

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
      },
    },
  });

export function customRender(
  ui: React.ReactElement,
  { routingOptions = {}, ...renderOptions }: CustomRenderOptions = {},
) {
  const user = userEvent.setup();
  const queryClient = createTestQueryClient();

  const { initialEntries = ['/'], initialIndex } = routingOptions;

  const router = createMemoryRouter([{ path: '*', element: ui }], {
    initialEntries,
    initialIndex,
  });

  function AllTheProviders({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={Theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    );
  }

  return {
    user,
    queryClient,
    ...render(
      <AllTheProviders>
        <RouterProvider router={router} />
      </AllTheProviders>,
      renderOptions,
    ),
  };
}

export * from '@testing-library/react';
export { customRender as render };
