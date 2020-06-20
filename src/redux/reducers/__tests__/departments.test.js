import departmentReducer, { initialState } from '../departments';
import {
  addDepartment,
  addDepartmentSuccess,
  addDepartmentFailure,
  editDepartment,
  editDepartmentSuccess,
  editDepartmentFailure,
  getAllDepartments,
  getAllDepartmentsFailure,
  getAllDepartmentsSuccess,
  retrieveDepartmentFailure,
  retrieveDepartmentSuccess,
  retrieveDepartment,
  deleteDepartment,
  deleteDepartmentFailure,
  deleteDepartmentSuccess
} from '../../actionCreator/departmentActions';

const body = {
  id: 1,
  name: 'Engineering',
  parentDepartment: null,
};

const departments = [
  {
    id: 1,
    createdBy: 1,
    name: 'Engineering',
    parentDepartment: null,
  },
  {
    id: 2,
    createdBy: 1,
    name: 'Operations',
    parentDepartment: null,
  }
];


describe('Departments actions', () => {
  it('should return initial state', () => {
    expect(departmentReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ADD_DEPARTMENTS', () => {
    const action = addDepartment(body);
    const newState = departmentReducer(initialState, action);
    const expectedState = { ...initialState, isCreatingDepartment: true };
    expect(newState).toEqual(expectedState);
    expect(newState.isCreatingDepartment).toBe(true);
  });

  it('should handle ADD_DEPARTMENTS_SUCCESS'
    , () => {
      const state = {
        ...initialState,
        isCreatingDepartment: true,
        newDepartment: {
          ...body
        }
      };

      const action = addDepartmentSuccess(body);
      const newState = departmentReducer(state, action);
      const expectedState = { ...newState };
      expect(newState).toEqual(expectedState);
      expect(newState.isCreatingDepartment).toBe(false);
    });

  it('should handle ADD_DEPARTMENTS_FAILURE'
    , () => {
      const state = {
        ...initialState,
        isCreatingDepartment: false,
      };
      const errors = 'Error';
      const action = addDepartmentFailure(errors);
      const newState = departmentReducer(state, action);
      const expectedState = { ...state, errors };
      expect(newState).toEqual(expectedState);
      expect(newState.isCreatingDepartment).toBe(false);
    });

  it('should handle EDIT_DEPARTMENTS', () => {
    const state = { ...initialState};
    const action = editDepartment(1, body);
    const newState = departmentReducer(state, action);

    const expectedSate = {...state, isEditingDepartment: true, errors: {}};
    expect(newState).toEqual(expectedSate);
  });

  it('should handle RETRIEVE_DEPARTMENTS', () => {
    const state = {...initialState, departments };
    const action = retrieveDepartment(1);
    const newState = departmentReducer(state, action);

    expect(newState).toEqual({
      ...state,
      isRetrievingDepartment: true,
      singleDepartment: {}
    });
  });

  it('should handle EDIT_DEPARTMENTS_SUCCESS', () => {
    const state = {...initialState, departments};

    const department = {
      ...departments[0],
      parentDepartments: {
        id: departments[0].id,
        name: undefined
      }
    };
    const action = editDepartmentSuccess({department});
    const newState = departmentReducer(state, action);

    expect(newState).toEqual({
      ...state,
      isEditingDepartment: false,
      departments: [department, departments[1]],
    });
  });

  it('should handle EDIT_DEPARTMENTS_FAILURE', () => {
    const state = {...initialState};
    const action = editDepartmentFailure('Something went wrong');

    const newState = departmentReducer(state, action);
    expect(newState)
      .toEqual({
        ...state,
        errors: 'Something went wrong',
        isEditingDepartment: false
      });
  });

  it('should handle GET_ALL_DEPARTMENTS', () => {
    const action = getAllDepartments(body);
    const newState = departmentReducer(initialState, action);
    const expectedState = { ...initialState, isLoadingDepartment: true };
    expect(newState).toEqual(expectedState);
    expect(newState.isLoadingDepartment).toBe(true);
  });

  it('should handle GET_ALL_DEPARTMENTS_SUCCESS'
    , () => {
      const state = {
        ...initialState,
        isLoadingDepartment: true,
        departments
      };

      const response = {
        departments
      };

      const action = getAllDepartmentsSuccess(response);
      const newState = departmentReducer(state, action);
      const expectedState = { ...newState };
      expect(newState).toEqual(expectedState);
      expect(newState.isLoadingDepartment).toBe(false);
    });

  it('should handle GET_ALL_DEPARTMENTS_FAILURE'
    , () => {
      const state = {
        ...initialState,
        isLoadingDepartment: false,
      };
      const errors = undefined;
      const action = getAllDepartmentsFailure(errors);
      const newState = departmentReducer(state, action);
      const expectedState = { ...state, errors };
      expect(newState).toEqual(expectedState);
      expect(newState.isLoadingDepartment).toBe(false);
    });

  it('should handle RETRIEVE_DEPARTMENTS flow', () => {
    const state = {...initialState, departments };
    const action = retrieveDepartment(1);
    const newState = departmentReducer(state, action);

    expect(newState).toEqual({
      ...state,
      isRetrievingDepartment: true,
      singleDepartment: {}
    });
  });

  it('should handle RETRIEVE_DEPARTMENTS_SUCCESS'
    , () => {
      const state = {
        ...initialState,
        isRetrievingDepartment: true,
        departments
      };

      const action = retrieveDepartmentSuccess(departments[0]);
      const newState = departmentReducer(state, action);
      const expectedState = { ...newState };
      expect(newState).toEqual(expectedState);
      expect(newState.isRetrievingDepartment).toBe(false);
    });

  it('should handle RETRIEVE_DEPARTMENTS_FAILURE'
    , () => {
      const state = {
        ...initialState,
        isRetrievingDepartment: false,
      };
      const errors = undefined;
      const action = retrieveDepartmentFailure(errors);
      const newState = departmentReducer(state, action);
      const expectedState = { ...state, errors };
      expect(newState).toEqual(expectedState);
      expect(newState.isRetrievingDepartment).toBe(false);
    });

  it('should handle DELETE_DEPARTMENTS', () => {
    const state = {...initialState, departments };
    const action = deleteDepartment(1);
    const newState = departmentReducer(state, action);

    expect(newState).toEqual({
      ...state,
      error: {},
      isDeletingDepartment: true,
    });
  });

  it('should handle DELETE_DEPARTMENTS_SUCCESS'
    , () => {
      const state = {
        ...initialState,
        error: {},
        isDeletingDepartment: true,
        departments
      };

      const action = deleteDepartmentSuccess(departments);
      const newState = departmentReducer(state, action);
      const expectedState = { ...newState };
      expect(newState).toEqual(expectedState);
      expect(newState.isDeletingDepartment).toBe(false);
    });

  it('should handle DELETE_DEPARTMENTS_FAILURE'
    , () => {
      const state = {
        ...initialState,
        isDeletingDepartment: false,
        errors: undefined,
      };
      const error = undefined;
      const action = deleteDepartmentFailure(error);
      const newState = departmentReducer(state, action);
      const expectedState = { ...state, error };
      expect(newState).toEqual(expectedState);
      expect(newState.isDeletingDepartment).toBe(false);
    });
});
