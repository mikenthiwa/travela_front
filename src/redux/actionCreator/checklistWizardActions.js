import {
  GET_ALL_DYNAMIC_CHECKLISTS,
  GET_ALL_DYNAMIC_CHECKLISTS_FAILURE,
  GET_ALL_DYNAMIC_CHECKLISTS_SUCCESS
} from '../constants/actionTypes';

export const getAllDynamicChecklists = () => ({
  type: GET_ALL_DYNAMIC_CHECKLISTS
});

export const getAllDynamicChecklistsSuccess = checklists => ({
  type: GET_ALL_DYNAMIC_CHECKLISTS_SUCCESS,
  checklists
});

export const getAllDynamicChecklistsFailure = error => ({
  type: GET_ALL_DYNAMIC_CHECKLISTS_FAILURE,
  error
});
