import {
  FETCH_ROLE_USERS,
  FETCH_ROLE_USERS_SUCCESS,
  FETCH_ROLE_USERS_FAILURE,
  GET_ROLE_DATA,
  GET_ROLE_DATA_FAILURE,
  GET_ROLE_DATA_SUCCESS,
  PUT_ROLE_DATA,
  PUT_ROLE_DATA_FAILURE,
  PUT_ROLE_DATA_SUCCESS,
  DELETE_USER_ROLE,
  DELETE_USER_ROLE_FAILURE,
  DELETE_USER_ROLE_SUCCESS,
  SHOW_DELETE_ROLE_MODAL,
  HIDE_DELETE_ROLE_MODAL,
  ADD_ROLE,
  ADD_ROLE_SUCCESS,
  ADD_ROLE_FAILURE,
  UPDATE_BUDGET_CHECKER,
  UPDATE_BUDGET_CHECKER_SUCCESS,
  UPDATE_BUDGET_CHECKER_FAILURE
} from '../../constants/actionTypes';

import {
  getRoleData,
  getRoleDataFailure,
  getRoleDataSuccess,
  putRoleData,
  putRoleDataFailure,
  putRoleDataSuccess,
  fetchRoleUsers,
  fetchRoleUsersSuccess,
  fetchRoleUsersFailure,
  deleteUserRole,
  deleteUserRoleFailure,
  deleteUserRoleSuccess,
  showDeleteRoleModal,
  hideDeleteRoleModal,
  addRole,
  addRoleFailure,
  addRoleSuccess,
  updateBudgetChecker,
  updateBudgetCheckerSuccess,
  updateBudgetCheckerFailure
} from '../roleActions';

import { fetchRoleUsersResponse } from '../../__mocks__/reduxMocks';

const newRole = {
  roleName: 'Some role',
  description: 'A new role'
}

