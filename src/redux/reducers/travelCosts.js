import _ from 'lodash';
import {
  FETCH_TRAVEL_COSTS_BY_LOCATION,
  FETCH_TRAVEL_COSTS_BY_LOCATION_SUCCESS,
  FETCH_TRAVEL_COSTS_BY_LOCATION_FAILURE
} from '../constants/actionTypes';

const initialState = {
  isLoading: false,
  error: {},
  stipends: [],
  flightCosts: [],
  hotelEstimates: []
};

const travelCosts = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_TRAVEL_COSTS_BY_LOCATION: {
    return {...state, isLoading: true};
  }
  case FETCH_TRAVEL_COSTS_BY_LOCATION_SUCCESS: {
    return {
      ...state,
      stipends: [...action.travelCosts.travelStipends],
      flightCosts: [...action.travelCosts.flightCosts],
      hotelEstimates: [...action.travelCosts.hotelEstimates],
      isLoading: false
    };
  }
  case FETCH_TRAVEL_COSTS_BY_LOCATION_FAILURE: {
    return {...state,
      travelCosts: {},
      error: {
        error:
      action.error,
      },
      isLoading: false
    };
  }
  default:
    return state;
  }
};

export default travelCosts;
