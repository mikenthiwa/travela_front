import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import {
  FETCH_DOCUMENT_TYPES,
  EDIT_DOCUMENT_TYPES,
  CREATE_DOCUMENT_TYPES,
  DELETE_DOCUMENT_TYPES,
} from '../constants/actionTypes';
import DocumentTypesAPI from '../../services/DocumentTypesAPI';
import apiErrorHandler from '../../services/apiErrorHandler';
import {
  fetchDocumentTypesSuccess,
  fetchDocuemtTypesFailure,
  editDocumentTypesSuccess,
  editDocuemtTypesFailure,
  createDocumentTypesSuccess,
  createDocuemtTypesFailure,
  deleteDocumentTypesSuccess,
  deleteDocuemtTypesFailure,
} from '../actionCreator/documentTypesActions';
import { closeModal } from '../actionCreator/modalActions';

export function* fetchDocumentTypesSaga() {
  try{
    const response = yield call(DocumentTypesAPI.fetchDocumentTypes);
    yield put(fetchDocumentTypesSuccess(response.data.documentTypes));
  }
  catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(fetchDocuemtTypesFailure(errorMessage));
  }
}

export function* deleteDocumentTypesSaga({ payload }) {
  try{
    const response = yield call(DocumentTypesAPI.deleteDocumentType, payload);
    yield put(deleteDocumentTypesSuccess(payload));
    toast.success(response.data.message);
    yield put(closeModal());
  }
  catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(deleteDocuemtTypesFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* editDocumentTypesSaga({ payload }) {
  try {
    const response = yield call(DocumentTypesAPI.editDocumentType, payload);
    yield put(editDocumentTypesSuccess(response.data.documentType));
    yield put(closeModal());
    toast.success(response.data.message);
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(editDocuemtTypesFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* createDocumentTypesSaga({ payload }) {
  try {
    const response = yield call(DocumentTypesAPI.postDocumentType, payload);
    yield put(createDocumentTypesSuccess(response.data.documentType));
    toast.success(response.data.message);
    yield put(closeModal());
  } catch(error) {
    const errorMessage = apiErrorHandler(error);
    yield put(createDocuemtTypesFailure(errorMessage));
    toast.error(errorMessage);
  }
}

function* rootSaga() {
  yield takeLatest(FETCH_DOCUMENT_TYPES, fetchDocumentTypesSaga);
  yield takeLatest(EDIT_DOCUMENT_TYPES, editDocumentTypesSaga);
  yield takeLatest(CREATE_DOCUMENT_TYPES, createDocumentTypesSaga);
  yield takeLatest(DELETE_DOCUMENT_TYPES, deleteDocumentTypesSaga);
}

export default rootSaga;
