import {EMAIL_APPROVAL, EMAIL_APPROVAL_FAILURE, EMAIL_APPROVAL_SUCCESS} from '../constants/actionTypes';

export const emailApproval = (payload) => ({
  type: EMAIL_APPROVAL,
  payload
});

export const emailApprovalSuccess = (response) => ({
  type: EMAIL_APPROVAL_SUCCESS,
  response
});

export const emailApprovalFailure = (error) => ({
  type: EMAIL_APPROVAL_FAILURE,
  error
});
