/* eslint-disable import/prefer-default-export */
import { takeLatest, call, put } from 'redux-saga/effects';
import toast from 'toastr';
import * as _ from 'lodash';
import * as types from '../constants/actionTypes';
import TravelReadinessDocumentsAPI from '../../services/TravelReadinessDocumentsAPI';
import apiErrorHandler from '../../services/apiErrorHandler';
import * as actions from '../actionCreator/travelReadinessDocumentsActions';
import { closeModal } from '../actionCreator/modalActions';

export function* fetchUsersReadinessDocumentsAsync(action) {
  try {
    const response = yield call(TravelReadinessDocumentsAPI.getAllUsersReadiness, action.query);
    yield put(actions.fetchAllUsersReadinessDocumentsSuccess(response.data));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(actions.fetchAllUsersReadinessDocumentsFailure(errorMessage));
  }
}

export function* watchFetchUsersReadinessDocuments() {
  yield takeLatest(types.FETCH_ALL_USERS_READINESS_DOCUMENTS, fetchUsersReadinessDocumentsAsync);
}

export function* fetchReadinessDocumentsAsync(action) {
  try {
    const response = yield call(TravelReadinessDocumentsAPI.getUserReadiness, action.userId);
    yield put(actions.fetchUserReadinessDocumentsSuccess(response.data.user));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(actions.fetchUserReadinessDocumentsFailure(errorMessage));
  }
}

export function* watchFetchReadinessDocuments() {
  yield takeLatest(types.FETCH_USER_READINESS_DOCUMENTS, fetchReadinessDocumentsAsync);
}

export function* fetchReadinessDocumentDetailsAsync(action) {
  try {
    const response = yield call(TravelReadinessDocumentsAPI.getTravelReadinessDocument, action.documentId);
    yield put(actions.fetchTravelReadinessDocumentSuccess(response.data.document));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(actions.fetchTravelReadinessDocumentFailure(errorMessage));
  }
}

export function* watchFetchReadinessDocumentDetails() {
  yield takeLatest(types.FETCH_TRAVEL_READINESS_DOCUMENT, fetchReadinessDocumentDetailsAsync);
}

export function* verifyTravelReadinessSaga(action){
  try {
    const response = yield call(TravelReadinessDocumentsAPI.verifyTravelReadinessDocument, action.documentId);
    yield put(actions.verifyTravelReadinessDocumentSuccess(response.data.updatedDocument));
    toast.success('Document successfully verified');
  } catch (error) {
    let errorMessage = apiErrorHandler(error);
    yield put(actions.verifyTravelReadinessDocumentFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watchVerifyTravelReadinessDocuments(){
  yield takeLatest(types.VERIFY_TRAVEL_READINESS_DOCUMENT, verifyTravelReadinessSaga);
}


export function* editTravelReadinessDocument(action) {
  try{
    const { documentType, payload, documentId } = action;
    const response = yield call(TravelReadinessDocumentsAPI.editTravelReadinessDocument, documentType, payload, documentId);
    yield put(actions.editTravelReadinessDocumentSuccess(response.data.updatedDocument));
    toast.success(_.capitalize(action.documentType)+' updated successfully!');
    yield put(closeModal());
  }catch (error) {
    let errorMessage = apiErrorHandler(error);
    yield put(actions.editTravelReadinessDocumentFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* deleteTravelReadinessDocumentSaga(action) {
  try {
    const response = yield call(TravelReadinessDocumentsAPI.deleteTravelReadinessDocument, action.documentId);
    yield put(actions.deleteTravelReadinessDocumentSuccess(response.data.deletedDocument));
    toast.success(response.data.message);
    yield put(closeModal());
  } catch (error) {
    let errorMessage = apiErrorHandler(error);
    yield put(actions.deleteTravelReadinessDocumentFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watchEditTravelReadinessDocument() {
  yield takeLatest(types.EDIT_TRAVEL_READINESS_DOCUMENT, editTravelReadinessDocument);
}

export function* watchDeleteTravelReadinessDocument() {
  yield takeLatest(types.DELETE_TRAVEL_READINESS_DOCUMENT, deleteTravelReadinessDocumentSaga);
}
