import axios from 'axios';
import {resolveBaseUrl} from '.';

const baseUrl = resolveBaseUrl();

class CalendarAnalyticsAPI{
  static getCalendarAnalytics = (query)=>{
    const limit = 3;
    const {filter, page, type, history} = query;
    const locationUrl = new URLSearchParams(history.location.search);
    const selectedCenter = locationUrl.get('center');
    const center = !selectedCenter ? 'All Locations' : selectedCenter;
    const responseType = (type === 'file') ? 'blob' : 'json';
    return axios.get(`${baseUrl}/analytics/calendar?type=${type}&location=${center}&${filter
    }&limit=${limit}&page=${page}`, {
      responseType
    });
  }
}

export default CalendarAnalyticsAPI;
