import { call } from 'redux-saga/effects';
import {expectSaga} from 'redux-saga-test-plan';
import {throwError} from 'redux-saga-test-plan/providers';
import { watchFetchAllEmailTemplates } from '../listEmailTemplatesSaga';
import listOfTemplates from '../../../views/ReminderSetup/__mocks__/ReminderSetup';
import {
  FETCH_ALL_EMAIL_TEMPLATES,
  FETCH_ALL_EMAIL_TEMPLATES_FAILURE,
  FETCH_ALL_EMAIL_TEMPLATES_SUCCESS
} from '../../constants/actionTypes';
import ReminderManagementAPI from '../../../services/ReminderManagementAPI';

const { templates, pagination } = listOfTemplates;
describe('reminder set up sagas', () => {
  it('gets a response with templates and dispatches FETCH_ALL_EMAIL_TEMPLATES_SUCCESS', () => {
    const response = { data :{
      success: true,
      message: 'success',
      metaData: {
        templates, pagination
      }
    }};
    return expectSaga(watchFetchAllEmailTemplates)
      .provide([[call(ReminderManagementAPI.getAllEmailTemplates, '?page=1'), response]])
      .put({
        type: FETCH_ALL_EMAIL_TEMPLATES_SUCCESS,
        templates: response.data.metaData.templates,
        pagination: response.data.metaData.pagination
      })
      .dispatch({
        type: FETCH_ALL_EMAIL_TEMPLATES,
        url: '?page=1'
      })
      .silentRun();
  });

  it('dispatches FETCH_ALL_EMAIL_TEMPLATES_FAILURE', () => {
    const error = new Error('Server error, try again');
    error.response = { status: 500 };
    return expectSaga(watchFetchAllEmailTemplates)
      .provide([[call(ReminderManagementAPI.getAllEmailTemplates, '?page=2'), throwError(error)]])
      .put({
        type: FETCH_ALL_EMAIL_TEMPLATES_FAILURE,
        errors: 'Server error, try again'
      })
      .dispatch({
        type: FETCH_ALL_EMAIL_TEMPLATES,
        url: '?page=2'
      })
      .silentRun();
  });
});
