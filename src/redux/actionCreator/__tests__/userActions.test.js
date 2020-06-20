import {
  getAllUsersEmail,
  getAllUsersEmailFailure,
  getAllUsersEmailSuccess,
} from '../userActions';


describe('All users emails', ()=>{
  it('should return action type GET_ALL_EMAILS', ()=>{
    const expectedAction = {
      type: 'GET_ALL_EMAILS',
    };
    const getAction = getAllUsersEmail();
    expect(getAction).toEqual(expectedAction);
  });

  it('should return action type GET_ALL_EMAILS_SUCCESS', ()=>{
    const response = {};
    const expectedAction = {
      type: 'GET_ALL_EMAILS_SUCCESS',
      response
    };
    
    const getAction = getAllUsersEmailSuccess(response);
    expect(getAction).toEqual(expectedAction);
  });

  it('should return action type GET_ALL_EMAILS_FAILURE', ()=>{
    const error = '';
    const expectedAction = {
      error: '',
      type: 'GET_ALL_EMAILS_FAILURE',
    };
    const getAction = getAllUsersEmailFailure(error);
    expect(getAction).toEqual(expectedAction);
  });
});
