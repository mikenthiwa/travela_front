import { 
  ADD_RESOURCE, 
  ADD_RESOURCE_SUCCESS, 
  ADD_RESOURCE_FAILURE, 
  GET_RESOURCE, 
  GET_RESOURCE_SUCCESS, 
  GET_RESOURCE_FAILURE 
} from '../constants/actionTypes';

export const addResource = linkData => ({
  type: ADD_RESOURCE,
  linkData
});

export const addResourceSuccess = response => ({
  type: ADD_RESOURCE_SUCCESS,
  response
});

export const addResourceFailure = error => ({
  type: ADD_RESOURCE_FAILURE,
  error
});
export const fetchResources = () => ({
  type: GET_RESOURCE,
});

export const fetchResourceSuccess = response => ({
  type: GET_RESOURCE_SUCCESS,
  response
});

export const fetchResourceFailure = error => ({
  type: GET_RESOURCE_FAILURE,
  error
});
