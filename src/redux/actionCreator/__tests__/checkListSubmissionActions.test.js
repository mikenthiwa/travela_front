import {
  POST_SUBMISSION,
  POST_SUBMISSION_SUCCESS,
  POST_SUBMISSION_FAILURE,
  FETCH_SUBMISSION,
  FETCH_SUBMISSION_FAILURE,
  FETCH_SUBMISSION_SUCCESS
} from '../../constants/actionTypes';

import {
  postSubmission, postSubmissionSuccess, fetchSubmissionSuccess,
  postSubmissionFailure, fetchSubmissionFailure, fetchSubmission
} from '../checkListSubmissionActions';

describe('Upload File Actions', () => {
  it('should return action type of POST_SUBMISSION', (done) => {
    const expectedAction = {
      type: POST_SUBMISSION,
      formData: 'data',
      checklistItemId: '2',
      checkId: '33rr44-2'
    };

    const action = postSubmission(
      { checklistItemId: '2', formData: 'data' }, '33rr44-2'
    );
    expect(action).toEqual(expectedAction);

    done();
  });

  it('should return action type of FETCH_SUBMISSION', (done) => {
    const expectedAction = {
      type: FETCH_SUBMISSION,
      requestId: '12345',
      tripType: 'return'
    };

    const action = fetchSubmission({ requestId: '12345', tripType: 'return'});
    expect(action).toEqual(expectedAction);

    done();
  });

  it('should return action type of POST_SUBMISSION_SUCCESS', (done) => {
    const expectedAction = {
      type: POST_SUBMISSION_SUCCESS,
      submission: 'submitted',
      checkId: '33rr44-2',
      message: 'submission successful',
      success: true
    };

    const response = {
      submission: 'submitted',
      message: 'submission successful',
      success: true
    };

    const action = postSubmissionSuccess(response, '33rr44-2');
    expect(action).toEqual(expectedAction);

    done();
  });

  it('should return action type of FETCH_SUBMISSION_SUCCESS', (done) => {
    const expectedAction = {
      type: FETCH_SUBMISSION_SUCCESS,
      submissions: ['1', '2'],
      percentageCompleted: 100,
      message: 'submission successful',
      success: true
    };

    const response = {
      message: 'submission successful',
      success: true,
      submissions: ['1', '2'],
      percentageCompleted: 100,
    };

    const action = fetchSubmissionSuccess(response);
    expect(action).toEqual(expectedAction);

    done();
  });

  it('should return action type of POST_SUBMISSION_FAILURE', (done) => {
    const expectedAction = {
      type: POST_SUBMISSION_FAILURE,
      error: 'Server error'
    };

    const action = postSubmissionFailure('Server error');
    expect(action).toEqual(expectedAction);

    done();
  });


  it('should return action type of FETCH_SUBMISSION_FAILURE', (done) => {
    const expectedAction = {
      type: FETCH_SUBMISSION_FAILURE,
      error: 'Server error'
    };

    const action = fetchSubmissionFailure('Server error');
    expect(action).toEqual(expectedAction);

    done();
  });
});

