import {
  POST_USER_DATA,
  POST_USER_DATA_SUCCESS,
  POST_USER_DATA_FAILURE,
  GET_USER_DATA,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAILURE,
  GET_ALL_EMAILS,
  GET_ALL_EMAILS_SUCCESS,
  GET_ALL_EMAILS_FAILURE,
  GET_ALL_DEPARTMENT,
  GET_ALL_DEPARTMENT_SUCCESS,
  GET_ALL_DEPARTMENT_FAILURE
} from '../constants/actionTypes';

export const postUserData = userData => ({
  type: POST_USER_DATA,
  userData
});

export const postUserDataSuccess = userData => ({
  type: POST_USER_DATA_SUCCESS,
  userData
});

export const postUserDataFailure = error => ({
  type: POST_USER_DATA_FAILURE,
  error
});

export const getUserData = id => ({
  type: GET_USER_DATA,
  id
});

export const getUserDataSuccess = response => ({
  type: GET_USER_DATA_SUCCESS,
  response
});

export const getUserDataFailure = error => ({
  type: GET_USER_DATA_FAILURE,
  error
});

export const getAllUsersEmail = () => ({
  type: GET_ALL_EMAILS,
});

export const getAllUsersEmailSuccess = response => ({
  type: GET_ALL_EMAILS_SUCCESS,
  response
});

export const getAllUsersEmailFailure = error => ({
  type: GET_ALL_EMAILS_FAILURE,
  error
});

export const getAllDepartment = () => ({
  type: GET_ALL_DEPARTMENT,
});

export const getAllDepartmentSuccess = response => ({
  type: GET_ALL_DEPARTMENT_SUCCESS,
  response
});

export const getAllDepartmentFailure = error => ({
  type: GET_ALL_DEPARTMENT_FAILURE,
  error
});
