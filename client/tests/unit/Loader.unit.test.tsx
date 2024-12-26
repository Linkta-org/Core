import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from '@components/common/Loader';

describe('Loader Component', () => {
  it('should display the loading message', () => {
    render(<Loader />);
    expect(screen.getByText(/this may take a moment/i)).toBeInTheDocument();
  });

  it('renders the CircularProgress spinner', () => {
    render(<Loader />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
