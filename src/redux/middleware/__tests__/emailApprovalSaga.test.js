import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';
import {watchEmailApproval} from '../emailApprovalSaga';
import ApprovalsApi from '../../../services/approvalsAPI';
import {emailApproval, emailApprovalFailure, emailApprovalSuccess} from '../../actionCreator/emailApprovalActions';
import {BUDGET_CHECKER_REQUEST_APPROVAL, MANAGER_REQUEST_APPROVAL} from '../../../views/EmailApproval/types';

const error = {
  response: {
    status: 404,
    data: {
      success: false,
      message: 'something bad happened',
    }
  }
};

describe('Email Approval Saga', () => {
  const response = {
    data: {
      message: 'Approval successful'
    }
  };
  it('should send an email approval request', () => {
    const payload = {
      type: MANAGER_REQUEST_APPROVAL,
      requestId: '1223',
      newStatus: 'Approved'
    };
    return expectSaga(watchEmailApproval)
      .provide([[matchers.call.fn(ApprovalsApi.updateRequestStatus, payload), response]])
      .dispatch(emailApproval(payload))
      .put(emailApprovalSuccess({ message: 'Approval successful'}))
      .silentRun();
  });

  it('should send a budget approval request', () => {
    const payload = {
      type: BUDGET_CHECKER_REQUEST_APPROVAL,
      requestId: '1223',
      budgetStatus: {
        budgetStatus: 'Approved'
      }
    };
    return expectSaga(watchEmailApproval)
      .provide([[matchers.call.fn(ApprovalsApi.updateBudgetStatus, payload), response]])
      .dispatch(emailApproval(payload))
      .put(emailApprovalSuccess({ message: 'Approval successful'}))
      .silentRun();
  });

  it('should display the appropriate error', () => {
    const payload = {
      type: MANAGER_REQUEST_APPROVAL,
      requestId: '1223',
      newStatus: 'Approved'
    };
    return expectSaga(watchEmailApproval)
      .provide([[matchers.call.fn(ApprovalsApi.updateRequestStatus, payload), throwError(error)]])
      .dispatch(emailApproval(payload))
      .put(emailApprovalFailure({ message: 'something bad happened'}))
      .silentRun();
  });

});
