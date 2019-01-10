import moxios from 'moxios';
import TravelReadinessDocumentsAPI from '../TravelReadinessDocumentsAPI';
import { resolveBaseUrl } from '..';

const baseUrl = resolveBaseUrl();

describe('TravelReadinessDocumentsAPI', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should send a GET request to get all users/readiness documents', async () => {
    const data = {
      message: 'Fetched users successfully',
      success: true,
      users: [{id: 1}, {id: 2}]
    };
    moxios.stubRequest(`${baseUrl}/travelreadiness/users`, {
      status: 200,
      response: data,
    });

    const response = await TravelReadinessDocumentsAPI.getAllUsersReadiness();

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/travelreadiness/users`);
    expect(response.data).toEqual(data);
  });

  it('should send a GET request to get a users readiness documents', async () => {
    const data = {
      message: 'Fetched users successfully',
      success: true,
      users: {id: 1}
    };
    moxios.stubRequest(`${baseUrl}/travelreadiness/users/1`, {
      status: 200,
      response: data,
    });

    const response = await TravelReadinessDocumentsAPI.getUserReadiness(1);

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/travelreadiness/users/1`);
    expect(response.data).toEqual(data);
  });

  it('should send a GET request to get a readiness documents', async () => {
    const data = {
      message: 'Fetched users successfully',
      success: true,
      travelDocument: {id: 'xyz'}
    };
    moxios.stubRequest(`${baseUrl}/travelreadiness/documents/xyz`, {
      status: 200,
      response: data,
    });

    const response = await TravelReadinessDocumentsAPI.getTravelReadinessDocument('xyz');

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/travelreadiness/documents/xyz`);
    expect(response.data).toEqual(data);
  });
});