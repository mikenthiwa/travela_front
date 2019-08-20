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

const fetchDocumentTypes = state => ({
  ...state,
  isLoading: true,
});

const fetchDocumentTypesSuccess = (state, { payload }) => ({
  ...state,
  documentTypes: payload,
  isLoading: false,
});

const fetchDocumentTypesFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  error: payload,
});

const editDocumentTypes = state => ({
  ...state,
  editLoading: true,
});

const editDocumentTypesSuccess = (state, { payload }) => ({
  ...state,
  documentTypes: state.documentTypes.map(type => type.id === payload.id ? payload : type),
  editLoading: false,
});

const editDocumentTypesFailure = (state, { payload }) => ({
  ...state,
  editLoading: false,
  error: payload,
});

const createDocumentTypes = state => ({
  ...state,
  createLoading: true,
});

const createDocumentTypesSuccess = (state, { payload }) => ({
  ...state,
  documentTypes: [payload, ...state.documentTypes],
  createLoading: false,
});

const createDocumentTypesFailure = (state, { payload }) => ({
  ...state,
  createLoading: false,
  error: payload,
});

const deleteDocumentTypes = state => ({
  ...state,
  deleteLoading: true,
});

const deleteDocumentTypesSuccess = (state, { payload }) => ({
  ...state,
  documentTypes: state.documentTypes.filter(({ name }) => name !== payload),
  deleteLoading: false,
});

const deleteDocumentTypesFailure = (state, { payload }) => ({
  ...state,
  deleteLoading: false,
  error: payload,
});

const initialState = {
  documentTypes: [],
  isLoading: false,
  deleteLoading: false,
  createLoading: false,
  editLoading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
  case FETCH_DOCUMENT_TYPES: return fetchDocumentTypes(state);
  case FETCH_DOCUMENT_TYPES_SUCCESS: return fetchDocumentTypesSuccess(state, action);
  case FETCH_DOCUMENT_TYPES_FAILURE: return fetchDocumentTypesFailure(state, action);
  case EDIT_DOCUMENT_TYPES: return editDocumentTypes(state);
  case EDIT_DOCUMENT_TYPES_SUCCESS: return editDocumentTypesSuccess(state, action);
  case EDIT_DOCUMENT_TYPES_FAILURE: return editDocumentTypesFailure(state, action);
  case CREATE_DOCUMENT_TYPES: return createDocumentTypes(state);
  case CREATE_DOCUMENT_TYPES_SUCCESS: return createDocumentTypesSuccess(state, action);
  case CREATE_DOCUMENT_TYPES_FAILURE: return createDocumentTypesFailure(state, action);
  case DELETE_DOCUMENT_TYPES: return deleteDocumentTypes(state);
  case DELETE_DOCUMENT_TYPES_SUCCESS: return deleteDocumentTypesSuccess(state, action);
  case DELETE_DOCUMENT_TYPES_FAILURE: return deleteDocumentTypesFailure(state, action);
  default: return state;
  }
};

export default reducer;
