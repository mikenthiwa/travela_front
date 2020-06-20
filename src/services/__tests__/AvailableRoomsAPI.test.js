import moxios from 'moxios';
import AvailableRoomsAPI from '../AvailableRoomsAPI';
import beds from '../../views/AvailableRooms/__mocks__/mockData/availableRooms';

const baseUrl = 'http://127.0.0.1:5000/api/v1';

const expectedResponse = {
  success: true,
  message: 'Available rooms fetched',
  beds
};

describe('AvailableRoomsAPI', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('calls Get request to get all available rooms based on location', async () => {
    const gender = 'Male';
    const arrivalDate = '2018-12-23';
    const departureDate = '2018-12-29';
    const location = 'Lagos';
    const tripType = 'multi';
    const data = {
      action: {
        gender,
        departureDate,
        location,
        arrivalDate,
        tripType
      }
    };

    const urlQuery = `?gender=${gender}&departureDate=${departureDate}&location=${location}&arrivalDate=${arrivalDate}`;

    moxios.stubRequest(`${baseUrl}/availablerooms${urlQuery}`, {
      status: 200,
      response: {
        ...expectedResponse
      }
    });
    const response = await AvailableRoomsAPI.getAvailableRooms(data);
    const request = moxios.requests.mostRecent();
    expect(request.url).toEqual(
      `${baseUrl}/availablerooms?gender=Male&departureDate=2018-12-29&location=Lagos&arrivalDate=2018-12-23`
    );
    expect(request.config.method).toEqual('get');
    expect(response.data).toEqual(expectedResponse);
  });
});
