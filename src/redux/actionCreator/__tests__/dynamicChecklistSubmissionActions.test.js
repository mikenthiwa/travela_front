import {
  POST_CHECKLIST_SUBMISSION,
  POST_CHECKLIST_SUBMISSION_STARTED,
  POST_CHECKLIST_SUBMISSION_SUCCESS,
  POST_CHECKLIST_SUBMISSION_FAILURE,
  FETCH_CHECKLIST_SUBMISSION,
  FETCH_CHECKLIST_SUBMISSION_SUCCESS,
  FETCH_CHECKLIST_SUBMISSION_FAILURE,
  UPDATE_CHECKLIST_SUBMISSION,
} from '../../constants/actionTypes';

import {
  postChecklistSubmission,
  postChecklistSubmissionFailure,
  postChecklistSubmissionStarted,
  postChecklistSubmissionSuccess,
  fetchChecklistSubmission,
  fetchChecklistSubmissionFailure,
  fetchChecklistSubmissionSuccess,
  updateChecklistSubmission
} from '../dynamicChecklistSubmissionActions';

const payload = {
  checklists: [],
  trips: []
};

const error = 'Something went wrong';

describe('Tests for Dynamic Checklist Submission Actions', () => {

  it('should return action type POST_CHECKLIST_SUBMISSION', () => {
    const expectedAction = {
      type: POST_CHECKLIST_SUBMISSION,
      payload
    };

    const actualAction = postChecklistSubmission(payload);
    expect(expectedAction).toEqual(actualAction);
  });

  it('should return action type POST_CHECKLIST_SUBMISSION_STARTED', () => {
    const expectedAction = {
      type: POST_CHECKLIST_SUBMISSION_STARTED,
    };

    const actualAction = postChecklistSubmissionStarted(payload);
    expect(expectedAction).toEqual(actualAction);
  });

  it('should return action type POST_CHECKLIST_SUBMISSION_SUCCESS', () => {
    const expectedAction = {
      type: POST_CHECKLIST_SUBMISSION_SUCCESS,
      payload
    };

    const actualAction = postChecklistSubmissionSuccess(payload);
    expect(expectedAction).toEqual(actualAction);
  });

  it('should return action type POST_CHECKLIST_SUBMISSION_FAILURE', () => {
    const expectedAction = {
      type: POST_CHECKLIST_SUBMISSION_FAILURE,
      payload: error
    };

    const actualAction = postChecklistSubmissionFailure(error);
    expect(expectedAction).toEqual(actualAction);
  });

  it('should return action type FETCH_CHECKLIST_SUBMISSION', () => {
    const payload = {requestId: 'ncbcnjd'};
    const expectedAction = {
      type: FETCH_CHECKLIST_SUBMISSION,
      payload
    };

    const actualAction = fetchChecklistSubmission(payload);
    expect(expectedAction).toEqual(actualAction);
  });

  it('should return action type FETCH_CHECKLIST_SUBMISSION_SUCCESS', () => {
    const expectedAction = {
      type: FETCH_CHECKLIST_SUBMISSION_SUCCESS,
      payload
    };

    const actualAction = fetchChecklistSubmissionSuccess(payload);
    expect(expectedAction).toEqual(actualAction);
  });

  it('should return action type FETCH_CHECKLIST_SUBMISSION_FAILURE', () => {
    const expectedAction = {
      type: FETCH_CHECKLIST_SUBMISSION_FAILURE,
      payload: error
    };

    const actualAction = fetchChecklistSubmissionFailure(error);
    expect(expectedAction).toEqual(actualAction);
  });

  it('should return action type UPDATE_CHECKLIST_SUBMISSION', () => {
    const expectedAction = {
      type: UPDATE_CHECKLIST_SUBMISSION,
      payload
    };

    const actualAction = updateChecklistSubmission(payload);
    expect(expectedAction).toEqual(actualAction);
  });

});
