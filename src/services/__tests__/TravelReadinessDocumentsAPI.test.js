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
      users: [{id: 1}, {id: 2}],
      searchQuery: 'uchechukwu'
    };
    moxios.stubRequest(`${baseUrl}/travelreadiness/users?searchQuery=uchechukwu`, {
      status: 200,
      response: data,
    });

    const response = await TravelReadinessDocumentsAPI.getAllUsersReadiness('uchechukwu');

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/travelreadiness/users?searchQuery=uchechukwu`);
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

  it('should send a PUT request to verify a travel readiness document', async () => {
    const data = {
      message: 'Successfully verified document',
      success: true,
      updatedDocument: { id: 'xyz' }
    };
    moxios.stubRequest(`${baseUrl}/travelreadiness/documents/${data.updatedDocument.id}/verify`, {
      status: 200,
      response: data,
    });

    const response = await TravelReadinessDocumentsAPI.verifyTravelReadinessDocument('xyz');

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/travelreadiness/documents/xyz/verify`);
    expect(response.data).toEqual(data);
  });

  it('should send a PUT request to update a travel readiness document', async () => {
    const data = { message: 'Visa successfully update', success: true, updatedDocument: { id: 'xyz' } };
    moxios.stubRequest(
      `${baseUrl}/travelreadiness/documents/${data.updatedDocument.id}`,
      {
        status: 200,
        response: data
      }
    );
    const response = await TravelReadinessDocumentsAPI.editTravelReadinessDocument('visa', { id: 'xyz' }, 'xyz');

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/travelreadiness/documents/xyz`);
    expect(response.data).toEqual(data);
  });

  it('should send a DELETE request to delete a travel readiness document', async () => {
    const data = { message: 'Successfully deleted document', success: true, deletedDocument: { id: '7472wh' } };
    moxios.stubRequest(
      `${baseUrl}/travelreadiness/documents/${data.deletedDocument.id}`,
      {
        status: 200,
        response: data
      }
    );
    const response = await TravelReadinessDocumentsAPI.deleteTravelReadinessDocument('7472wh');

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/travelreadiness/documents/7472wh`);
    expect(response.data).toEqual(data);
  });
});
