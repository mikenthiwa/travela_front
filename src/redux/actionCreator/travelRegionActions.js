import {
  ADD_REGION,
  ADD_REGION_SUCCESS,
  ADD_REGION_FAILURE,
  GET_REGION,
  GET_REGION_SUCCESS,
  GET_REGION_FAILURE,
  EDIT_REGION,
  EDIT_REGION_SUCCESS,
  EDIT_REGION_FAILURE,
  DELETE_REGION,
  DELETE_REGION_SUCCESS,
  DELETE_REGION_FAILURE,
} from '../constants/actionTypes';

export const addRegion = regionData => ({
  type: ADD_REGION,
  regionData
});

export const addRegionSuccess = response => ({
  type: ADD_REGION_SUCCESS,
  response
});

export const addRegionFailure = error => ({
  type: ADD_REGION_FAILURE,
  error
});
export const fetchRegions = () => ({
  type: GET_REGION,
});

export const fetchRegionSuccess = response => ({
  type: GET_REGION_SUCCESS,
  response
});

export const fetchRegionFailure = error => ({
  type: GET_REGION_FAILURE,
  error
});

export const editRegion  = (body) => ({
  type: EDIT_REGION,
  body,
});

export const editRegionSuccess = (response) => ({
  type: EDIT_REGION_SUCCESS,
  response,
});

export const editRegionFailure = (error) => ({
  type: EDIT_REGION_FAILURE,
  error,
});

export const deleteRegion = (regionId) => ({
  type: DELETE_REGION,
  regionId,
});

export const deleteRegionSuccess = (regionId, deletedTravelRegion) => ({
  type: DELETE_REGION_SUCCESS,
  regionId,
  deletedTravelRegion,
});

export const deleteRegionFailure = (error) => ({
  type: DELETE_REGION_FAILURE,
  error,
});
