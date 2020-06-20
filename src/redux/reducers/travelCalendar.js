import {
  FETCH_CALENDAR_ANALYTICS,
  FETCH_CALENDAR_ANALYTICS_SUCCESS,
  FETCH_CALENDAR_ANALYTICS_FAILURE,
  DOWNLOAD_CALENDAR_ANALYTICS_FAILURE
} from '../constants/actionTypes';

const initialState = {
  isLoading: false,
  travelCalendarData: {data:[], pagination:{}},
  travelCalendarError: ''
};

const travelCalendar= (state = initialState, action) => {
  switch(action.type){
  case FETCH_CALENDAR_ANALYTICS:
    return {
      ...state, isLoading: true
    };
  case FETCH_CALENDAR_ANALYTICS_SUCCESS:
    return {
      ...state,
      isLoading: false,
      travelCalendarData: action.data,
      travelCalendarError: ''
    };
  case FETCH_CALENDAR_ANALYTICS_FAILURE:
    return {
      ...state,
      isLoading: false,
      travelCalendarData: {data:[], pagination:{}},
      travelCalendarError: action.error
    };
  case DOWNLOAD_CALENDAR_ANALYTICS_FAILURE:
    return {
      ...state,
      downloadError: action.error
    };
  default:
    return state;
  }
};

export default travelCalendar;
