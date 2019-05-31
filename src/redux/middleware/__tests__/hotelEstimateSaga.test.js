import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';
import {
  watchgetAllHotelEstimates,
  watchCreateHotelEstimateAsync
} from '../hotelEstimateSaga';
import HotelEstimateAPI from '../../../services/HotelEstimateAPI';
import {
  FETCH_ALL_HOTEL_ESTIMATES,
  FETCH_ALL_HOTEL_ESTIMATES_FAILURE,
  FETCH_ALL_HOTEL_ESTIMATES_SUCCESS,
  CREATE_HOTEL_ESTIMATE,
  CREATE_HOTEL_ESTIMATE_SUCCESS,
  CREATE_HOTEL_ESTIMATE_FAILURE
} from '../../constants/actionTypes';
import mockData from '../../../mockData/hotelEstimate';

describe('Hotel estimate Saga', () => {
  const { estimates } = mockData;
  const url = '?country=true';
  it('gets a response with hotel estimates and dispatches FETCH_ALL_HOTEL_ESTIMATES_SUCCESS', () => {
    const response = {
      data: {
        success: true,
        message: 'Hotel Estimates retrieved successfully',
        estimates: estimates
      }
    };
    return expectSaga(watchgetAllHotelEstimates)
      .provide([
        [matchers.call.fn(HotelEstimateAPI.getAllHotelEstimates, url), response]
      ])
      .put({
        type: FETCH_ALL_HOTEL_ESTIMATES_SUCCESS,
        estimates: response.data.estimates
      })
      .dispatch({
        type: FETCH_ALL_HOTEL_ESTIMATES
      })
      .silentRun();
  });

  it('handles an error', () => {
    const error = new Error('Server error, try again');
    error.response = { status: 500 };
    return expectSaga(watchgetAllHotelEstimates)
      .provide([
        [
          matchers.call.fn(HotelEstimateAPI.getAllHotelEstimates, url),
          throwError(error)
        ]
      ])
      .put({
        type: FETCH_ALL_HOTEL_ESTIMATES_FAILURE,
        error: 'Server error, try again'
      })
      .dispatch({
        type: FETCH_ALL_HOTEL_ESTIMATES
      })
      .silentRun();
  });
});

describe('Create Hotel Estimate Saga', () => {
  const action = {
    requestData: {
      country: 'Kigali',
      estimate: 1234
    }
  };

  const response = {
    data: {
      newEstimate: {
        country: 'Kigali',
        estimate: 1234
      }
    }
  };

  const error = {
    response: {
      status: 422,
      data: {
        errors: [
          { msg: 'Country is required' },
          { msg: 'Estimate is required' }
        ]
      }
    }
  };

  it('Posts a new estimate successfully', () => {
    return expectSaga(watchCreateHotelEstimateAsync, HotelEstimateAPI)
      .provide([
        [
          matchers.call.fn(
            HotelEstimateAPI.postHotelEstimate,
            action.requestData
          ),
          response
        ]
      ])
      .put({
        type: CREATE_HOTEL_ESTIMATE_SUCCESS,
        newEstimate: response.data
      })
      .dispatch({
        type: CREATE_HOTEL_ESTIMATE,
        requestData: action.requestData
      })
      .silentRun();
  });

  it('throws error while creating a new request', () => {
    return expectSaga(watchCreateHotelEstimateAsync, HotelEstimateAPI)
      .provide([
        [
          matchers.call.fn(
            HotelEstimateAPI.postHotelEstimate,
            action.requestData
          ),
          throwError(error)
        ]
      ])
      .put({
        type: CREATE_HOTEL_ESTIMATE_FAILURE,
        error: 'Country is required, Estimate is required'
      })
      .dispatch({
        type: CREATE_HOTEL_ESTIMATE,
        requestData: action.requestData
      })
      .silentRun();
  });
});
