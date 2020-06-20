import {
  POST_SUBMISSION,
  POST_SUBMISSION_SUCCESS,
  POST_SUBMISSION_FAILURE,
  FETCH_SUBMISSION,
  FETCH_SUBMISSION_SUCCESS,
  FETCH_SUBMISSION_FAILURE,
} from '../constants/actionTypes';
  
export const postSubmission = (
  { formData, checklistItemId }, checkId, requestId
) => ({
  type: POST_SUBMISSION,
  formData,
  checklistItemId,
  checkId,
  requestId
});
  
export const postSubmissionSuccess = (
  {submission, message, percentageCompleted, success}, checkId
) => ({
  type: POST_SUBMISSION_SUCCESS,
  submission,
  checkId,
  message,
  percentageCompleted,
  success
});
  
export const postSubmissionFailure = (error) => ({
  type: POST_SUBMISSION_FAILURE,
  error
});

export const fetchSubmission = ({ requestId, tripType }) => ({
  type: FETCH_SUBMISSION,
  requestId,
  tripType
});
    
export const fetchSubmissionSuccess = (
  { submissions, percentageCompleted, message, success }
) => ({
  type: FETCH_SUBMISSION_SUCCESS,
  submissions,
  percentageCompleted,
  message,
  success
});
    
export const fetchSubmissionFailure = (error) => ({
  type: FETCH_SUBMISSION_FAILURE,
  error
});
