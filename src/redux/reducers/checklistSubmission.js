import { getItemsToCheck } from '../../helper/travelChecklist-helper';
import {
  POST_SUBMISSION, FETCH_SUBMISSION, UPLOAD_FILE,
  POST_SUBMISSION_SUCCESS, POST_SUBMISSION_FAILURE,
  FETCH_SUBMISSION_SUCCESS, FETCH_SUBMISSION_FAILURE
} from  '../constants/actionTypes';


export const initialState = {
  isUploading: [],
  isLoading: false,
  isFetching: false,
  successStatus: false,
  tripType: '',
  postFail: false,
  postSuccess: [],
  requestId: '',
  successMessage: '',
  itemsToCheck: [],
  percentageCompleted: 0,
  fetchFailureMessage: '',
  fetchSuccessMessage: '',
  submissions: [],
};

const updateSubmissions = (submissions, { submission, checkId}) => {
  try{
    const index = checkId.lastIndexOf('-');
    const checkItem = [checkId.substring(0, index), checkId.substring(index+1)];
    const trip = submissions.findIndex(trip => trip.tripId === checkItem[0]);
    const checklist = submissions[trip].checklist.findIndex(check => check.id === checkItem[1]);
    const sub = submissions[trip].checklist[checklist].submissions.findIndex(sub => sub.id === submission.id);

    if( sub >= 0){
      submissions[trip].checklist[checklist].submissions[sub] = {
        ...submissions[trip].checklist[checklist].submissions[sub],
        ...submission
      };
    }else {
      submissions[trip].checklist[checklist].submissions[0] = submission;
    }
    return submissions;
  }catch(err){
    return submissions;
  }
};

const submissions = (state=initialState, action)=>{
  switch(action.type){
  case UPLOAD_FILE:
    return {
      ...state, postSuccess: state.postSuccess.filter(id => id !== action.checkId),
      isLoading: false, successStatus: false, isUploading: [...state.isUploading, action.checkId],
    };
  case POST_SUBMISSION:
    return {
      ...state, isUploading: [...state.isUploading, action.checkId], isLoading: false,
      successStatus: false, postSuccess: state.postSuccess.filter(id => id !== action.checkId)
    };
  case POST_SUBMISSION_SUCCESS:
    return {
      ...state, isUploading: state.isUploading.filter(id => id !== action.checkId),
      successStatus: action.success,
      postSuccess: [...state.postSuccess, action.checkId], successMessage: action.message,
      itemsToCheck: [...state.itemsToCheck, action.checkId],
      percentageCompleted: action.percentageCompleted,
      submissions: updateSubmissions(state.submissions, action)
    };
  case POST_SUBMISSION_FAILURE:
    return { ...state, postFail: true, error: action.error, successStatus: false };
  case FETCH_SUBMISSION:
    return {
      ...state, isFetching: true, isLoading: true, requestId: action.requestId,
      itemsToCheck: [], tripType: action.tripType,
    };
  case FETCH_SUBMISSION_SUCCESS:
    return {
      ...state, fetchSuccessMessage: action.message, submissions: action.submissions,
      isFetching: false,
      percentageCompleted: action.percentageCompleted,
      itemsToCheck: getItemsToCheck(action.submissions)
    };
  case FETCH_SUBMISSION_FAILURE:
    return { ...state, error: action.error, isFetching: false,
      fetchFailureMessage: '', submissions: [] };
  default:
    return state;
  }
};

export default submissions;
