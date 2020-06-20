import moxios from 'moxios';
import DocumentAPI from '../DocumentAPI';
import { resolveBaseUrl } from '../index';
import { updateDocument } from '../../redux/actionCreator/documentActions';
import { documentData } from '../../redux/__mocks__/documentMockData';

const baseUrl = resolveBaseUrl();

describe('DocumentsAPI', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('should send a DELETE request to delete a document', async () => {
    const documentId = '3';

    moxios.stubRequest(`${baseUrl}/documents/${documentId}`, {
      status: 200,
      response: 'Document deleted successfully'
    });

    const response = await DocumentAPI.deleteDocument(documentId);

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/documents/${documentId}`);
    expect(response.data).toEqual('Document deleted successfully');
  });

  it('should send a GET request to fetch user documents', async () => {

    moxios.stubRequest(`${baseUrl}/documents`, {
      status: 200,
      response: {
        documents: 'Successfully retrieved your documents'
      }
    });

    const response = await DocumentAPI.fetchDocuments();

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/documents`);
    expect(response.data).toEqual({
      documents: 'Successfully retrieved your documents'
    });
  });

  it('should send a PUT request to rename a user document', async () => {

    moxios.stubRequest(`${baseUrl}/documents/1`, {
      status: 200,
      response: {
        document: 'Document was renamed successfully'
      }
    });

    const response = await DocumentAPI.updateDocument('1', { name: 'Visa' });

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/documents/1`);
    expect(response.data).toEqual({
      document: 'Document was renamed successfully'
    });
  });
  it('should send a POST request to create a document', async () => {
    moxios.stubRequest(`${baseUrl}/documents`, {
      status: 201,
      response: {
        message: 'Document uploaded successfully',
      }
    });
    const response = await DocumentAPI.postDocument(documentData);
    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/documents`);
    expect(response.data).toEqual({
      message: 'Document uploaded successfully',
    });
  });

});
