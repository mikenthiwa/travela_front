import moxios from 'moxios';
import TripModificationsAPI from '../TripModificationsAPI';
import {resolveBaseUrl} from '../index';

const baseUrl = resolveBaseUrl();

describe('TripModificationsAPI', () => {


  const requestId = 'jkljasd';
  const modification = {
    id: 1,
    requestId,
    type: 'Cancel Trip',
    status: 'Open'
  };

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should make a successful submit request', async () => {
    moxios.stubRequest(`${baseUrl}/requests/${requestId}/modifications`, {
      status: 200,
      response: {
        success: true,
        message: 'Trip modification created successfully',
        modification
      }
    });

    const response = await TripModificationsAPI.submitModificationRequest(
      requestId, 'Cancel Trip', 'some reason'
    );
    expect(response.data).toMatchObject({
      success: true,
      modification
    });
  });

  it('should fetch modification for a specific request', async () => {
    moxios.stubRequest(`${baseUrl}/requests/${requestId}/modifications`, {
      status: 200,
      response: {
        success: true,
        pendingModification: modification,
        pastModifications: []
      }
    });

    const response = await TripModificationsAPI.getModificationForRequest(requestId);
    expect(response.data).toMatchObject({
      success: true,
      pendingModification: modification
    });
  });

  it('should get all modifications', async () => {
    const query = '?type=Cancel Trip';
    moxios.stubRequest(`${baseUrl}/tripModifications${query}`, {
      status: 200,
      response: {
        success: true,
        modifications: [
          modification
        ]
      }
    });

    const response = await TripModificationsAPI.getModifications(query);
    expect(response.data).toMatchObject({
      success: true,
      modifications: [
        modification
      ]
    });
  });

  it('should update the current modification', async () => {
    moxios.stubRequest(`${baseUrl}/requests/modifications/${modification.id}`, {
      status: 200,
      response: {
        success: true,
        modification
      }
    });

    const response = await TripModificationsAPI.updateModification(modification.id, 'Approved');
    expect(response.data).toMatchObject({
      success: true,
      modification
    });
  });

});
