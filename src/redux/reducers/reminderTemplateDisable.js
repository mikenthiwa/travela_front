import {
  DISABLE_EMAIL_TEMPLATE,
  DISABLE_EMAIL_TEMPLATE_SUCCESS,
  DISABLE_EMAIL_TEMPLATE_FAILURE,
} from '../constants/actionTypes';

const initialState = {
  templates: [],
  errors:{},
  pagination: {},
  isLoading: false,
};

const reminderTemplateDisableReducer = (state=initialState, action) => {
  switch (action.type) {
  case DISABLE_EMAIL_TEMPLATE:
    return {
      ...state,
      isLoading: true
    };
  case DISABLE_EMAIL_TEMPLATE_FAILURE:
    return {
      ...state,
      isLoading: false,
      errors: action.error
    };
  case DISABLE_EMAIL_TEMPLATE_SUCCESS:
    return {
      ...state,
      isLoading: false
    };
  default:
    return state;
  }
};

export default reminderTemplateDisableReducer;
