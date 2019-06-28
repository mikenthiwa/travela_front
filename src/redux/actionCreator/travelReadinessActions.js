import {
  FETCH_TRAVEL_READINESS,
  FETCH_TRAVEL_READINESS_SUCCESS,
  FETCH_TRAVEL_READINESS_FAILURE,
  EXPORT_TRAVEL_READINESS,
  EXPORT_TRAVEL_READINESS_SUCCESS,
  EXPORT_TRAVEL_READINESS_FAILURE,
  CREATE_TRAVEL_READINESS_DOCUMENT,
  CREATE_TRAVEL_READINESS_DOCUMENT_FAILURE,
  CREATE_TRAVEL_READINESS_DOCUMENT_SUCCESS,
  PASSPORT_TRAVEL_READINESS_DOCUMENT_SCAN, 
  PASSPORT_TRAVEL_READINESS_DOCUMENT_SCAN_SUCCESS, 
  PASSPORT_TRAVEL_READINESS_DOCUMENT_SCAN_FALURE
} from '../constants/actionTypes';

export const createTravelReadinessDocument = (documentType, payload) => ({
  type: CREATE_TRAVEL_READINESS_DOCUMENT,
  payload,
  documentType,
});

export const createTravelReadinessDocumentSuccess = (response) => ({
  type: CREATE_TRAVEL_READINESS_DOCUMENT_SUCCESS,
  response
});

export const createTravelReadinessDocumentFailure = (error) => ({
  type: CREATE_TRAVEL_READINESS_DOCUMENT_FAILURE,
  error
});

export const fetchReadiness = (query) => ({
  type: FETCH_TRAVEL_READINESS,
  query
});

export const fetchReadinessSuccess = (response) => ({
  type:FETCH_TRAVEL_READINESS_SUCCESS,
  response
});

export const fetchReadinessFailure = (error) => ({
  type: FETCH_TRAVEL_READINESS_FAILURE,
  error
});

export const exportReadiness = (query) => ({
  type: EXPORT_TRAVEL_READINESS,
  query
});

export const exportReadinessSuccess = () => ({
  type: EXPORT_TRAVEL_READINESS_SUCCESS,
});

export const exportReadinessFailure = (error) => ({
  type: EXPORT_TRAVEL_READINESS_FAILURE,
  error
});


export const scanPassport = (payload) => ({
  type: PASSPORT_TRAVEL_READINESS_DOCUMENT_SCAN,
  payload,
});

export const scanPassportSuccess = (response) => ({
  type: PASSPORT_TRAVEL_READINESS_DOCUMENT_SCAN_SUCCESS, 
  response
});

export const scanPassportFailure = (error) => ({
  type: PASSPORT_TRAVEL_READINESS_DOCUMENT_SCAN_FALURE, 
  error
});
