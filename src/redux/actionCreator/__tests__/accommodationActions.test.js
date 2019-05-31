import {
  FETCH_ACCOMMODATION_CENTRES,
  FETCH_ACCOMMODATION_CENTRES_SUCCESS,
  FETCH_ACCOMMODATION_CENTRES_FAILURE,
  DISABLE_ACCOMMODATION,
  DISABLE_ACCOMMODATION_SUCCESS,
  DISABLE_ACCOMMODATION_FAILURE,
  FETCH_DISABLED_ACCOMMODATION,
  FETCH_DISABLED_ACCOMMODATION_SUCCESS,
  FETCH_DISABLED_ACCOMMODATION_FAILURE,
  RESTORE_DISABLED_ACCOMMODATION,
  RESTORE_DISABLED_ACCOMMODATION_SUCCESS,
  RESTORE_DISABLED_ACCOMMODATION_FAILURE,
  EDIT_ACCOMMODATION_DATA,
  EDIT_ACCOMMODATION_DATA_SUCCESS,
  EDIT_ACCOMMODATION_DATA_FAILURE,
  SAVING_ACCOMMODATION
} from '../../constants/actionTypes';

import {
  fetchAccommodation,
  fetchAccommodationSuccess,
  fetchAccommodationFailure,
  disableAccommodation,
  disableAccommodationSuccess,
  disableAccommodationFailure,
  fetchDisabledAccommodation,
  fetchDisabledAccommodationSuccess,
  fetchDisabledAccommodationFailure,
  restoreDisabledAccommodation,
  restoreDisabledAccommodationSuccess,
  restoreDisabledAccommodationFailure,
  editAccommodation,
  editAccommodationSuccess,
  editAccommodationFailure,
  savingAccommodation
} from '../accommodationActions';

import guestHouses from '../../../views/Accommodation/__mocks__/mockData/guestHouses';
import disabledGuestHouses from '../../../views/Accommodation/__mocks__/mockData/disabledGuestHouses';

