import {
  createAccommodation,
  createAccommodationSuccess,
  createAccommodationFailure,
} from '../accommodationActions';

const guestHouses = {
  'houseName': 'Small Lagos ',
  'location': 'Lagos Nigeria',
  'bathRooms': '5',
  'imageUrl': 'https://res.cloudinary.com/s.jpg.jpg.jpg',
  'genderPolicy': 'unisex',
  'rooms': [
    {
      'roomName': 'big cutter',
      'roomType': 'ensuited',
      'bedCount': '3'
    },
    {
      'roomName': 'small cutter',
      'roomType': 'non-ensuited',
      'bedCount': '2'
    }
  ]
};

describe('Create Accommodation actions test', () => {
  describe('Create Accommodation actions', () => {
    it('should return action of type CREATE_ACCOMMODATION_DATA', () => {

      const expectedAction = {
        type: 'CREATE_ACCOMMODATION_DATA',
        ...guestHouses
      };
      const newAction = createAccommodation(guestHouses);
      expect(newAction.type).toEqual(expectedAction.type);
    });

    it('should return action of type CREATE_ACCOMMODATION_DATA_FAILURE',
      () => {
        const error = 'Server error, please try again';
        const expectedAction = {
          type: 'CREATE_ACCOMMODATION_DATA_FAILURE',
          error
        };

        const newAction = createAccommodationFailure(error);
        expect(newAction.type).toEqual(expectedAction.type);
      });

    it('should return action of type CREATE_ACCOMMODATION_DATA_SUCCESS',
      () => {
        const response = {
          data: {
            success: true,
            message: 'Successfully retrieved guestHouses',
            ...guestHouses,
          }
        };
        const expectedAction = {
          type: 'CREATE_ACCOMMODATION_DATA_SUCCESS',
          ...response.data
        };

        const newAction = createAccommodationSuccess(response);
        expect(newAction.type).toEqual(expectedAction.type);
      });
  });
});
