import _ from 'lodash';
import {
  FETCH_ALL_HOTEL_ESTIMATES,
  FETCH_ALL_HOTEL_ESTIMATES_SUCCESS,
  FETCH_ALL_HOTEL_ESTIMATES_FAILURE,
  FETCH_SINGLE_HOTEL_ESTIMATE,
  CREATE_HOTEL_ESTIMATE,
  CREATE_HOTEL_ESTIMATE_SUCCESS,
  CREATE_HOTEL_ESTIMATE_FAILURE,
  UPDATE_HOTEL_ESTIMATE,
  UPDATE_HOTEL_ESTIMATE_SUCCESS,
  UPDATE_HOTEL_ESTIMATE_FAILURE,
  DELETE_HOTEL_ESTIMATE,
  DELETE_HOTEL_ESTIMATE_FAILURE,
  DELETE_HOTEL_ESTIMATE_SUCCESS
} from '../constants/actionTypes';

const initialState = {
  isLoading: false,
  estimates: [],
  selectedEstimate: {},
  isDeleting: false,
  error: {},
  updatedEstimate: {
    isSaving: false,
    errors: {},
    data: {}
  }
};

const listAllhotelEstimates = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_ALL_HOTEL_ESTIMATES:
    return { ...state, isLoading: true };
  case FETCH_ALL_HOTEL_ESTIMATES_SUCCESS:
    return {
      ...state,
      isLoading: false,
      estimates: action.estimates,
      countriesWithEstimates: action.countriesWithEstimates
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
  default:
    return deleteSingleHotelEstimate(state, action);
  }
};

const deleteSingleHotelEstimate = (state = initialState, action) => {
  switch (action.type) {
  case DELETE_HOTEL_ESTIMATE:
    return {
      ...state,
      isDeleting: true
    };

  case DELETE_HOTEL_ESTIMATE_SUCCESS: {
    const estimates = state.estimates.filter(
      estimate => estimate.id !== action.estimateId
    );
    const countriesWithEstimates = state.countriesWithEstimates.filter(
      estimate => estimate !== state.selectedEstimate.country
    );
    return {
      ...state,
      isDeleting: false,
      estimates: estimates,
      countriesWithEstimates: countriesWithEstimates
    };
  }

  case DELETE_HOTEL_ESTIMATE_FAILURE: {
    return {
      ...state,
      isDeleting: false,
      error: action.error
    };
  }
  default:
    return updateHotelEstimate(state, action);
  }
};

const updateHotelEstimate = (state = initialState, action) => {
  switch (action.type) {
  case UPDATE_HOTEL_ESTIMATE:
    return { ...state,
      updatedEstimate: {
        isSaving: true,
        errors: {}
      }
    };
  case UPDATE_HOTEL_ESTIMATE_FAILURE:
    return {
      ...state,
      hotelEstimate: {},
      updatedEstimate: {
        isSaving: false,
        errors: action.errors || action.error || action.message || {}
      }
    };
  case UPDATE_HOTEL_ESTIMATE_SUCCESS: {
    const hotelEstimateList = state.estimates.slice();
    const { response: { hotelEstimate: { id, amount } } } = action;
    const index = _.findIndex(hotelEstimateList, { id });
    hotelEstimateList[index] = { ...hotelEstimateList[index], amount};
    return {
      ...state,
      estimates: hotelEstimateList,
      updateHotelEstimate: {
        isSaving: false,
        error: {},
        data: action.response.hotelEstimate
      }
    };
  }
  default:
    return createHotelEstimate(state, action);
  }
};

const createHotelEstimate = (state = initialState, action) => {
  switch (action.type) {
  case CREATE_HOTEL_ESTIMATE:
    return { ...state, isLoading: true };

  case CREATE_HOTEL_ESTIMATE_FAILURE:
    return {
      ...state,
      hotelEstimate: {},
      error: {
        error: action.error
      },
      isLoading: false
    };

  case CREATE_HOTEL_ESTIMATE_SUCCESS:
    return {
      ...state,
      hotelEstimate: action.newEstimate,
      error: {},
      isLoading: false
    };

  default:
    return state;
  }
};

export default listAllhotelEstimates;
