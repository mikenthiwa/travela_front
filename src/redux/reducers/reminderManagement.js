import {
  CREATE_REMINDER_EMAIL_TEMPLATE,
  CREATE_REMINDER_EMAIL_TEMPLATE_FAILURE,
  CREATE_REMINDER_EMAIL_TEMPLATE_SUCCESS,
  FETCH_ONE_EMAIL_TEMPLATE,
  FETCH_ONE_EMAIL_TEMPLATE_FAILURE,
  FETCH_ONE_EMAIL_TEMPLATE_SUCCESS,
  UPDATE_REMINDER_EMAIL_TEMPLATE,
  UPDATE_REMINDER_EMAIL_TEMPLATE_FAILURE,
  UPDATE_REMINDER_EMAIL_TEMPLATE_SUCCESS
} from '../constants/actionTypes';

const initialState = {
  newEmailTemplate: {
    isSaving: false,
    errors: {},
    data: {}
  },
  updatedEmailTemplate: {
    isSaving: false,
    errors: {},
    data: {}
  }
};

export default (state = initialState, action) => {
  switch(action.type){
  case CREATE_REMINDER_EMAIL_TEMPLATE:
    return {...state, newEmailTemplate: {
      isSaving: true,
      errors: {},
    }};
  case CREATE_REMINDER_EMAIL_TEMPLATE_SUCCESS:
    return {...state, newEmailTemplate: {
      isSaving: false,
      errors: {},
      data: action.response.reminderEmailTemplate}
    };
  case CREATE_REMINDER_EMAIL_TEMPLATE_FAILURE:
    return {...state, newEmailTemplate: {
      isSaving: false,
      errors: action.errors || {},
    }};

  case FETCH_ONE_EMAIL_TEMPLATE:
    return {...state, updatedEmailTemplate: {
      isFetching: true,
      errors: {}
    }};

  case FETCH_ONE_EMAIL_TEMPLATE_SUCCESS:
    return {...state, updatedEmailTemplate: {
      isFetching: false,
      errors: {},
      data: action.response.reminderEmailTemplate
    }};

  case FETCH_ONE_EMAIL_TEMPLATE_FAILURE:
    return {...state, updatedEmailTemplate: {
      isFetching: false,
      errors: action.errors || action.error || action.message || {}
    }};

  case UPDATE_REMINDER_EMAIL_TEMPLATE:
    return {...state, updatedEmailTemplate: {
      isSaving: true,
      errors: {}
    }};

  case UPDATE_REMINDER_EMAIL_TEMPLATE_SUCCESS:
    return {...state, updatedEmailTemplate: {
      isSaving: false,
      errors: {},
      data: action.response.reminderEmailTemplate
    }};

  case UPDATE_REMINDER_EMAIL_TEMPLATE_FAILURE:
    return {...state, updatedEmailTemplate: {
      isSaving: false,
      errors: action.errors || action.error || action.message || {}
    }};
  default:
    return state;
  }
};
