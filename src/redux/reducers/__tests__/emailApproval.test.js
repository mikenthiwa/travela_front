import emailApproval from '../emailApproval';
import {EMAIL_APPROVAL, EMAIL_APPROVAL_SUCCESS} from '../../constants/actionTypes';
import {emailApprovalFailure, emailApprovalSuccess} from '../../actionCreator/emailApprovalActions';

describe('Email Approval Reducer', () => {
  it('should set the state to loading', () => {
    const result =  emailApproval(null, { type: EMAIL_APPROVAL});
    expect(result).toMatchObject({
      loading: true,
      response: '',
      error: false
    });
  });

  it('should set the state to not loading and add the response', () => {
    const result = emailApproval(null, emailApprovalSuccess({ message: 'hi'}));
    expect(result).toMatchObject({
      loading: false,
      response: 'hi',
      error: false
    });
  });

  it('should set the state to not loading and set error', () => {
    const result = emailApproval(null, emailApprovalFailure({ message: 'message'}));
    expect(result).toMatchObject({
      loading: false,
      response: 'message',
      error: true
    });
  });

  it('should return the default state', () => {
    const result = emailApproval(undefined, { type: 'other'});
    expect(result).toMatchObject({
      loading: true,
      response: '',
      error: false
    });
  });
});
