import {
  CREATE_REMINDER_SUCCESS,
  CREATE_REMINDER,
  CREATE_REMINDER_FAILURE,
  EDIT_REMINDER,
  EDIT_REMINDER_SUCCESS,
  EDIT_REMINDER_FAILURE,
  GET_SINGLE_REMINDER,
  GET_SINGLE_REMINDER_SUCCESS,
  GET_SINGLE_REMINDER_FAILURE,
  FETCH_ALL_EMAIL_TEMPLATES,
  FETCH_ALL_EMAIL_TEMPLATES_SUCCESS,
  CREATE_REMINDER_EMAIL_TEMPLATE,
} from '../constants/actionTypes';

export const initialState = {
  templates: [],
  currentPage: 0,
  isLoading: false,
  newReminder: {
    isCreating: false,
    errors: {},
    data: {},
  },
  updatedReminder: {
    isUpdating: false,
    errors: {},
    data: {},
  },
  singleReminder: {
    isLoading: false,
    errors: {},
    data: {},
  }
};

const templateReducer = (templates = [], action) => {
  const leastTemplateId = templates.length
    ? templates[templates.length - 1].id : action.pagination.totalCount + 1;
  const newTemplates = action.templates.filter(template => template.id < leastTemplateId);
  return [...templates, ...newTemplates];
};

const newReminderReducer = (reminderState = initialState.newReminder, action) => {
  switch (action.type) {
  case CREATE_REMINDER: {
    return {
      ...reminderState,
      isCreating: true,
      errors: {}
    };
  }
  case CREATE_REMINDER_SUCCESS: {
    return {
      ...reminderState,
      isCreating: false,
      data: action.reminder,
      errors: {}
    };
  }
  case CREATE_REMINDER_FAILURE: {
    return {
      ...reminderState,
      isCreating: false,
      errors: action.errors,
    };
  }
  }
};

const updatedReminderReducer = (reminderState = initialState.updatedReminder, action) => {
  switch (action.type) {
  case EDIT_REMINDER: {
    return {
      ...reminderState,
      isUpdating: true,
      errors: {}
    };
  }
  case EDIT_REMINDER_SUCCESS: {
    return {
      ...reminderState,
      isUpdating: false,
      data: action.reminder,
      errors: {},
    };
  }
  case EDIT_REMINDER_FAILURE: {
    return {
      ...reminderState,
      isUpdating: false,
      errors: action.errors,
    };
  }
  }
};

const singleReminderReducer = (singleReminder = initialState.singleReminder, action) => {
  switch (action.type) {
  case GET_SINGLE_REMINDER: {
    return {
      ...singleReminder,
      data: {},
      isLoading: true,
      errors: {}
    };
  }
  case GET_SINGLE_REMINDER_SUCCESS: {
    return {
      ...singleReminder,
      isLoading: false,
      data: action.reminder.reminder,
      errors: {}
    };
  }
  case GET_SINGLE_REMINDER_FAILURE: {
    return {
      ...singleReminder,
      isLoading: false,
      errors: action.errors,
    };
  }
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_ALL_EMAIL_TEMPLATES:
    return {
      ...state,
      isLoading: true
    };
  case FETCH_ALL_EMAIL_TEMPLATES_SUCCESS: {
    return {
      ...state,
      isLoading: false,
      templates: templateReducer(state.templates, action),
      currentPage: action.pagination.currentPage,
    };
  }
  case CREATE_REMINDER_EMAIL_TEMPLATE: {
    return {
      ...state,
      templates: []
    };
  }
  case CREATE_REMINDER:
  case CREATE_REMINDER_FAILURE:
  case CREATE_REMINDER_SUCCESS: {
    return {
      ...state,
      newReminder: newReminderReducer(state.newReminder, action),
    };
  }
  case EDIT_REMINDER:
  case EDIT_REMINDER_SUCCESS:
  case EDIT_REMINDER_FAILURE:
    return {
      ...state,
      updatedReminder: updatedReminderReducer(state.updatedReminder, action),
      singleReminder: initialState.singleReminder
    };
  case GET_SINGLE_REMINDER:
  case GET_SINGLE_REMINDER_SUCCESS:
  case GET_SINGLE_REMINDER_FAILURE:
    return {
      ...state,
      singleReminder: singleReminderReducer(state.singleReminder, action)
    };
  default:
    return state;
  }
};
