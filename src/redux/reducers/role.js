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
  HIDE_DELETE_ROLE_MODAL,
  SHOW_DELETE_ROLE_MODAL,
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


const initialState = {
  putRoleData: [],
  isLoading: false,
  getRole: {},
  roleErrors: '',
  deleteModalState: 'invisible',
  deleteModalRoleId: '',
  roleMessage: '',
  roleUsers: [],
  meta: {},
  roles: [],
  role: {}
};

const role = (state = initialState, action) => {
  switch (action.type) {
  case GET_ROLE_DATA:
    return { ...state, isLoading: true };
  case GET_ROLE_DATA_SUCCESS:
    return { ...state, roles: action.response.result, isLoading: false };
  case GET_ROLE_DATA_FAILURE:
    return { ...state, isLoading: false, roleErrors: action.error };
  case PUT_ROLE_DATA:
    return { ...state, updatingRole: true };
  case PUT_ROLE_DATA_SUCCESS:
    return { ...state, putRoleData: action.roleData, updatingRole: false };
  case PUT_ROLE_DATA_FAILURE:
    return { ...state, updatingRole: false,
      putRoleData: action.response, roleErrors: action.error };
  case FETCH_ROLE_USERS:
    return {
      ...state,
      isFetching: true,
      roleName: '',
      roleUsers: []
    };
  case FETCH_ROLE_USERS_SUCCESS:
    return {
      ...state,
      isFetching: false,
      roleUsers: action.users,
      roleName: action.roleName ,
      meta: action.meta,
      error: ''
    };
  case FETCH_ROLE_USERS_FAILURE:
    return { ...state, isFetching: false, error: action.error };
  case DELETE_USER_ROLE:
    return { ...state, isLoading: true };
  case DELETE_USER_ROLE_SUCCESS:
    return {
      ...state,
      isLoading: false,
      roleMessage: action.message,
      roleErrors: '',
      roleUsers: [...state.roleUsers]
        .filter(user => user.id !== action.userId),
    };
  case DELETE_USER_ROLE_FAILURE:
    return {
      ...state,
      isLoading: false,
      roleErrors: action.error,
      message: '',
    };
  case SHOW_DELETE_ROLE_MODAL:
    return { ...state, deleteModalState: 'visible', deleteModalRoleId: action.roleId};
  case HIDE_DELETE_ROLE_MODAL:
    return { ...state, deleteModalState: 'invisible', deleteModalRoleId: ''};
  case ADD_ROLE:
    return {
      ...state,
      isAddingRole: true,
    };
  case ADD_ROLE_SUCCESS:
    return {
      ...state,
      isAddingRole: false,
      roles: [action.role, ...state.roles]
    };
  case ADD_ROLE_FAILURE:
    return {
      ...state,
      isAddingRole: false,
      error: action.error
    };
  case UPDATE_ROLE:
    return { ...state, isLoading: true };
  case UPDATE_ROLE_SUCCESS:
    return {
      ...state,
      isLoading: false,
      role: action.role,
    };
  case UPDATE_ROLE_FAILURE:
    return {
      ...state,
      isLoading: false,
      error: action.error
    };
  case UPDATE_BUDGET_CHECKER:
    return { ...state, isUpdating: true };
  case UPDATE_BUDGET_CHECKER_SUCCESS:
    return {
      ...state,
      isUpdating: false,
      userDetail: action.userDetail,
    };
  case UPDATE_BUDGET_CHECKER_FAILURE:
    return {
      ...state,
      isUpdating: false,
      updateError: action.error
    };
  default: return state;
  }
};

export default role;
