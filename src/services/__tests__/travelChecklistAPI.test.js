import moxios from 'moxios';
import TravelChecklistAPI from '../travelChecklistAPI';
import { resolveBaseUrl } from '../index';

const baseUrl = resolveBaseUrl();

describe('TravelChecklistAPI', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should send `GET` request to fetch travelChecklists', async () => {
    moxios.stubRequest(`${baseUrl}/checklists`, {
      status: 200,
      response: { travelChecklists: [] }
    });

    const response = await TravelChecklistAPI.getAllChecklists();
    const request = moxios.requests.mostRecent();
    expect(request.url)
      .toEqual(`${baseUrl}/checklists`);
    expect(request.config.method).toEqual('get');
    expect(response.status).toEqual(200);
    expect(response.data)
      .toEqual({ travelChecklists: [] });
  });

  it(`should send 'GET' request to
    fetch travelChecklists for specified requestId`, async () => {
    moxios.stubRequest(`${baseUrl}/checklists?requestId=request-test-id`, {
      status: 200,
      response: { travelChecklists: [] }
    });

    const response = await TravelChecklistAPI
      .getAllChecklists('request-test-id', null);
    const request = moxios.requests.mostRecent();
    expect(request.url)
      .toEqual(`${baseUrl}/checklists?requestId=request-test-id`);
    expect(request.config.method).toEqual('get');
    expect(response.status).toEqual(200);
    expect(response.data)
      .toEqual({ travelChecklists: [] });
  });

  it('should send a delete request to delete a travelchecklist item with reason', async () => {
    const checklistItemId = '3';
    const data = {
      deleteReason: 'No longer applicable'
    };

    moxios.stubRequest(`${baseUrl}/checklists/${checklistItemId}`, {
      status: 200,
      response: 'Checklist item deleted successfully'
    });

    const response = await TravelChecklistAPI.deleteChecklistItem({checklistItemId, data});

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/checklists/${checklistItemId}`);
    expect(response.data).toEqual('Checklist item deleted successfully');
  });

  it('should send a PUT request to update checklist item', async () => {
    const checklistItemData = {
      name: 'Travel Visa',
      requireFiles: true,
    };
    const checklistItemId = 'Er4HTD2xz';

    moxios.stubRequest(`${baseUrl}/checklists/${checklistItemId}`, {
      status: 200,
      response: {
        message: 'Checklist item sucessfully updated',
      }
    });

    const response = await TravelChecklistAPI.updateChecklistItem(checklistItemId, checklistItemData);

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/checklists/${checklistItemId}`);
    expect(response.data).toEqual({
      message: 'Checklist item sucessfully updated',
    });
  });

  it('should send a POST request to create a checklist item', async () => {
    const checklistItemData = {
      name: 'Travel Visa',
      requireFiles: true,
    };

    moxios.stubRequest(`${baseUrl}/checklists`, {
      status: 201,
      response: {
        message: 'Checklist item created sucessfully',
      }
    });

    const response = await TravelChecklistAPI.createChecklist(checklistItemData);

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/checklists`);
    expect(response.data).toEqual({
      message: 'Checklist item created sucessfully',
    });
  });

  it('should send a GET request to fetch a checklist item by destinationName', async () => {
    moxios.stubRequest(`${baseUrl}/checklists?destinationName=Nairobi`, {
      status: 200,
      response: { travelChecklists: [] }
    });

    const response = await TravelChecklistAPI.getAllChecklists(null, 'Nairobi');

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/checklists?destinationName=Nairobi`);
    expect(response.status).toEqual(200);
    expect(response.data)
      .toEqual({ travelChecklists: [] });
  });

  it('should send `GET` request to fetch deleted checklist items', async () => {
    moxios.stubRequest(`${baseUrl}/checklists/deleted?destinationName=Nairobi`, {
      status: 200,
      response: { deletedTravelChecklists: [] }
    });

    const response = await TravelChecklistAPI.getDeletedCheckListItems('Nairobi');
    const request = moxios.requests.mostRecent();
    expect(request.url)
      .toEqual(`${baseUrl}/checklists/deleted?destinationName=Nairobi`);
    expect(request.config.method).toEqual('get');
    expect(response.status).toEqual(200);
    expect(response.data)
      .toEqual({ deletedTravelChecklists: [] });
  });
});
