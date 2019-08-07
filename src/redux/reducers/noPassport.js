import {
  ADD_NO_PASSPORT_NOTIFICATION, ADD_NO_PASSPORT_NOTIFICATION_SUCCESS, ADD_NO_PASSPORT_NOTIFICATION_FAILURE
} from '../constants/actionTypes';

const initialState = {
  isLoading: false,
  message: '',
  error: null
};

export default (state = initialState, action) =>  {
  switch (action.type) {
  case ADD_NO_PASSPORT_NOTIFICATION:
    return {...state, isLoading: true };
  case ADD_NO_PASSPORT_NOTIFICATION_SUCCESS:
    return { ...state, message: action.message, isLoading: false };
  case ADD_NO_PASSPORT_NOTIFICATION_FAILURE:
    return { ...state, error: action.error, isLoading: false };
  default:
    return state;
  }
};
