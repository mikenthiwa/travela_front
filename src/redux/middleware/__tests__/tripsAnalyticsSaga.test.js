import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import toast from 'toastr';
import FileSaver from 'file-saver';
import AnalyticsAPI from '../../../services/AnalyticsAPI';
import {
  watchFetchDepartmentTrips,
} from '../tripsAnalyticsSaga';
import {
  fetchDepartmentsTripsResponse,
  fetchDepartmentsTripsError
} from '../../__mocks__/reduxMocks';
import {
  FETCH_DEPARTMENT_TRIPS_ANALYTICS,
  FETCH_DEPARTMENT_TRIPS_ANALYTICS_SUCCESS,
  FETCH_DEPARTMENT_TRIPS_ANALYTICS_FAILURE
} from '../../constants/actionTypes';

FileSaver.saveAs = jest.fn();

describe('Test suite for trips Analytics Saga', () => {
  describe('Test for department trips analytics', () => {
    const date = new Date();
    const query = {
      filterBy: 'month',
      type: 'json',
      firstDate: date.toISOString(),
      lastDate: new Date(date.getTime() + 86400000).toISOString()
    };
    it('should return report analytics if request was successful', () => {
      const response = {
        data: fetchDepartmentsTripsResponse
      };
      return expectSaga(watchFetchDepartmentTrips, AnalyticsAPI)
        .provide([
          [call(AnalyticsAPI.getDepartmentTrips, query), response]
        ])
        .put({
          type: FETCH_DEPARTMENT_TRIPS_ANALYTICS_SUCCESS,
          report: fetchDepartmentsTripsResponse.data,
          success: fetchDepartmentsTripsResponse.success
        })
        .dispatch({
          type: FETCH_DEPARTMENT_TRIPS_ANALYTICS,
          query
        })
        .silentRun();
    });

    it('should throw an error if request failed', () => {
      const error = {
        response: {
          status: 422,
          data: {
            errors: [{message: 'Type must be "json" or "file"'}]
          }
        }
      };
      return expectSaga(watchFetchDepartmentTrips, AnalyticsAPI)
        .provide([
          [call(AnalyticsAPI.getDepartmentTrips, query), throwError(error)]
        ])
        .put({
          type: FETCH_DEPARTMENT_TRIPS_ANALYTICS_FAILURE,
          error: 'Type must be "json" or "file"'
        })
        .dispatch({
          type: FETCH_DEPARTMENT_TRIPS_ANALYTICS,
          query
        })
        .silentRun();
    });

    it('should call FileSaver.saveAs function if request was successful and action type is file', () => {
      const response = {
        data: fetchDepartmentsTripsResponse
      };
      const date = new Date();
      let query = {
        filterBy: 'month',
        type: 'file',
        firstDate: date.toISOString(),
        lastDate: new Date(date.getTime() + 86400000).toISOString()
      };
      query.type = 'file';
      return expectSaga(watchFetchDepartmentTrips, AnalyticsAPI)
        .provide([
          [call(AnalyticsAPI.getDepartmentTrips, query), response]
        ])
        .dispatch({
          type: FETCH_DEPARTMENT_TRIPS_ANALYTICS,
          query
        })
        .silentRun()
        .then(() => {
          expect(FileSaver.saveAs).toHaveBeenCalled();
        });
    });
  });
});
