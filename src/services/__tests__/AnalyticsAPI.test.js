import moxios from 'moxios';
import AnalyticsAPI from '../AnalyticsAPI';
import {
  fetchDepartmentsTripsResponse,
  fetchAnalyticsResponse
} from '../__mocks__/serviceMocks';

const baseUrl = 'http://127.0.0.1:5000/api/v1';

describe('Analytics API', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should make a get request to get trips department analytics', async () => {
    const date = new Date();
    const query = {
      filterBy: 'month',
      type: 'json',
      center: 'All Locations',
      firstDate: date.toISOString(),
      lastDate: new Date(date.getTime() + 86400000).toISOString()
    };

    moxios.stubRequest(`${baseUrl}/analytics/trips/departments?filterBy=${query.filterBy}&center=${
      query.center}&type=${query.type}&firstDate=${query.firstDate}&lastDate=${query.lastDate}`, {
      status: 200,
      response: fetchDepartmentsTripsResponse
    });

    const response = await AnalyticsAPI.getDepartmentTrips(query);

    expect(moxios.requests.mostRecent().url)
      .toEqual(`${baseUrl}/analytics/trips/departments?filterBy=${query.filterBy}&center=${
        query.center}&type=${query.type}&firstDate=${query.firstDate}&lastDate=${query.lastDate}`);
    expect(response.data).toEqual(fetchDepartmentsTripsResponse);
  });

  it('should make a get request to get analytics', async () => {
    const query = '?type=json';

    moxios.stubRequest(`${baseUrl}/analytics${query}`, {
      status: 200,
      response: fetchAnalyticsResponse
    });

    const response = await AnalyticsAPI.getAnalytics(query);

    expect(moxios.requests.mostRecent().url)
      .toEqual(`${baseUrl}/analytics${query}`);
    expect(response.data).toEqual(fetchAnalyticsResponse);
  });

  it('should make a export analytics', async () => {
    const query = '?type=file';

    moxios.stubRequest(`${baseUrl}/analytics${query}`, {
      status: 200,
      response: fetchAnalyticsResponse
    });

    const response = await AnalyticsAPI.exportAnalytics(query);

    expect(moxios.requests.mostRecent().url)
      .toEqual(`${baseUrl}/analytics${query}`);
    expect(response.data).toEqual(fetchAnalyticsResponse);
  });
});
