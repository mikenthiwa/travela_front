import {
  CREATE_TRAVEL_READINESS_DOCUMENT,
  CREATE_TRAVEL_READINESS_DOCUMENT_FAILURE,
  CREATE_TRAVEL_READINESS_DOCUMENT_SUCCESS,
  FETCH_ALL_USERS_READINESS_DOCUMENTS,
  FETCH_ALL_USERS_READINESS_DOCUMENTS_SUCCESS,
  FETCH_ALL_USERS_READINESS_DOCUMENTS_FAILURE,
  FETCH_USER_READINESS_DOCUMENTS,
  FETCH_USER_READINESS_DOCUMENTS_SUCCESS,
  FETCH_USER_READINESS_DOCUMENTS_FAILURE,
  FETCH_TRAVEL_READINESS_DOCUMENT,
  FETCH_TRAVEL_READINESS_DOCUMENT_SUCCESS,
  FETCH_TRAVEL_READINESS_DOCUMENT_FAILURE,
  VERIFY_TRAVEL_READINESS_DOCUMENT,
  VERIFY_TRAVEL_READINESS_DOCUMENT_SUCCESS,
  VERIFY_TRAVEL_READINESS_DOCUMENT_FAILURE,
  EDIT_TRAVEL_READINESS_DOCUMENT,
  EDIT_TRAVEL_READINESS_DOCUMENT_SUCCESS,
  EDIT_TRAVEL_READINESS_DOCUMENT_FAILURE,
  DELETE_TRAVEL_READINESS_DOCUMENT,
  DELETE_TRAVEL_READINESS_DOCUMENT_SUCCESS,
  DELETE_TRAVEL_READINESS_DOCUMENT_FAILURE,
  CREATE_COMMENT_SUCCESS,
  EDIT_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  PASSPORT_TRAVEL_READINESS_DOCUMENT_SCAN,
  PASSPORT_TRAVEL_READINESS_DOCUMENT_SCAN_SUCCESS,
  PASSPORT_TRAVEL_READINESS_DOCUMENT_SCAN_FALURE
} from '../constants/actionTypes';
import { commentsUpdate } from './requests';

export const initialState = {
  users: [],
  meta: { pageCount: 1, currentPage: 1 },
  isLoading: false,
  error: '',
  userReadiness: {
    fullName: '',
    travelDocuments: {
      passport: [],
      visa: [],
    },
  },
  errors: {},
  passportInfo: {},
  document: {
    comments: [],
  },
  updatingDocument: false,
  comments: [],
  fetchingDocument: false,
  showForm:false,
  scanning:false
};

let comments;
const tdReducer = (state = initialState.userReadiness.travelDocuments, action) => {
  switch(action.type) {
  case VERIFY_TRAVEL_READINESS_DOCUMENT_SUCCESS:
  case EDIT_TRAVEL_READINESS_DOCUMENT_SUCCESS:
    return {
      ...state,
      [action.document.type]: state[action.document.type].map((item) => {
        if (item.id === action.document.id) { return action.document; }
        return item;
      })
    }; /* istanbul ignore next */
  default: return state;
  }
};

