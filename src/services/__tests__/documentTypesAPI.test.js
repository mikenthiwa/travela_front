import moxios from 'moxios';
import DocumentTypesAPI from '../DocumentTypesAPI';
import { resolveBaseUrl } from '../index';

const baseUrl = resolveBaseUrl();

describe('EmailReminderAPI', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('fetch all document types', async () => {
    const response = {
      status: 200,
      response: {
        documentTypes: [{ id: 'id', name: 'type' }],
      },
    };
    moxios.stubRequest(`${baseUrl}/documents/types`, response);

    const apiResponse = await DocumentTypesAPI.fetchDocumentTypes();

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/documents/types`);
    expect(apiResponse.data).toEqual(response.response);
  });

  it('edit a document type', async () => {
    const response = {
      status: 200,
      response: {
        documentType: { id: 'id', name: 'type' },
      },
    };
    moxios.stubRequest(`${baseUrl}/documents/types`, response);

    const apiResponse = await DocumentTypesAPI.editDocumentType({ id: 'id', name: 'type' });

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/documents/types`);
    expect(apiResponse.data).toEqual(response.response);
  });

  it('create a document type', async () => {
    const response = {
      status: 200,
      response: {
        documentType: { id: 'id', name: 'type' },
      },
    };
    moxios.stubRequest(`${baseUrl}/documents/types`, response);

    const apiResponse = await DocumentTypesAPI.postDocumentType({ name: 'type' });

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/documents/types`);
    expect(apiResponse.data).toEqual(response.response);
  });

  it('delete a document type', async () => {
    const response = {
      status: 200,
      response: {
        message: 'successful',
      },
    };
    moxios.stubRequest(`${baseUrl}/documents/types/delete/type`, response);

    const apiResponse = await DocumentTypesAPI.deleteDocumentType('type');

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/documents/types/delete/type`);
    expect(apiResponse.data).toEqual(response.response);
  });
});  
