import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import {
  FETCH_USER_REQUESTS,
  CREATE_NEW_REQUEST,
  FETCH_USER_REQUEST_DETAILS,
  EDIT_REQUEST,
  DELETE_REQUEST,
  FETCH_EDIT_REQUEST
} from '../constants/actionTypes';
import RequestAPI from '../../services/RequestAPI';
import apiErrorHandler from '../../services/apiErrorHandler';
import {
  fetchUserRequestsSuccess,
  fetchUserRequestsFailure,
  createNewRequestSuccess,
  createNewRequestFailure,
  fetchUserRequestDetailsSuccess,
  fetchUserRequestDetailsFailure,
  editRequestSuccess,
  editRequestFailure,
  deleteRequestSuccess,
  deleteRequestFailure,
  fetchEditRequestSuccess, fetchEditRequestFailure
} from '../actionCreator/requestActions';

export function* fetchUserRequestsSaga(action) {
  try {
    const response = yield call(RequestAPI.getUserRequests, action.url);
    yield put(fetchUserRequestsSuccess(response.data));
  }
  catch(error) {
    const errorMessage = apiErrorHandler(error);
    yield put(fetchUserRequestsFailure(errorMessage));
  }
}


export function* watchFetchRequests() {
  yield takeLatest(FETCH_USER_REQUESTS, fetchUserRequestsSaga);
}

// worker saga responsible for make api request
export function* createNewRequestSagaAsync(action) {
  try {
    const response = yield call(
      RequestAPI.postNewRequest, action.requestData
    );
    toast.success('Travel request created successfully. Please follow up with your line manager for approval');
    yield put(createNewRequestSuccess(response.data.request));
    action.history.push('/requests');
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(createNewRequestFailure(errorMessage));
    toast.error(errorMessage);
  }
}


// watcher saga listens for CREATE_NEW_REQUEST action type
export function* watchCreateNewRequestAsync() {
  yield takeLatest(CREATE_NEW_REQUEST, createNewRequestSagaAsync);
}

export function* fetchUserRequestsDetails(action) {
  try {
    const response = yield call(RequestAPI.getUserRequestDetails, action.requestId);
    yield put(fetchUserRequestDetailsSuccess(response.data.requestData));

  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(fetchUserRequestDetailsFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watchFetchUserRequestsDetails() {
  yield takeLatest(FETCH_USER_REQUEST_DETAILS, fetchUserRequestsDetails);
}

export function* editRequest(action) {
  try {
    const response = yield call(RequestAPI.editRequest, action.requestId, action.requestData);
    const {data: { request, trips }  } = response;
    yield put(editRequestSuccess({...request, trips }));
    toast.success('Request updated successfully');
    action.history.push('/requests');
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(editRequestFailure(errorMessage));
    toast.error(errorMessage);
  }
}
export function* watchEditRequest() {
  yield takeLatest(EDIT_REQUEST, editRequest);
}

export function* watchDeleteRequest() {
  yield takeLatest(DELETE_REQUEST, deleteRequestSaga);
}

export function* deleteRequestSaga(action) {
  try {
    const response = yield call(RequestAPI.deleteRequest, action.requestId);
    yield put(deleteRequestSuccess(response.data.message, action.requestId));
    toast.success(`${response.data.message}`);

  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(deleteRequestFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watchFetchEditRequest() {
  yield takeLatest(FETCH_EDIT_REQUEST, fetchEdit);
}

export function* fetchEdit(action) {
  try {
    const response = yield call(RequestAPI.getUserRequestDetails, action.requestId);

    yield put(fetchEditRequestSuccess(response.data.requestData));

  } catch (error) {
    const errorMessage = apiErrorHandler(error);

    yield put(fetchEditRequestFailure(errorMessage));
    toast.error(errorMessage);
  }
}

