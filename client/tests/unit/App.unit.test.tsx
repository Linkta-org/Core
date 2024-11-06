import React from 'react';
import { render, screen } from '@utils/testUtils';
import { vi } from 'vitest';
import type { Mock } from 'vitest';
import useWatchAuthenticatedState from '@hooks/useWatchAuthenticatedState';
import App from '@/App';
import { createMemoryRouter } from 'react-router-dom';
import { getRoutes } from '@/routes';

vi.mock('@hooks/useWatchAuthenticatedState', () => ({
  default: vi.fn(),
}));

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithAuth = (isAuthenticated: boolean, initialRoute = '/') => {
    const authState = {
      isAuthenticated,
      isLoading: false,
    };

    (useWatchAuthenticatedState as Mock).mockReturnValue(authState);

    const router = createMemoryRouter(getRoutes(), {
      initialEntries: [initialRoute],
      initialIndex: 0,
    });

    const result = render(<App router={router} />);

    return result;
  };

  it('renders homepage content when not authenticated', () => {
    renderWithAuth(false, '/');
    expect(
      screen.getByRole('heading', {
        name: /revolutionizing learning: intuitive visualization for complex concepts/i,
      }),
    ).toBeInTheDocument();
  });

  it('renders authenticated content when authenticated', () => {
    renderWithAuth(true, '/generated');
    expect(
      screen.getByRole('link', { name: /explore a new topic/i }),
    ).toBeInTheDocument();
  });
});
