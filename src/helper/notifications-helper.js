/* eslint import/prefer-default-export: 0 */

const checkNotificationType = (notification, type, successMessage) => {
  const { notificationType } = notification;
  if (notificationType === type && successMessage.includes(type)) {
    notification.notificationStatus = 'read';
  }
  return notification;
};
export const updateNotificationsStatus = (state, successMessage) => {
  const { notifications } = state;
  const updatedNotifications = notifications.map(notification => {
    notification =
      checkNotificationType(notification, 'pending', successMessage);
    if (notification.notificationStatus !== 'read') {
      notification =
        checkNotificationType(notification, 'general', successMessage);
    }
    return notification;
  });

  return updatedNotifications;
};
