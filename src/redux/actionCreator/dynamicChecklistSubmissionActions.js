import {
  POST_CHECKLIST_SUBMISSION,
  POST_CHECKLIST_SUBMISSION_STARTED,
  POST_CHECKLIST_SUBMISSION_SUCCESS,
  POST_CHECKLIST_SUBMISSION_FAILURE,
  FETCH_CHECKLIST_SUBMISSION,
  FETCH_CHECKLIST_SUBMISSION_SUCCESS,
  FETCH_CHECKLIST_SUBMISSION_FAILURE,
  UPDATE_CHECKLIST_SUBMISSION,
} from '../constants/actionTypes';
  
export const postChecklistSubmission = payload => ({
  type: POST_CHECKLIST_SUBMISSION,
  payload,
});

export const postChecklistSubmissionStarted = () => ({
  type: POST_CHECKLIST_SUBMISSION_STARTED,
});
  
export const postChecklistSubmissionSuccess = payload => ({
  type: POST_CHECKLIST_SUBMISSION_SUCCESS,
  payload,
});
  
export const postChecklistSubmissionFailure = error => ({
  type: POST_CHECKLIST_SUBMISSION_FAILURE,
  payload: error,
});

export const fetchChecklistSubmission = payload => ({
  type: FETCH_CHECKLIST_SUBMISSION,
  payload
});
    
export const fetchChecklistSubmissionSuccess = payload => ({
  type: FETCH_CHECKLIST_SUBMISSION_SUCCESS,
  payload,
});
    
export const fetchChecklistSubmissionFailure = error => ({
  type: FETCH_CHECKLIST_SUBMISSION_FAILURE,
  payload: error
});

export const updateChecklistSubmission = payload => ({
  type: UPDATE_CHECKLIST_SUBMISSION,
  payload
});