const delReducer = (state = initialState.userReadiness.travelDocuments, action) => {
  switch (action.type) {
  case DELETE_TRAVEL_READINESS_DOCUMENT_SUCCESS:
    return {
      ...state,
      [action.deletedDocument.type]: state[action.deletedDocument.type].filter((item) => {
        return item.id !== action.deletedDocument.id;
      })
    }; /* istanbul ignore next */
  default: return state;
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_ALL_USERS_READINESS_DOCUMENTS:
    return {
      ...state, users: [],
      isLoading: true,
    };
  case FETCH_ALL_USERS_READINESS_DOCUMENTS_SUCCESS:
    return {
      ...state,
      isLoading: false,
      users: action.users,
      meta: action.meta,
    };
  case FETCH_ALL_USERS_READINESS_DOCUMENTS_FAILURE:
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  case FETCH_USER_READINESS_DOCUMENTS:
    return {
      ...state,
      isLoading: true,
    };
  case FETCH_USER_READINESS_DOCUMENTS_SUCCESS:
    return {
      ...state,
      isLoading: false,
      userReadiness: action.user,
    };
  case FETCH_USER_READINESS_DOCUMENTS_FAILURE:
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  case FETCH_TRAVEL_READINESS_DOCUMENT:
    return {
      ...state,
      fetchingDocument: true,
      document: {
        comments: [],
      },
    };
  case FETCH_TRAVEL_READINESS_DOCUMENT_SUCCESS:
    return {
      ...state,
      fetchingDocument: false,
      document: action.document
    };
  case FETCH_TRAVEL_READINESS_DOCUMENT_FAILURE:
    return {
      ...state,
      fetchingDocument: false,
      document: {
        comments: [],
      },
      error: action.error
    };
  case VERIFY_TRAVEL_READINESS_DOCUMENT:
    return {
      ...state,
      updatingDocument: true,
    };
  case VERIFY_TRAVEL_READINESS_DOCUMENT_SUCCESS:
  case EDIT_TRAVEL_READINESS_DOCUMENT_SUCCESS:
    return {
      ...state,
      fetchingDocument: false,
      updatingDocument: false,
      document: action.document,
      userReadiness: {
        ...state.userReadiness,
        travelDocuments: tdReducer(state.userReadiness.travelDocuments, action)
      }
    };
  case VERIFY_TRAVEL_READINESS_DOCUMENT_FAILURE:
    return {
      ...state,
      fetchingDocument: false,
      updatingDocument: false,
      error: action.error,
      document: {
        comments: [],
      },
    };
  case CREATE_TRAVEL_READINESS_DOCUMENT:
    return {...state, isLoading: true};
  case CREATE_TRAVEL_READINESS_DOCUMENT_SUCCESS:
    return {...state, isLoading: false, document: action.response, passportInfo:{}, showForm:false};
  case CREATE_TRAVEL_READINESS_DOCUMENT_FAILURE: {
    const {error: {errors}} = action;
    const validationErrors = {};
    errors && errors.forEach( error => {
      const key = error.name.split('.');
      if( key && key.length === 2)
        validationErrors[key[1]] = error.message;
    });
    return {...state, isLoading: false, errors: validationErrors === {} ? errors : validationErrors};
  }
  case EDIT_TRAVEL_READINESS_DOCUMENT:
    return {
      ...state,
      updatingDocument: true,
      document: {},
    };
  case EDIT_TRAVEL_READINESS_DOCUMENT_FAILURE:
    return {
      ...state,
      updatingDocument: false,
      error: action.error,
      document: {},
    };
  case DELETE_TRAVEL_READINESS_DOCUMENT:
    return {
      ...state,
      deletingDocument: true,
      document: {},
    };
  case DELETE_TRAVEL_READINESS_DOCUMENT_SUCCESS:
    return {
      ...state,
      deletingDocument: false,
      document: action.deletedDocument,
      userReadiness: {
        ...state.userReadiness,
        travelDocuments: delReducer(state.userReadiness.travelDocuments, action)
      }
    };
  case DELETE_TRAVEL_READINESS_DOCUMENT_FAILURE:
    return {
      ...state,
      deletingDocument: false,
      error: action.error,
      document: {},
    };
  case CREATE_COMMENT_SUCCESS:
    return {
      ...state,
      document: {
        ...state.document,
        comments: [
          ...state.document.comments,
          action.comment.comment
        ],
      },
      comments: [
        ...state.document.comments,
        action.comment.comment
      ],
    };
  case EDIT_COMMENT_SUCCESS:
    comments = commentsUpdate(state.document.comments, action);
    return {
      ...state,
      document: {
        ...state.document,
        comments
      },
      comments
    };
  case DELETE_COMMENT_SUCCESS:
    comments = state.document.comments.filter(comment => comment.id !== action.commentId);
    return {
      ...state,
      document: {
        ...state.document,
        comments
      },
      comments
    };
  case PASSPORT_TRAVEL_READINESS_DOCUMENT_SCAN:
    return {...state, scanning: true, showForm:false};
  case PASSPORT_TRAVEL_READINESS_DOCUMENT_SCAN_SUCCESS:
    return {
      ...state, scanning: false, passportInfo: action.response, showForm:true };
  case PASSPORT_TRAVEL_READINESS_DOCUMENT_SCAN_FALURE:
    if(action.error === 'please upload a valid passport image'){
      return {...state, scanning: false, error: action.error, showForm:false};
    }else {
      return {...state, scanning: false, error: action.error, showForm:false};
    }
  default: return state;
  }
};
