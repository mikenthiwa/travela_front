import {
  ADD_NO_PASSPORT_NOTIFICATION, ADD_NO_PASSPORT_NOTIFICATION_SUCCESS, ADD_NO_PASSPORT_NOTIFICATION_FAILURE
} from '../constants/actionTypes';

export const sendNoPassportNotification = () => ({
  type: ADD_NO_PASSPORT_NOTIFICATION,
});

export const sendNoPassportNotificationFailure = error => ({
  type: ADD_NO_PASSPORT_NOTIFICATION_FAILURE,
  error
});
export const sendNoPassportNotificationSuccess = message => ({
  type: ADD_NO_PASSPORT_NOTIFICATION_SUCCESS,
  message,
});
