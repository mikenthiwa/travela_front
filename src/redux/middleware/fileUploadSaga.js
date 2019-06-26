import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import apiErrorHandler from '../../services/apiErrorHandler';
import FileUploadAPI from '../../services/FileUploadAPI';
import API from '../../services/AccommodationAPI';
import { UPLOAD_FILE } from '../constants/actionTypes';
import { postSubmission } from '../actionCreator/checkListSubmissionActions';
import extractText from '../../helper/extractText';
import {
  uploadFileFailure,
  uploadFileSuccess
} from '../actionCreator/fileUploadActions';

export function* uploadFileAsync(action) {
  try {
    const {
      file, submissionData: { tripId, checklistItemId }, checkId, requestId, ocrScan
    } = action;
    const response = yield call(FileUploadAPI.uploadFile, file);
    const { secure_url } = response.data;
    const fileData = { url: secure_url, fileName: file.name };
    API.setToken();
    if(ocrScan) {
      yield(extractText(file, response));
    }
    yield put(postSubmission(
      { formData: { tripId, file: fileData }, checklistItemId },
      checkId, requestId
    ));
    yield put(uploadFileSuccess(response.data, action.checkId));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    API.setToken();
    yield put(uploadFileFailure(errorMessage));
    toast.error(errorMessage.message);
  }
}

export function* watchFileUpload() {
  yield takeLatest(UPLOAD_FILE, uploadFileAsync);
}
