import travelCalendarReducer from '../travelCalendar';
import {
  FETCH_CALENDAR_ANALYTICS,
  FETCH_CALENDAR_ANALYTICS_SUCCESS,
  FETCH_CALENDAR_ANALYTICS_FAILURE,
  DOWNLOAD_CALENDAR_ANALYTICS_FAILURE
} from '../../constants/actionTypes';
import { fetchTravelCalendarResponse } from '../../__mocks__/reduxMocks'



describe('Travel Calendar Reducer', ()=>{
  const initialState = {
    isLoading: false,
    travelCalendarData: {data:[], pagination:{}},
    travelCalendarError: ''
  };

  it('should return empty object as initial state', () => {
    expect(travelCalendarReducer(undefined, {})).toEqual(initialState);
  });

  it('should update isLoading to true', () => {
    const action = {
      type: FETCH_CALENDAR_ANALYTICS
    };
    expect(travelCalendarReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('should update isLoading to false and the store with Travel calendar data', () => {
    const action = {
      type: FETCH_CALENDAR_ANALYTICS_SUCCESS,
      data: fetchTravelCalendarResponse
    };
    expect(travelCalendarReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      travelCalendarData: fetchTravelCalendarResponse
    });
  });

  it('should update isLoading to false and the store with error message ', () => {
    const action = {
      type: FETCH_CALENDAR_ANALYTICS_FAILURE,
      error: 'Possible network error, please reload the page'
    };
    expect(travelCalendarReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      travelCalendarError: 'Possible network error, please reload the page'
    });
  });

  it('should update isDownloading to false and the store with error message ', () => {
    const action = {
      type: DOWNLOAD_CALENDAR_ANALYTICS_FAILURE,
      error: 'Download Unsuccessful'
    };
    expect(travelCalendarReducer(initialState, action)).toEqual({
      ...initialState,
      downloadError: 'Download Unsuccessful'
    });
  });
});
