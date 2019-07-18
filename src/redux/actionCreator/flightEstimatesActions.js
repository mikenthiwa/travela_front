import {
  CREATE_FLIGHT_ESTIMATE,
  CREATE_FLIGHT_ESTIMATE_FAILURE,
  CREATE_FLIGHT_ESTIMATE_SUCCESS,
  FETCH_ALL_FLIGHT_ESTIMATES,
  FETCH_ALL_FLIGHT_ESTIMATES_SUCCESS,
  FETCH_ALL_FLIGHT_ESTIMATES_FAILURE,
  FETCH_SINGLE_FLIGHT_ESTIMATE,
  DELETE_FLIGHT_ESTIMATE,
  DELETE_FLIGHT_ESTIMATE_SUCCESS,
  DELETE_FLIGHT_ESTIMATE_FAILURE,
  EDIT_FLIGHT_ESTIMATE,
  EDIT_FLIGHT_ESTIMATE_SUCCESS,
  EDIT_FLIGHT_ESTIMATE_FAILURE
} from '../constants/actionTypes';

export const fetchAllFlightEstimates = action => {
  return {
    type: FETCH_ALL_FLIGHT_ESTIMATES,
    action
  };
};

export const fetchAllFlightEstimatesSuccess = ({ flightEstimates }) => ({
  type: FETCH_ALL_FLIGHT_ESTIMATES_SUCCESS,
  flightEstimates
});
 
export const fetchAllFlightEstimatesFailure = error => ({
  type: FETCH_ALL_FLIGHT_ESTIMATES_FAILURE,
  error
});

export const fetchSingleFlightEstimate = estimateId => ({
  type: FETCH_SINGLE_FLIGHT_ESTIMATE,
  estimateId
});

export const createFlightEstimate = (requestData, history) => ({
  type: CREATE_FLIGHT_ESTIMATE,
  requestData,
  history
});

export const createFlightEstimateSuccess = newEstimate => ({
  type: CREATE_FLIGHT_ESTIMATE_SUCCESS,
  newEstimate
});

export const createFlightEstimateFailure = error => ({
  type: CREATE_FLIGHT_ESTIMATE_FAILURE,
  error
});

export const deleteFlightEstimate = estimateId => ({
  type: DELETE_FLIGHT_ESTIMATE,
  estimateId
});

export const deleteFlightEstimateSuccess = (message, estimateId) => ({
  type: DELETE_FLIGHT_ESTIMATE_SUCCESS,
  message,
  estimateId
});

export const deleteFlightEstimateFailure = error => ({
  type: DELETE_FLIGHT_ESTIMATE_FAILURE,
  error
});

export const updateFlightEstimate = (estimateId, payload, history) => ({
  type: EDIT_FLIGHT_ESTIMATE,
  estimateId,
  payload,
  history
});

export const updateFlightEstimateSuccess = response => ({
  type: EDIT_FLIGHT_ESTIMATE_SUCCESS,
  response
});

export const updateFlightEstimateFailure = error => ({
  type: EDIT_FLIGHT_ESTIMATE_FAILURE,
  error
});
