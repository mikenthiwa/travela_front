// import * as actionTypes from '../../constants';
import userReducer from '../user';
import * as actionTypes from '../../constants/actionTypes';

const res = {
  success: true,
  message: 'data',
  result: {
    id: 1,
    fullName: 'captain america',
    email: 'captain.america@andela.com',
    userId: 'JFENDVNDK',
    createdAt: '2018-09-03T17:09:05.824Z',
    updatedAt: '2018-09-03T17:09:05.824Z',
    roleId: 401938,
    roles: [{
      roleName: 'Requester',
      description: 'Can make travel request'
    }]
  }
};

const user = {
  fullName: 'hulk smash',
  email: 'hulk.smash@andela.com',
  userId: '-121323'
};

const depart = [
  {
    'id': 8,
    'name': 'Success',
    'createdAt': '2019-03-25T15:50:11.090Z',
    'updatedAt': '2019-03-25T15:50:11.090Z'
  },
  {
    'id': 9,
    'name': 'Fellows-partner service',
    'createdAt': '2019-03-25T15:50:11.133Z',
    'updatedAt': '2019-03-25T15:50:11.133Z'
  }
];

describe('User Reducer', () => {
  const initialState = {
    postUserData: [],
    getUserData: {},
    currentUser: {},
    errors: {},
    getCurrentUserRole: [],
    isLoaded: false,
    getUsersEmail: [],
    departments: []
  };

  it('should return proper initial state', done => {
    expect(userReducer(undefined, {})).toEqual({ ...initialState, isUpdating: false });
    done();
  });

  it('dispatches action GET_ROLE_DATA', done => {
    const action = {
      type: actionTypes.GET_USER_DATA
    };
    const newState = userReducer(initialState, action);
    expect(newState).toEqual(initialState);
    done();
  });

  it('dispatches action GET_ROLE_DATA_SUCCESS:', done => {
    const action = {
      type: actionTypes.GET_USER_DATA_SUCCESS,
      response: res,
    };
    const newState = userReducer(initialState, action);
    expect(newState.getUserData).toEqual(res);
    done();
  });

  it('dispatches action GET_ROLE_DATA_FAILURE', done => {
    const action = {
      type: actionTypes.GET_USER_DATA_FAILURE,
      error: 'Possible network error, please reload the page'
    };
    const newState = userReducer(initialState, action);
    expect(newState.errors).toEqual(
      'Possible network error, please reload the page'
    );
    done();
  });

  it('dispatches action POST_USER_DATA', done => {
    const action = {
      type: actionTypes.POST_USER_DATA
    };
    const newState = userReducer(initialState, action);
    expect(newState).toEqual(initialState);
    done();
  });

  it('dispatches action POST_USER_DATA_SUCCESS', done => {
    const action = {
      type: actionTypes.POST_USER_DATA_SUCCESS,
      userData: user
    };
    const newState = userReducer(initialState, action);
    expect(newState.postUserData).toEqual(user);
    done();
  });

  it('dispatches action POST_USER_DATA_FAILURE', done => {
    const action = {
      type: actionTypes.POST_USER_DATA_FAILURE,
      error: 'Possible network error, please reload the page'
    };
    const newState = userReducer(initialState, action);
    expect(newState.errors).toEqual(
      'Possible network error, please reload the page'
    );
    done();
  });

  it('dispatches action GET_ALL_EMAILS', done => {
    const action = {
      type: actionTypes.GET_ALL_EMAILS
    };
    const newState = userReducer(initialState, action);
    expect(newState).toEqual(initialState);
    done();
  });

  it('dispatches action GET_ALL_EMAILS_SUCCESS', done => {
    const action = {
      type: actionTypes.GET_ALL_EMAILS_SUCCESS,
      response: user
    };
    const newState = userReducer(initialState, action);
    expect(newState.getUsersEmail).toEqual(user);
    done();
  });

  it('dispatches action GET_ALL_EMAILS_FAILURE', done => {
    const action = {
      type: actionTypes.GET_ALL_EMAILS_FAILURE,
      error: 'Possible network error, please reload the page'
    };
    const newState = userReducer(initialState, action);
    expect(newState.errors).toEqual(
      'Possible network error, please reload the page'
    );
    done();
  });

  it('dispatches action UPDATE_USER_PROFILE:', done => {
    const action = {
      type: actionTypes.UPDATE_USER_PROFILE
    };
    const newState = userReducer({ ...initialState, isUpdating: false }, action);
    expect(newState.isUpdating).toEqual(true);
    done();
  });

  it('dispatches action UPDATE_USER_PROFILE_SUCCESS', done => {
    const action = {
      type: actionTypes.UPDATE_PROFILE_SUCCESS,
      response: res,
    };
    const newState = userReducer({ ...initialState, isUpdating: false }, action);
    expect(newState.isUpdating).toEqual(false);
    done();
  });

  it('dispatches action GET_ALL_DEPARTMENT', done => {
    const action = {
      type: actionTypes.GET_ALL_DEPARTMENT
    };
    const newState = userReducer(initialState, action);
    expect(newState).toEqual(initialState);
    done();
  });

  it('dispatches action GET_ALL_DEPARTMENT_SUCCESS', done => {
    const action = {
      type: actionTypes.GET_ALL_DEPARTMENT_SUCCESS,
      response: depart
    };
    const newState = userReducer(initialState, action);
    expect(newState.departments).toEqual(depart);
    done();
  });

  it('dispatches action GET_ALL_DEPARTMENT_FAILURE', done => {
    const action = {
      type: actionTypes.GET_ALL_DEPARTMENT_FAILURE,
      error: 'Possible network error, please reload the page'
    };
    const newState = userReducer(initialState, action);
    expect(newState.errors).toEqual(
      'Possible network error, please reload the page'
    );
    done();
  });
});
