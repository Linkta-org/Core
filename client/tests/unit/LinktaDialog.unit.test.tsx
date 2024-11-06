import { render, screen } from '@utils/testUtils';
import LinktaDialog from '@components/common/LinktaDialog';
import { waitFor } from '@testing-library/react';
import React from 'react';

describe('LinktaDialog Component', () => {
  const mockOnConfirm = vi.fn();
  const mockOnCancel = vi.fn();

  const defaultProps = {
    isOpen: true,
    title: 'Test Dialog Title',
    content: <p>Test Dialog Content</p>,
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    onConfirm: mockOnConfirm,
    onCancel: mockOnCancel,
    confirmButtonClass: 'test-confirm-class',
    confirmButtonDisabled: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the dialog with title and content', async () => {
    render(<LinktaDialog {...defaultProps} />, {
      routerOptions: {
        initialEntries: ['/linktaDialog'],
      },
    });

    expect(await screen.findByText('Test Dialog Title')).toBeInTheDocument();
    expect(await screen.findByText('Test Dialog Content')).toBeInTheDocument();
  });

  it('should call onConfirm when the confirm button is clicked', async () => {
    const { user } = render(<LinktaDialog {...defaultProps} />, {
      routerOptions: {
        initialEntries: ['/linktaDialog'],
      },
    });
    const confirmButton = await screen.findByRole('button', {
      name: /confirm/i,
    });
    await user.click(confirmButton);
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it('should call onCancel when the cancel button is clicked', async () => {
    const { user } = render(<LinktaDialog {...defaultProps} />, {
      routerOptions: {
        initialEntries: ['/linktaDialog'],
      },
    });
    const cancelButton = await screen.findByRole('button', { name: /cancel/i });
    await user.click(cancelButton);
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('should apply the confirmButtonClass to the confirm button', async () => {
    render(<LinktaDialog {...defaultProps} />, {
      routerOptions: {
        initialEntries: ['/linktaDialog'],
      },
    });
    const confirmButton = await screen.findByRole('button', {
      name: /confirm/i,
    });
    expect(confirmButton).toHaveClass('test-confirm-class');
  });

  it('should disable the confirm button when confirmButtonDisabled is true', async () => {
    render(
      <LinktaDialog
        {...defaultProps}
        confirmButtonDisabled={true}
      />,
      {
        routerOptions: {
          initialEntries: ['/linktaDialog'],
        },
      },
    );
    const confirmButton = await screen.findByRole('button', {
      name: /confirm/i,
    });
    expect(confirmButton).toBeDisabled();
  });

  it('should not render the dialog when isOpen is false', async () => {
    render(
      <LinktaDialog
        {...defaultProps}
        isOpen={false}
      />,
      {
        routerOptions: {
          initialEntries: ['/linktaDialog'],
        },
      },
    );

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});
