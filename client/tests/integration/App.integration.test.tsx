import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, cleanup, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import IndexRouter from '@routes/index';

// Mock window.matchMedia for components that use media queries
if (!window.matchMedia) {
  window.matchMedia = function (query: string): MediaQueryList {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    };
  };
}

describe('App Integration', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
  });

  afterEach(() => {
    cleanup();
    queryClient.clear();
  });

  it('renders homepage successfully', async () => {
    // Wrap rendering in act to ensure all updates are applied before assertions
    await act(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={IndexRouter()} />
        </QueryClientProvider>,
      );
    });

    // Test if the main headline appears
    expect(screen.getByText(/Revolutionizing Learning/i)).toBeInTheDocument();
  });
});
