import {
  FETCH_ALL_EMAIL_TEMPLATES,
  FETCH_ALL_EMAIL_TEMPLATES_SUCCESS,
  FETCH_ALL_EMAIL_TEMPLATES_FAILURE
} from '../constants/actionTypes';

export const fetchAllEmailTemplates = url =>({
  type: FETCH_ALL_EMAIL_TEMPLATES,
  url
});

export const fetchAllEmailTemplatesSuccess = (response) => ({
  type: FETCH_ALL_EMAIL_TEMPLATES_SUCCESS,
  templates: response.templates,
  pagination: response.pagination
});

export const fetchAllEmailTemplatesFailure = (errors) => ({
  type: FETCH_ALL_EMAIL_TEMPLATES_FAILURE,
  errors
});
