import {
  ADD_DEPARTMENT,
  ADD_DEPARTMENT_FAILURE,
  ADD_DEPARTMENT_SUCCESS,
  DELETE_DEPARTMENT,
  DELETE_DEPARTMENT_FAILURE,
  DELETE_DEPARTMENT_SUCCESS,
  EDIT_DEPARTMENT,
  EDIT_DEPARTMENT_FAILURE,
  EDIT_DEPARTMENT_SUCCESS,
  GET_ALL_DEPARTMENTS,
  GET_ALL_DEPARTMENTS_FAILURE,
  GET_ALL_DEPARTMENTS_SUCCESS, RETRIEVE_DEPARTMENT, RETRIEVE_DEPARTMENT_FAILURE, RETRIEVE_DEPARTMENT_SUCCESS
} from '../constants/actionTypes';

export const addDepartment = (body, history) => ({
  type: ADD_DEPARTMENT,
  body,
  history
});

export const addDepartmentSuccess = (response) => ({
  type: ADD_DEPARTMENT_SUCCESS,
  response
});

export const addDepartmentFailure = (error) => ({
  type: ADD_DEPARTMENT_FAILURE,
  error
});

export const getAllDepartments = (query) => ({
  type: GET_ALL_DEPARTMENTS,
  query
});

export const getAllDepartmentsSuccess = (response) => ({
  type: GET_ALL_DEPARTMENTS_SUCCESS,
  response
});

export const getAllDepartmentsFailure = (error) => ({
  type: GET_ALL_DEPARTMENTS_FAILURE,
  error
});

export const retrieveDepartment = (id) => ({
  type: RETRIEVE_DEPARTMENT,
  id
});

export const retrieveDepartmentSuccess = (response) => ({
  type: RETRIEVE_DEPARTMENT_SUCCESS,
  response
});

export const retrieveDepartmentFailure = (error) => ({
  type: RETRIEVE_DEPARTMENT_FAILURE,
  error
});

export const editDepartment = (id, body) => ({
  type: EDIT_DEPARTMENT,
  id,
  body
});

export const editDepartmentSuccess = (response) => ({
  type: EDIT_DEPARTMENT_SUCCESS,
  response
});


export const editDepartmentFailure = (error) => ({
  type: EDIT_DEPARTMENT_FAILURE,
  error
});

export const deleteDepartment = (id) => {
  return {
    type: DELETE_DEPARTMENT,
    id
  };
};

export const deleteDepartmentSuccess = (response) => ({
  type: DELETE_DEPARTMENT_SUCCESS,
  response,
});

export const deleteDepartmentFailure = (error) => ({
  type: DELETE_DEPARTMENT_FAILURE,
  error,
});
