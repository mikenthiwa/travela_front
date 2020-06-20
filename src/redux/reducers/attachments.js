import {
  FETCH_ATTACHMENTS,
  FETCH_ATTACHMENTS_SUCCESS,
  FETCH_ATTACHMENTS_FAILURE,
  DOWNLOAD_ATTACHMENTS,
  DOWNLOAD_ATTACHMENTS_SUCCESS,
  DOWNLOAD_ATTACHMENTS_FAILURE
} from '../constants/actionTypes';

const initialState = {
  submissions: [],
  error: '',
  isFetching: false,
  success: false
};

const attachments = (state = initialState, action) => {
  const { payload, error, type } = action;

  switch (type) {
  case FETCH_ATTACHMENTS:
    return { ...state, isFetching: true };

  case FETCH_ATTACHMENTS_SUCCESS:
    return { ...state, submissions: payload, success: true, isFetching: false, error: '' };

  case FETCH_ATTACHMENTS_FAILURE:
    return { ...state, payload: {}, success: false, isFetching: false, error };

  default:
    return state;
  }
};

export default attachments;
