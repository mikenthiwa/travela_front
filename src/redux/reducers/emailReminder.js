import {
  DISABLE_REMINDER_CONDITION,
  DISABLE_REMINDER_CONDITION_SUCCESS,
  DISABLE_REMINDER_CONDITION_FAILURE,
  FETCH_EMAIL_REMINDERS,
  FETCH_EMAIL_REMINDERS_SUCCESS,
  FETCH_EMAIL_REMINDERS_FAILURE,
  ENABLE_DISABLED_REMINDER_CONDITION,
  ENABLE_DISABLED_REMINDER_CONDITION_SUCCESS,
  ENABLE_DISABLED_REMINDER_CONDITION_FAILURE
} from '../constants/actionTypes';

export const initialState = {
  isLoading: false,
  reminders: [],
  error: {},
  meta: {documentCount: {}},
  disabling: false,
  enabling: false,
};

let remindersUpdate;

const compReducer = (state, action) => {
  remindersUpdate = state.reminders.map((list) => {
    if (list.id === action.condition.id) {
      return action.condition;
    }
    return list;
  });
  return [...remindersUpdate];
};

const emailReminders = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_EMAIL_REMINDERS:
    return {...state, isLoading: true};
  case FETCH_EMAIL_REMINDERS_SUCCESS:
    return {...state, isLoading: false, ...action.payload};
  case FETCH_EMAIL_REMINDERS_FAILURE:
    return { ...state, isLoading: false, error: action.error};
  case DISABLE_REMINDER_CONDITION:
    return {...state, disabling: true};
  case DISABLE_REMINDER_CONDITION_SUCCESS:
    return {
      ...state,
      disabling: false,
      reminders: compReducer(state, action)
    };
  case DISABLE_REMINDER_CONDITION_FAILURE:
    return { ...state, disabling: false, error: action.error};
  case ENABLE_DISABLED_REMINDER_CONDITION:
    return { ...state, enabling: true };
  case ENABLE_DISABLED_REMINDER_CONDITION_SUCCESS:
    return {
      ...state,
      enabling: false,
      reminders: compReducer(state, action)
    };
  case ENABLE_DISABLED_REMINDER_CONDITION_FAILURE:
    return {
      ...state,
      enabling: false,
      error: action.error
    };
  default:
    return state;
  }
};

export default emailReminders;
