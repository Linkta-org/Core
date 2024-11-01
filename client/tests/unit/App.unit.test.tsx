import React from 'react';
import { render, screen } from '@utils/testUtils';
import { vi } from 'vitest';
import type { Mock } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import useWatchAuthenticatedState from '@hooks/useWatchAuthenticatedState';
import { getRoutes } from '@routes/index';

vi.mock('@hooks/useWatchAuthenticatedState', () => ({
  default: vi.fn(),
}));

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderApp = (isAuthenticated: boolean) => {
    (useWatchAuthenticatedState as Mock).mockReturnValue({
      isAuthenticated,
      isLoading: false,
    });

    const router = createMemoryRouter(getRoutes());
    render(<RouterProvider router={router} />);
  };

  it('renders UnauthorizedLayout when not authenticated', () => {
    renderApp(false);
    expect(
      screen.getByRole('heading', {
        name: /revolutionizing learning: intuitive visualization for complex concepts/i,
      }),
    ).toBeInTheDocument();
  });

  it('renders MainLayout when authenticated', () => {
    renderApp(true);
    expect(screen.getByText('Explore a New Topic')).toBeInTheDocument();
  });
});
