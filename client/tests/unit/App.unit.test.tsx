import React from 'react';
import { render, screen } from '@utils/testUtils';
import App from '@/App';

describe('App', () => {
  it('renders the app layout with expected content', () => {
    render(<App />);

    // Verify the expected content is present in the rendered app
    expect(
      screen.getByText(
        'Revolutionizing Learning: Intuitive Visualization for Complex Concepts',
      ),
    ).toBeInTheDocument();
  });
});
