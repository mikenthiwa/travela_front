import { call } from 'redux-saga/effects';
import axios from 'axios';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';
import UserAPI from '../../../services/UserAPI';
import {
  watchPostUserDataSagaAsync,
  watchGetUserDataSagaAsync,
  watchFetchUsersEmail,
  fetchDepartmentDataSaga,
} from '../userDataSaga';
import user from '../../__mocks__/user';

const response = {
  data: {
    result: { ...user }
  }
};

const secondResp = {
  data: {
    values: [{
      location: { name: 'Lagos' }
    }]
  }
};
const thirdResponse = {
  data: {
    result: [
      {fullName:'', email: 'travela@andela.com'}]

  }
};

const departmentResponse = {
  data: {
    result: [
      { id: 1, name:'Fellow'} ]

  }
};

const id = 'JFENDVNDK';
const email = 'test.user@test.com';
const error = 'Possible network error, please reload the page';

describe('User Saga', () => {
  describe('Fetch user data saga', () => {
    it('fetches user ', () => {
      return expectSaga(watchGetUserDataSagaAsync, UserAPI)
        .provide([
          [matchers.call.fn(UserAPI.getUserData, id), response],
          [matchers.call.fn(UserAPI.getUserDataFromStagingApi, email), secondResp],
        ])
        .put({
          type: 'GET_USER_DATA_SUCCESS',
          response: response.data
        })
        .dispatch({
          type: 'GET_USER_DATA',
          id
        })
        .silentRun();
    });
    it('throws error if there is an error fetching a users detail', () => {
      return expectSaga(watchGetUserDataSagaAsync, UserAPI)
        .provide([[call(UserAPI.getUserData, id), throwError(error)]])
        .put({
          type: 'GET_USER_DATA_FAILURE',
          error
        })
        .dispatch({
          type: 'GET_USER_DATA',
          id
        })
        .silentRun();
    });
  });

  describe('Create user saga', () => {
    it('fails to post user data', () => {
      return expectSaga(watchPostUserDataSagaAsync, UserAPI)
        .provide([[call(UserAPI.postNewUsers, user), throwError(error)]])
        .put({
          type: 'POST_USER_DATA_FAILURE',
          error
        })
        .dispatch({
          type: 'POST_USER_DATA',
          userData: user
        })
        .silentRun();
    });

    it('successfully runs saga to post user data', () => {
      return expectSaga(watchPostUserDataSagaAsync, UserAPI)
        .provide([
          [matchers.call.fn(UserAPI.getUserDataFromStagingApi, email), secondResp],
          [matchers.call.fn(UserAPI.postNewUsers, id), response],
          [matchers.call.fn(UserAPI.getUserData, id), response],
        ])
        .put({
          type: 'POST_USER_DATA_SUCCESS',
          userData: response.data
        })
        .dispatch({
          type: 'POST_USER_DATA',
          userData: user
        })
        .silentRun();
    });
  });

  describe('Fetch user emails saga', () => {
    it('successfully runs saga to fetch user emails', () => {

      return expectSaga(watchFetchUsersEmail)
        .provide([[call(UserAPI.getAllUsersEmail), thirdResponse]])
        .put({
          type: 'GET_ALL_EMAILS_SUCCESS',
          response: [ { id: 'travela@andela.com', text: 'travela@andela.com' } ]
        })
        .dispatch({
          type: 'GET_ALL_EMAILS',
        })
        .silentRun();
    });



    it('fails to get user emails', () => {
      return expectSaga(watchFetchUsersEmail, UserAPI)
        .provide([[call(UserAPI.getAllUsersEmail), throwError(error)]])
        .put({
          type: 'GET_ALL_EMAILS_FAILURE',
          error
        })
        .dispatch({
          type: 'GET_ALL_EMAILS',
        })
        .silentRun();
    });
  });

  describe('Fetch departments ', () => {
    it('successfully runs saga to fetch departments', () => {
      return expectSaga(fetchDepartmentDataSaga)
        .provide([[call(UserAPI.getAllDepartment), departmentResponse]])
        .put({
          type: 'GET_ALL_DEPARTMENT_SUCCESS',
          response: [ { id: 'Fellow', text: 'Fellow', parentId: undefined, parentName: null } ]
        })
        .dispatch({
          type: 'GET_ALL_DEPARTMENT',
        })
        .silentRun();
    });


    it('fails to get user emails', () => {
      return expectSaga(fetchDepartmentDataSaga, UserAPI)
        .provide([[call(UserAPI.getAllDepartment), throwError(error)]])
        .put({
          type: 'GET_ALL_DEPARTMENT_FAILURE',
          error
        })
        .dispatch({
          type: 'GET_ALL_DEPARTMENT',
        })
        .silentRun();
    });
  });
});
