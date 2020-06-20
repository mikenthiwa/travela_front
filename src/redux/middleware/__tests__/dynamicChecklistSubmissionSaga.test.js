import { call } from 'redux-saga/effects';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';
import { expectSaga } from 'redux-saga-test-plan';
import DynamicCheckListSubmissionAPI from '../../../services/DynamicCheckListSubmissionAPI';
import dynamicChecklistSubmissionSaga from '../dynamicChecklistSubmissionSaga';
import * as actions from '../../actionCreator/dynamicChecklistSubmissionActions';

const payload = {
  requestId: 'dhdhdhjd',
  checklist: []
};

const response = {
  data: {
    message: 'successfully submitted a checklist response',
    checklist: {
      checklists: [],
      trips: []
    }
  }
};

const error = 'Possible network error, please reload the page';


describe('Dynamic Checklist Submission Saga', () => {

  it('should post a new checklist submission', () => {

    return expectSaga(dynamicChecklistSubmissionSaga)
      .dispatch(actions.postChecklistSubmission(payload))
      .put(actions.postChecklistSubmissionStarted())
      .provide([[matchers.call.fn(DynamicCheckListSubmissionAPI.postChecklistSubmission), response]])
      .put(actions.postChecklistSubmissionSuccess({checklist: response.data.checklist}))
      .silentRun();
  });

  it('should throw an error if checklist submission fails', () => {

    return expectSaga(dynamicChecklistSubmissionSaga)
      .dispatch(actions.postChecklistSubmission(payload))
      .put(actions.postChecklistSubmissionStarted())
      .provide([[matchers.call.fn(DynamicCheckListSubmissionAPI.postChecklistSubmission), throwError(error)]])
      .put(actions.postChecklistSubmissionFailure(error))
      .silentRun();
  });
  
  it('should fetch checklist submission', () => {

    return expectSaga(dynamicChecklistSubmissionSaga)
      .provide([[matchers.call.fn(DynamicCheckListSubmissionAPI.fetchChecklistSubmissions), response]])
      .dispatch(actions.fetchChecklistSubmission(payload.requestId))
      .put(actions.fetchChecklistSubmissionSuccess({checklist: response.data.checklist}))
      .silentRun();
  });

  it('should thrown an error for fetch checklist submission', () => {

    return expectSaga(dynamicChecklistSubmissionSaga)
      .provide([[matchers.call.fn(DynamicCheckListSubmissionAPI.fetchChecklistSubmissions), throwError(error)]])
      .dispatch(actions.fetchChecklistSubmission(payload.requestId))
      .put(actions.fetchChecklistSubmissionFailure(error))
      .silentRun();
  });
});
