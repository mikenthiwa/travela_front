import {takeLatest, call, put} from 'redux-saga/effects';
import {EMAIL_APPROVAL} from '../constants/actionTypes';
import apiErrorHandler from '../../services/apiErrorHandler';
import {emailApprovalFailure, emailApprovalSuccess} from '../actionCreator/emailApprovalActions';
import ApprovalsApi from '../../services/approvalsAPI';
import {BUDGET_CHECKER_REQUEST_APPROVAL, MANAGER_REQUEST_APPROVAL} from '../../views/EmailApproval/types';


const makeCall = (payload) => {
  if (payload.type === MANAGER_REQUEST_APPROVAL) {
    return call( ApprovalsApi.updateRequestStatus, payload );
  }else if (payload.type === BUDGET_CHECKER_REQUEST_APPROVAL) {
    return call(ApprovalsApi.updateBudgetStatus, payload);
  }
};

export function* emailApproval(action){
  try{
    const { payload } = action;
    const response = yield makeCall(payload);
    const { message } = response.data;
    yield put(emailApprovalSuccess({ message }));
  }catch(error){
    const message = apiErrorHandler(error);
    yield put(emailApprovalFailure({ message }));
  }
}

export function* watchEmailApproval(){
  yield takeLatest(EMAIL_APPROVAL, emailApproval);
}
