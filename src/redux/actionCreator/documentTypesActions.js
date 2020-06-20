import {
  FETCH_DOCUMENT_TYPES,
  FETCH_DOCUMENT_TYPES_SUCCESS,
  FETCH_DOCUMENT_TYPES_FAILURE,
  EDIT_DOCUMENT_TYPES,
  EDIT_DOCUMENT_TYPES_SUCCESS,
  EDIT_DOCUMENT_TYPES_FAILURE,
  CREATE_DOCUMENT_TYPES,
  CREATE_DOCUMENT_TYPES_SUCCESS,
  CREATE_DOCUMENT_TYPES_FAILURE,
  DELETE_DOCUMENT_TYPES,
  DELETE_DOCUMENT_TYPES_SUCCESS,
  DELETE_DOCUMENT_TYPES_FAILURE,
} from '../constants/actionTypes';

export const fetchDocumentTypes = () => ({
  type: FETCH_DOCUMENT_TYPES,
});

export const fetchDocumentTypesSuccess = payload => ({
  type: FETCH_DOCUMENT_TYPES_SUCCESS,
  payload,
});

export const fetchDocuemtTypesFailure = error => ({
  type: FETCH_DOCUMENT_TYPES_FAILURE,
  payload: error,
});

export const editDocumentTypes = payload => ({
  type: EDIT_DOCUMENT_TYPES,
  payload,
});

export const editDocumentTypesSuccess = payload => ({
  type: EDIT_DOCUMENT_TYPES_SUCCESS,
  payload,
});

export const editDocuemtTypesFailure = error => ({
  type: EDIT_DOCUMENT_TYPES_FAILURE,
  payload: error,
});

export const createDocumentTypes = payload => ({
  type: CREATE_DOCUMENT_TYPES,
  payload,
});

export const createDocumentTypesSuccess = payload => ({
  type: CREATE_DOCUMENT_TYPES_SUCCESS,
  payload,
});

export const createDocuemtTypesFailure = error => ({
  type: CREATE_DOCUMENT_TYPES_FAILURE,
  payload: error,
});

export const deleteDocumentTypes = payload => ({
  type: DELETE_DOCUMENT_TYPES,
  payload,
});

export const deleteDocumentTypesSuccess = payload => ({
  type: DELETE_DOCUMENT_TYPES_SUCCESS,
  payload,
});

export const deleteDocuemtTypesFailure = error => ({
  type: DELETE_DOCUMENT_TYPES_FAILURE,
  payload: error,
});
