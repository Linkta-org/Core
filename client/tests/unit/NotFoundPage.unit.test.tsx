import React from 'react';
import { render, screen } from '@utils/testUtils';
import NotFoundPage from '@features/error-pages/NotFoundPage';

describe('NotFoundPage Component', () => {
  it('should render the "Page could not be found" message', () => {
    render(<NotFoundPage />, {
      routerOptions: {
        routes: [
          {
            path: '*',
            element: <NotFoundPage />,
          },
        ],
      },
    });

    expect(screen.getByText(/Page could not be found/)).toBeInTheDocument();
  });
  it('should navigate to the homepage when "Return to Homepage" button is clicked', async () => {
    const { user } = render(<NotFoundPage />, {
      routerOptions: {
        routes: [
          {
            path: '/',
            element: <div>Home Page</div>,
          },
          {
            path: '*',
            element: <NotFoundPage />,
          },
        ],
        initialEntries: ['/not-found'],
      },
    });

    await user.click(
      screen.getByRole('button', { name: /return to homepage/i }),
    );

    expect(window.location.pathname).toBe('/');
  });
});
