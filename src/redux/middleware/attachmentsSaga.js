import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import FileSaver from 'file-saver';

import {
  fetchAttachmentsSuccess,
  fetchAttachmentsFailure,
} from '../actionCreator/attachmentActions';
import {
  FETCH_ATTACHMENTS,
  DOWNLOAD_ATTACHMENTS
} from '../constants/actionTypes';
import apiErrorHandler from '../../services/apiErrorHandler';
import SubmissionAPI from '../../services/checklistSubmissionAPI';

export function* fetchAttachmentsSaga(action) {
  try {
    const response = yield call(
      SubmissionAPI.getSubmission,
      action.query
    );
    yield put(fetchAttachmentsSuccess(response.data));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(fetchAttachmentsFailure(errorMessage));
  }
}

export function* watchFetchAttachments() {
  yield takeLatest(FETCH_ATTACHMENTS, fetchAttachmentsSaga);
}

export function* downloadAttachmentsSaga(action) {
  const { url, name } = action;
  yield FileSaver.saveAs(url, name);
  toast.success('Download in progress...');
}

export function* watchdownloadAttachments() {
  yield takeLatest(DOWNLOAD_ATTACHMENTS, downloadAttachmentsSaga);
}
