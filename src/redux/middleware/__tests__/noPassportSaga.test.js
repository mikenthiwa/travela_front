import * as  matchers from 'redux-saga-test-plan/matchers';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import noPassportAPI from '../../../services/noPassportAPI';
import { ADD_NO_PASSPORT_NOTIFICATION, ADD_NO_PASSPORT_NOTIFICATION_SUCCESS, ADD_NO_PASSPORT_NOTIFICATION_FAILURE
} from '../../constants/actionTypes';
import { watchPostNoPassportNotification, postNoPassportNotification } from '../noPassportSaga';


describe('Test Suite For No Passport Notification Sagas', () => {
  const response = {
    data: {
      success: true,
      message: 'Successfully sent'
    }
  };
  const error = {
    response: {
      data: {
        error: 'Something went wrong'
      }
    }
  };
  it('should send notification to travel team when user has no passport', () => {
    return expectSaga(watchPostNoPassportNotification, noPassportAPI)
      .provide([[matchers.call.fn(noPassportAPI.postNoPassport), response ]])
      .put({
        type: ADD_NO_PASSPORT_NOTIFICATION_SUCCESS,
        message: response.data.message,
      })
      .dispatch({
        type: ADD_NO_PASSPORT_NOTIFICATION,
      })
      .silentRun();
  });
  it('should throws error when wrong call to the API is made', () => {
    return expectSaga(watchPostNoPassportNotification, noPassportAPI)
      .provide([[matchers.call.fn(noPassportAPI.postNoPassport), throwError(error) ]])
      .put({
        type: ADD_NO_PASSPORT_NOTIFICATION_FAILURE,
        error: error.response.data.error
      })
      .dispatch({
        type: ADD_NO_PASSPORT_NOTIFICATION,
      })
      .silentRun();
  });
});


