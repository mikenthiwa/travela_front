import {takeLatest, put, call} from 'redux-saga/effects';
import toast from 'toastr';
import ApprovalsApi from '../../services/approvalsAPI';
import {
  fetchUserApprovals,
  fetchUserApprovalsSuccess,
  fetchUserApprovalsFailure,
  updateRequestStatus,
  updateRequestStatusSuccess,
  updateRequestStatusFailure,
  updateBudgetStatus,
  updateBudgetStatusSuccess,
  updateBudgetStatusFailure,
} from '../actionCreator';

import { fetchUserRequestDetails } from '../actionCreator/requestActions';
import apiErrorHandler from '../../services/apiErrorHandler';
import TripModificationsAPI from '../../services/TripModificationsAPI';

export function* fetchUserApprovalsSaga(action) {
  try {
    const approvals = yield (action.approvalsType === 'modifications'
      ? call(TripModificationsAPI.getModifications, action.url)
      : call(ApprovalsApi.getUserApprovals, action.url, action.approvalsType === 'budget'));

    yield put(fetchUserApprovalsSuccess(approvals.data));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(fetchUserApprovalsFailure(error));
    toast.error(errorMessage);
  }
}

export function* watchFetchApprovals() {
  yield takeLatest(fetchUserApprovals().type, fetchUserApprovalsSaga);
}

export function* updateRequestStatusSaga(action) {
  try {
    const response = yield call(
      ApprovalsApi.updateRequestStatus, action.statusUpdateData
    );
    const { message, updatedRequest } = response.data;
    toast.success(message);
    yield put(updateRequestStatusSuccess(updatedRequest));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(updateRequestStatusFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watchUpdateRequestStatus() {
  yield takeLatest(updateRequestStatus().type, updateRequestStatusSaga);
}

export function* updateBudgetStatusSaga(action) {
  try {
    const response = yield call(
      ApprovalsApi.updateBudgetStatus, { requestId:action.requestId, budgetStatus:action.budgetStatusData }
    );
    const { updatedRequest } = response.data;
    yield put(updateBudgetStatusSuccess(updatedRequest));
    yield put(fetchUserRequestDetails(action.requestId));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(updateBudgetStatusFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watchUpdateBudgetStatus() {
  yield takeLatest(updateBudgetStatus().type, updateBudgetStatusSaga);
}
