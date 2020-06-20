import _ from 'lodash';
import {
  CREATE_TRAVEL_REASON,
  CREATE_TRAVEL_REASON_SUCCESS,
  CREATE_TRAVEL_REASON_FAILURE,
  FETCH_ALL_TRAVEL_REASONS,
  FETCH_ALL_TRAVEL_REASONS_FAILURE,
  FETCH_ALL_TRAVEL_REASONS_SUCCESS,
  FETCH_TRAVEL_REASON,
  EDIT_TRAVEL_REASON_SUCCESS,
  EDIT_TRAVEL_REASON_FAILURE,
  EDIT_TRAVEL_REASON,
  VIEW_TRAVEL_REASON_DETAILS,
  VIEW_TRAVEL_REASON_DETAILS_SUCCESS,
  VIEW_TRAVEL_REASON_DETAILS_FAILURE,
  DELETE_TRAVEL_REASON,
  DELETE_TRAVEL_REASON_SUCCESS,
  DELETE_TRAVEL_REASON_FAILURE
} from '../constants/actionTypes';


export const initialState = {
  newReason: {},
  editReason: {},
  isCreating: false,
  isFetching: false,
  isEditing: false,
  errors: {},
  travelReasons: [],
  pagination: {},
  isLoading: false,
  reasonDetails: {},
  isDeleting: false
};
let newReasons;

const deleteReasonReducer = (action) => {
  switch (action.type) {
  case DELETE_TRAVEL_REASON:
    return true;
  case DELETE_TRAVEL_REASON_SUCCESS:
  case DELETE_TRAVEL_REASON_FAILURE:
    return false;
  }
};
const deleteTravelReasonsReducer = (state, action) => {
  switch (action.type) {
  case DELETE_TRAVEL_REASON_SUCCESS:
    newReasons = state.travelReasons.filter(reason => reason.id !== action.reasonId);
    return newReasons;
  case DELETE_TRAVEL_REASON:
    return state.travelReasons;
  case DELETE_TRAVEL_REASON_FAILURE:
    return state.travelReasons;
  }
};

const deleteReasonReducerError = (state, action) => {
  switch (action.type) {
  case DELETE_TRAVEL_REASON:
    return state.errors;
  case DELETE_TRAVEL_REASON_FAILURE:
    return action.error;
  case DELETE_TRAVEL_REASON_SUCCESS:
    return '';
  }
};

const viewReasonReducer = (action) => {
  switch (action.type) {
  case VIEW_TRAVEL_REASON_DETAILS:
    return true;
  case VIEW_TRAVEL_REASON_DETAILS_SUCCESS:
  case VIEW_TRAVEL_REASON_DETAILS_FAILURE:
    return false;
  }
};

const viewReasonReducerError = (action) => {
  switch (action.type) {
  case VIEW_TRAVEL_REASON_DETAILS:
  case VIEW_TRAVEL_REASON_DETAILS_SUCCESS:
    return {};
  case VIEW_TRAVEL_REASON_DETAILS_FAILURE:
    return action.error;
  }
};

const viewReasonReducerSuccess = (state, action) => {
  switch (action.type) {
  case VIEW_TRAVEL_REASON_DETAILS:
  case VIEW_TRAVEL_REASON_DETAILS_FAILURE:
    return state.reasonDetails;
  case VIEW_TRAVEL_REASON_DETAILS_SUCCESS:
    return { ...action.response.travelReason };
  }
};

const editTravelReason = (state = initialState, action) => {
  switch(action.type) {
  case EDIT_TRAVEL_REASON: { return {...state, isEditing: true, errors: {}};}
  case FETCH_TRAVEL_REASON: {
    return {
      ...state,
      editReason: state.travelReasons.find(
        reason => reason.id === action.travelReasonId
      )
    };
  }
  case EDIT_TRAVEL_REASON_SUCCESS: {
    const { travelReason} = action.response;
    const travelReasons = state.travelReasons.slice();
    const index = _.findIndex(travelReasons, { id: travelReason.id});
    travelReasons[index] = travelReason;
    return {
      ...state,
      isEditing: false,
      travelReasons,
      editReason: {},
      errors: {}
    };
  }
  case EDIT_TRAVEL_REASON_FAILURE: {
    return {...state, isEditing: false, errors: action.error};
  }
  default: { return state;}
  }
};

const travelReason = (state = initialState, action) => {
  switch (action.type) {
  case CREATE_TRAVEL_REASON: { return { ...state, isCreating: true, errors: {} }; }
  case CREATE_TRAVEL_REASON_SUCCESS:
    return { ...state, isCreating: false,
      newReason: action.response.travelReason, errors: {}};
  case CREATE_TRAVEL_REASON_FAILURE: {
    return { ...state, isCreating: false, errors: action.error };}
  case FETCH_ALL_TRAVEL_REASONS: return { ...state, isLoading: true };
  case FETCH_ALL_TRAVEL_REASONS_SUCCESS:
    return { ...state,
      travelReasons: action.travelReasons, pagination: action.pagination,
      isLoading: false };
  case FETCH_ALL_TRAVEL_REASONS_FAILURE: return {
    ...state, errors: action.errors, isLoading: false };
  case VIEW_TRAVEL_REASON_DETAILS:
  case VIEW_TRAVEL_REASON_DETAILS_SUCCESS:
  case VIEW_TRAVEL_REASON_DETAILS_FAILURE:
    return { ...state,
      isFetching: viewReasonReducer(action),
      errors: viewReasonReducerError(action),
      reasonDetails: viewReasonReducerSuccess(state,action),
    };
  case DELETE_TRAVEL_REASON_SUCCESS:
  case DELETE_TRAVEL_REASON:
  case DELETE_TRAVEL_REASON_FAILURE:
    return {
      ...state,
      isDeleting: deleteReasonReducer(action),
      error: deleteReasonReducerError(state, action),
      travelReasons: deleteTravelReasonsReducer(state, action)
    };
  default: {
    return editTravelReason(state, action);
  }
  }
};

export default travelReason;
