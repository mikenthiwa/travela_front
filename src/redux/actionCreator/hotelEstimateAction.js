import {
  FETCH_ALL_HOTEL_ESTIMATES,
  FETCH_ALL_HOTEL_ESTIMATES_SUCCESS,
  FETCH_ALL_HOTEL_ESTIMATES_FAILURE,
  FETCH_SINGLE_HOTEL_ESTIMATE,
  CREATE_HOTEL_ESTIMATE,
  CREATE_HOTEL_ESTIMATE_SUCCESS,
  CREATE_HOTEL_ESTIMATE_FAILURE
} from '../constants/actionTypes';

export const fetchAllHotelEstimates = (url) => {
  return {
    type: FETCH_ALL_HOTEL_ESTIMATES,
    url
  };
};

export const fetchAllHotelEstimatesSuccess = ({ estimates }) => ({
  type: FETCH_ALL_HOTEL_ESTIMATES_SUCCESS,
  estimates
});

export const fetchAllHotelEstimatesFailure = error => ({
  type: FETCH_ALL_HOTEL_ESTIMATES_FAILURE,
  error
});

export const fetchSingleHotelEstimate = (estimateId) => ({
  type: FETCH_SINGLE_HOTEL_ESTIMATE,
  estimateId
});

export const createHotelEstimate = (requestData, history) => ({
  type: CREATE_HOTEL_ESTIMATE,
  requestData,
  history
});

export const createHotelEstimateSuccess = newEstimate => ({
  type: CREATE_HOTEL_ESTIMATE_SUCCESS,
  newEstimate
});

export const createHotelEstimateFailure = error => ({
  type: CREATE_HOTEL_ESTIMATE_FAILURE,
  error
});
