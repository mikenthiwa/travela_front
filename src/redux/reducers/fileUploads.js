import {
  UPLOAD_FILE,
  UPLOAD_FILE_FAILURE,
  UPLOAD_FILE_SUCCESS,
  POST_SUBMISSION,
  POST_SUBMISSION_SUCCESS,
  POST_SUBMISSION_FAILURE
} from '../constants/actionTypes';

export const initialState = {
  isUploading: '',
  uploadSuccess: '',
  cloudinaryUrl: '',
  error: ''
};

const fileUploads = (state = initialState, action) => {
  switch(action.type) {
  case UPLOAD_FILE:
    return { ...state, uploadSuccess: '', isUploading: action.checkId };
  case POST_SUBMISSION:
    return {
      ...state, uploadSuccess: '', isUploading: action.checkId,
    };
  case POST_SUBMISSION_SUCCESS:
    return {
      ...state, uploadSuccess: action.checkId, isUploading: '',
    };
  case POST_SUBMISSION_FAILURE:
    return {
      ...state, isUploading: '', uploadSuccess: '',
    };
  case UPLOAD_FILE_SUCCESS:
    return {
      ...state, uploadSuccess: action.checkId, isUploading: '',
      cloudinaryUrl: action.cloudinaryUrl,
      firstFlightDate: action.firstFlightDate,
      returnFlightDate: action.returnFlightDate,
      flightTicketNumber: action.flightTicketNumber,
      flightAirline: action.flightAirline,
      error: '',
    };
  case UPLOAD_FILE_FAILURE:
    return {
      ...state, isUploading: '', uploadSuccess: '',
      cloudinaryUrl: '', error: action.error
    };
  default: return state;
  }
};

export default fileUploads;
