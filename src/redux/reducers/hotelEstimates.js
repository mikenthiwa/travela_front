import {
  FETCH_ALL_HOTEL_ESTIMATES,
  FETCH_ALL_HOTEL_ESTIMATES_SUCCESS,
  FETCH_ALL_HOTEL_ESTIMATES_FAILURE,
  FETCH_SINGLE_HOTEL_ESTIMATE,
  CREATE_HOTEL_ESTIMATE,
  CREATE_HOTEL_ESTIMATE_SUCCESS,
  CREATE_HOTEL_ESTIMATE_FAILURE
} from '../constants/actionTypes';

const initialState = {
  isLoading: false,
  estimates: [],
  selectedEstimate: {},
  error: {}
};

const listAllhotelEstimates = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_ALL_HOTEL_ESTIMATES:
    return { ...state, isLoading: true };
  case FETCH_ALL_HOTEL_ESTIMATES_SUCCESS:
    return {
      ...state,
      isLoading: false,
      estimates: action.estimates
    };
  case FETCH_ALL_HOTEL_ESTIMATES_FAILURE:
    return { ...state, isLoading: false, error: action.error };
  
  case FETCH_SINGLE_HOTEL_ESTIMATE: {
    const { estimates } = state;
    return {
      ...state,
      selectedEstimate:
          estimates.find(estimate => estimate.id === action.estimateId) || {}
    };
  }

  case CREATE_HOTEL_ESTIMATE:
    return { ...state, isLoading: true };
  case CREATE_HOTEL_ESTIMATE_SUCCESS:
    return {
      ...state,
      hotelEstimate: action.newEstimate,
      error: {},
      isLoading: false
    };
  case CREATE_HOTEL_ESTIMATE_FAILURE:
    return {
      ...state,
      hotelEstimate: {},
      error: {
        error: action.error
      },
      isLoading: false
    };
  default: return state;
  }

};

export default listAllhotelEstimates;
