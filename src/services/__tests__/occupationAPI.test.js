import moxios from 'moxios';
import OccupationAPI from '../OccupationAPI';
import { occupationResponses } from '../__mocks__/serviceMocks';
import expectedResponse from '../__mocks__/mocks';

const baseUrl = 'http://127.0.0.1:5000/api/v1';

describe('OccupationAPI', () => {
  beforeEach(() => {
    moxios.install();
  });
  
  afterEach(() => {
    moxios.uninstall();
  });
  
  it('should sends a GET request to get occupations ', async () => {
    moxios.stubRequest(`${baseUrl}/occupations`, {
      status: 200,
      response: { ...occupationResponses }
    });
    const response = await OccupationAPI.getOccupationData();
    const occupations = moxios.requests.mostRecent();
    expect(occupations.url).toEqual(`${baseUrl}/occupations`);
    expect(occupations.config.method).toEqual('get');
    expect(response.data).toEqual(occupationResponses);
  });
});
