import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import {throwError} from 'redux-saga-test-plan/providers';
import watchCrashReport from '../errorBoundarySaga';
import ErrorBoundaryAPI from '../../../services/ErrorBoundaryAPI';
import {reportCrash, reportCrashFailure, reportCrashSuccess} from '../../actionCreator/errorBoundaryActions';

describe('Error Boundary Saga', () => {
  const data = {
    stackTrace: 'stack trace data',
    link: 'https://google.com'
  };

  it('Makes an API call to report the crash', () => {
    const response = {
      data: {
        message: 'Crash reported successfully'
      }
    };
    return expectSaga(watchCrashReport).provide([
      [ call(ErrorBoundaryAPI.postCrash, data), response ]
    ])
      .put(reportCrashSuccess(response.data))
      .dispatch(reportCrash(data))
      .silentRun();
  });

  it('Should handle an error from the API', () => {
    const error = new Error();
    error.response = {
      message: 'Unable to post to slack channel'
    };

    return expectSaga(watchCrashReport).provide([
      [call(ErrorBoundaryAPI.postCrash, data), throwError(error)]
    ]).put(reportCrashFailure(error))
      .dispatch(reportCrash(data))
      .silentRun();
  });
});
