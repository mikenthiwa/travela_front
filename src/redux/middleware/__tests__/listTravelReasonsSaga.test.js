import { call } from 'redux-saga/effects';
import {expectSaga} from 'redux-saga-test-plan';
import {throwError} from 'redux-saga-test-plan/providers';
import {watchFetchAllTravelReasons} from '../listTravelReasonsSaga';
import TravelReasonsAPI from '../../../services/TravelReasonsAPI';
import mockData from '../../../views/TravelReasons/__mocks__/TravelReasons';
import {
  FETCH_ALL_TRAVEL_REASONS,
  FETCH_ALL_TRAVEL_REASONS_FAILURE,
  FETCH_ALL_TRAVEL_REASONS_SUCCESS
} from '../../constants/actionTypes';

describe('Travel reasons Saga', () => {
  const { metaData2: { travelReasons, pagination }} = mockData;
  it('gets a response with travel reasons and dispatches FETCH_ALL_TRAVEL_REASONS_SUCCESS', () => {
    const response = {
      data: {
        success: true,
        message: 'success',
        metaData: {
          travelReasons, pagination
        }
      }
    };
    return expectSaga(watchFetchAllTravelReasons)
      .provide([[call(TravelReasonsAPI.getAllTravelReasons,'?page=2'), response]])
      .put({
        type: FETCH_ALL_TRAVEL_REASONS_SUCCESS,
        travelReasons, pagination
      })
      .dispatch({
        type: FETCH_ALL_TRAVEL_REASONS,
        query: '?page=2'
      })
      .silentRun();
  });

  it('handles an error', () => {
    const error = new Error('Server error, try again');
    error.response = { status: 500 };
    return expectSaga(watchFetchAllTravelReasons)
      .provide([[call(TravelReasonsAPI.getAllTravelReasons,'?page=2'), throwError(error)]])
      .put({
        type: FETCH_ALL_TRAVEL_REASONS_FAILURE,
        errors: 'Server error, try again'
      })
      .dispatch({
        type: FETCH_ALL_TRAVEL_REASONS,
        query: '?page=2'
      })
      .silentRun();
  });
});
