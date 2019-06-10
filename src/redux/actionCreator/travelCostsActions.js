import {
  FETCH_TRAVEL_COSTS_BY_LOCATION,
  FETCH_TRAVEL_COSTS_BY_LOCATION_SUCCESS,
  FETCH_TRAVEL_COSTS_BY_LOCATION_FAILURE
} from '../constants/actionTypes';

export const fetchTravelCostsByLocation = locations => {
  return {
    type: FETCH_TRAVEL_COSTS_BY_LOCATION,
    locations
  };
};

export const fetchTravelCostsByLocationSuccess = (travelCosts) => ({
  type: FETCH_TRAVEL_COSTS_BY_LOCATION_SUCCESS,
  travelCosts
});

export const fetchTravelCostsByLocationFailure = error => ({
  type: FETCH_TRAVEL_COSTS_BY_LOCATION_FAILURE,
  error
});
