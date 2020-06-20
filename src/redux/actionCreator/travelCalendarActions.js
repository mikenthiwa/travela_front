import {
  FETCH_CALENDAR_ANALYTICS,
  FETCH_CALENDAR_ANALYTICS_SUCCESS,
  FETCH_CALENDAR_ANALYTICS_FAILURE,
  DOWNLOAD_CALENDAR_ANALYTICS,
  DOWNLOAD_CALENDAR_ANALYTICS_FAILURE
} from '../constants/actionTypes';

export const fetchCalendarAnalytics = query => ({
  type: FETCH_CALENDAR_ANALYTICS,
  query
});

export const fetchCalendarAnalyticsSuccess = data => ({
  type: FETCH_CALENDAR_ANALYTICS_SUCCESS,
  data,
});

export const fetchCalendarAnalyticsFailure = error => ({
  type: FETCH_CALENDAR_ANALYTICS_FAILURE,
  error
});

export const downloadCalendarAnalytics = query => ({
  type: DOWNLOAD_CALENDAR_ANALYTICS,
  query
});

export const downloadCalendarAnalyticsFailure = error => ({
  type: DOWNLOAD_CALENDAR_ANALYTICS_FAILURE,
  error
});
