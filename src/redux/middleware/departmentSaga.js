import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import {
  addDepartmentSuccess,
  addDepartmentFailure,
  getAllDepartmentsSuccess,
  getAllDepartmentsFailure,
  editDepartmentSuccess,
  editDepartmentFailure,
  deleteDepartmentSuccess,
  deleteDepartmentFailure, retrieveDepartmentSuccess, retrieveDepartmentFailure
} from '../actionCreator/departmentActions';
import {
  ADD_DEPARTMENT,
  EDIT_DEPARTMENT,
  GET_ALL_DEPARTMENTS,
  DELETE_DEPARTMENT,
  RETRIEVE_DEPARTMENT
} from '../constants/actionTypes';
import DepartmentsAPI from '../../services/DepartmentsAPI';
import { closeModal } from '../actionCreator/modalActions';
import apiErrorHandler from '../../services/apiErrorHandler';

export function* editDepartmentSaga(action){
  const { id, body } = action;
  try {
    const response = yield call(DepartmentsAPI.editDepartment, id, body);
    yield put(editDepartmentSuccess(response.data));
    toast.success(response.data.message);
    yield put(closeModal());
  }catch(error){
    toast.error(apiErrorHandler(error));
    yield put(editDepartmentFailure(error.response.data));
  }
}

export function* watchEditDepartment() {
  yield takeLatest(EDIT_DEPARTMENT, editDepartmentSaga);
}

export function* addDepartmentSaga(action) {
  const { body, history } = action;
  try {
    const response = yield call(DepartmentsAPI.createDepartment, body);
    yield put(addDepartmentSuccess(response.data));
    toast.success(response.data.message);
    yield put(closeModal());
    history.push('/settings/departments');
  } catch(error){
    toast.error(error.response.data.message);
    yield put(addDepartmentFailure(error.response.data));
  }
}

export function* watchAddDepartments(){
  yield takeLatest(ADD_DEPARTMENT, addDepartmentSaga);
}

export function* getAllDepartmentsSaga(action) {
  try {
    const { query } = action;
    const response = yield call(DepartmentsAPI.getAllDepartments, query);
    const { data: { metaData }} = response;
    yield put(getAllDepartmentsSuccess(metaData));
  } catch (error) {
    let errorMessage = apiErrorHandler(error);
    toast.error(errorMessage);
    yield put(getAllDepartmentsFailure(errorMessage));
  }
}

export function* watchGetAllDepartments() {
  yield takeLatest(GET_ALL_DEPARTMENTS, getAllDepartmentsSaga);
}

export function* retrieveDepartmentSaga(action) {
  try {
    const { id } = action;
    const response = yield call(DepartmentsAPI.retrieveDepartment, id);
    yield put(retrieveDepartmentSuccess(response.data));
  } catch (error) {
    let errorMessage = apiErrorHandler(error);
    toast.error(errorMessage);
    yield put(retrieveDepartmentFailure(errorMessage));
  }
}

export function* watchRetrieveDepartment() {
  yield takeLatest(RETRIEVE_DEPARTMENT, retrieveDepartmentSaga);
}

export function* deleteDepartmentSaga(action) {
  try{
    const { id } = action;
    const response = yield call(DepartmentsAPI.deleteDepartment, id);
    yield put(deleteDepartmentSuccess(id, response.data.deletedReason));
    toast.success(response.data.message);
    yield put(closeModal());
  }
  catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(deleteDepartmentFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watchDeleteDepartment() {
  yield takeLatest(DELETE_DEPARTMENT, deleteDepartmentSaga);
}
