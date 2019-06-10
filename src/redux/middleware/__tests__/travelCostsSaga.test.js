import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';
import {
  watchgetTravelCostsByLocation
} from '../travelCostsSaga';
import TravelCostsAPI from '../../../services/TravelCostsAPI';
import {
  FETCH_TRAVEL_COSTS_BY_LOCATION,
  FETCH_TRAVEL_COSTS_BY_LOCATION_SUCCESS,
  FETCH_TRAVEL_COSTS_BY_LOCATION_FAILURE
} from '../../constants/actionTypes';



describe('Travel Costs Saga', () => {
  it('gets a response with travel costs and dispatches FETCH_TRAVEL_COSTS_BY_LOCATION_SUCCESS', () => {
    const response = {
      data: {
        success: true,
        message: 'Travel Costs retrieved successfully',
        travelCosts: {
          travelStipends: [],
          flightCosts: [],
          hotelEstimates: []
        }
      }
    };
    return expectSaga(watchgetTravelCostsByLocation)
      .provide([
        [matchers.call.fn(TravelCostsAPI.getTravelCostsByLocation), response]
      ])
      .put({
        type: FETCH_TRAVEL_COSTS_BY_LOCATION_SUCCESS,
        travelCosts: response.data
      })
      .dispatch({
        type: FETCH_TRAVEL_COSTS_BY_LOCATION
      })
      .silentRun();
  });

  it('handles an error', () => {
    const error = new Error('Server error, try again');
    error.response = { status: 500 };
    return expectSaga(watchgetTravelCostsByLocation)
      .provide([
        [matchers.call.fn(TravelCostsAPI.getTravelCostsByLocation), throwError(error)]
      ])
      .put({
        type: FETCH_TRAVEL_COSTS_BY_LOCATION_FAILURE,
        error: 'Server error, try again'
      })
      .dispatch({
        type: FETCH_TRAVEL_COSTS_BY_LOCATION
      })
      .silentRun();
  });
});
