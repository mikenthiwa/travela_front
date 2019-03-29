import {
  FETCH_USER_REQUESTS,
  FETCH_USER_REQUESTS_SUCCESS,
  FETCH_USER_REQUESTS_FAILURE,
  CREATE_NEW_REQUEST,
  CREATE_NEW_REQUEST_SUCCESS,
  CREATE_NEW_REQUEST_FAILURE,
  FETCH_USER_REQUEST_DETAILS,
  FETCH_USER_REQUEST_DETAILS_SUCCESS,
  FETCH_USER_REQUEST_DETAILS_FAILURE,
  EDIT_REQUEST,
  EDIT_REQUEST_SUCCESS,
  EDIT_REQUEST_FAILURE,
  FETCH_EDIT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  EDIT_COMMENT_SUCCESS,
  DELETE_REQUEST,
  DELETE_REQUEST_SUCCESS,
  DELETE_REQUEST_FAILURE,
  UPDATE_REQUEST_STATUS_SUCCESS,
  FETCH_EDIT_REQUEST_SUCCESS,
  FETCH_EDIT_REQUEST_FAILURE
} from '../constants/actionTypes';

const initialState = {
  requestData: {
    trips: [],
    comments: [],
    accommodationType: ''
  },
  requestOnEdit: {
    trips: []
  },
  comments: [],
  fetchingRequest: false
};

export const commentsUpdate = (commentsArray, action) => {
  const updatedCommentArray = commentsArray.map(comment => {
    if (comment.id === action.comment.id) {
      comment.comment = action.comment.comment;
      comment.isEdited = action.comment.isEdited;
    }
    return comment;
  });
  return updatedCommentArray;
};

let editedRequestIndex, comments;
const requests = (state = initialState, action) => {
  switch (action.type) {
  case DELETE_REQUEST:
    return {
      ...state,
      isDeleting: true,
    };
  case DELETE_REQUEST_SUCCESS: {
    const requests = state.requests.filter(request =>
      request.id !== action.requestId);
    return {
      ...state,
      isDeleting: false,
      message: requests.length === 0
        ? 'You do not have any requests at the moment'
        : action.message,
      openRequestsCount: state.openRequestsCount > 0 ?
        state.openRequestsCount - 1 : state.openRequestsCount,
      requests
    };
  }
  case DELETE_REQUEST_FAILURE:
    return {
      ...state,
      isDeleting: false,
      error: action.error
    };
  case FETCH_USER_REQUESTS:
    return {
      ...state,
      isLoading: true
    };
  case FETCH_USER_REQUESTS_SUCCESS:
    return {
      ...state,
      isLoading: false,
      message: action.message,
      requests: action.requests,
      openRequestsCount: action.meta.count.open,
      pastRequestsCount: action.meta.count.past,
      pagination: action.meta.pagination
    };
  case FETCH_USER_REQUESTS_FAILURE:
    return {
      ...state,
      isLoading: false,
      fetchRequestsError: action.error
    };
  case CREATE_NEW_REQUEST:
    return {
      ...state,
      creatingRequest: true
    };
  case CREATE_NEW_REQUEST_SUCCESS:
    return {
      ...state,
      creatingRequest: false,
      request: action.newRequest,
      openRequestsCount: state.openRequestsCount + 1,
      errors: []
    };
  case CREATE_NEW_REQUEST_FAILURE:
    return {
      ...state,
      creatingRequest: false,
      errors: [action.error]
    };
  case FETCH_USER_REQUEST_DETAILS:
    return {
      fetchingRequest: true
    };
  case FETCH_USER_REQUEST_DETAILS_SUCCESS:
    return {
      ...state,
      fetchingRequest: false,
      requestData: action.requestData,
      comments: action.requestData ? action.requestData.comments && action.requestData.comments.sort(
        (commentDate1, commentDate2) =>  (commentDate1.createdAt > commentDate2.createdAt)) : []
    };
  case FETCH_USER_REQUEST_DETAILS_FAILURE:
    return {
      ...state,
      fetchingRequest: false,
      errors: action.error
    };
  case EDIT_REQUEST:
    return {
      ...state,
      editingRequest: true
    };
  case FETCH_EDIT_REQUEST:
    return {
      ...state,
      fetchingRequest: true
    };
  case FETCH_EDIT_REQUEST_SUCCESS:
    return {
      ...state,
      fetchingRequest: false,
      comments: action.response.comments,
      requestOnEdit: action.response
    };
  case FETCH_EDIT_REQUEST_FAILURE:
    return {
      ...state,
      fetchingRequest: false,
      errors: action.errors
    };
  case EDIT_REQUEST_SUCCESS:
    editedRequestIndex = state.requests.findIndex((request) =>
      request.id === action.updatedRequest.id);
    return {
      ...state,
      editingRequest: false,
      requests: [
        ...state.requests.slice(0, editedRequestIndex),
        action.updatedRequest,
        ...state.requests.slice(editedRequestIndex+1)
      ],
      editRequestError: null
    };
  case EDIT_REQUEST_FAILURE:
    return {
      ...state,
      editingRequest: false,
      editRequestError: action.error
    };
  case CREATE_COMMENT_SUCCESS:
    return {
      ...state,
      requestData: {
        ...state.requestData,
        comments: [
          ...state.comments,
          action.comment.comment
        ],
      },
      comments: [
        ...state.comments,
        action.comment.comment
      ],
    };
  case EDIT_COMMENT_SUCCESS:
    comments = commentsUpdate(state.comments, action);
    return {
      ...state,
      requestData: {
        ...state.requestData,
        comments
      },
      comments
    };
  case DELETE_COMMENT_SUCCESS:

    comments = state.comments.filter(comment => comment.id !== action.commentId);

    return {
      ...state,
      requestData: {
        ...state.requestData,
        comments
      },
      comments
    };
  case UPDATE_REQUEST_STATUS_SUCCESS:
    return {
      ...state,
      requestData: {
        ...state.requestData,
        status: action.updatedRequest.request.status },
    };
  default:
    return state;
  }
};


export default requests;
