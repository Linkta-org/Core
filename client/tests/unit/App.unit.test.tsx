import React from 'react';
import { render, screen } from '@utils/testUtils';
import App from '@/App';

describe('App', () => {
  it('renders homepage content', () => {
    render(<App />);

    expect(screen.getByText(/Revolutionizing Learning/i)).toBeInTheDocument();
  });
});
