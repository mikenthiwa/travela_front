import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';
import TravelCalendarAPI from '../../../services/TravelCalendarAPI';
import { watchFetchCalendarAnalytics, watchDownloadCalendarAnalytics } from '../travelCalendarSaga';
import { fetchTravelCalendarResponse } from '../../__mocks__/reduxMocks';
import {
  FETCH_CALENDAR_ANALYTICS_SUCCESS,
  FETCH_CALENDAR_ANALYTICS,
  FETCH_CALENDAR_ANALYTICS_FAILURE,
  DOWNLOAD_CALENDAR_ANALYTICS,
  DOWNLOAD_CALENDAR_ANALYTICS_FAILURE,
  DOWNLOAD_CALENDAR_ANALYTICS_SUCCESS
 } from '../../constants/actionTypes';
import CalendarAnalyticsAPI from '../../../services/TravelCalendarAPI';

const jsonQuery = {type:'json', filter:''};
const error = 'Possible network error, please reload the page';
const response = {
  data: {
    ...fetchTravelCalendarResponse
  }
};

describe('Travel Calendar Saga', () => {
  it('should fetch travel calendar analytics as json', () => {
    return expectSaga(watchFetchCalendarAnalytics, TravelCalendarAPI)
      .provide([
        [matchers.call.fn(TravelCalendarAPI.getCalendarAnalytics, jsonQuery), response]
      ])
      .put({
        type: FETCH_CALENDAR_ANALYTICS_SUCCESS,
        data: response.data
      })
      .dispatch({
        type: FETCH_CALENDAR_ANALYTICS,
        jsonQuery
      })
      .silentRun();
  });

  it('should throw an error if fetching travel calendar data fails', () => {
    return expectSaga(watchFetchCalendarAnalytics, TravelCalendarAPI)
      .provide([
        [matchers.call.fn(TravelCalendarAPI.getCalendarAnalytics, jsonQuery), throwError(error)]
      ])
      .put({
        type: FETCH_CALENDAR_ANALYTICS_FAILURE,
        error
      })
      .dispatch({
        type: FETCH_CALENDAR_ANALYTICS,
        jsonQuery
      })
      .silentRun();
  });

  it('should download travel calendar as file', () => {
      return expectSaga(watchDownloadCalendarAnalytics, CalendarAnalyticsAPI)
        .provide([[matchers.call.fn(CalendarAnalyticsAPI.getCalendarAnalytics, '?type=file'), response]])
        .dispatch({
          type: DOWNLOAD_CALENDAR_ANALYTICS,
          query: '?type=file'
        })
        .silentRun();
    });
  it('should throw an error when downloading travel calendar data fails', () => {
    expectSaga(watchDownloadCalendarAnalytics, TravelCalendarAPI)
      .provide([
        [matchers.call.fn(TravelCalendarAPI.getCalendarAnalytics, '?type=file'), throwError(error)]
      ])
      .put({
        type: DOWNLOAD_CALENDAR_ANALYTICS_FAILURE,
        error
      })
      .dispatch({
        type: DOWNLOAD_CALENDAR_ANALYTICS,
        query: '?type=file'
      })
      .run();
  });
});
