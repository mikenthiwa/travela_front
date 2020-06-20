import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';
import {
  watchGetAllFlightEstimates,
  watchCreateFlightEstimateAsync,
  watchUpdateFlightEstimate,
  watchDeleteFlightEstimate
} from '../flightEstimatesSaga';
import FlightEstimateAPI from '../../../services/FlightEstimateAPI';
import {
  FETCH_ALL_FLIGHT_ESTIMATES,
  FETCH_ALL_FLIGHT_ESTIMATES_FAILURE,
  FETCH_ALL_FLIGHT_ESTIMATES_SUCCESS,
  CREATE_FLIGHT_ESTIMATE,
  CREATE_FLIGHT_ESTIMATE_FAILURE,
  CREATE_FLIGHT_ESTIMATE_SUCCESS,
  EDIT_FLIGHT_ESTIMATE,
  EDIT_FLIGHT_ESTIMATE_FAILURE,
  EDIT_FLIGHT_ESTIMATE_SUCCESS,
  DELETE_FLIGHT_ESTIMATE,
  DELETE_FLIGHT_ESTIMATE_FAILURE,
  DELETE_FLIGHT_ESTIMATE_SUCCESS
} from '../../constants/actionTypes';
import mockData from '../../../mockData/flightEstimateMockData';

describe('Flight estimate Saga', () => {
  const { flightEstimates } = mockData;
  it('handles a succesful retrieval of flight estimates', () => {
    const response = {
      data: {
        success: true,
        message: 'Flight Estimates retrieved successfully',
        flightEstimates: flightEstimates
      }
    };
    return expectSaga(watchGetAllFlightEstimates)
      .provide([ [ matchers.call.fn(FlightEstimateAPI.getAllFlightEstimates), response ] ])
      .put({
        type: FETCH_ALL_FLIGHT_ESTIMATES_SUCCESS,
        flightEstimates: response.data.flightEstimates
      })
      .dispatch({
        type: FETCH_ALL_FLIGHT_ESTIMATES
      })
      .silentRun();
  });

  it('handles failed retieval of flight estimates', () => {
    const error = new Error('Server error, try again');
    error.response = { status: 500 };
    return expectSaga(watchGetAllFlightEstimates)
      .provide([ [ matchers.call.fn(FlightEstimateAPI.getAllFlightEstimates), throwError(error) ] ])
      .put({
        type: FETCH_ALL_FLIGHT_ESTIMATES_FAILURE,
        error: 'Server error, try again'
      })
      .dispatch({
        type: FETCH_ALL_FLIGHT_ESTIMATES
      })
      .silentRun();
  });
});

describe('Create Flight Estimate Saga', () => {
  const action = {
    requestData: {
      flightEstimate: 80,
      originCountry: 'Nigeria',
      destinationCountry: 'Uganda'
    }
  };
  const response = {
    data: {
      newEstimate: {
        flightEstimate: 80,
        originCountry: 'Nigeria',
        destinationCountry: 'Uganda'
      }
    }
  };
  const error = {
    response: {
      status: 422,
      data: {
        errors: [ { msg: 'Estimate is required' } ]
      }
    }
  };

  it('posts a new flight estimate successfully', () => {
    return expectSaga(watchCreateFlightEstimateAsync, FlightEstimateAPI)
      .provide([ [ matchers.call.fn(FlightEstimateAPI.postFlightEstimate, action.requestData), response ] ])
      .put({
        type: CREATE_FLIGHT_ESTIMATE_SUCCESS,
        newEstimate: response.data
      })
      .dispatch({
        type: CREATE_FLIGHT_ESTIMATE,
        requestData: action.requestData
      })
      .silentRun();
  });

  it('throws error while creating a new flight estimate', () => {
    return expectSaga(watchCreateFlightEstimateAsync, FlightEstimateAPI)
      .provide([ [ matchers.call.fn(FlightEstimateAPI.postFlightEstimate, action.requestData), throwError(error) ] ])
      .put({
        type: CREATE_FLIGHT_ESTIMATE_FAILURE,
        error: 'Estimate is required'
      })
      .dispatch({
        type: CREATE_FLIGHT_ESTIMATE,
        requestData: action.requestData
      })
      .silentRun();
  });
});

describe('Delete Flight Estimate Saga', () => {
  const action = {
    estimateId: 1
  };
  const response = {
    data: {
      message: 'Flight Estimate deleted successfully',
      estimateId: 1
    }
  };
  const estimateId = 1;
  const error = 'Possible network error, please reload the page';

  it('deletes a flight estimate', () => {
    return expectSaga(watchDeleteFlightEstimate, FlightEstimateAPI)
      .provide([ [ matchers.call.fn(FlightEstimateAPI.deleteFlightEstimate, action.estimateId), response ] ])
      .put({
        type: DELETE_FLIGHT_ESTIMATE_SUCCESS,
        message: response.data.message,
        estimateId: response.data.estimateId
      })
      .dispatch({
        type: DELETE_FLIGHT_ESTIMATE,
        estimateId
      })
      .silentRun();
  });

  it('throws error if delete flight estimate fails', () => {
    return expectSaga(watchDeleteFlightEstimate, FlightEstimateAPI)
      .provide([ [ matchers.call.fn(FlightEstimateAPI.deleteFlightEstimate, action.estimateId), throwError(error) ] ])
      .put({
        type: DELETE_FLIGHT_ESTIMATE_FAILURE,
        error
      })
      .dispatch({
        type: DELETE_FLIGHT_ESTIMATE,
        estimateId
      })
      .silentRun();
  });
});

describe('Update Flight Estimate', () => {
  const { action, response, validationError } = mockData;
  const { estimateId, payload } = action;
  const { response: { data: { errors } } } = validationError;

  it('renders validation errors on editing a flight estimate', () => {
    return expectSaga(watchUpdateFlightEstimate, FlightEstimateAPI)
      .provide([
        [ matchers.call.fn(FlightEstimateAPI.updateFlightEstimate, estimateId, payload), throwError(errors) ]
      ])
      .put({
        type: EDIT_FLIGHT_ESTIMATE_FAILURE,
        error: errors
      })
      .dispatch({
        type: EDIT_FLIGHT_ESTIMATE,
        estimateId,
        payload
      })
      .silentRun();
  });

  it('should update a flight estimate', () => {
    const history = {
      push: jest.fn()
    };
    return expectSaga(watchUpdateFlightEstimate, FlightEstimateAPI)
      .provide([ [ matchers.call.fn(FlightEstimateAPI.updateFlightEstimate, estimateId, payload), response ] ])
      .put({
        type: EDIT_FLIGHT_ESTIMATE_SUCCESS,
        response: response.data
      })
      .dispatch({
        type: EDIT_FLIGHT_ESTIMATE,
        estimateId,
        payload,
        history
      })
      .silentRun();
  });
});
