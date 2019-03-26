import roleReducer from '../role';
import * as actionTypes from '../../constants/actionTypes';
import {
  deleteUserRole,
  deleteUserRoleFailure,
  deleteUserRoleSuccess,
  showDeleteRoleModal,
  hideDeleteRoleModal
} from '../../actionCreator/roleActions';
import { fetchRoleUsersResponse } from '../../__mocks__/reduxMocks';
import { travelTeamMembersMockData } from '../../__mocks__/role';

const res = {
  message: 'data',
  result: [
    {
      createdAt: '2018-08-16T11:11:52.181Z',
      description: 'Can perform all task on travela',
      id: 10948,
      roleName: 'Super Administrator',
      updatedAt: '2018-08-16T11:11:52.181Z',
      users: [
        {
          email: 'taiwo.sunday@andela.com'
        }
      ]
    },
    {
      createdAt: '2018-08-16T11:11:52.181Z',
      description: 'Can view and approve all request on  travela',
      id: 29187,
      roleName: 'Travel Administrator',
      updatedAt: '2018-08-16T11:11:52.181Z',
      users: []
    }
  ]
};

const newRole = {
  roleName: 'Some role',
  description: 'A new role'
}

const role = {
  email: 'hulk.smash@andela.com',
  roleName: 'Super Admin'
};

