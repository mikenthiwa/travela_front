import {
  FETCH_AVAILABLE_ROOMS,
  FETCH_AVAILABLE_ROOMS_SUCCESS,
  FETCH_AVAILABLE_ROOMS_FAILURE
} from '../constants/actionTypes';

const initialState = {
  isLoading: false,
  beds: [],
  bedsError: [],
  rowId: 0
};

const availableRooms = (state = initialState, action) => {
  const rowId = (action.action) ? action.action.rowId : 0;
  switch (action.type) {
  case FETCH_AVAILABLE_ROOMS:
    return { ...state, isLoading: true, rowId };
  case FETCH_AVAILABLE_ROOMS_SUCCESS:
    return {
      ...state,
      isLoading: false,
      beds: action.beds
    };
  case FETCH_AVAILABLE_ROOMS_FAILURE:
    return { ...state, isLoading: false, bedsError: action.error };
  default:
    return state;
  }
};

export default availableRooms;
