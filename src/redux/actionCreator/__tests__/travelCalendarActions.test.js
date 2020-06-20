import {
  fetchCalendarAnalytics,
  fetchCalendarAnalyticsSuccess,
  fetchCalendarAnalyticsFailure,
  downloadCalendarAnalytics,
  downloadCalendarAnalyticsFailure
 } from '../travelCalendarActions';

describe('Travel Calendar Actions', ()=>{
  const resultsFactory=(type, payload)=>{
    return {
      type: type,
      ...payload
    }
  }

  const query = (type) => ({type:type, filter:''});
  const data = {};
  const error = '';

  it('should return type FETCH_CALENDAR_ANALYTICS', ()=>{
    const res = fetchCalendarAnalytics(query('json'));
    expect(res).toEqual(resultsFactory('FETCH_CALENDAR_ANALYTICS', {query:query('json')}));
  });
  it('should return type FETCH_CALENDAR_ANALYTICS_SUCCESS', ()=>{
    const res = fetchCalendarAnalyticsSuccess(data);
    expect(res).toEqual(resultsFactory('FETCH_CALENDAR_ANALYTICS_SUCCESS', {data}));
  });
  it('should return type FETCH_CALENDAR_ANALYTICS_FAILURE', ()=>{
    const res = fetchCalendarAnalyticsFailure(error);
    expect(res).toEqual(resultsFactory('FETCH_CALENDAR_ANALYTICS_FAILURE', {error}));
  });
  it('should return type DOWNLOAD_CALENDAR_ANALYTICS', ()=>{
    const res = downloadCalendarAnalytics(query('file'));
    expect(res).toEqual(resultsFactory('DOWNLOAD_CALENDAR_ANALYTICS', {query:query('file')}));
  });;
  it('should return type DOWNLOAD_CALENDAR_ANALYTICS_FAILURE', ()=>{
    const res = downloadCalendarAnalyticsFailure(error);
    expect(res).toEqual(resultsFactory('DOWNLOAD_CALENDAR_ANALYTICS_FAILURE', {error}));
  });
});