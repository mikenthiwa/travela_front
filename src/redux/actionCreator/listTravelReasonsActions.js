import {
  FETCH_ALL_TRAVEL_REASONS,
  FETCH_ALL_TRAVEL_REASONS_FAILURE,
  FETCH_ALL_TRAVEL_REASONS_SUCCESS
} from '../constants/actionTypes';

export const fetchAllTravelReasons = (query) => ({
  type: FETCH_ALL_TRAVEL_REASONS,
  query
});

export const fetchAllTravelReasonsSuccess = ({ travelReasons, pagination }) => ({
  type: FETCH_ALL_TRAVEL_REASONS_SUCCESS,
  travelReasons,
  pagination
});

export const fetchAllTravelReasonsFailure = (errors) => ({
  type: FETCH_ALL_TRAVEL_REASONS_FAILURE,
  errors
});
