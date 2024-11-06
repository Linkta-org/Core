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

    // Debug what's being rendered
    console.log('Auth State:', authState);
    console.log('Current Route:', initialRoute);
    screen.debug();

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
    // Use the specific route where authenticated content should appear
    renderWithAuth(true, '/dashboard'); // or whatever your authenticated route is
    expect(
      screen.getByRole('heading', {
        name: /start your learning journey here:/i,
      }),
    ).toBeInTheDocument();
  });
});
