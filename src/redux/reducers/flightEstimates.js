import _ from 'lodash';
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

const initialState = {
  isLoading: false,
  flightEstimates: [],
  selectedEstimate: {},
  flightEstimate: {},
  error: {},
  isDeleting: false,
  updatedEstimate: {
    isSaving: false,
    errors: {},
    data: {}
  }
};

const editFlightEstimate = (state = initialState, action) => {
  switch (action.type) {
  case EDIT_FLIGHT_ESTIMATE:
    return {
      ...state,
      updatedEstimate: {
        isSaving: true,
        errors: {},
      }
    };
  case EDIT_FLIGHT_ESTIMATE_FAILURE:
    return {
      ...state,
      updatedEstimate: {
        isSaving: false,
        errors: action.errors || action.error || action.message || {}
      }
    };
  case EDIT_FLIGHT_ESTIMATE_SUCCESS: {
    const flightEstimatesList = state.flightEstimates.slice();
    const {response: { flightEstimate: { id, amount } } } = action;
    const index = _.findIndex(flightEstimatesList, { id });

    flightEstimatesList[index] = { ...flightEstimatesList[index],
      amount
    };
    return {...state,
      flightEstimates: flightEstimatesList,
      updatedEstimate: {
        isSaving: false,
        errors: {},
        data: action.response.flightEstimate
      }
    };
  }
  default: return createFlightEstimate(state, action);
  }
};

const deleteFlightEstimate = (state = initialState, action) => {
  switch(action.type){
  case DELETE_FLIGHT_ESTIMATE:
    return{
      ...state,
      isDeleting: true
    };
  case DELETE_FLIGHT_ESTIMATE_SUCCESS: {
    const flightEstimates = state.flightEstimates.filter(flightEstimate => 
      flightEstimate.id !== action.estimateId);
    return {
      ...state,
      isDeleting: false,
      flightEstimates: flightEstimates,
    };
  }
  case DELETE_FLIGHT_ESTIMATE_FAILURE:
    return {
      ...state,
      isDeleting: false,
      error: action.error
    };
  default:
    return editFlightEstimate(state, action);
  }
};

const listAllFlightEstimates = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_ALL_FLIGHT_ESTIMATES:
    return {
      ...state,
      isLoading: true
    };
  case FETCH_ALL_FLIGHT_ESTIMATES_SUCCESS:
    return {
      ...state,
      isLoading: false,
      flightEstimates: action.flightEstimates
    };
  case FETCH_ALL_FLIGHT_ESTIMATES_FAILURE:
    return {
      ...state,
      isLoading: false,
      error: action.error
    };
  case FETCH_SINGLE_FLIGHT_ESTIMATE: {
    const { flightEstimates } = state;
    return {
      ...state,
      selectedEstimate: flightEstimates.find(
        estimate => estimate.id === action.estimateId) || {}
    };
  }
  default: return deleteFlightEstimate(state, action);
  }
};

const createFlightEstimate = (state = initialState, action) => {
  switch(action.type) {
  case CREATE_FLIGHT_ESTIMATE:
    return {
      ...state,
      isLoading: true
    };
  case CREATE_FLIGHT_ESTIMATE_SUCCESS:
    return {
      ...state,
      isLoading: false,
      flightEstimate: action.newEstimate,
      error: {}
    };
  case CREATE_FLIGHT_ESTIMATE_FAILURE:
    return {
      ...state,
      isLoading: false,
      flightEstimate: {},
      error: {
        error: action.error
      }
    };
  default: return state;
  }
};

export default listAllFlightEstimates;
