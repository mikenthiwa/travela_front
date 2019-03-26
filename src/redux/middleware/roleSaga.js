import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import {
  FETCH_ROLE_USERS,
  DELETE_USER_ROLE,
  UPDATE_BUDGET_CHECKER,
} from '../constants/actionTypes';
import RoleAPI from '../../services/RoleAPI';
import apiErrorHandler from '../../services/apiErrorHandler';
import {
  fetchRoleUsersSuccess,
  fetchRoleUsersFailure,
  deleteUserRoleFailure,
  deleteUserRoleSuccess,
  hideDeleteRoleModal,
  updateBudgetCheckerSuccess,
  updateBudgetCheckerFailure
} from '../actionCreator/roleActions';

import {
  closeModal
} from '../actionCreator/modalActions';

export function* watchFetchRoleUsers() {
  yield takeLatest(FETCH_ROLE_USERS, fetchRoleUsersSaga);
}
let response;
export function* fetchRoleUsersSaga(action) {
  try {
    response = yield call(RoleAPI.getRoleUsers, action.roleId, action.page);
    yield put(fetchRoleUsersSuccess(response.data.result));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(fetchRoleUsersFailure(errorMessage));
  }
}

export function* watchDeleteUserRoleAsync() {
  yield takeLatest(DELETE_USER_ROLE, deleteUserRoleSaga);
}

export function* deleteUserRoleSaga(action) {
  try {
    const { userId, fullName, roleId } = action;
    response = yield call(RoleAPI.deleteUserRole, userId, roleId);
    yield put(deleteUserRoleSuccess(response.data.message, userId, roleId));
    yield put(hideDeleteRoleModal());
    toast.success(`${fullName} removed successfully!`);
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(deleteUserRoleFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watchUpdateBudgetCheckerAsync() {
  yield takeLatest(UPDATE_BUDGET_CHECKER, updateBudgetCheckerSaga);
}

export function* updateBudgetCheckerSaga(action) {
  try {
    const { newRoleData } = action;
    response = yield call(RoleAPI.updateBudgetChecker, newRoleData);
    yield put(updateBudgetCheckerSuccess(response.data.user));
    toast.success(response.data.message);
    yield put(closeModal());
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(updateBudgetCheckerFailure(errorMessage));
    toast.error(errorMessage);
  }
}
