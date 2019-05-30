import {
  FETCH_MODIFICATION_REQUEST,
  SUBMIT_MODIFICATION_REQUEST, UPDATE_MODIFICATION_REQUEST
} from '../constants/actionTypes';

export const submitModificationRequest = (requestId, modificationType, reason) => ({
  type: SUBMIT_MODIFICATION_REQUEST,
  requestId,
  modificationType,
  reason
});

export const submitModificationRequestSuccess = (response) => ({
  type: `${SUBMIT_MODIFICATION_REQUEST}_SUCCESS`,
  response
});

export const submitModificationRequestFailure = (error) => ({
  type: `${SUBMIT_MODIFICATION_REQUEST}_FAILURE`,
  error
});


export const fetchModificationRequest = (requestId) => ({
  type: FETCH_MODIFICATION_REQUEST,
  requestId
});

export const fetchModificationRequestSuccess = (response) => ({
  type: `${FETCH_MODIFICATION_REQUEST}_SUCCESS`,
  response
});

export const fetchModificationRequestFailure = (error) => ({
  type: `${FETCH_MODIFICATION_REQUEST}_FAILURE`,
  error
});


export const updateModification = (modificationId, status) => ({
  type: `${UPDATE_MODIFICATION_REQUEST}`,
  modificationId,
  status
});

export const updateModificationSuccess = (response) => ({
  type: `${UPDATE_MODIFICATION_REQUEST}_SUCCESS`,
  response
});

export const updateModificationFailure = (error) => ({
  type: `${UPDATE_MODIFICATION_REQUEST}_FAILURE`,
  error
});
