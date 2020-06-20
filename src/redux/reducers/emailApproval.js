import {EMAIL_APPROVAL, EMAIL_APPROVAL_FAILURE, EMAIL_APPROVAL_SUCCESS} from '../constants/actionTypes';

const initialState = {
  loading: true,
  response: '',
  error: false
};

export default (state = initialState, action) => {
  switch(action.type){
  case EMAIL_APPROVAL:
    return {
      ...state,
      loading: true,
      response: '',
      error: false
    };
  case EMAIL_APPROVAL_SUCCESS:
    return {
      ...state,
      loading: false,
      response: action.response.message,
      error: false
    };
  case EMAIL_APPROVAL_FAILURE:
    return {
      ...state,
      loading: false,
      response: action.error.message,
      error: true
    };
  default:
    return state;
  }
};