describe('Accommodation actions test', () => {
  describe('Fetch Accommodation actions', () => {
    it('should return action of type FETCH_ACCOMMODATION_CENTRES', () => {
      const expectedAction = {
        type: FETCH_ACCOMMODATION_CENTRES,
      };

      const newAction = fetchAccommodation();

      expect(newAction).toEqual(expectedAction);
    });

    it('should return action of type FETCH_ACCOMMODATION_CENTRES_FALIURE',
      () => {
        const error = 'Server error, please try again';
        const expectedAction = {
          type: FETCH_ACCOMMODATION_CENTRES_FAILURE,
          error
        };

        const newAction = fetchAccommodationFailure(error);
        expect(newAction).toEqual(expectedAction);
      });

    it('should return action of type FETCH_ACCOMMODATION_CENTRES_SUCCESS',
      () => {
        const response = {
          data: {
            success: true,
            message: 'Successfully retrieved guestHouses',
            guestHouses,
          }
        };
        const expectedAction = {
          type: FETCH_ACCOMMODATION_CENTRES_SUCCESS,
          guestHouses
        };

        const newAction = fetchAccommodationSuccess(response.data);
        expect(newAction).toEqual(expectedAction);
      });
  });

  describe('Edit Accommodation actions', () => {
    it('should return action of type EDIT_ACCOMMODATION_DATA', () => {
      const expectedAction = {
        type: EDIT_ACCOMMODATION_DATA,
        guestHouseId: 'wrtiuy56_u',
        guestHouseData: {
          houseName: 'Guest House 1',
        },
      };

      const newAction = editAccommodation('wrtiuy56_u', { houseName: 'Guest House 1' });

      expect(newAction).toEqual(expectedAction);
    });

    it('should return action of type EDIT_ACCOMMODATION_DATA_FAILURE',
      () => {
        const error = 'Server error, please try again';
        const expectedAction = {
          type: EDIT_ACCOMMODATION_DATA_FAILURE,
          error
        };

        const newAction = editAccommodationFailure(error);
        expect(newAction).toEqual(expectedAction);
      });

    it('should return action of type EDIT_ACCOMMODATION_DATA_SUCCESS',
      () => {
        const guestHouseData = {
          id: 'wrtiuy56_u',
          houseName: 'Guest House 1',
          location: 'Nairobi, Kenya',
          bathRooms: 5,
          imageUrl: 'http://images/guest-house.jpg',
          genderPolicy: 'unisex',
          rooms: [
            {
              id: 'tryuompl0',
              roomName: 'Nyati',
              roomType: 'Ensuite',
              bedCount: 2,
              faulty: false,
            },
            {
              id: 'trytrimo',
              roomName: 'Maputi',
              roomType: 'Ensuite',
              bedCount: 2,
              faulty: false,
            }
          ]
        };

        const response = {
          data: {
            success: true,
            guestHouse: guestHouseData,
          }
        };
        const expectedAction = {
          type: EDIT_ACCOMMODATION_DATA_SUCCESS,
          guestHouseData
        };

        const newAction = editAccommodationSuccess(response.data.guestHouse);
        expect(newAction).toEqual(expectedAction);
      });
  });

  describe('Disable Accommodation actions', () => {
    it('should return action of type DISABLE_ACCOMMODATION', () => {
      const guestHouseId = '78jn7tjhi8';
      const expectedAction = {
        type: DISABLE_ACCOMMODATION,
        guestHouseId
      };

      const newAction = disableAccommodation(guestHouseId);

      expect(newAction).toEqual(expectedAction);
    });

    it('should return action of type DISABLE_ACCOMMODATION_SUCCESS',
      () => {
        const disabledGuestHouseData = {
          id: '9u9ui8ii',
          houseName: 'Guest House A',
          location: 'Nairobi, Kenya',
          bathRooms: 5,
          imageUrl: 'http://images/guest-house.jpg',
          genderPolicy: 'unisex',
        }
        const response = {
          data: {
            result: disabledGuestHouseData,
          }
        };
        const expectedAction = {
          type: DISABLE_ACCOMMODATION_SUCCESS,
          disabledGuestHouseData
        };

        const newAction = disableAccommodationSuccess(response.data.result);
        expect(newAction).toEqual(expectedAction);
      });

    it('should return action of type DISABLE_ACCOMMODATION_FAILURE',
      () => {
        const error = 'Server error, please try again';
        const expectedAction = {
          type: DISABLE_ACCOMMODATION_FAILURE,
          error
        };

        const newAction = disableAccommodationFailure(error);
        expect(newAction).toEqual(expectedAction);
      });
  });

  describe('Fetch disabled Accommodation actions', () => {
    it('should return action of type FETCH_DISABLED_ACCOMMODATION', () => {
      const expectedAction = {
        type: FETCH_DISABLED_ACCOMMODATION,
      };

      const newAction = fetchDisabledAccommodation();

      expect(newAction).toEqual(expectedAction);
    });

    it('should return action of type FETCH_DISABLED_ACCOMMODATION_SUCCESS',
      () => {

        const response = {
          data: {
            guestHouses: disabledGuestHouses,
          }
        };
        const expectedAction = {
          type: FETCH_DISABLED_ACCOMMODATION_SUCCESS,
          disabledGuestHouses
        };

        const newAction = fetchDisabledAccommodationSuccess(response.data.guestHouses);
        expect(newAction).toEqual(expectedAction);
      });

    it('should return action of type FETCH_DISABLED_ACCOMMODATION_FAILURE',
      () => {
        const error = 'Server error, please try again';
        const expectedAction = {
          type: FETCH_DISABLED_ACCOMMODATION_FAILURE,
          error
        };

        const newAction = fetchDisabledAccommodationFailure(error);
        expect(newAction).toEqual(expectedAction);
      });
  });

  describe('Restore disabled Accommodation actions', () => {
    it('should return action of type RESTORE_DISABLED_ACCOMMODATION', () => {
      const guestHouseId = '78jn7tjhi8';
      const expectedAction = {
        type: RESTORE_DISABLED_ACCOMMODATION,
        guestHouseId
      };

      const newAction = restoreDisabledAccommodation(guestHouseId);

      expect(newAction).toEqual(expectedAction);
    });

    it('should return action of type RESTORE_DISABLED_ACCOMMODATION_SUCCESS',
      () => {
        const restoredGuestHouseData = {
          id: '9u9ui8ii',
          houseName: 'Guest House A',
          location: 'Nairobi, Kenya',
          bathRooms: 5,
          imageUrl: 'http://images/guest-house.jpg',
          genderPolicy: 'unisex',
        }
        const response = {
          data: {
            result: restoredGuestHouseData,
          }
        };
        const expectedAction = {
          type: RESTORE_DISABLED_ACCOMMODATION_SUCCESS,
          restoredGuestHouseData
        };

        const newAction = restoreDisabledAccommodationSuccess(response.data.result);
        expect(newAction).toEqual(expectedAction);
      });

    it('should return action of type RESTORE_DISABLED_ACCOMMODATION_FAILURE',
      () => {
        const error = 'Server error, please try again';
        const expectedAction = {
          type: RESTORE_DISABLED_ACCOMMODATION_FAILURE,
          error
        };

        const newAction = restoreDisabledAccommodationFailure(error);
        expect(newAction).toEqual(expectedAction);
      });
  });

  describe('Accommodation loader', () => {
    it('should return action of type SAVING_ACCOMMODATION with condition true', () => {
      const expectedAction = {
        type: SAVING_ACCOMMODATION,
        condition: true
      };

      const newAction = savingAccommodation(true);

      expect(newAction).toEqual(expectedAction);
    });

    it('should return action of type SAVING_ACCOMMODATION with condition false', () => {
      const expectedAction = {
        type: SAVING_ACCOMMODATION,
        condition: false
      };

      const newAction = savingAccommodation(false);

      expect(newAction).toEqual(expectedAction);
    });
  });
});
