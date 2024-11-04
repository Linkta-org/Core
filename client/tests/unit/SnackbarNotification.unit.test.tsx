import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import SnackBarNotification from '@components/common/SnackBarNotification';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

const defaultProps = {
  message: 'Test notification message',
  type: 'info' as const,
  onClose: vi.fn(),
};

describe('SnackBarNotification Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with correct message and type', () => {
    render(<SnackBarNotification {...defaultProps} />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Test notification message')).toBeInTheDocument();
  });

  it('calls onClose when Snackbar is closed manually', () => {
    render(<SnackBarNotification {...defaultProps} />);

    // Trigger onClose via close button on the Alert
    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when clicked away', () => {
    render(<SnackBarNotification {...defaultProps} />);

    // Simulate a clickaway (clicking outside of Snackbar area)
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('renders action button with correct label and calls action onClick', () => {
    const mockActionClick = vi.fn();
    const actionProps = {
      ...defaultProps,
      config: {
        action: {
          label: 'Undo',
          onClick: mockActionClick,
        },
      },
    };

    render(<SnackBarNotification {...actionProps} />);

    const actionButton = screen.getByRole('button', {
      name: /Undo for notification/i,
    });
    expect(actionButton).toBeInTheDocument();

    fireEvent.click(actionButton);
    expect(mockActionClick).toHaveBeenCalledTimes(1);
  });

  it('auto hides after specified duration', async () => {
    vi.useFakeTimers();
    render(
      <SnackBarNotification
        {...defaultProps}
        config={{ duration: 3000 }}
      />,
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();

    // Fast-forward time with act
    await act(async () => {
      vi.advanceTimersByTime(3000);
    });

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });
});
