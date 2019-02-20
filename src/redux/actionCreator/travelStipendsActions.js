import {
  FETCH_ALL_TRAVEL_STIPENDS,
  FETCH_ALL_TRAVEL_STIPENDS_SUCCESS,
  FETCH_ALL_TRAVEL_STIPENDS_FAILURE,
  CREATE_TRAVEL_STIPEND,
  CREATE_TRAVEL_STIPEND_SUCCESS,
  CREATE_TRAVEL_STIPEND_FAILURE,
} from '../constants/actionTypes';

export const fetchAllTravelStipends = action => {
  return {
    type: FETCH_ALL_TRAVEL_STIPENDS,
    action
  };
};

export const fetchAllTravelStipendsSuccess = ({ stipends }) => ({
  type: FETCH_ALL_TRAVEL_STIPENDS_SUCCESS,
  stipends
});

export const fetchAllTravelStipendsFailure = error => ({
  type: FETCH_ALL_TRAVEL_STIPENDS_FAILURE,
  error
});
export const createTravelStipend = (requestData, history) => ({
  type: CREATE_TRAVEL_STIPEND,
  requestData,
  history
});
  
export const createTravelStipendSuccess = (newStipend) => ({
  type: CREATE_TRAVEL_STIPEND_SUCCESS,
  newStipend,
});
  
export const createTravelStipendFailure = (error) => ({
  type: CREATE_TRAVEL_STIPEND_FAILURE,
  error,
});