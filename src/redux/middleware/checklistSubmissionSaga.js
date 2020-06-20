import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import { POST_SUBMISSION, FETCH_SUBMISSION } from '../constants/actionTypes';
import SubmissionAPI from '../../services/checklistSubmissionAPI';
import apiErrorHandler from '../../services/apiErrorHandler';
import {
  postSubmissionSuccess,
  postSubmissionFailure,
  fetchSubmissionSuccess,
  fetchSubmissionFailure
} from '../actionCreator/checkListSubmissionActions';

export function* watchPostSubmission() {
  yield takeLatest(POST_SUBMISSION, postSubmissionSaga);
}

export function* postSubmissionSaga(action) {
  const { formData, checklistItemId, requestId, checkId } = action;
  try {
    const response = yield call(
      SubmissionAPI.postSubmission, formData, requestId, checklistItemId
    );
    yield put(postSubmissionSuccess(response.data, checkId));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(postSubmissionFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watchFetchSubmission() {
  yield takeLatest(FETCH_SUBMISSION, fetchSubmissionSaga);
}
  
export function* fetchSubmissionSaga(action) {
  try {
    const response = yield call(SubmissionAPI.getSubmission, action.requestId);
    yield put(fetchSubmissionSuccess(response.data));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(fetchSubmissionFailure(errorMessage));
  }
}
