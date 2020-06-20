import moxios from 'moxios';
import TravelStipendsApi from '../TravelStipendsAPI';

const baseUrl = 'http://127.0.0.1:5000/api/v1';

describe('TravelStipendsApi', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should send a POST request to create a new travel-stipend', async () => {
    const requestData = {
      center: 'Kigali, Rwanda',
      stipend: 45678,
    };

    moxios.stubRequest(`${baseUrl}/travelStipend`, {
      status: 201,
      response: {
        center: 'Kigali, Rwanda',
        stipend: 45678,
      }
    });

    const response = await TravelStipendsApi.postTravelStipend(requestData);

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/travelStipend`);
    expect(response.data).toEqual({
      center: 'Kigali, Rwanda',
      stipend: 45678,
    });
  });
});
