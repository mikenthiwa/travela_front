import moxios from 'moxios';
import FlightEstimateAPI from '../FlightEstimateAPI';

const baseUrl = 'http://127.0.0.1:5000/api/v1';

const fetchData = {
  data: {
    success: true,
    message: 'Flight Estimates retrieved successfully',
    flightEstimates: [
      {
        id: 1,
        originRegion: null,
        destinationRegion: null,
        originCountry: 'Kenya',
        destinationCountry: 'Nigeria',
        createdBy: '2190',
        amount: 150,
        creator: {
          fullName: 'Peace Acio',
          id: 43
        }
      },
      {
        id: 2,
        originRegion: null,
        destinationRegion: null,
        originCountry: 'France',
        destinationCountry: 'Germany',
        createdBy: '2190',
        amount: 100,
        creator: {
          fullName: 'Peace Acio',
          id: 43
        }
      }
    ]
  }
};

describe('FlightEstimateAPI', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should send a request to create a new flight estimate', async () => {
    const requestData = {
      flightEstimate: '80',
      originCountry: 'Nigeria',
      destinationCountry: 'Uganda'
    };

    moxios.stubRequest(`${baseUrl}/flightEstimate`, {
      status: 201,
      response: {
        success: true,
        message: 'Successfully created a new flight estimate for the given location',
        flightEstimate: {
          id: 31,
          amount: 300,
          originCountry: 'Niger',
          destinationCountry: 'Uganda',
          createdBy: '2190'
        }
      }
    });

    const response = await FlightEstimateAPI.postFlightEstimate(requestData);
    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/flightEstimate`);
    expect(response.data).toEqual({
      success: true,
      message: 'Successfully created a new flight estimate for the given location',
      flightEstimate: {
        id: 31,
        amount: 300,
        originCountry: 'Niger',
        destinationCountry: 'Uganda',
        createdBy: '2190'
      }
    });
  });

  it('should send a request to fetch all flight estimates', async () => {
    moxios.stubRequest(`${baseUrl}/flightEstimate`, {
      status: 200,
      response: { ...fetchData }
    });
    const response = await FlightEstimateAPI.getAllFlightEstimates();
    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/flightEstimate`);
    expect(response.status).toEqual(200);
    expect(response.data).toEqual(fetchData);
  });

  it('should send a request to delete a flight estimate', async () => {
    const estimateId = '1';
    moxios.stubRequest(`${baseUrl}/flightEstimate/${estimateId}`, {
      status: 200,
      response: {
        success: true,
        message: 'Flight Estimate deleted successfully'
      }
    });
    const response = await FlightEstimateAPI.deleteFlightEstimate(estimateId);
    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/flightEstimate/${estimateId}`);
    expect(moxios.requests.mostRecent().config.method).toEqual('delete');
    expect(response.data).toEqual({
      success: true,
      message: 'Flight Estimate deleted successfully'
    });
  });

  it('should send a request to update a flight estimate', async () => {
    const estimateId = '3';
    const updateData = {
      flightEstimate: 50
    };
    moxios.stubRequest(`${baseUrl}/flightEstimate/${estimateId}`, {
      status: 200,
      success: true,
      response: {
        message: 'Flight Estimate Successfully updated'
      }
    });
    const response = await FlightEstimateAPI.updateFlightEstimate(estimateId, updateData);
    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/flightEstimate/${estimateId}`);
    expect(moxios.requests.mostRecent().config.method).toEqual('put');
    expect(response.data).toEqual({
      message: 'Flight Estimate Successfully updated'
    });
  });
});
