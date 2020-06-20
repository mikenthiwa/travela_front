import { takeLatest, call , put} from 'redux-saga/effects';
import toast from 'toastr';
import {
  fetchModificationRequestFailure,
  fetchModificationRequestSuccess,
  submitModificationRequestFailure,
  submitModificationRequestSuccess, updateModificationFailure, updateModificationSuccess
} from '../actionCreator/tripModificationActions';
import {
  FETCH_MODIFICATION_REQUEST,
  SUBMIT_MODIFICATION_REQUEST,
  UPDATE_MODIFICATION_REQUEST
} from '../constants/actionTypes';
import apiErrorHandler from '../../services/apiErrorHandler';
import TripModificationsAPI from '../../services/TripModificationsAPI';

export function* submitModificationRequestSaga(action){
  const { requestId, modificationType : type, reason, history } = action;
  try {
    const response = yield call(TripModificationsAPI.submitModificationRequest,requestId, type, reason );
    yield put(submitModificationRequestSuccess(response.data));
    toast.success(response.data.message);

    // redirect user based on modification type
    type === 'Modify Dates' ? yield history.push(`/requests/edit-request/${requestId}`) : yield history.goBack();
  }catch(error){
    const errorMessage = apiErrorHandler(error);
    yield put(submitModificationRequestFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* fetchModificationForRequestSaga(action){
  const { requestId } = action;
  try {
    const { data } = yield call(TripModificationsAPI.getModificationForRequest, requestId);
    yield put(fetchModificationRequestSuccess(data));
  }catch(error){
    const errorMessage = apiErrorHandler(error);
    yield put(fetchModificationRequestFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* updateModificationRequest(action){
  const { status, modificationId } = action;
  try{
    const { data } = yield call(TripModificationsAPI.updateModification, modificationId, status);
    yield put(updateModificationSuccess(data));
  }catch(error){
    const errorMessage= apiErrorHandler(error);
    yield put(updateModificationFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watchSubmitModificationRequest(){
  yield takeLatest(SUBMIT_MODIFICATION_REQUEST, submitModificationRequestSaga);
}

export function* watchFetchModificationForRequest() {
  yield takeLatest(FETCH_MODIFICATION_REQUEST, fetchModificationForRequestSaga);
}

export function* watchUpdateTripModification(){
  yield takeLatest(UPDATE_MODIFICATION_REQUEST, updateModificationRequest);
}
