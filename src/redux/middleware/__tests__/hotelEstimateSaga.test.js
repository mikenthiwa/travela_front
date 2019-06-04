import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';
import {
  watchgetAllHotelEstimates,
  watchCreateHotelEstimateAsync,
  watchUpdateHotelEstimate,
  watchDeleteHotelEstimate
} from '../hotelEstimateSaga';
import HotelEstimateAPI from '../../../services/HotelEstimateAPI';
import {
  FETCH_ALL_HOTEL_ESTIMATES,
  FETCH_ALL_HOTEL_ESTIMATES_FAILURE,
  FETCH_ALL_HOTEL_ESTIMATES_SUCCESS,
  CREATE_HOTEL_ESTIMATE,
  CREATE_HOTEL_ESTIMATE_SUCCESS,
  CREATE_HOTEL_ESTIMATE_FAILURE,
  UPDATE_HOTEL_ESTIMATE,
  UPDATE_HOTEL_ESTIMATE_SUCCESS,
  UPDATE_HOTEL_ESTIMATE_FAILURE,
  DELETE_HOTEL_ESTIMATE,
  DELETE_HOTEL_ESTIMATE_SUCCESS,
  DELETE_HOTEL_ESTIMATE_FAILURE
} from '../../constants/actionTypes';
import mockData from '../../../mockData/hotelEstimateMockData';

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
describe('Delete Hotel Estimate Saga', () => {
  const action = {
    estimateId: 5
  };
  const response = {
    data: {
      message: 'Hotel Estimates deleted successfully',
      estimateId: 5
    }
  };
  const estimateId = 5;

  const error = 'Possible network error, please reload the page';

  it('deletes a hotel estimate', () => {
    return expectSaga(watchDeleteHotelEstimate, HotelEstimateAPI)
      .provide([
        [
          matchers.call.fn(
            HotelEstimateAPI.deleteHotelEstimate,
            action.estimateId
          ),
          response
        ]
      ])
      .put({
        type: DELETE_HOTEL_ESTIMATE_SUCCESS,
        deleteMessage: response.data.message,
        estimateId: response.data.estimateId
      })
      .dispatch({
        type: DELETE_HOTEL_ESTIMATE,
        estimateId
      })
      .silentRun();
  });

  it('throws error if delete hotel estimate fails', () => {
    return expectSaga(watchDeleteHotelEstimate, HotelEstimateAPI)
      .provide([
        [
          matchers.call.fn(
            HotelEstimateAPI.deleteHotelEstimate,
            action.estimateId
          ),
          throwError(error)
        ]
      ])
      .put({
        type: DELETE_HOTEL_ESTIMATE_FAILURE,
        error
      })
      .dispatch({
        type: DELETE_HOTEL_ESTIMATE,
        estimateId
      })
      .silentRun();
  });
});

describe('Update Hotel Estimate', () => {
  const { action, response, validationError } = mockData;
  const { estimateId, payload } = action;
  const {
    response: {
      data: { errors }
    }
  } = validationError;

  it('renders validation errors on editing a hotel estimate', () => {
    return expectSaga(watchUpdateHotelEstimate, HotelEstimateAPI)
      .provide([
        [
          matchers.call.fn(
            HotelEstimateAPI.updateHotelEstimate,
            estimateId,
            payload
          ),
          throwError(errors)
        ]
      ])
      .put({
        type: UPDATE_HOTEL_ESTIMATE_FAILURE,
        error: errors
      })
      .dispatch({
        type: UPDATE_HOTEL_ESTIMATE,
        estimateId,
        payload
      })
      .silentRun();
  });

  it('should update a hotel estimate', () => {
    const history = {
      push: jest.fn()
    };
    return expectSaga(watchUpdateHotelEstimate, HotelEstimateAPI)
      .provide([
        [
          matchers.call.fn(
            HotelEstimateAPI.updateHotelEstimate,
            estimateId,
            payload
          ),
          response
        ]
      ])
      .put({
        type: UPDATE_HOTEL_ESTIMATE_SUCCESS,
        response: response.data
      })
      .dispatch({
        type: UPDATE_HOTEL_ESTIMATE,
        estimateId,
        payload,
        history
      })
      .silentRun();
  });
});
