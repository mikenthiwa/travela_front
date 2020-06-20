import {
  FETCH_ANALYTICS,
  FETCH_ANALYTICS_SUCCESS,
  FETCH_ANALYTICS_FAILURE,
  DOWNLOAD_ANALYTICS,
  DOWNLOAD_ANALYTICS_FAILURE
} from '../constants/actionTypes';

export const fetchAnalytics = query => ({
  type: FETCH_ANALYTICS,
  query
});

export const fetchAnalyticsSuccess = payload => ({
  type: FETCH_ANALYTICS_SUCCESS,
  payload
});

export const fetchAnalyticsFailure = error => ({
  type: FETCH_ANALYTICS_FAILURE,
  error
});

//DOWNLOAD
export const downloadAnalytics = query => ({
  type: DOWNLOAD_ANALYTICS,
  query
});

export const downloadAnalyticsFailure = error => ({
  type: DOWNLOAD_ANALYTICS_FAILURE,
  error
});