describe('Role Actions', () => {
  it('should return action type FETCH_ROLE_USERS', () => {
    const expectedAction = {
      type: FETCH_ROLE_USERS,
      roleId: 53098,
      page: 1
    };
    const createdAction = fetchRoleUsers(53098, 1);
    expect(createdAction).toEqual(expectedAction);
  });

  it('should return action type FETCH_ROLE_USERS_SUCCESS', () => {
    const { roleName, users, meta } = fetchRoleUsersResponse;
    const expectedAction = {
      type: FETCH_ROLE_USERS_SUCCESS,
      roleName,
      users,
      meta,
    };
    const createdAction = fetchRoleUsersSuccess(fetchRoleUsersResponse);
    expect(createdAction).toEqual(expectedAction);
  });

  it('should return action type FETCH_ROLE_USERS_FAILURE', () => {
    const expectedAction = {
      type: FETCH_ROLE_USERS_FAILURE,
      error: 'Role does not exist'
    };
    const createdAction = fetchRoleUsersFailure('Role does not exist');
    expect(createdAction).toEqual(expectedAction);
  });

  it('should return action type DELETE_USER_ROLE', () => {
    const expectedAction = {
      type: DELETE_USER_ROLE,
      userId: 1,
      roleId: 2,
      fullName: 'A user'
    };

    const createdAction = deleteUserRole(1,'A user', 2);
    expect(createdAction).toEqual(expectedAction);
  });

  it('should return action type DELETE_USER_ROLE_SUCCESS', () => {
    const expectedAction = {
      type: DELETE_USER_ROLE_SUCCESS,
      message: 'User removed successfully',
      userId: 1
    };

    const createdAction = deleteUserRoleSuccess('User removed successfully', 1);
    expect(createdAction).toEqual(expectedAction);
  });

  it('should return action type DELETE_USER_ROLE_FAILURE', () => {
    const expectedAction = {
      type: DELETE_USER_ROLE_FAILURE,
      error: 'Server Error'
    };

    const createdAction = deleteUserRoleFailure('Server Error');
    expect(createdAction).toEqual(expectedAction);
  });

  it('should return action type SHOW_DELETE_ROLE_MODAL', () => {
    const expectedAction = {
      type: SHOW_DELETE_ROLE_MODAL,
      roleId: 2
    };

    const createdAction = showDeleteRoleModal(2);
    expect(createdAction).toEqual(expectedAction);
  });

  it('should return action type HIDE_DELETE_ROLE_MODAL', () => {
    const expectedAction = {
      type: HIDE_DELETE_ROLE_MODAL
    };

    const createdAction = hideDeleteRoleModal();
    expect(createdAction).toEqual(expectedAction);
  });

  it('should return action type GET_ROLE_DATA', () => {
    const expectedAction = {
      type: GET_ROLE_DATA
    };

    const createdAction = getRoleData();
    expect(createdAction).toEqual(expectedAction);
  });

  it('should return action type GET_ROLE_DATA_SUCCESS', () => {
    const expectedAction = {
      type: GET_ROLE_DATA_SUCCESS,
      response: 'Role data retrieved successfully'
    };

    const createdAction = getRoleDataSuccess('Role data retrieved successfully');
    expect(createdAction).toEqual(expectedAction);
  });

  it('should return action type GET_ROLE_DATA_FAILURE', () => {
    const expectedAction = {
      type: GET_ROLE_DATA_FAILURE,
      error: 'Server Error'
    };

    const createdAction = getRoleDataFailure('Server Error');
    expect(createdAction).toEqual(expectedAction);
  });

  it('should return action type PUT_ROLE_DATA', () => {
    const expectedAction = {
      type: PUT_ROLE_DATA,
      roleData: [{ id: 1, userId: 2, roleId: 2 }]
    };

    const createdAction = putRoleData([{ id: 1, userId: 2, roleId: 2 }]);
    expect(createdAction).toEqual(expectedAction);
  });

  it('should return action type PUT_ROLE_DATA_SUCCESS', () => {
    const expectedAction = {
      type: PUT_ROLE_DATA_SUCCESS,
      roleData: [{ id: 1, userId: 2, roleId: 2 }]
    };

    const createdAction = putRoleDataSuccess([{ id: 1, userId: 2, roleId: 2 }]);
    expect(createdAction).toEqual(expectedAction);
  });

  it('should return action type PUT_ROLE_DATA_FAILURE', () => {
    const expectedAction = {
      type: PUT_ROLE_DATA_FAILURE,
      error: 'Server Error'
    };

    const createdAction = putRoleDataFailure('Server Error');
    expect(createdAction).toEqual(expectedAction);
  });


  it('should return action type ADD_ROLE', () => {
    const expectedAction = {
      type: ADD_ROLE,
      roleData: newRole
    };

    const createdAction = addRole(newRole);
    expect(createdAction).toEqual(expectedAction);
  });

  it('should return action type ADD_ROLE_SUCCESS', () => {
    const expectedAction = {
      type: ADD_ROLE_SUCCESS,
      role: newRole
    };

    const createdAction = addRoleSuccess(newRole);
    expect(createdAction).toEqual(expectedAction);
  });

  it('should return action type ADD_ROLE_FAILURE', () => {
    const expectedAction = {
      type: ADD_ROLE_FAILURE,
      error: 'Server Error'
    };

    const createdAction = addRoleFailure('Server Error');
    expect(createdAction).toEqual(expectedAction);
  });
  it('should return action type UPDATE_BUDGET_CHECKER', () => {
    const expectedAction = {
      type: UPDATE_BUDGET_CHECKER,
      newRoleData: newRole
    };

    const createdAction = updateBudgetChecker(newRole);
    expect(createdAction).toEqual(expectedAction);
  });

  it('should return action type UPDATE_BUDGET_CHECKER_SUCCESS', () => {
    const expectedAction = {
      type: UPDATE_BUDGET_CHECKER_SUCCESS,
      userDetail: newRole
    };

    const createdAction = updateBudgetCheckerSuccess(newRole);
    expect(createdAction).toEqual(expectedAction);
  });

  it('should return action type UPDATE_BUDGET_CHECKER_FAILURE', () => {
    const expectedAction = {
      type: UPDATE_BUDGET_CHECKER_FAILURE,
      error: 'Server Error'
    };

    const createdAction = updateBudgetCheckerFailure('Server Error');
    expect(createdAction).toEqual(expectedAction);
  });
});
