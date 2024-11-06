import React from 'react';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Theme from '@/utils/customTheme';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  queryClient?: QueryClient;
  routerOptions?: {
    initialEntries?: string[];
    routes?: Array<{
      path: string;
      element: React.ReactElement;
    }>;
  };
}

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
}

export function customRender(
  ui: React.ReactElement,
  {
    queryClient = createTestQueryClient(),
    routerOptions,
    ...renderOptions
  }: CustomRenderOptions = {},
) {
  const user = userEvent.setup();

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

  // Only wrap in RouterProvider if routerOptions is provided
  const wrappedUi = routerOptions ? (
    <RouterProvider
      router={createMemoryRouter(
        routerOptions.routes ?? [{ path: '*', element: ui }],
        { initialEntries: routerOptions.initialEntries ?? ['/'] },
      )}
    />
  ) : (
    ui
  );

  return {
    user,
    queryClient,
    ...render(<AllTheProviders>{wrappedUi}</AllTheProviders>, renderOptions),
  };
}

export * from '@testing-library/react';
export { customRender as render };