describe('Role Reducer', () => {
  const initialState = {
    putRoleData: [],
    getRole: {},
    isLoading: false,
    roleErrors: '',
    roleMessage: '',
    deleteModalState: 'invisible',
    deleteModalRoleId: '',
    roleUsers: [],
    meta: {},
    roles: [],
    role: {}
  };

  it('should return proper initial state', done => {
    expect(roleReducer(undefined, {})).toEqual(initialState);
    done();
  });

  it('dispatches action GET_ROLE_DATA', done => {
    const action = {
      type: actionTypes.GET_ROLE_DATA
    };
    const newState = roleReducer(initialState, action);
    expect(newState.isLoading).toEqual(true);
    done();
  });

  it('dispatches action GET_ROLE_DATA_SUCCESS:', done => {
    const action = {
      type: actionTypes.GET_ROLE_DATA_SUCCESS,
      response: res
    };
    const newState = roleReducer(initialState, action);
    expect(newState.roles).toEqual(res.result);
    done();
  });

  it('dispatches action GET_ROLE_DATA_FAILURE', done => {
    const action = {
      type: actionTypes.GET_ROLE_DATA_FAILURE,
      error: 'Possible network error, please reload the page'
    };
    const newState = roleReducer(initialState, action);
    expect(newState.isLoading).toEqual(false);
    expect(newState.roleErrors).toEqual(
      'Possible network error, please reload the page'
    );
    done();
  });

  it('dispatches action PUT_ROLE_DATA', done => {
    const action = {
      type: actionTypes.PUT_ROLE_DATA
    };
    const newState = roleReducer(initialState, action);
    expect(newState.updatingRole).toEqual(true);
    done();
  });

  it('dispatches action PUT_ROLE_DATA_SUCCESS to update role:', done => {
    const action = {
      type: actionTypes.PUT_ROLE_DATA_SUCCESS,
      roleData: role
    };
    const newState = roleReducer(initialState, action);
    expect(newState.putRoleData).toEqual(role);
    done();
  });

  it('dispatches action PUT_ROLE_DATA_FAILURE', done => {
    const action = {
      type: actionTypes.PUT_ROLE_DATA_FAILURE,
      error: 'Possible network error, please reload the page'
    };
    const newState = roleReducer(initialState, action);
    expect(newState.updatingRole).toEqual(false);
    expect(newState.roleErrors).toEqual(
      'Possible network error, please reload the page'
    );
    done();
  });

  it('should handle delete travel team member', (done) => {
    const action = deleteUserRole(1, 2);
    const newState = roleReducer(initialState, action);
    expect(newState.isLoading).toBe(true);
    done();
  });

  it('should delete travel team member on success', (done) => {
    const currentState = {
      ...initialState,
      isLoading: true,
      roleUsers: travelTeamMembersMockData
    };
    const action = deleteUserRoleSuccess('Delete Successful', 2);
    const newState = roleReducer(currentState, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.roleUsers.length).toEqual(1);
    expect(newState.roleMessage).toEqual('Delete Successful');
    done();
  });

  it('should handle delete travel team member failure', (done) => {
    const currentState = {
      ...initialState,
      isLoading: true,
      roleUsers: travelTeamMembersMockData
    };
    const action = deleteUserRoleFailure('Server Error');
    const newState = roleReducer(currentState, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.roleUsers.length).toEqual(2);
    expect(newState.roleErrors).toEqual('Server Error');
    done();
  });

  it('should should update `deleteModalState` to `visible`', (done) => {
    const action = showDeleteRoleModal(1);
    const newState = roleReducer(initialState, action);
    expect(newState.deleteModalState).toBe('visible');
    expect(newState.deleteModalRoleId).toEqual(1);
    done();
  });

  it('should should update `deleteModalState` to `invisible`', (done) => {
    const currentState = {
      ...initialState,
      deleteModalState: 'visible',
      deleteModalRoleId: 1
    };
    const action = hideDeleteRoleModal();
    const newState = roleReducer(currentState, action);
    expect(newState.deleteModalRoleId).toBe('');
    expect(newState.deleteModalState).toEqual('invisible');
    done();
  });
  describe('Fetch role  Reducer', () => {
    const initialState = {};

    it('returns the correct state for FETCH_ROLE_USERS action', () => {
      const action = {
        type: actionTypes.FETCH_ROLE_USERS,
        roleId: 53098
      };
      expect(roleReducer(initialState, action)).toEqual({
        isFetching: true,
        roleName: '',
        roleUsers: []
      });
    });

    it('returns the correct state for FETCH_ROLE_USERS_SUCCESS action', () => {
      const action = {
        type: actionTypes.FETCH_ROLE_USERS_SUCCESS,
        roleName: fetchRoleUsersResponse.roleName,
        users: fetchRoleUsersResponse.users
      };
      expect(roleReducer(initialState, action)).toEqual({
        isFetching: false,
        roleUsers: fetchRoleUsersResponse.users,
        roleName: 'Manager',
        error: ''
      });
    });

    it('returns the correct state for FETCH_ROLE_USERS_FAILURE action', () => {
      const initialState = {};
      const action = {
        type: actionTypes.FETCH_ROLE_USERS_FAILURE,
        error: 'An error occurred'
      };
      expect(roleReducer(initialState, action)).toEqual({
        isFetching: false,
        error: 'An error occurred'
      });
    });
  });

  describe('Add role  Reducer', () => {
    const initialState = {
      roles: []
    };

    it('returns the correct state for ADD_ROLE action', () => {
      const action = {
        type: actionTypes.ADD_ROLE,
        roleData: newRole
      };
      expect(roleReducer(initialState, action)).toEqual({
        isAddingRole: true,
        roles: []
      });
    });

    it('returns the correct state for ADD_ROLE_SUCCESS action', () => {
      const action = {
        type: actionTypes.ADD_ROLE_SUCCESS,
        role: newRole
      };
      expect(roleReducer(initialState, action)).toEqual({
        isAddingRole: false,
        roles:  [newRole]
      });
    });

    it('returns the correct state for ADD_ROLE_FAILURE action', () => {
      const action = {
        type: actionTypes.ADD_ROLE_FAILURE,
        error: 'An error occurred'
      };
      expect(roleReducer(initialState, action)).toEqual({
        isAddingRole: false,
        error: 'An error occurred',
        roles: []
      });
    });
  });

  describe('Update role reducer', () => {

    it('should return correct state for UPDATE_ROLE action', () => {
      const action = {
        type: actionTypes.UPDATE_ROLE,
        newRoleData: newRole,
        isLoading: true
      };
      const newState = roleReducer(initialState, action)
      expect(newState.isLoading).toEqual(true);
    });

    it('should return correct state for UPDATE_ROLE_SUCCESS', () => {
      const action = {
        type: actionTypes.UPDATE_ROLE_SUCCESS,
        role: newRole
      };
      const newState = roleReducer(initialState, action);
      expect(newState.role).toEqual(newRole);
      expect(newState.isLoading).toEqual(false);
    });

    it('should return correct state for UPDATE_ROLE_FAILURE', () => {
      const action = {
        type: actionTypes.UPDATE_ROLE_FAILURE,
        error: 'An error occurred'
      };
      const newState = roleReducer(initialState, action);
      expect(newState.isLoading).toEqual(false);
      expect(newState.error).toEqual('An error occurred');
    });
  });

  describe('Update budget checer reducer', () => {

    it('should return correct state for UPDATE_BUDGET_CHECKER action', () => {
      const action = {
        type: actionTypes.UPDATE_BUDGET_CHECKER,
        newRoleData: newRole,
      };
      const newState = roleReducer(initialState, action)
      expect(newState.isUpdating).toEqual(true);
    });

    it('should return correct state for UPDATE_BUDGET_CHECKER_SUCCESS', () => {
      const action = {
        type: actionTypes.UPDATE_BUDGET_CHECKER_SUCCESS,
        userDetail: {
          user: {
            email: 'test.andela.com',
            fullName: 'tester',
            budgetCheckerDepartments: [{
              name: 'Fellow-partner service'
            }]
          }
        }
      };
      const newState = roleReducer(initialState, action);
      expect(newState.userDetail).toEqual(action.userDetail);
      expect(newState.isUpdating).toEqual(false);
    });

    it('should return correct state for UPDATE_BUDGET_CHECKER_FAILURE', () => {
      const action = {
        type: actionTypes.UPDATE_BUDGET_CHECKER_FAILURE,
        error: 'An error occurred'
      };
      const newState = roleReducer(initialState, action);
      expect(newState.isUpdating).toEqual(false);
      expect(newState.updateError).toEqual('An error occurred');
    });
  });
});
