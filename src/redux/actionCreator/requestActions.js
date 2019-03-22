import {
  CREATE_NEW_REQUEST,
  CREATE_NEW_REQUEST_SUCCESS,
  CREATE_NEW_REQUEST_FAILURE,
  FETCH_USER_REQUESTS,
  FETCH_USER_REQUESTS_SUCCESS,
  FETCH_USER_REQUESTS_FAILURE,
  FETCH_USER_REQUEST_DETAILS,
  FETCH_USER_REQUEST_DETAILS_SUCCESS,
  FETCH_USER_REQUEST_DETAILS_FAILURE,
  FETCH_EDIT_REQUEST,
  EDIT_REQUEST,
  EDIT_REQUEST_SUCCESS,
  EDIT_REQUEST_FAILURE,
  DELETE_REQUEST,
  DELETE_REQUEST_SUCCESS,
  DELETE_REQUEST_FAILURE,
  FETCH_EDIT_REQUEST_SUCCESS,
  FETCH_EDIT_REQUEST_FAILURE
} from '../constants/actionTypes';

export const fetchUserRequests = url => ({
  type: FETCH_USER_REQUESTS,
  url
});


export const fetchUserRequestsSuccess = ({requests, meta, message}) => ({
  type: FETCH_USER_REQUESTS_SUCCESS,
  requests,
  meta,
  message,
});

export const fetchUserRequestsFailure = error => ({
  type: FETCH_USER_REQUESTS_FAILURE,
  error
});

export const createNewRequest = (requestData, history) => ({
  type: CREATE_NEW_REQUEST,
  requestData,
  history
});

export const createNewRequestSuccess = (newRequest) => ({
  type: CREATE_NEW_REQUEST_SUCCESS,
  newRequest,
});

export const createNewRequestFailure = (error) => ({
  type: CREATE_NEW_REQUEST_FAILURE,
  error,
});

export const fetchUserRequestDetails = (requestId) => ({
  type: FETCH_USER_REQUEST_DETAILS,
  requestId
});

export const fetchUserRequestDetailsSuccess = (requestData) => ({
  type: FETCH_USER_REQUEST_DETAILS_SUCCESS,
  requestData
});

export const fetchUserRequestDetailsFailure = (error) => ({
  type: FETCH_USER_REQUEST_DETAILS_FAILURE,
  error,
});

export const fetchEditRequest = (requestId) => ({
  type: FETCH_EDIT_REQUEST,
  requestId
});

export const fetchEditRequestFailure = (errors) => ({
  type: FETCH_EDIT_REQUEST_FAILURE,
  errors
});

export const fetchEditRequestSuccess = (response) => ({
  type: FETCH_EDIT_REQUEST_SUCCESS,
  response
});

export const editRequest = (requestId, requestData, history) => ({
  type: EDIT_REQUEST,
  requestId,
  requestData,
  history
});
export const editRequestSuccess = (updatedRequest) => ({
  type: EDIT_REQUEST_SUCCESS,
  updatedRequest,
});
export const editRequestFailure = (error) => ({
  type: EDIT_REQUEST_FAILURE,
  error,
});

export const deleteRequest = (requestId) => ({
  type: DELETE_REQUEST,
  requestId
});
export const deleteRequestSuccess = (deleteMessage, requestId) => ({
  type: DELETE_REQUEST_SUCCESS,
  deleteMessage,
  requestId
});
export const deleteRequestFailure = (error) => ({
  type: DELETE_REQUEST_FAILURE,
  error,
});


