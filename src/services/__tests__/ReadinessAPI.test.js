import moxios from 'moxios';
import ReadinessAPI from '../ReadinessAPI';
import { fetchReadinessResponse } from '../__mocks__/serviceMocks';

const baseUrl = 'http://127.0.0.1:5000/api/v1';

describe('Readiness API', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should make a get request to get travel readiness', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1234567;
    const query = {
      page: '1',
      limit: '5',
      type: 'json',
      travelFlow: 'inflow',
      range: { start: '2018-05-20', end: '2018-07-22'},
      center: 'Kenya'
    };
    moxios.stubRequest(
      `${baseUrl}/analytics/readiness?page=${query.page}&limit=${
        query.limit
      }&type=${query.type}&travelFlow=${query.travelFlow}&dateFrom=${query.range.start}&dateTo=${
        query.range.end}&center=${query.center}`,
      {
        status: 200,
        response: fetchReadinessResponse
      }
    );
    const response = await ReadinessAPI.getTravelReadiness(query);
    expect(moxios.requests.mostRecent().url).toEqual(
      `${baseUrl}/analytics/readiness?page=${query.page}&limit=${
        query.limit
      }&type=${query.type}&travelFlow=${query.travelFlow}&dateFrom=${query.range.start}&dateTo=${
        query.range.end}&center=${query.center}`
    );
    expect(response.data).toEqual(fetchReadinessResponse);
  });
  it('should make a get request to export travel readiness', async () => {
    const query = {
      type: 'file',
      travelFlow: 'inflow',
      range: { start: '2018-05-20', end: '2018-07-22'}
    };
    moxios.stubRequest(
      `${baseUrl}/analytics/readiness?type=${
        query.type}&travelFlow=${query.travelFlow}&dateFrom=${query.range.start}&dateTo=${query.range.end}`,
      {
        status: 200,
      }
    );
    const response = await ReadinessAPI.exportTravelReadiness(query);
    expect(moxios.requests.mostRecent().url).toEqual(
      `${baseUrl}/analytics/readiness?type=${query.type}&travelFlow=${
        query.travelFlow}&dateFrom=${query.range.start}&dateTo=${query.range.end}`
    );
    expect(response.status).toEqual(200);
  });

  it('should create a passport', async () => {
    const passportData = {};

    moxios.stubRequest(`${baseUrl}/travelreadiness`, {
      status: 201
    });

    const response = await ReadinessAPI.createDocument('passport', passportData);
    expect(moxios.requests.mostRecent().url).toEqual(
      `${baseUrl}/travelreadiness`
    );
    expect(response.status).toEqual(201);
  });
});
