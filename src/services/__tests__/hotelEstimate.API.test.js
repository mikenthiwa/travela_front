import moxios from 'moxios';
import HotelEstimateApi from '../HotelEstimateAPI';

const baseUrl = 'http://127.0.0.1:5000/api/v1';

const fetchData = {
  data: {
    success: true,
    message: 'Hotel Estimates retrieved successfully',
    estimates: [
      {
        id: 1,
        amount: 1000,
        createdBy: {
          id: 591,
          name: 'Andrew Hinga'
        },
        region: 'East Africa',
        regionId: 1001
      },
      {
        id: 3,
        amount: 550,
        createdBy: {
          id: 591,
          name: 'Andrew Hinga'
        },
        region: 'UK',
        regionId: 1
      }
    ]
  }
};

describe('HotelEstimateApi', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should send a POST request to create a new hotel estimate', async () => {
    const requestData = {
      country: 'Rwanda',
      estimate: 45678
    };

    moxios.stubRequest(`${baseUrl}/hotelEstimate`, {
      status: 201,
      response: {
        country: 'Rwanda',
        estimate: 45678
      }
    });

    const response = await HotelEstimateApi.postHotelEstimate(requestData);

    expect(moxios.requests.mostRecent().url).toEqual(
      `${baseUrl}/hotelEstimate`
    );
    expect(response.data).toEqual({
      country: 'Rwanda',
      estimate: 45678
    });
  });
  it('should send a request to fetch all estimates', async () => {
    const query = '?country=false';
    moxios.stubRequest(`${baseUrl}/hotelEstimate${query}`, {
      status: 200,
      response: { ...fetchData }
    });
    const response = await HotelEstimateApi.getAllHotelEstimates(query);
    const request = moxios.requests.mostRecent();
    expect(request.url).toEqual(`${baseUrl}/hotelEstimate${query}`);
    expect(response.status).toEqual(200);
    expect(response.data).toEqual(fetchData);
  });
});
