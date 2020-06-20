import {
  FETCH_CENTERS,
  FETCH_CENTERS_SUCCESS,
  FETCH_CENTERS_FAILURE,
  UPDATE_USER_CENTER,
  UPDATE_USER_CENTER_SUCCESS,
  UPDATE_USER_CENTER_FAILURE
} from '../constants/actionTypes';

const initialSate = {
  isLoading: false,
  update: {
    isLoading: false
  }
};

const centers = (state = initialSate, action) => {
  switch(action.type) {
  case FETCH_CENTERS:
    return {...state, isLoading: true };
  case FETCH_CENTERS_SUCCESS:
    return {
      ...state, isLoading: false, centers: action.centers };
  case FETCH_CENTERS_FAILURE:
    return {
      ...state, isLoading: false, centersError: action.error };
  case UPDATE_USER_CENTER:
    return {...state, update: { isLoading: true }};
  case UPDATE_USER_CENTER_SUCCESS:
    return {
      ...state, update: { isLoading: false }, centersUpdate: action.response };
  case UPDATE_USER_CENTER_FAILURE:
    return {
      ...state, update: { isLoading: false }, centersUpdateError: action.error };
  default:
    return state;
  }
};

export default centers;

