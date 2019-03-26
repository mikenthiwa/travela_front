import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import UserAPI from '../../services/UserAPI';
import apiErrorHandler from '../../services/apiErrorHandler';
import {
  postUserData,
  postUserDataSuccess,
  postUserDataFailure,
  getUserData,
  getUserDataSuccess,
  getUserDataFailure,
  getAllUsersEmail,
  getAllUsersEmailSuccess,
  getAllUsersEmailFailure,
  getAllDepartment,
  getAllDepartmentSuccess,
  getAllDepartmentFailure
} from '../actionCreator/userActions';

export function* watchPostUserDataSagaAsync() {
  yield takeLatest(postUserData().type, postUserDataSagaAsync);
}

export function* postUserDataSagaAsync(action) {
  try {
    const postUser = yield call(UserAPI.postNewUsers, action.userData);
    const { data: { result: { location: userLocation, userId }}} = postUser;
    const response = yield call(UserAPI.getUserData, userId);
    yield put(postUserDataSuccess(response.data));
    yield put(getUserDataSuccess(response.data));
    localStorage.setItem('location', userLocation);
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(postUserDataFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watchFetchUsersEmail() {
  yield takeLatest(getAllUsersEmail().type, fetchAllUsersEmailSaga);
}
export function* fetchAllUsersEmailSaga() {
  try {
    const response = yield call(UserAPI.getAllUsersEmail);
    const allEmails = response.data.result.map((text, id) => ({
      id: text.email, text: text.email}));
    yield put(getAllUsersEmailSuccess(allEmails));
  } catch (error) {
    let errorMessage = apiErrorHandler(error);
    yield put(getAllUsersEmailFailure(errorMessage));
  }
}


export function* watchGetUserDataSagaAsync() {
  yield takeLatest(getUserData().type, fetchUserDataSaga);
}

export function* fetchUserDataSaga(action) {
  try {
    const response = yield call(UserAPI.getUserData, action.id);
    const dataFromStagingApi = yield call(UserAPI.getUserDataFromStagingApi,
      response.data.result.email,
    );
    const { data: { result: { location : userLocation }}} = response;
    const location = (dataFromStagingApi.data.values[0].location)
      ? dataFromStagingApi.data.values[0].location.name : process.env.REACT_APP_DEFAULT_LOCATION;
    response.data.result.location = userLocation || location;
    yield put(getUserDataSuccess(response.data));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(getUserDataFailure(errorMessage));
  }
}



export function* watchGetDepartmentDataSagaAsync() {
  yield takeLatest(getAllDepartment().type, fetchDepartmentDataSaga);
}

export function* fetchDepartmentDataSaga() {
  try {
    const data = yield call(UserAPI.getAllDepartment);
    const allDepartments = data.data.result.map((dept, _) => ({
      id: dept.name, text: dept.name}));
    yield put(getAllDepartmentSuccess(allDepartments));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(getAllDepartmentFailure(errorMessage));
  }
}
