import { render, screen } from '@utils/testUtils';
import { useNotificationStore } from '@stores/NotificationStore';
import NotificationContainer from '@components/common/NotificationContainer';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

// Mock the notification store using Vitest
vi.mock('@stores/NotificationStore', () => ({
  useNotificationStore: vi.fn(),
}));

describe('NotificationContainer', () => {
  const mockRemoveNotification = vi.fn();
  const mockClearAllNotifications = vi.fn();

  const notificationsMock = [
    { id: '1', message: 'Notification 1' },
    { id: '2', message: 'Notification 2' },
  ];

  beforeEach(() => {
    // Set up the mock implementation for the notification store
    (
      useNotificationStore as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      notifications: notificationsMock,
      removeNotification: mockRemoveNotification,
      clearAllNotifications: mockClearAllNotifications,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the notifications', () => {
    render(<NotificationContainer />, {
      initialEntries: ['/NotificationContainer'],
    });

    expect(screen.getByText('Notification 1')).toBeInTheDocument();
    expect(screen.getByText('Notification 2')).toBeInTheDocument();
  });

  it('shows "Dismiss All" button when there are multiple notifications', () => {
    render(<NotificationContainer />, {
      initialEntries: ['/NotificationContainer'],
    });

    expect(
      screen.getByRole('button', { name: /dismiss all/i }),
    ).toBeInTheDocument();
  });

  it('calls clearAllNotifications when "Dismiss All" button is clicked', async () => {
    const user = userEvent.setup();
    render(<NotificationContainer />, {
      initialEntries: ['/NotificationContainer'],
    });
    const dismissAllButton = screen.getByRole('button', {
      name: /dismiss all/i,
    });
    await user.click(dismissAllButton);

    expect(mockClearAllNotifications).toHaveBeenCalledTimes(1);
  });

  it('calls removeNotification when an individual notification is dismissed', async () => {
    const user = userEvent.setup();
    render(<NotificationContainer />, {
      initialEntries: ['/NotificationContainer'],
    });

    const closeButton = screen.getAllByRole('button', { name: /close/i })[0];
    await user.click(closeButton);

    expect(mockRemoveNotification).toHaveBeenCalledWith('1');
  });
});
