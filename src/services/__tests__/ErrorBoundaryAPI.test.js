import moxios from 'moxios';
import {resolveBaseUrl} from '../index';
import ErrorBoundaryAPI from '../ErrorBoundaryAPI';

const baseUrl = resolveBaseUrl();

describe('ErrorBoundaryAPI', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should make an api call to the backend', async () => {

    moxios.stubRequest(`${baseUrl}/errorBoundary`, {
      status: 200,
      response: {
        message: 'Crash reported successfully'
      }
    });

    const response = await ErrorBoundaryAPI.postCrash({});

    expect(response.data).toMatchObject({
      message: 'Crash reported successfully'
    });
  });
});
