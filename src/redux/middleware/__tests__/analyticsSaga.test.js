import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as  matchers from 'redux-saga-test-plan/matchers';

import { watchFetchAnalytics, watchdownloadAnalytics } from '../analyticsSaga';
import AnalyticsAPI from '../../../services/AnalyticsAPI';
import {
  FETCH_ANALYTICS_SUCCESS,
  FETCH_ANALYTICS,
  FETCH_ANALYTICS_FAILURE,
  DOWNLOAD_ANALYTICS,
  DOWNLOAD_ANALYTICS_FAILURE
} from '../../constants/actionTypes';

const response =  {
  success: true,
  isLoading: false,
  error: false,
  payload: {
    total_requests: 230
  }
};

const error = 'Error Message';
describe('Test Analytics Saga', () => {
  const response = {
    data:
      { data: {total_requests: 230} }
  };

  it('should fetch all the analytics successfully', () => {
    return expectSaga(watchFetchAnalytics, AnalyticsAPI)
      .provide([[matchers.call.fn(AnalyticsAPI.getAnalytics, '?location'), response]])
      .put({
        type: FETCH_ANALYTICS_SUCCESS,
        payload: response.data.data
      })
      .dispatch({
        type: FETCH_ANALYTICS,
        query: '?location'
      })
      .silentRun();
  });

  it('should export all the analytics successfully', () => {
    return expectSaga(watchdownloadAnalytics, AnalyticsAPI)
      .provide([[matchers.call.fn(AnalyticsAPI.exportAnalytics, '?type=file'), response]])
      .dispatch({
        type: DOWNLOAD_ANALYTICS,
        query: '?type=file'
      })
      .silentRun();
  });

  it('throws an error when fetching analytics items fails', () => {
    const error = new Error('Server error, try again');
    error.response = { status: 500 };
    expectSaga(watchFetchAnalytics, AnalyticsAPI)
      .provide([
        [matchers.call.fn(AnalyticsAPI.getAnalytics, '?location'), throwError(error)]
      ])
      .put({
        type: FETCH_ANALYTICS_FAILURE,
        error
      })
      .dispatch({
        type: FETCH_ANALYTICS,
        query: '?location'
      })
      .silentRun();
  });

  it('throws an error when exporting analytics items fails', () => {
    const error = new Error('Server error, try again');
    error.response = { status: 500 };
    expectSaga(watchdownloadAnalytics, AnalyticsAPI)
      .provide([
        [matchers.call.fn(AnalyticsAPI.exportAnalytics, '?type=file'), throwError(error)]
      ])
      .put({
        type: DOWNLOAD_ANALYTICS_FAILURE,
        error
      })
      .dispatch({
        type: DOWNLOAD_ANALYTICS,
        query: '?type=file'
      })
      .silentRun();
  });

});
