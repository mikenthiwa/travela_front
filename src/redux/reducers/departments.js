import _ from 'lodash';
import {
  ADD_DEPARTMENT,
  ADD_DEPARTMENT_FAILURE,
  ADD_DEPARTMENT_SUCCESS,
  EDIT_DEPARTMENT,
  EDIT_DEPARTMENT_FAILURE,
  EDIT_DEPARTMENT_SUCCESS,
  GET_ALL_DEPARTMENTS,
  GET_ALL_DEPARTMENTS_FAILURE,
  GET_ALL_DEPARTMENTS_SUCCESS,
  DELETE_DEPARTMENT,
  DELETE_DEPARTMENT_FAILURE,
  DELETE_DEPARTMENT_SUCCESS, RETRIEVE_DEPARTMENT, RETRIEVE_DEPARTMENT_SUCCESS, RETRIEVE_DEPARTMENT_FAILURE
} from '../constants/actionTypes';


export const initialState = {
  newDepartment: {},
  editDepartment: {},
  isCreatingDepartment: false,
  isFetchingDepartment: false,
  isEditingDepartment: false,
  isLoadingDepartment: false,
  isDeletingDepartment: false,
  isRetrievingDepartment: false,
  singleDepartment: {},
  errors: {},
  departments: [],
  pagination: {},
};
let newDepartments;

const deleteDepartmentReducerDeletingState = (action) => {
  switch (action.type) {
  case DELETE_DEPARTMENT:
    return true;
  case DELETE_DEPARTMENT_SUCCESS:
  case DELETE_DEPARTMENT_FAILURE:
    return false;
  }
};

const deleteDepartmentReducerDepartmentsState = (state, action) => {
  switch (action.type) {
  case DELETE_DEPARTMENT_SUCCESS:
    newDepartments = state.departments.filter(reason => reason.id !== action.id);
    return newDepartments;
  case DELETE_DEPARTMENT:
    return state.departments;
  case DELETE_DEPARTMENT_FAILURE:
    return state.departments;
  }
};

const deleteDepartmentReducerError = (state, action) => {
  switch (action.type) {
  case DELETE_DEPARTMENT:
    return state.errors;
  case DELETE_DEPARTMENT_FAILURE:
    return action.error;
  case DELETE_DEPARTMENT_SUCCESS:
    return '';
  }
};

const department = (state = initialState, action) => {
  switch (action.type) {
  case ADD_DEPARTMENT: { return { ...state, isCreatingDepartment: true, errors: {} }; }
  case ADD_DEPARTMENT_SUCCESS:
    return { ...state, isCreatingDepartment: false,
      newDepartment: action.response.department, errors: {}};
  case ADD_DEPARTMENT_FAILURE: {
    return { ...state, isCreatingDepartment: false, errors: action.error };}
  case GET_ALL_DEPARTMENTS: return { ...state, isLoadingDepartment: true };
  case GET_ALL_DEPARTMENTS_SUCCESS:
    return { ...state,
      departments: [...action.response.departments],
      pagination: action.response.pagination,
      isLoadingDepartment: false };
  case GET_ALL_DEPARTMENTS_FAILURE: return {
    ...state, errors: action.errors, isLoadingDepartment: false };
  case RETRIEVE_DEPARTMENT: return { ...state, isRetrievingDepartment: true };
  case RETRIEVE_DEPARTMENT_SUCCESS:
    return { ...state,
      singleDepartment: action.response.department,
      isRetrievingDepartment: false, errors: {}};
  case RETRIEVE_DEPARTMENT_FAILURE: return {
    ...state, errors: action.errors, isRetrievingDepartment: false };
  case EDIT_DEPARTMENT:
    return {...state, isEditingDepartment: true, errors: {}};
  case EDIT_DEPARTMENT_SUCCESS: {
    const {department} = action.response;
    const departments = state.departments.slice();
    const index = _.findIndex(departments, {id: department.id});
    departments[index] = {
      ...department,
      parentDepartments: {
        id: department.id,
        name: action.response.parentDepartment
      }
    };
    return {
      ...state,
      isEditingDepartment: false,
      departments,
      errors: {}
    };
  }
  case EDIT_DEPARTMENT_FAILURE:
    return {...state, isEditingDepartment: false, errors: action.error};
  case DELETE_DEPARTMENT:
  case DELETE_DEPARTMENT_SUCCESS:
  case DELETE_DEPARTMENT_FAILURE:
    return {
      ...state,
      isDeletingDepartment: deleteDepartmentReducerDeletingState(action),
      error: deleteDepartmentReducerError(state, action),
      departments: deleteDepartmentReducerDepartmentsState(state, action)
    };
  default: {
    return state;
  }
  }
};

export default department;
