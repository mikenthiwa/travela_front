import moxios from 'moxios';
import travelDynamiChecklistApi from '../travelDynamiChecklistApi';
import { resolveBaseUrl } from '../index';

const baseUrl = resolveBaseUrl();

describe('dyanamic checlist api', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('fetch all checklists', async () => {
    const response = {
      status: 200,
      response: {},
    };
    moxios.stubRequest(`${baseUrl}/dynamic/checklist`, response);

    const apiResponse = await travelDynamiChecklistApi.getAllDynamicChecklists();

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/dynamic/checklist`);
    expect(apiResponse.data).toEqual(response.response);
  });

  it('posts a checklist', async () => {
    const response = {
      status: 200,
      response: {
        documentType: {},
      },
    };
    moxios.stubRequest(`${baseUrl}/dynamic/checklist`, response);

    const apiResponse = await travelDynamiChecklistApi.createDynamicChecklist(response.response);

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/dynamic/checklist`);
    expect(apiResponse.data).toEqual(response.response);
  });

  it('gets a single checklist', async () => {
    const response = {
      status: 200,
      response: {},
    };
    moxios.stubRequest(`${baseUrl}/dynamic/checklist/checklistid`, response);

    const apiResponse = await travelDynamiChecklistApi.getSingleChecklist('checklistid');

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/dynamic/checklist/checklistid`);
    expect(apiResponse.data).toEqual(response.response);
  });

  it('delete a checklist', async () => {
    const response = {
      status: 200,
      response: {},
    };
    moxios.stubRequest(`${baseUrl}/dynamic/checklist/checklistid`, response);

    const apiResponse = await travelDynamiChecklistApi.deleteAChecklist('checklistid');

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/dynamic/checklist/checklistid`);
    expect(apiResponse.data).toEqual(response.response);
  });

  it('get one checklist', async () => {
    const response = {
      status: 200,
      response: {},
    };
    moxios.stubRequest(`${baseUrl}/dynamic/checklist/requests/checklistid`, response);

    const apiResponse = await travelDynamiChecklistApi.getOneChecklist('checklistid');

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/dynamic/checklist/requests/checklistid`);
    expect(apiResponse.data).toEqual(response.response);
  });

  it('get deleted checklists', async () => {
    const response = {
      status: 200,
      response: {},
    };
    moxios.stubRequest(`${baseUrl}/dynamic/checklist/deleted`, response);

    const apiResponse = await travelDynamiChecklistApi.deletedChecklists();

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/dynamic/checklist/deleted`);
    expect(apiResponse.data).toEqual(response.response);
  });

  it('get deleted checklists', async () => {
    const response = {
      status: 200,
      response: {},
    };
    moxios.stubRequest(`${baseUrl}/dynamic/checklist/restore`, response);

    const apiResponse = await travelDynamiChecklistApi.restoreAllChecklists();

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/dynamic/checklist/restore`);
    expect(apiResponse.data).toEqual(response.response);
  });

  it('restore a checklist', async () => {
    const response = {
      status: 200,
      response: {},
    };
    moxios.stubRequest(`${baseUrl}/dynamic/checklist/restore/checklistid`, response);

    const apiResponse = await travelDynamiChecklistApi.restoreAChecklist('checklistid');

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/dynamic/checklist/restore/checklistid`);
    expect(apiResponse.data).toEqual(response.response);
  });

  it('update a checklists', async () => {
    const response = {
      status: 200,
      response: {},
    };
    moxios.stubRequest(`${baseUrl}/dynamic/checklist/checklistid`, response);

    const apiResponse = await travelDynamiChecklistApi.updateChecklist('checklistid', {});

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/dynamic/checklist/checklistid`);
    expect(apiResponse.data).toEqual(response.response);
  });
});  
