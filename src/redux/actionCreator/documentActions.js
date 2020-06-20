import {
  FETCH_DOCUMENTS,
  FETCH_DOCUMENTS_SUCCESS,
  FETCH_DOCUMENTS_FAILURE,
  DELETE_DOCUMENT_FAILURE,
  DELETE_DOCUMENT,
  DELETE_DOCUMENT_SUCCESS,
  EDIT_DOCUMENT,
  REMOVE_DOCUMENT_FROM_EDIT,
  UPDATE_DOCUMENT_ON_EDIT,
  UPDATE_DOCUMENT,
  UPDATE_DOCUMENT_FAILURE,
  UPDATE_DOCUMENT_SUCCESS,
  CREATE_DOCUMENT, 
  CREATE_DOCUMENT_SUCCESS, 
  CREATE_DOCUMENT_FAILURE,
  DOWNLOAD_DOCUMENTS,
  DOWNLOAD_DOCUMENTS_SUCCESS,
  DOWNLOAD_DOCUMENTS_FAILURE,
} from '../constants/actionTypes';


export const fetchDocuments = () => ({
  type: FETCH_DOCUMENTS,
});

export const fetchDocumentsSuccess = (data) => ({
  type: FETCH_DOCUMENTS_SUCCESS,
  documents: data.documents,
});

export const fetchDocumentsFailure = (error) => ({
  type: FETCH_DOCUMENTS_FAILURE,
  error,
});

export const deleteDocument = (documentId) => ({
  type: DELETE_DOCUMENT,
  deletingDocument: true,
  documentId
});

export const deleteDocumentSuccess = (documentId, deletedDocument) => ({
  type: DELETE_DOCUMENT_SUCCESS,
  documentId,
  deletedDocument,
});

export const deleteDocumentFailure = (error) => ({
  type: DELETE_DOCUMENT_FAILURE,
  error,
});

export const downloadDocuments = (url, name) => ({
  type: DOWNLOAD_DOCUMENTS,
  url,
  name
});

export const downloadDocumentsSuccess = (response) => ({
  type: DOWNLOAD_DOCUMENTS_SUCCESS,
  response,
});

export const downloadDocumentsFailure = (error) => ({
  type: DOWNLOAD_DOCUMENTS_FAILURE,
  error,
});

export const editDocument = document => ({
  type: EDIT_DOCUMENT,
  document
});

export const removeDocumentFromEdit = () => ({
  type: REMOVE_DOCUMENT_FROM_EDIT
});

export const updateDocumentOnEdit = documentName => ({
  type: UPDATE_DOCUMENT_ON_EDIT,
  documentName
});

export const updateDocument = document => ({
  type: UPDATE_DOCUMENT,
  document
});

export const updateDocumentFailure = error => ({
  type: UPDATE_DOCUMENT_FAILURE,
  error
});

export const updateDocumentSuccess = ({ message, document}) => ({
  type: UPDATE_DOCUMENT_SUCCESS,
  message,
  document
});

export const createDocument = (documentData) => ({
  type: CREATE_DOCUMENT,
  documentData,
});

export const createDocumentSuccessfully = (documentItem) => ({
  type: CREATE_DOCUMENT_SUCCESS,
  documentItem,
});

export const createDocumentFailure = (error) => ({
  type: CREATE_DOCUMENT_FAILURE,
  error,
});

