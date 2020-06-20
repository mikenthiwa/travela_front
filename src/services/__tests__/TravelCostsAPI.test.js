import moxios from 'moxios';
import TravelCostsAPI from '../TravelCostsAPI';
import RequestAPI from '../RequestAPI';

describe('TravelCostsAPI', () => {
  const baseUrl = 'http://127.0.0.1:5000/api/v1';
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('sends a GET request to the API', async () => {
    moxios.stubRequest(`${baseUrl}/travelCosts`, { status: 200 });
    const response = await TravelCostsAPI.getTravelCostsByLocation(
      { origin: 'Lagos, Portugal', destination: 'Lagos, Nigeria' }
    );
    const stipends = moxios.requests.mostRecent();
    expect(stipends.url).toEqual(`${baseUrl}/travelCosts`);
    expect(stipends.config.method).toEqual('get');
    expect(response.status).toEqual(200);
  });
});
