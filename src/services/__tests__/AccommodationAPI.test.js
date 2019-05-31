import moxios from 'moxios';
import AccommodationAPI from '../AccommodationAPI';
import guestHouses from '../../views/Accommodation/__mocks__/mockData/guestHouses';
import disabledGuestHouses from '../../views/Accommodation/__mocks__/mockData/disabledGuestHouses';

const baseUrl = 'http://127.0.0.1:5000/api/v1';
const expectedResponse = {
  success: true,
  guestHouses,
  message: 'Successfully retrieved guestHouses',
};

const expectedFullDetailsResponse = {
  guestHouse: {
    houseName: 'Mini Flat',
    rooms: [{
      id: 'F4YFiKlrw-',
      roomName: 'Kwetu',
      roomType: 'ensuited',
      bedCount: 0,
      faulty: false,
      beds: []
    }]
  }
};

describe('AccommodationAPI', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should sends a GET request to get accommodation centres', async () => {
    moxios.stubRequest(`${baseUrl}/guesthouses`, {
      status: 200,
      response: {
        ...expectedResponse
      }
    });
    const response = await AccommodationAPI.getAccommodationCentres();
    const request = moxios.requests.mostRecent();
    expect(request.url).toEqual(`${baseUrl}/guesthouses`);
    expect(request.config.method).toEqual('get');
    expect(response.data).toEqual(expectedResponse);
  });

  it('should send a PUT request to update guest house', async () =>{
    const accommodationData = {
      'houseName': 'Bukoto heights',
      'location': 'Kampala',
      'bathRooms': '4',
      'imageUrl': 'https://www.lol.com',
      'genderPolicy': 'male',
      'rooms': [
        {
          'roomName': 'Rwenzori',
          'roomType': 'non-ensuite',
          'bedCount': '1',
          'id': 'dtnJtaRE7Y'
        }
      ]
    };
    const guestHouseId = 'zNnGJAJH5';

    moxios.stubRequest(`${baseUrl}/guesthouses/${guestHouseId}`, {
      status: 200,
      response: {
        'id': 'zNnGJAJH5',
        'houseName': 'Bukoto heights',
        'location': 'Kampala',
        'bathRooms': '4',
        'imageUrl': 'https://www.lol.com',
        'genderPolicy': 'unisex',
        'createdAt': '2018-10-05T00:07:22.276Z',
        'updatedAt': '2018-10-07T03:17:09.928Z',
        'userId': '-LJNzPWupJiiToLowHq9',
        rooms: [
          {
            'id': 'dtnJtaRE7Y',
            'roomName': 'Rwenzori',
            'roomType': 'non-ensuite',
            'bedCount': '1',
            'faulty': false,
            'createdAt': '2018-10-05T00:07:22.281Z',
            'updatedAt': '2018-10-07T03:17:09.938Z',
            'guestHouseId': 'zNnGJAJH5'
          }
        ],
        bed: [
          [
            {
              'id': 68,
              'bedName': 'bed 1',
              'booked': false,
              'createdAt': '2018-10-07T03:17:09.969Z',
              'updatedAt': '2018-10-07T03:17:09.969Z',
              'roomId': 'dtnJtaRE7Y'
            }
          ]

        ]
      },
    });

    const response = await AccommodationAPI.editAccommodation(accommodationData, guestHouseId);

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/guesthouses/${guestHouseId}`);
    expect(response.data).toEqual({
      'id': 'zNnGJAJH5',
      'houseName': 'Bukoto heights',
      'location': 'Kampala',
      'bathRooms': '4',
      'imageUrl': 'https://www.lol.com',
      'genderPolicy': 'unisex',
      'createdAt': '2018-10-05T00:07:22.276Z',
      'updatedAt': '2018-10-07T03:17:09.928Z',
      'userId': '-LJNzPWupJiiToLowHq9',
      rooms: [
        {
          'id': 'dtnJtaRE7Y',
          'roomName': 'Rwenzori',
          'roomType': 'non-ensuite',
          'bedCount': '1',
          'faulty': false,
          'createdAt': '2018-10-05T00:07:22.281Z',
          'updatedAt': '2018-10-07T03:17:09.938Z',
          'guestHouseId': 'zNnGJAJH5'
        }
      ],
      bed: [
        [
          {
            'id': 68,
            'bedName': 'bed 1',
            'booked': false,
            'createdAt': '2018-10-07T03:17:09.969Z',
            'updatedAt': '2018-10-07T03:17:09.969Z',
            'roomId': 'dtnJtaRE7Y'
          }
        ]

      ]
    });
  });

  it('should send a POST request to create guest house', async () =>{
    const accommodationData = {
      'houseName': 'Lion heights',
      'location': 'Kampala',
      'bathRooms': '4',
      'imageUrl': 'https://www.lol.com',
      'genderPolicy': 'male',
      'rooms': [
        {
          'roomName': 'Rwenzori',
          'roomType': 'non-ensuite',
          'bedCount': '1',
          'id': 'dtnJtaRE7Y'
        }
      ]
    };
    moxios.stubRequest(`${baseUrl}/guesthouses`, {
      status: 201,
      response: {
        "success": true,
        "message": "Guest House created successfully",
        "guestHouse": {
            "disabled": false,
            "houseName": "Lion heights",
            "location": "Kampala",
            "bathRooms": 4,
            "imageUrl": "https://www.lol.com",
            "genderPolicy": "male",
            "userId": "2180",
            "id": "cchD3BSnF",
            "updatedAt": "2019-05-24T15:02:33.742Z",
            "createdAt": "2019-05-24T15:02:33.742Z"
        },
        "rooms": [
            {
                "id": "1SSUJRV2H5",
                "roomName": "Rwenzori",
                "roomType": "non-ensuite",
                "bedCount": 1,
                "isDeleted": false,
                "faulty": false,
                "createdAt": "2019-05-24T15:02:33.903Z",
                "updatedAt": "2019-05-24T15:02:33.903Z",
                "guestHouseId": "cchD3BSnF"
            }
        ],
        "bed": [
            [
                {
                    "booked": false,
                    "id": 28,
                    "roomId": "1SSUJRV2H5",
                    "bedName": "bed 1",
                    "updatedAt": "2019-05-24T15:02:33.919Z",
                    "createdAt": "2019-05-24T15:02:33.919Z"
                }
            ]
        ]
    },
    });

    const response = await AccommodationAPI.postAccommodation(accommodationData)
    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/guesthouses`);
    expect(response.data).toEqual({
      "success": true,
      "message": "Guest House created successfully",
      "guestHouse": {
          "disabled": false,
          "houseName": "Lion heights",
          "location": "Kampala",
          "bathRooms": 4,
          "imageUrl": "https://www.lol.com",
          "genderPolicy": "male",
          "userId": "2180",
          "id": "cchD3BSnF",
          "updatedAt": "2019-05-24T15:02:33.742Z",
          "createdAt": "2019-05-24T15:02:33.742Z"
      },
      "rooms": [
          {
              "id": "1SSUJRV2H5",
              "roomName": "Rwenzori",
              "roomType": "non-ensuite",
              "bedCount": 1,
              "isDeleted": false,
              "faulty": false,
              "createdAt": "2019-05-24T15:02:33.903Z",
              "updatedAt": "2019-05-24T15:02:33.903Z",
              "guestHouseId": "cchD3BSnF"
          }
      ],
      "bed": [
          [
              {
                  "booked": false,
                  "id": 28,
                  "roomId": "1SSUJRV2H5",
                  "bedName": "bed 1",
                  "updatedAt": "2019-05-24T15:02:33.919Z",
                  "createdAt": "2019-05-24T15:02:33.919Z"
              }
          ]
      ]
  });
  });

  it('should send a GET request to fetch full guest house details', async () => {
    const guestHouseId = 'test-id';
    const startDate = '2018-01-01';
    const endDate = '2018-01-15';
    const query = `startDate=${startDate}&endDate=${endDate}`;
    moxios.stubRequest(`${baseUrl}/guesthouses/${guestHouseId}?${query}`, {
      status: 200,
      response: { ...expectedFullDetailsResponse }
    });
    const response = await AccommodationAPI.fetchTimelineData(
      guestHouseId,
      startDate,
      endDate
    );
    expect(response.data).toEqual(expectedFullDetailsResponse);
  });

  it('should send a PUT request to disable or restore guesthouse', async () => {
    const guestHouseId = 'juhiuhoji0';

    moxios.stubRequest(`${baseUrl}/guesthouse/${guestHouseId}`, {
      status: 201,
    });

    const response = await AccommodationAPI.disableOrRestoreAccommodation(guestHouseId);
    const request = moxios.requests.mostRecent();
    expect(request.url).toEqual(`${baseUrl}/guesthouse/${guestHouseId}`);
    expect(request.config.method).toEqual('put');
  });

  it('should send a PUT request to disable or restore guesthouse', async () => {
    const Response = {
      success: true,
      message: 'Disabled guesthouses retrieved successfully',
      guestHouses: disabledGuestHouses
    };

    moxios.stubRequest(`${baseUrl}/disabledguesthouses`, {
      status: 200,
      response: {
        ...Response
      }
    });

    const response = await AccommodationAPI.getDisabledAccommodations();
    const request = moxios.requests.mostRecent();

    expect(request.url).toEqual(`${baseUrl}/disabledguesthouses`);
    expect(request.config.method).toEqual('get');
    expect(response.data).toEqual(Response);
  });
});
