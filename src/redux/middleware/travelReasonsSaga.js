import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import {
  createTravelReasonSuccess,
  createTravelReasonFailure,
  viewTravelDetailsSuccess,
  viewTravelDetailsFailure,
  editTravelReasonSuccess,
  editTravelReasonFailure,
  deleteTravelReasonSuccess,
  deleteTravelReasonFailure
} from '../actionCreator/travelReasonsActions';
import {
  CREATE_TRAVEL_REASON, EDIT_TRAVEL_REASON,
  VIEW_TRAVEL_REASON_DETAILS,
  DELETE_TRAVEL_REASON
} from '../constants/actionTypes';
import TravelReasonsAPI from '../../services/TravelReasonsAPI';
import { closeModal } from '../actionCreator/modalActions';
import apiErrorHandler from '../../services/apiErrorHandler';

export function* editTravelReasonSaga(action){
  const { body } = action;
  try {
    const response = yield call(
      TravelReasonsAPI.editTravelReason,
      body.id ,
      body.title, body.description
    );
    yield put(editTravelReasonSuccess(response.data));
    toast.success(response.data.message);
    yield put(closeModal());
  }catch(error){
    toast.error(apiErrorHandler(error));
    yield put(editTravelReasonFailure(error.response.data));
  }
}


export function* createTravelReasonsSaga(action) {
  const { body, history } = action;
  try {
    const response = yield call(TravelReasonsAPI.createTravelReasons, body);
    yield put(createTravelReasonSuccess(response.data));
    toast.success(response.data.message);
    yield put(closeModal());
    history.push('/settings/travel-reason');
  } catch(error){
    toast.error(error.response.data.message);
    yield put(createTravelReasonFailure(error.response.data));
  }
}

export function* watchCreateTravelReason(){
  yield takeLatest(CREATE_TRAVEL_REASON, createTravelReasonsSaga);
}


export function* watchEditTravelReason() {
  yield takeLatest(EDIT_TRAVEL_REASON, editTravelReasonSaga);
}

export function* viewTravelReasonDetailsSaga(action) {
  const { id } = action;
  try {
    const response = yield call(TravelReasonsAPI.viewTravelReasonDetails, id);
    yield put(viewTravelDetailsSuccess(response.data));
  } catch (error) {
    let errorMessage = apiErrorHandler(error);
    toast.error(errorMessage);
    yield put(viewTravelDetailsFailure(errorMessage));
  }
}

export function* watchViewTravelReasonDetails() {
  yield takeLatest(VIEW_TRAVEL_REASON_DETAILS, viewTravelReasonDetailsSaga);
}

export function* deleteTravelReasonAsync(action) {
  try{
    const { reasonId } = action;
    const response = yield call(TravelReasonsAPI.deleteTravelReason, reasonId);
    yield put(deleteTravelReasonSuccess(reasonId, response.data.deletedReason));
    toast.success(response.data.message);
    yield put(closeModal());
  }
  catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(deleteTravelReasonFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watchDeleteTravelReason() {
  yield takeLatest(DELETE_TRAVEL_REASON, deleteTravelReasonAsync);
}
