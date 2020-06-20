import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import toast from 'toastr';
import * as matchers from 'redux-saga-test-plan/matchers';
import { watchPostSubmission, watchFetchSubmission } from '../checklistSubmissionSaga';
import SubmissionAPI from '../../../services/checklistSubmissionAPI';

toast.error = jest.fn();
const response = {
  data: {
    success: true,
    message: 'Successfully submitted',
    submission: 'this',
    percentageCompleted: 100
  }
};

const fetchResponse = {
  data: {
    success: true,
    message: 'Successfully retrieved',
    submissions: ['this', 'that', 'then'],
    percentageCompleted: 100
  }
};

const formData = 'stuff';
const checkId = '345-1';
const requestId = '65432';
const checklistItemId = '1';
const tripId = '345';
const file = { name: 'test.png' };

describe('Submission post saga ', () => {
  it('posts submission', () => {
    return expectSaga(watchPostSubmission, SubmissionAPI)
      .provide([
        [matchers.call.fn(
          SubmissionAPI.postSubmission, formData, requestId, checklistItemId
        ), response
        ]
      ]).put({
        type: 'POST_SUBMISSION_SUCCESS',
        submission: response.data.submission,
        checkId,
        message: response.data.message,
        percentageCompleted: response.data.percentageCompleted,
        success: response.data.success
      }).dispatch({
        type: 'POST_SUBMISSION',
        formData,
        checklistItemId,
        checkId
      }).silentRun();
  });

  it('fails to post submission', () => {
    const error =  new Error('Server error, try again');
    error.response = { status: 500 };
    return expectSaga(watchPostSubmission, SubmissionAPI)
      .provide([
        [matchers.call.fn(
          SubmissionAPI.postSubmission, formData, requestId, checklistItemId
        ), throwError(error)
        ]
      ]).put({
        type: 'POST_SUBMISSION_FAILURE',
        error: error.message
      }).dispatch({
        type: 'POST_SUBMISSION',
        formData,
        checklistItemId,
        checkId
      }).silentRun();
  });

  it('fetches submission', () => {
    return expectSaga(watchFetchSubmission, SubmissionAPI)
      .provide([
        [matchers.call.fn(SubmissionAPI.getSubmission, '122de'), fetchResponse]
      ]).put({
        type: 'FETCH_SUBMISSION_SUCCESS',
        submissions: fetchResponse.data.submissions,
        message: 'Successfully retrieved',
        success: fetchResponse.data.success,
        percentageCompleted: 100
      }).dispatch({
        type: 'FETCH_SUBMISSION',
        requestId, tripType: 'return'
      }).silentRun();
  });

  it('fails to fetch submission', () => {
    const error =  new Error('Server error, try again');
    error.response = { status: 500 };
    return expectSaga(watchFetchSubmission, SubmissionAPI)
      .provide([
        [matchers.call.fn(SubmissionAPI.getSubmission, '3334'), throwError(error)]
      ]).put({
        type: 'FETCH_SUBMISSION_FAILURE',
        error: error.message
      }).dispatch({
        type: 'FETCH_SUBMISSION',
        requestId, tripType: 'return'
      }).silentRun();
  });
});
