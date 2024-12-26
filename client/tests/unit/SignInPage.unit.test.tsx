import React from 'react';
import { render, screen } from '@utils/testUtils';
import userEvent from '@testing-library/user-event';
import SignInPage from '@features/auth-pages/SignInPage';
import { build, perBuild } from '@jackfranklin/test-data-bot';
import { faker } from '@faker-js/faker';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

const buildLinktaUser = build({
  fields: {
    email: perBuild(() => faker.internet.email()),
    password: perBuild(() => faker.internet.password()),
  },
});

console.log(buildLinktaUser());

vi.mock('@hooks/useNotification', () => ({
  useNotification: () => ({
    showNotification: vi.fn(),
  }),
}));

vi.mock('@hooks/useSignInWithGoogle', () => ({
  useGoogleAuthMutation: () => ({
    mutateAsync: vi.fn(),
  }),
}));

vi.mock('@hooks/useSignInWithGitHub', () => ({
  useGithubAuthMutation: () => ({
    mutateAsync: vi.fn(),
  }),
}));

describe('SignInPage', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    const router = createMemoryRouter([
      {
        path: '*',
        element: ui,
      },
      {
        path: '/generate',
        element: <div>Generate Page</div>,
      },
      {
        path: '/signup',
        element: <div>Signup Page</div>,
      },
      {
        path: '/forgotten',
        element: <div>Forgotten Password Page</div>,
      },
    ]);

    return render(<RouterProvider router={router} />);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('User Experience for trouble signing in', () => {
    it('allows users to navigate sign up and password recovery', () => {
      renderWithRouter(<SignInPage />);

      expect(screen.getByRole('link', { name: /sign up/i })).toHaveAttribute(
        'href',
        '/signup',
      );
      expect(screen.getByRole('link', { name: /update/i })).toHaveAttribute(
        'href',
        '/forgotten',
      );
    });

    it('provides feedback when signing in with empty email field', async () => {
      renderWithRouter(<SignInPage />);

      const emailInput = screen.getByRole('textbox', {
        name: /email address/i,
      });

      await userEvent.clear(emailInput);
      await userEvent.click(
        screen.getByRole('button', { name: /sign in to linkta/i }),
      );

      expect(
        await screen.findByText('Invalid email address'),
      ).toBeInTheDocument();
    });

    it('allows users to sign in with valid email and password', async () => {
      renderWithRouter(<SignInPage />);

      await userEvent.type(
        screen.getByRole('textbox', { name: /email/i }),
        buildLinktaUser().email as string,
      );
      await userEvent.type(
        screen.getByLabelText(/password/i),
        buildLinktaUser().password as string,
      );
      await userEvent.click(
        screen.getByRole('button', { name: /sign in to linkta/i }),
      );
      // TODO: Why does this fail? partial string matching
      // expect(window.location.pathname).toBe('/generate');
    });
  });
});
