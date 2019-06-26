import checklistSubmissionReducer, { initialState } from '../checklistSubmission';
import {
  uploadFile,
} from '../../actionCreator/fileUploadActions';
import {
  postSubmission,
  postSubmissionSuccess,
  postSubmissionFailure,
  fetchSubmission,
  fetchSubmissionFailure,
  fetchSubmissionSuccess
} from '../../actionCreator/checkListSubmissionActions';
import {
  checklistSubmission,
  submissionSuccessResponse,
  responseMessage,
} from '../../../mockData/checklistSubmissionMockData';

describe('ChecklistSubmission reducer', () => {
  const tripId = checklistSubmission[0].tripId;
  const requestId = '12345';
  const checklistItemId = '9';
  const checkId = `${tripId}-${checklistItemId}`;
  const formData = { checklistItemId, tripId, requestId };
  const error = 'Server Error';
  it('should add checklist id to isUploading` state to  while uploading file',
    (done) => {
      const currentState = {
        ...initialState,
        postSuccess: [checkId]
      };
      const action = uploadFile(
        'checklist.png', { checklistItemId, tripId }, checkId
      );
      const newState = checklistSubmissionReducer(currentState, action);
      expect(newState.isUploading).toContain(checkId);
      expect(newState.postSuccess.length).toEqual(0);
      expect(newState.successStatus).toBe(false);
      expect(newState.isLoading).toBe(false);
      done();
    });

  it('should add checkId to `isUploading` state while posting file',
    (done) => {
      const currentState = {
        ...initialState,
        postSuccess: [checkId]
      };
      const action = postSubmission({ formData, checklistItemId }, checkId);
      const newState = checklistSubmissionReducer(currentState, action);
      expect(newState.isUploading).toContain(checkId);
      expect(newState.postSuccess.length).toEqual(0);
      expect(newState.successStatus).toBe(false);
      expect(newState.isLoading).toBe(false);
      done();
    });
  it('should add checklist item checkId to `itemsToCheck` on post success and update the item',
    (done) => {
      const currentState = {
        ...initialState,
        isUploading: [checkId],
        submissions: checklistSubmission
      };

      const action = postSubmissionSuccess({...submissionSuccessResponse, submission: {
        ...submissionSuccessResponse,
        id: 'JGLqrmBEd'
      } }, checkId);

      const newState = checklistSubmissionReducer(currentState, action);

      expect(newState.successMessage).toEqual(responseMessage);
      expect(newState.successStatus).toEqual(true);
      expect(newState.postSuccess).toContain(checkId);
      expect(newState.itemsToCheck).toContain(checkId);
      expect(newState.isUploading.length).toEqual(0);
      expect(newState.percentageCompleted).toBe(100);
      expect(newState.isFetching).toBe(false);
      done();
    });

  it('should add checklist item checkId to `itemsToCheck` on post success',
    (done) => {
      const currentState = {
        ...initialState,
        isUploading: [checkId],
        submissions: checklistSubmission
      };

      const action = postSubmissionSuccess(submissionSuccessResponse, checkId);

      const newState = checklistSubmissionReducer(currentState, action);

      expect(newState.successMessage).toEqual(responseMessage);
      expect(newState.successStatus).toEqual(true);
      expect(newState.postSuccess).toContain(checkId);
      expect(newState.itemsToCheck).toContain(checkId);
      expect(newState.isUploading.length).toEqual(0);
      expect(newState.percentageCompleted).toBe(100);
      expect(newState.isFetching).toBe(false);
      done();
    });

  it('should add update submissions even with a failure',
    (done) => {
      const currentState = {
        ...initialState,
        isUploading: [checkId],
      };

      const action = postSubmissionSuccess(submissionSuccessResponse, checkId);

      const newState = checklistSubmissionReducer(currentState, action);

      expect(newState.successMessage).toEqual(responseMessage);
      expect(newState.successStatus).toEqual(true);
      expect(newState.postSuccess).toContain(checkId);
      expect(newState.itemsToCheck).toContain(checkId);
      expect(newState.isUploading.length).toEqual(0);
      expect(newState.percentageCompleted).toBe(100);
      expect(newState.isFetching).toBe(false);
      done();
    });

  it('should add error to state on post submission failure', (done) => {
    const currentState = {
      ...initialState,
      isUploading: [checkId]
    };

    const action = postSubmissionFailure(error);
    const newState = checklistSubmissionReducer(currentState, action);

    expect(newState.error).toEqual(error);
    expect(newState.postFail).toBe(true);
    expect(newState.successStatus).toBe(false);
    done();
  });

  it('should update `isFetching` to true while fetching submissions', (done) => {
    const action = fetchSubmission({ requestId: 'tttt4', tripType: 'return' });
    const newState = checklistSubmissionReducer(initialState, action);

    expect(newState.isFetching).toEqual(true);
    expect(newState.isLoading).toEqual(true);
    expect(newState.tripType).toEqual('return');
    expect(newState.requestId).toEqual('tttt4');
    expect(newState.itemsToCheck.length).toEqual(0);

    done();
  });

  it('should add submissions to state on successful fetching', (done) => {
    const response = {
      ...submissionSuccessResponse,
      submissions: checklistSubmission
    };
    const currentState = {
      ...initialState,
      isFetching: true
    };

    const action = fetchSubmissionSuccess(response);
    const newState = checklistSubmissionReducer(currentState, action);

    expect(newState.fetchSuccessMessage).toEqual(responseMessage);
    expect(newState.submissions.length).toEqual(1);
    expect(newState.itemsToCheck).toContain(checkId);
    expect(newState.percentageCompleted).toBe(100);
    expect(newState.isFetching).toBe(false);

    done();
  });

  it('should add submissions to state on fetching failure', (done) => {
    const currentState = {
      ...initialState,
      isFetching: true
    };

    const action = fetchSubmissionFailure(error);
    const newState = checklistSubmissionReducer(currentState, action);

    expect(newState.error).toContain(error);
    expect(newState.isFetching).toBe(false);
    expect(newState.submissions.length).toBe(0);

    done();
  });

  it('should return default state', (done) => {
    const newState = checklistSubmissionReducer(initialState, {});

    expect(newState).toMatchObject(initialState);
    done();
  });
});
