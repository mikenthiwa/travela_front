import {
  FETCH_DOCUMENTS,
  FETCH_DOCUMENTS_SUCCESS,
  FETCH_DOCUMENTS_FAILURE,
  EDIT_DOCUMENT,
  UPDATE_DOCUMENT_ON_EDIT,
  UPDATE_DOCUMENT,
  UPDATE_DOCUMENT_FAILURE,
  UPDATE_DOCUMENT_SUCCESS,
  REMOVE_DOCUMENT_FROM_EDIT,
} from '../constants/actionTypes';

export const initialState = {
  updatingDocument: false,
  documents: [],
  documentOnEdit: null,
  isLoading: false,
  error: ''
};

const documents = (state = initialState, action) => {
  switch(action.type) {
  case FETCH_DOCUMENTS:
    return { ...state, isLoading: true};
  case FETCH_DOCUMENTS_SUCCESS:
    return { ...state, isLoading: false, documents: action.documents, error: '' };
  case FETCH_DOCUMENTS_FAILURE:
    return { ...state, isLoading: false, error: action.error };
  case EDIT_DOCUMENT:
    return { ...state, documentOnEdit: action.document };
  case REMOVE_DOCUMENT_FROM_EDIT:
    return { ...state, message: '', error: '',
      updatingDocument: false, documentOnEdit: null };
  case UPDATE_DOCUMENT_ON_EDIT:
    return { ...state,
      documentOnEdit: { ...state.documentOnEdit, name: action.documentName } };
  case UPDATE_DOCUMENT:
    return { ...state, updatingDocument: true };
  case UPDATE_DOCUMENT_FAILURE:
    return {
      ...state, error: action.error, message: '', updatingDocument: false };
  case UPDATE_DOCUMENT_SUCCESS:
    return { ...state, message: action.message, updatingDocument: false, 
      error: '', documentOnEdit: null,
      documents: [
        action.document,
        ...state.documents.filter(doc => doc.id !== action.document.id)
      ] };
  default: return state;
  }
};

export default documents;
