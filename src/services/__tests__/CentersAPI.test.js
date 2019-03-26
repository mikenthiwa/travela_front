import moxios from 'moxios';
import CentersAPI from '../CentersAPI';

const baseUrl = 'http://127.0.0.1:5000/api/v1';

const centersResponse = {
  centers: [{
    id: 1,
    location: 'Lagos, Nigeria'
  },
  {
    id: 2,
    location: 'Nairobi, Kenya'
  }]
};
describe('CentersAPI', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should send a get request to center api to retrieve centers records', async () => {
    moxios.stubRequest(`${baseUrl}/centers`, {
      status: 200,
      response: centersResponse
    });
    const response = await CentersAPI.fetchCenters();
    const request = (moxios.requests.mostRecent());
    expect(request.url).toEqual(`${baseUrl}/centers`);
    expect(request.config.method).toEqual('get');
    expect(response.data).toEqual(centersResponse);
  });
});
