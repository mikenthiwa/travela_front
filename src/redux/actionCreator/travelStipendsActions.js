import {
  FETCH_ALL_TRAVEL_STIPENDS,
  FETCH_ALL_TRAVEL_STIPENDS_SUCCESS,
  FETCH_ALL_TRAVEL_STIPENDS_FAILURE,
  DELETE_TRAVEL_STIPEND,
  DELETE_TRAVEL_STIPEND_SUCCESS,
  DELETE_TRAVEL_STIPEND_FAILURE,
  FETCH_SINGLE_TRAVEL_STIPEND,
  CREATE_TRAVEL_STIPEND,
  CREATE_TRAVEL_STIPEND_SUCCESS,
  CREATE_TRAVEL_STIPEND_FAILURE,
  EDIT_TRAVEL_STIPEND,
  EDIT_TRAVEL_STIPEND_SUCCESS,
  EDIT_TRAVEL_STIPEND_FAILURE
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

export const fetchSingleTravelStipend = (stipendId) => ({
  type: FETCH_SINGLE_TRAVEL_STIPEND,
  stipendId
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

export const deleteTravelStipend = (stipendId) => ({
  type: DELETE_TRAVEL_STIPEND,
  stipendId
});

export const deleteTravelStipendSuccess = (deleteMessage, stipendId) => ({
  type: DELETE_TRAVEL_STIPEND_SUCCESS,
  deleteMessage,
  stipendId
});
export const deleteTravelStipendFailure = (error) => ({
  type: DELETE_TRAVEL_STIPEND_FAILURE,
  error,
});

export const updateTravelStipend = (stipendId, payload, history) => ({
  type: EDIT_TRAVEL_STIPEND,
  stipendId,
  payload,
  history
});

export const updateTravelStipendSuccess = (response) => ({
  type: EDIT_TRAVEL_STIPEND_SUCCESS,
  response
});

export const updateTravelStipendFailure = (errors) => ({
  type: EDIT_TRAVEL_STIPEND_FAILURE,
  errors
});
