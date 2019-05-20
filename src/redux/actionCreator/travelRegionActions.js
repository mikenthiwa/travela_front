import { 
  ADD_REGION, 
  ADD_REGION_SUCCESS, 
  ADD_REGION_FAILURE, 
  GET_REGION, 
  GET_REGION_SUCCESS, 
  GET_REGION_FAILURE 
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
