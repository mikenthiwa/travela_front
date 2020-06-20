import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import FileSaver from 'file-saver';

import { FETCH_DOCUMENTS,
  DELETE_DOCUMENT,
  UPDATE_DOCUMENT,
  CREATE_DOCUMENT,
  DOWNLOAD_DOCUMENTS
} from '../constants/actionTypes';
import DocumentAPI from '../../services/DocumentAPI';
import apiErrorHandler from '../../services/apiErrorHandler';
import {
  fetchDocumentsSuccess,
  fetchDocumentsFailure,
  deleteDocumentSuccess,
  deleteDocumentFailure,
  updateDocumentFailure,
  updateDocumentSuccess,
  createDocumentSuccessfully,
  createDocumentFailure,
  fetchDocuments,
  downloadDocumentsFailure
} from '../actionCreator/documentActions';
import { closeModal } from '../actionCreator/modalActions';

export function* fetchDocumentsAsync(action) {
  try{
    const response = yield call(DocumentAPI.fetchDocuments);
    yield put(fetchDocumentsSuccess(response.data));
  }
  catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(fetchDocumentsFailure(errorMessage));
  }
}

export function* watchFetchDocuments() {
  yield takeLatest(FETCH_DOCUMENTS, fetchDocumentsAsync);
}

export function* deleteDocumentAsync(action) {
  try{
    const { documentId } = action;
    const response = yield call(DocumentAPI.deleteDocument, documentId);
    yield put(deleteDocumentSuccess(documentId, response.data.deletedDocument));
    toast.success(response.data.message);
    yield put(closeModal());
  }
  catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(deleteDocumentFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watchDeleteDocument() {
  yield takeLatest(DELETE_DOCUMENT, deleteDocumentAsync);
}

export function* watchUpdateDocument() {
  yield takeLatest(UPDATE_DOCUMENT, updateDocumentAsync);
}

export function* updateDocumentAsync(action) {
  try {
    const { document: { id, name } } = action;
    const response = yield call(DocumentAPI.updateDocument, id, { name });
    yield put(updateDocumentSuccess(response.data));
    yield put(closeModal());
    toast.success(response.data.message);
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(updateDocumentFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* downloadDocumentsAsync(action) {
  const { url, name  } = action;
  yield FileSaver.saveAs(url, name);
  yield put(closeModal());
  toast.success('Download Successful!');
}

export function* watchDownloadDocuments() {
  yield takeLatest(DOWNLOAD_DOCUMENTS, downloadDocumentsAsync);
}
export function* createDocumentSaga(action) {
  try {
    const response = yield call(DocumentAPI.postDocument, action.documentData);
    yield put(createDocumentSuccessfully(response.data));
    toast.success(response.data.message);
    yield put(closeModal());
    yield put(fetchDocuments());
  } catch(error) {
    const errorMessage = apiErrorHandler(error);
    yield put(createDocumentFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watchCreateDocument() {
  yield takeLatest(CREATE_DOCUMENT, createDocumentSaga);
}
