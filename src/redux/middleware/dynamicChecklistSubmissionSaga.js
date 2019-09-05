import { put, takeLatest, call, throttle } from 'redux-saga/effects';
import {
  POST_CHECKLIST_SUBMISSION,
  FETCH_CHECKLIST_SUBMISSION,
} from '../constants/actionTypes';
import api from '../../services/DynamicCheckListSubmissionAPI';
import apiErrorHandler from '../../services/apiErrorHandler';
import {
  fetchChecklistSubmissionSuccess,
  fetchChecklistSubmissionFailure,
  postChecklistSubmissionStarted,
  postChecklistSubmissionSuccess,
  postChecklistSubmissionFailure,
} from '../actionCreator/dynamicChecklistSubmissionActions';

export function* fetchChecklistSubmissionSaga({ payload }) {
  try{
    const response = yield call(api.fetchChecklistSubmissions, payload);
    yield put(fetchChecklistSubmissionSuccess({ checklist: response.data.checklist }));
  }
  catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(fetchChecklistSubmissionFailure(errorMessage));
  }
}

export function* postChecklistSubmissionSaga({ payload: { requestId, checklist } }) {
  try {
    yield put(postChecklistSubmissionStarted());
    const response = yield call(api.postChecklistSubmission, requestId, checklist);
    yield put(postChecklistSubmissionSuccess({ checklist: response.data.checklist }));
  } catch(error) {
    const errorMessage = apiErrorHandler(error);
    yield put(postChecklistSubmissionFailure(errorMessage));
  }
}

function* watchDynamicChecklistSubmissions() {
  yield takeLatest(FETCH_CHECKLIST_SUBMISSION, fetchChecklistSubmissionSaga);
  yield throttle(5000, POST_CHECKLIST_SUBMISSION, postChecklistSubmissionSaga);
}

export default watchDynamicChecklistSubmissions;
