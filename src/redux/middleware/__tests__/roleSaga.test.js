import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';
import toast from 'toastr';
import RoleAPI from '../../../services/RoleAPI';
import {
  watchFetchRoleUsers,
  watchDeleteUserRoleAsync,
  watchUpdateBudgetCheckerAsync
} from '../roleSaga';
import {
  DELETE_USER_ROLE,
  DELETE_USER_ROLE_FAILURE,
  DELETE_USER_ROLE_SUCCESS,
  HIDE_DELETE_ROLE_MODAL,
  UPDATE_BUDGET_CHECKER,
  UPDATE_BUDGET_CHECKER_FAILURE,
  UPDATE_BUDGET_CHECKER_SUCCESS
} from '../../constants/actionTypes';
import { fetchRoleUsersResponse } from '../../__mocks__/reduxMocks';

toast.success = jest.fn();
toast.error = jest.fn();

describe('Role Saga', () => {

  describe('Fetch role users saga', () => {
    const response = {
      data: {
        result: {
          ...fetchRoleUsersResponse
        },
      }
    };
    const errorResponse = {
      response: {
        data: {
          error: 'An error occurred'
        }
      }
    };

    it('fetches users with a particular role', () => {
      const page = 1;
      const query = '';
      return expectSaga(watchFetchRoleUsers, RoleAPI)
        .provide([
          [call(RoleAPI.getRoleUsers, 53098, page, query), response]
        ])
        .put({
          type: 'FETCH_ROLE_USERS_SUCCESS',
          roleName: fetchRoleUsersResponse.roleName,
          users: fetchRoleUsersResponse.users,
          meta: fetchRoleUsersResponse.meta
        })
        .dispatch({
          type: 'FETCH_ROLE_USERS',
          roleId: 53098,
          page,
          query
        })
        .silentRun();
    });

    it('throws error if there is an error fetching user\'s of a role', () => {
      const page = 1;
      const query = '';
      return expectSaga(watchFetchRoleUsers, RoleAPI)
        .provide([
          [call(RoleAPI.getRoleUsers, 53098, page, query), throwError(errorResponse)]
        ])
        .put({
          type: 'FETCH_ROLE_USERS_FAILURE',
          error: 'An error occurred'
        })
        .dispatch({
          type: 'FETCH_ROLE_USERS',
          roleId: 53098,
          page,
          query
        })
        .silentRun();
    });
  });

  describe('Delete user role saga', () => {
    const userId = 1;
    const roleId = 2;

    it('deletes a travel checklist item successfully', () => {
      const response = {
        data: {
          message: 'Test User removed successfully!'
        }
      };

      return expectSaga(watchDeleteUserRoleAsync)
        .provide([[
          call(RoleAPI.deleteUserRole, userId, roleId ), response
        ]])
        .put({
          type: DELETE_USER_ROLE_SUCCESS,
          message: response.data.message,
          userId
        })
        .put({
          type: HIDE_DELETE_ROLE_MODAL
        })
        .dispatch({
          type: DELETE_USER_ROLE,
          userId,
          roleId
        })
        .silentRun();
    });

    it('should call toast.success once', (done) => {
      expect(toast.success).toHaveBeenCalledTimes(1);
      done();
    });

    it('handles failed user role delete', () => {
      const error = new Error('Server error, try again');
      error.response = { status: 500 };

      return expectSaga(watchDeleteUserRoleAsync)
        .provide([[
          call(RoleAPI.deleteUserRole, userId, roleId ), throwError(error)
        ]])
        .put({
          type: DELETE_USER_ROLE_FAILURE,
          error: error.message,
        })
        .dispatch({
          type: DELETE_USER_ROLE,
          userId,
          roleId
        })
        .silentRun();
    });

    it('should call toast.error once', (done) => {
      expect(toast.error).toHaveBeenCalledTimes(1);
      done();
    });
  });

  describe('Update budget checker saga', () => {
    const newRoleData = {
      email: 'test.user@andela.com',
      departments: ['Success']
    };

    it('Updates budget checker successfully', () => {
      const response = {
        data: {
          user: {
            email: 'test.andela.com',
            fullName: 'test andela'
          },
          budgetCheckerDepartments: [{
            name: 'Success'
          }]
        }
      };

      return expectSaga(watchUpdateBudgetCheckerAsync)
        .provide([[
          matchers.call.fn(RoleAPI.updateBudgetChecker, newRoleData), response
        ]])
        .put({
          type: UPDATE_BUDGET_CHECKER_SUCCESS,
          userDetail: response.data.user,
        })
        .dispatch({
          type: UPDATE_BUDGET_CHECKER,
          newRoleData: {
            email: 'test.andela.com',
            departments: ['Success']
          }
        })
        .silentRun();
    });

    it('handles update budget checker error', () => {
      const error = new Error('Server error, try again');
      error.response = { status: 500 };

      return expectSaga(watchUpdateBudgetCheckerAsync)
        .provide([[
          call(RoleAPI.updateBudgetChecker, newRoleData), throwError(error)
        ]])
        .put({
          type: UPDATE_BUDGET_CHECKER_FAILURE,
          error: error.message,
        })
        .dispatch({
          type: UPDATE_BUDGET_CHECKER,
          newRoleData
        })
        .silentRun();
    });
  });
});
