import {
  FETCH_TEAMMATES,
  FETCH_TEAMMATES_SUCCESS,
  FETCH_TEAMMATES_FAILURE
} from '../constants/actionTypes';

const initialState = {
  payload: [],
  error: '',
  isLoading: false,
  success: false,
  message: ''
};

const teammates = (state = initialState, action) => {
  const {payload, error, type} = action;

  switch (type) {
  case FETCH_TEAMMATES:
    return { ...state, isLoading: true};

  case FETCH_TEAMMATES_SUCCESS:
    return {...state, payload, success: true, isLoading: false, error: '', message: 'Fetched'};

  case FETCH_TEAMMATES_FAILURE:
    return {...state, payload: {}, success: false, isLoading: false, error, message: 'Fetched'};

  default:
    return state;
  }
};

export default teammates;
