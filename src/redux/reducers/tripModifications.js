import {
  FETCH_MODIFICATION_REQUEST,
  SUBMIT_MODIFICATION_REQUEST, UPDATE_MODIFICATION_REQUEST
} from '../constants/actionTypes';

const initialState = {
  viewRequest: {
    submittingRequest: false,
    fetchingModifications: false,
    errors: '',
    pastModifications: [],
    pendingModification: null
  },
  updateRequest: {
    updatingStatus: false,
    errors: ''
  }
};

const singleRequest = ( { viewRequest }, action) => {
  switch(action.type){
  case SUBMIT_MODIFICATION_REQUEST:
    return {
      ...viewRequest,
      submittingRequest: true,
      pending: false
    };
  case `${SUBMIT_MODIFICATION_REQUEST}_SUCCESS`:
    return {
      ...viewRequest,
      submittingRequest: false,
      pendingModification: action.response.modification,
    };
  case `${SUBMIT_MODIFICATION_REQUEST}_FAILURE`: {
    return {
      ...viewRequest,
      submittingRequest: false,
      errors: action.error
    };
  }
  case `${FETCH_MODIFICATION_REQUEST}`: {
    return {
      ...viewRequest,
      fetchingModifications: true,
      submittingRequest: false,
    };
  }
  case `${FETCH_MODIFICATION_REQUEST}_SUCCESS`: {
    const { response : { pendingModification, pastModifications }} = action;
    return {
      ...viewRequest,
      fetchingModifications: false,
      pendingModification,
      pastModifications
    };
  }
  case `${FETCH_MODIFICATION_REQUEST}_FAILURE`: {
    return {
      ...viewRequest,
      fetchingModifications: false,
      errors: action.error
    };
  }
  default:
    return viewRequest;
  }
};

const updateRequest = ({ updateRequest }, action) => {
  switch(action.type){
  case `${UPDATE_MODIFICATION_REQUEST}`:
    return {
      ...updateRequest,
      updatingStatus: true
    };
  case `${UPDATE_MODIFICATION_REQUEST}_SUCCESS`:
    return {
      ...updateRequest,
      updatingStatus: false
    };
  case `${UPDATE_MODIFICATION_REQUEST}_FAILURE`:
    return {
      ...updateRequest,
      updatingStatus: false,
      errors: action.error
    };
  default:
    return updateRequest;
  }
};

export default (state = initialState, action) => {
  return {
    ...initialState,
    viewRequest: singleRequest(state, action),
    updateRequest: updateRequest(state, action)
  };
};
