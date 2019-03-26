import {
  GET_ROLE_DATA,
  GET_ROLE_DATA_SUCCESS,
  GET_ROLE_DATA_FAILURE,
  PUT_ROLE_DATA,
  PUT_ROLE_DATA_SUCCESS,
  PUT_ROLE_DATA_FAILURE,
  FETCH_ROLE_USERS,
  FETCH_ROLE_USERS_SUCCESS,
  FETCH_ROLE_USERS_FAILURE,
  DELETE_USER_ROLE,
  DELETE_USER_ROLE_SUCCESS,
  DELETE_USER_ROLE_FAILURE,
  SHOW_DELETE_ROLE_MODAL,
  HIDE_DELETE_ROLE_MODAL,
  ADD_ROLE,
  ADD_ROLE_SUCCESS,
  ADD_ROLE_FAILURE,
  UPDATE_ROLE,
  UPDATE_ROLE_SUCCESS,
  UPDATE_ROLE_FAILURE,
  UPDATE_BUDGET_CHECKER,
  UPDATE_BUDGET_CHECKER_SUCCESS,
  UPDATE_BUDGET_CHECKER_FAILURE
} from '../constants/actionTypes';

export const getRoleData  = () => ({
  type: GET_ROLE_DATA,
});

export const getRoleDataSuccess = response => ({
  type: GET_ROLE_DATA_SUCCESS,
  response,
});

export const getRoleDataFailure = error => ({
  type: GET_ROLE_DATA_FAILURE,
  error,
});

export const putRoleData  = (roleData) => ({
  type: PUT_ROLE_DATA,
  roleData,
});

export const putRoleDataSuccess = roleData => ({
  type: PUT_ROLE_DATA_SUCCESS,
  roleData,
});

export const putRoleDataFailure = error => ({
  type: PUT_ROLE_DATA_FAILURE,
  error,
});

export const fetchRoleUsers = (roleId, page) => ({
  type: FETCH_ROLE_USERS,
  roleId,
  page,
});

export const fetchRoleUsersSuccess = ({roleName, users, meta}) => ({
  type: FETCH_ROLE_USERS_SUCCESS,
  users,
  roleName,
  meta,
});

export const fetchRoleUsersFailure = error => ({
  type: FETCH_ROLE_USERS_FAILURE,
  error
});

export const deleteUserRole = (userId, fullName, roleId) => ({
  type: DELETE_USER_ROLE,
  userId,
  fullName,
  roleId
});

export const deleteUserRoleSuccess = (message, userId) => ({
  type: DELETE_USER_ROLE_SUCCESS,
  message,
  userId
});

export const deleteUserRoleFailure = error => ({
  type: DELETE_USER_ROLE_FAILURE,
  error
});

export const showDeleteRoleModal = roleId => ({
  type: SHOW_DELETE_ROLE_MODAL,
  roleId
});

export const hideDeleteRoleModal = () => ({
  type: HIDE_DELETE_ROLE_MODAL
});

export const addRole = (roleData) => ({
  type: ADD_ROLE,
  roleData
});

export const addRoleSuccess = (role) => ({
  type: ADD_ROLE_SUCCESS,
  role
});

export const addRoleFailure = (error) => ({
  type: ADD_ROLE_FAILURE,
  error
});

export const updateRole = (roleId, newRoleData, history) => ({
  type: UPDATE_ROLE,
  roleId,
  newRoleData,
  history
});

export const updateRoleSuccess = (role) => ({
  type: UPDATE_ROLE_SUCCESS,
  role
});

export const updateRoleFailure = (error) => ({
  type: UPDATE_ROLE_FAILURE,
  error
});

export const updateBudgetChecker = (newRoleData) => ({
  type: UPDATE_BUDGET_CHECKER,
  newRoleData
});

export const updateBudgetCheckerSuccess = (userDetail) => ({
  type: UPDATE_BUDGET_CHECKER_SUCCESS,
  userDetail
});

export const updateBudgetCheckerFailure = (error) => ({
  type: UPDATE_BUDGET_CHECKER_FAILURE,
  error
});
