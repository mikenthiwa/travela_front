import {
  CREATE_TRAVEL_REASON,
  DELETE_TRAVEL_REASON,
  CREATE_TRAVEL_REASON_SUCCESS,
  CREATE_TRAVEL_REASON_FAILURE,
  FETCH_TRAVEL_REASON,
  EDIT_TRAVEL_REASON,
  EDIT_TRAVEL_REASON_SUCCESS,
  EDIT_TRAVEL_REASON_FAILURE,
  VIEW_TRAVEL_REASON_DETAILS,
  VIEW_TRAVEL_REASON_DETAILS_SUCCESS,
  VIEW_TRAVEL_REASON_DETAILS_FAILURE,
  DELETE_TRAVEL_REASON_SUCCESS,
  DELETE_TRAVEL_REASON_FAILURE,
} from '../constants/actionTypes';

export const createTravelReason = (body, history) => ({
  type: CREATE_TRAVEL_REASON,
  body,
  history
});

export const createTravelReasonSuccess = (response) => ({
  type: CREATE_TRAVEL_REASON_SUCCESS,
  response
});

export const createTravelReasonFailure = (error) => ({
  type: CREATE_TRAVEL_REASON_FAILURE,
  error
});

export const viewTravelDetails = (id) => ({
  type: VIEW_TRAVEL_REASON_DETAILS,
  id,
});

export const viewTravelDetailsSuccess = (response) => ({
  type: VIEW_TRAVEL_REASON_DETAILS_SUCCESS,
  response
});

export const viewTravelDetailsFailure = (error) => ({
  type: VIEW_TRAVEL_REASON_DETAILS_FAILURE,
  error
});

export const fetchTravelReason = (id) => ({
  type: FETCH_TRAVEL_REASON,
  travelReasonId: id
});


export const editTravelReason = (body) => ({
  type: EDIT_TRAVEL_REASON,
  body,
});


export const editTravelReasonSuccess = (response) => ({
  type: EDIT_TRAVEL_REASON_SUCCESS,
  response
});

export const editTravelReasonFailure = (error) => ({
  type: EDIT_TRAVEL_REASON_FAILURE,
  error
});

export const deleteTravelReason = (reasonId) => {
  return {
    type: DELETE_TRAVEL_REASON,
    reasonId
  };
};

export const deleteTravelReasonSuccess = (reasonId, deletedReason) => ({
  type: DELETE_TRAVEL_REASON_SUCCESS,
  reasonId,
  deletedReason,
});

export const deleteTravelReasonFailure = (error) => ({
  type: DELETE_TRAVEL_REASON_FAILURE,
  error,
});
