import { sendNoPassportNotification, sendNoPassportNotificationFailure, sendNoPassportNotificationSuccess } from '../noPassportActions';

describe ('No Passport Actions', () => {
  it('should return type ADD_NO_PASSPORT_NOTIFICATION', () => {
    const expectedAction = { type: 'ADD_NO_PASSPORT_NOTIFICATION' };
    const actualAction = sendNoPassportNotification();
    expect(expectedAction).toEqual(actualAction);
  });
  it('should return type ADD_NO_PASSPORT_NOTIFICATION_SUCCESS', () => {
    const message = 'some message';
    const expectedAction = { type: 'ADD_NO_PASSPORT_NOTIFICATION_SUCCESS', message };
    const actualAction = sendNoPassportNotificationSuccess(message);
    expect(expectedAction).toEqual(actualAction);
  });
  it('should return type ADD_NO_PASSPORT_NOTIFICATION_FAILURE', () => {
    const error = 'no-token';
    const expectedAction = { type: 'ADD_NO_PASSPORT_NOTIFICATION_FAILURE', error };
    const actualAction = sendNoPassportNotificationFailure(error);
    expect(expectedAction).toEqual(actualAction);
  });
});

