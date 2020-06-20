import moxios from 'moxios';
import TravelStipendsAPI from '../TravelStipendsAPI';
import RequestAPI from '../RequestAPI';

describe('TravelStipendsAPI', () => {
  const baseUrl = 'http://127.0.0.1:5000/api/v1';
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('sends a request to the API',  async () => {
    moxios.stubRequest(`${baseUrl}/travelStipend`, { status: 200});
    const response = await TravelStipendsAPI. getAllTravelStipends();
    const stipends = moxios.requests.mostRecent();
    expect(stipends.url).toEqual(`${baseUrl}/travelStipend`);
    expect(stipends.config.method).toEqual('get');
    expect(response.status).toEqual(200);
  });

  it('should send a DELETE request to the API', async () => {
    const stipendId = '1';
    moxios.stubRequest(`${baseUrl}/travelStipend/${stipendId}`, {
      status: 200,
      response: {
        message: 'Travel stipend deleted successfully'
      }
    });
    const response = await TravelStipendsAPI.deleteTravelStipend(stipendId);
    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/travelStipend/${stipendId}`);
    expect(moxios.requests.mostRecent().config.method).toEqual('delete');
    expect(response.data).toEqual({
      message: 'Travel stipend deleted successfully'
    });
  });

  it('should send a PUT api/v1/travelStipends/:id', async () => {
    const stipendId = '2';
    const updateURL = `${baseUrl}/travelStipend/${stipendId}`;
    const updateData = {
      stipend: 3000
    };
    moxios.stubRequest(updateURL, {
      status: 200,
      success: true,
      response: {
        message: 'Travel stipend updated successfully'
      }
    });
    const response = await TravelStipendsAPI.updateTravelStipend(stipendId, updateData);
    expect(moxios.requests.mostRecent().url).toEqual(updateURL);
    expect(moxios.requests.mostRecent().config.method).toEqual('put');
    expect(response.data).toEqual({
      message: 'Travel stipend updated successfully'
    });
  });
});
