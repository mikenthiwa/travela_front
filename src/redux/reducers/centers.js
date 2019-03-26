import {
  FETCH_CENTERS,
  FETCH_CENTERS_SUCCESS,
  FETCH_CENTERS_FAILURE,
} from '../constants/actionTypes';

const initialSate = {
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
  default:
    return state;
  }
};

export default centers;

