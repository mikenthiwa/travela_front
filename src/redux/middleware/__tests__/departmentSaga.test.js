import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import {
  watchAddDepartments,
  watchEditDepartment,
  watchGetAllDepartments,
  watchRetrieveDepartment,
  watchDeleteDepartment
} from '../departmentSaga';
import DepartmentsAPI from '../../../services/DepartmentsAPI';
import {
  ADD_DEPARTMENT,
  ADD_DEPARTMENT_SUCCESS,
  EDIT_DEPARTMENT_FAILURE,
  GET_ALL_DEPARTMENTS,
  GET_ALL_DEPARTMENTS_SUCCESS,
  GET_ALL_DEPARTMENTS_FAILURE,
  RETRIEVE_DEPARTMENT,
  RETRIEVE_DEPARTMENT_SUCCESS,
  RETRIEVE_DEPARTMENT_FAILURE,
  DELETE_DEPARTMENT,
  DELETE_DEPARTMENT_SUCCESS,
  DELETE_DEPARTMENT_FAILURE,
  EDIT_DEPARTMENT,
  ADD_DEPARTMENT_FAILURE,
  EDIT_DEPARTMENT_SUCCESS
} from '../../constants/actionTypes';

const body = {
  name: 'Technology',
  parentDepartment: null,
  createdBy: 1
};

const newDepartment = {
  newDepartment: 1,
  name: body.name,
  parentDepartment: body.parentDepartment,
  createdBy: 1,
};

const response = {
  data: {
    success: true,
    message: 'success',
    newDepartment
  }
};

const history = {
  push: jest.fn()
};

const responseError = {
  response: {
    status: 500,
    data: {
      message: 'Server error, try again'
    }
  }
};

const error = new Error('Server error, try again');
error.response = responseError.response;

describe('Departments Saga', () => {
  it('gets a response with departments and dispatches ADD_DEPARTMENT', () => {
    return expectSaga(watchAddDepartments)
      .provide([[call(DepartmentsAPI.createDepartment, body), response]])
      .put({
        type: ADD_DEPARTMENT_SUCCESS,
        response: response.data
      })
      .put({
        type: 'CLOSE_MODAL',
      })
      .dispatch({
        type: ADD_DEPARTMENT,
        body,
        history
      })
      .silentRun();
  });

  it('handles an error', () => {
    return expectSaga(watchAddDepartments)
      .provide([[call(DepartmentsAPI.createDepartment, body), throwError(error)]])
      .put({
        type: ADD_DEPARTMENT_FAILURE,
        error: error.response.data,
      })
      .dispatch({
        type: ADD_DEPARTMENT,
        body,
        history
      })
      .silentRun();
  });

  it('gets a response with departments and dispatches EDIT_DEPARTMENT', () => {
    return expectSaga(watchEditDepartment)
      .provide([[call(DepartmentsAPI.editDepartment, newDepartment.id, body), response]])
      .put({
        type: EDIT_DEPARTMENT_SUCCESS,
        response: response.data
      })
      .put({
        type: 'CLOSE_MODAL',
      })
      .dispatch({
        type: EDIT_DEPARTMENT,
        body,
      })
      .silentRun();
  });

  it('handles an error', () => {
    return expectSaga(watchEditDepartment)
      .provide([[call(DepartmentsAPI.editDepartment,newDepartment.id, body), throwError(error)]])
      .put({
        type: EDIT_DEPARTMENT_FAILURE,
        error: error.response.data,
      })
      .dispatch({
        type: EDIT_DEPARTMENT,
        body,
        history
      })
      .silentRun();
  });

  it('gets a response with departments and dispatches GET_ALL_DEPARTMENTS', () => {
    const query = '?';
    const resp = {
      data: {
        metaData: {
          success: true,
          message: 'success',
        }
      }
    };
    return expectSaga(watchGetAllDepartments)
      .provide([[call(DepartmentsAPI.getAllDepartments, query), resp]])
      .put({
        type: GET_ALL_DEPARTMENTS_SUCCESS,
        response: resp.data.metaData
      })
      .dispatch({
        type: GET_ALL_DEPARTMENTS,
        query,
      })
      .silentRun();
  });

  it('handles an error', () => {
    const query = '?';
    return expectSaga(watchGetAllDepartments)
      .provide([[call(DepartmentsAPI.getAllDepartments, query), throwError(error)]])
      .put({
        type: GET_ALL_DEPARTMENTS_FAILURE,
        error: error.response.data.message,
      })
      .dispatch({
        type: GET_ALL_DEPARTMENTS,
        query,
      })
      .silentRun();
  });

  it('gets a response with departments and dispatches RETRIEVE_DEPARTMENT', () => {
    return expectSaga(watchRetrieveDepartment)
      .provide([[call(DepartmentsAPI.retrieveDepartment, newDepartment.id), response]])
      .put({
        type: RETRIEVE_DEPARTMENT_SUCCESS,
        response: response.data
      })
      .dispatch({
        type: RETRIEVE_DEPARTMENT,
        body,
      })
      .silentRun();
  });

  it('handles an error', () => {
    return expectSaga(watchRetrieveDepartment)
      .provide([[call(DepartmentsAPI.retrieveDepartment, newDepartment.id), throwError(error)]])
      .put({
        type: RETRIEVE_DEPARTMENT_FAILURE,
        error: error.response.data.message,
      })
      .dispatch({
        type: RETRIEVE_DEPARTMENT,
        body,
      })
      .silentRun();
  });

  it('gets a response with departments and dispatches DELETE_DEPARTMENT', () => {
    const response = {
      data: {
        deletedReason: newDepartment
      }
    };
    return expectSaga(watchDeleteDepartment)
      .provide([[call(DepartmentsAPI.deleteDepartment, newDepartment.id), response]])
      .put({
        type: DELETE_DEPARTMENT_SUCCESS,
        response: newDepartment.id,
      })
      .put({
        type: 'CLOSE_MODAL',
      })
      .dispatch({
        type: DELETE_DEPARTMENT,
        body,
      })
      .silentRun();
  });

  it('handles an error', () => {
    return expectSaga(watchDeleteDepartment)
      .provide([[call(DepartmentsAPI.deleteDepartment, newDepartment.id), throwError(error)]])
      .put({
        type: DELETE_DEPARTMENT_FAILURE,
        error: error.response.data.message,
      })
      .dispatch({
        type: DELETE_DEPARTMENT,
        body,
      })
      .silentRun();
  });
});

