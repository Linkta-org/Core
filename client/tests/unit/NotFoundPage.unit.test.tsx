import { render, screen } from '@utils/testUtils';
import NotFoundPage from '@features/error-pages/NotFoundPage';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

describe('NotFoundPage Component', () => {
  it('should render the "Page could not be found" message', () => {
    // TODO: Consider moving this back into the customRender function
    const router = createMemoryRouter([
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ]);

    render(<RouterProvider router={router} />);
    expect(screen.getByText(/Page could not be found/)).toBeInTheDocument();
  });

  it('should navigate to the homepage when "Return to Homepage" button is clicked', async () => {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <div>Home Page</div>,
        },
        {
          path: '*',
          element: <NotFoundPage />,
        },
      ],
      {
        initialEntries: ['/not-found'],
        initialIndex: 0,
      },
    );

    const user = userEvent.setup();
    render(<RouterProvider router={router} />);

    await user.click(
      screen.getByRole('button', { name: /return to homepage/i }),
    );

    // Check if we're at the home route
    expect(window.location.pathname).toBe('/');
  });
});
