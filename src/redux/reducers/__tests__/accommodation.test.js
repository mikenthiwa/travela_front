import accommodation from '../accommodation';
import {
  FETCH_ACCOMMODATION_CENTRES,
  FETCH_ACCOMMODATION_CENTRES_SUCCESS,
  FETCH_ACCOMMODATION_CENTRES_FAILURE,
  EDIT_ACCOMMODATION_DATA,
  EDIT_ACCOMMODATION_DATA_SUCCESS,
  EDIT_ACCOMMODATION_DATA_FAILURE,
  DISABLE_ACCOMMODATION,
  DISABLE_ACCOMMODATION_SUCCESS,
  DISABLE_ACCOMMODATION_FAILURE,
  FETCH_DISABLED_ACCOMMODATION,
  FETCH_DISABLED_ACCOMMODATION_SUCCESS,
  FETCH_DISABLED_ACCOMMODATION_FAILURE,
  RESTORE_DISABLED_ACCOMMODATION,
  RESTORE_DISABLED_ACCOMMODATION_SUCCESS,
  RESTORE_DISABLED_ACCOMMODATION_FAILURE,
  SAVING_ACCOMMODATION
} from '../../constants/actionTypes';
import guestHouses from '../../../views/Accommodation/__mocks__/mockData/guestHouses';
import disabledGuestHouses from '../../../views/Accommodation/__mocks__/mockData/disabledGuestHouses';

describe('Accommodation Reducer', () => {
  describe('Fetch Accommodation Reducer', () => {
    const initialState = {
      postAccommodationData: [],
      createAccommodationLoading: false,
      errors: [],
      editAccommodationData: {},
      editingAccommodation: false,
      guestHouses: [],
      guestHouseData: {'guestHouse': {
        'houseName': 'Kololo heights',
        'location': 'Kampala',
        'bathRooms': '4',
        'imageUrl': 'https://www.lol.com',
        'genderPolicy': 'unisex',
        'rooms': [
          {
            'roomName': 'Rwenzori',
            'roomType': 'non-ensuite',
            'bedCount': '1',
            'id': 'dtnJtaRE7Y'
          }
        ]
      }
      },
      guestHouse: {
        rooms: []
      },
      disabledGuestHouses: [],
      disabling: false,
      restoring: false,
      isLoading: false,
    };

    const error = 'Error fetching accommodation centres, network error';
    it('returns the correct initial state', () => {
      expect(accommodation(undefined, {})).toEqual({
        ...{...initialState, isSaving: false},
        'guestHouseData': {}
      });
    });

    it(`returns the correct state for FETCH_ACCOMMODATION_CENTRES
    action`, () => {
      const action = {
        type: FETCH_ACCOMMODATION_CENTRES
      };
      expect(accommodation(initialState, action)).toEqual({
        ...initialState,
        isLoading: true,
      });
    });

    it(`returns the correct state for
    FETCH_ACCOMMODATION_CENTRES_SUCCESS action`, () => {
      const action = {
        type: FETCH_ACCOMMODATION_CENTRES_SUCCESS,
        guestHouses
      };
      expect(accommodation(initialState, action)).toEqual({
        ...initialState,
        isLoading: false,
        guestHouses
      });
    });

    it(`returns the correct state for
    FETCH_ACCOMMODATION_CENTRES_FAILURE action`, () => {
      const action = {
        type: FETCH_ACCOMMODATION_CENTRES_FAILURE,
        error
      };
      expect(accommodation(initialState, action)).toEqual({
        ...initialState,
        isLoading: false,
        accommodationError: error,
        guestHouses: null
      });
    });

    it('should handle EDIT_ACCOMMODATION_DATA', () => {
      const action = {
        type: EDIT_ACCOMMODATION_DATA,
        guestHouseData: { guestHouse: {
          'houseName': 'Kololo heights',
          'location': 'Kampala',
          'bathRooms': '4',
          'imageUrl': 'https://www.lol.com',
          'genderPolicy': 'unisex',
          'rooms': [
            {
              'roomName': 'Rwenzori',
              'roomType': 'non-ensuite',
              'bedCount': '1',
              'id': 'dtnJtaRE7Y'
            }
          ]
        }
        }
      };

      const newState = accommodation(initialState, action);
      const expectedState = {
        postAccommodationData: [],
        disabledGuestHouses: [],
        disabling: false,
        restoring: false,
        errors: [],
        createAccommodationLoading: false,
        editAccommodationData: {},
        editingAccommodation: true,
        guestHouses: [],
        guestHouse: {
          rooms: []
        },
        guestHouseData: {'guestHouse': {
          'houseName': 'Kololo heights',
          'location': 'Kampala',
          'bathRooms': '4',
          'imageUrl': 'https://www.lol.com',
          'genderPolicy': 'unisex',
          'rooms': [
            {
              'roomName': 'Rwenzori',
              'roomType': 'non-ensuite',
              'bedCount': '1',
              'id': 'dtnJtaRE7Y'
            }
          ]
        }
        },
        isLoading: false
      };

      expect(newState).toEqual(expectedState);
    });

    it('should handle EDIT_ACCOMMODATION_DATA_SUCCESS', () => {
      const action = {
        type: EDIT_ACCOMMODATION_DATA_SUCCESS,
        guestHouseData: {
          'houseName': 'Kololo heights',
          'location': 'Kampala',
          'bathRooms': '4',
          'imageUrl': 'https://www.lol.com',
          'genderPolicy': 'unisex',
          'rooms': [
            {
              'roomName': 'Rwenzori',
              'roomType': 'non-ensuite',
              'bedCount': '1',
              'id': 'dtnJtaRE7Y'
            }
          ]
        },
      };

      const newState = accommodation(initialState, action);
      const expectedState = {
        postAccommodationData: [],
        disabledGuestHouses: [],
        disabling: false,
        restoring: false,
        errors: [],
        createAccommodationLoading: false,
        editAccommodationData: {},
        editingAccommodation: false,
        guestHouses: [],
        guestHouse: {
          rooms: []
        },
        guestHouseData: {
          'houseName': 'Kololo heights',
          'location': 'Kampala',
          'bathRooms': '4',
          'imageUrl': 'https://www.lol.com',
          'genderPolicy': 'unisex',
          'rooms': [
            {
              'roomName': 'Rwenzori',
              'roomType': 'non-ensuite',
              'bedCount': '1',
              'id': 'dtnJtaRE7Y'
            }
          ]
        },
        isLoading: false,
      };
      expect(newState).toEqual(expectedState);
    });

    it('should handle EDIT_ACCOMMODATION_DATA_FAILURE', () => {
      const error = 'Failed to edit guest house';
      const action = {
        type: EDIT_ACCOMMODATION_DATA_FAILURE,
        error
      };

      const newState = accommodation(initialState, action);
      const expectedState = {
        editingAccommodation: false,
        error: 'Failed to edit guest house'
      };
      expect(newState).toMatchObject(expectedState);
    });

    it('returns the correct state for initFetchTimelineData', () => {
      const action = { type: 'INIT_FETCH_TIMELINE_DATA' };
      const expectedState = {
        ...initialState,
        guestHouse: { rooms: []},
        isLoading: true
      };
      expect(accommodation(initialState, action)).toEqual(expectedState);
    });

    it('returns the correct state for fetchTimelineDataSuccess', () => {
      const successAction = {
        type: 'FETCH_TIMELINE_DATA_SUCCESS',
        guestHouse: {
          houseName: 'Mini Flat',
          rooms: []
        }
      };
      const expectedState = {
        ...initialState,
        isLoading: false,
        guestHouse: successAction.guestHouse
      };
      expect(accommodation(initialState, successAction)).toEqual(expectedState);
    });

    it('returns the correct state for fetchTimelineDataFailure', () => {
      const failureAction = {
        type: 'FETCH_TIMELINE_DATA_FAILURE',
        error: 'Test error message',
        guestHouse: {
          rooms: []
        }
      };
      const expectedState = {
        ...initialState,
        isLoading: false,
        error: failureAction.error,
        guestHouse: failureAction.guestHouse
      };
      expect(accommodation(initialState, failureAction)).toEqual(expectedState);
    });

    it('should handle DISABLE_ACCOMMODATION', () => {
      const action = {
        type: DISABLE_ACCOMMODATION,
      };

      const newState = accommodation(initialState, action);
      const expectedState = {
        postAccommodationData: [],
        disabledGuestHouses: [],
        disabling: true,
        restoring: false,
        errors: [],
        createAccommodationLoading: false,
        editAccommodationData: {},
        editingAccommodation: false,
        guestHouses: [],
        guestHouse: {
          rooms: []
        },
        guestHouseData: {'guestHouse': {
          'houseName': 'Kololo heights',
          'location': 'Kampala',
          'bathRooms': '4',
          'imageUrl': 'https://www.lol.com',
          'genderPolicy': 'unisex',
          'rooms': [
            {
              'roomName': 'Rwenzori',
              'roomType': 'non-ensuite',
              'bedCount': '1',
              'id': 'dtnJtaRE7Y'
            }
          ]
        }
        },
        isLoading: false
      };

      expect(newState).toEqual(expectedState);
    });

    it('should handle DISABLE_ACCOMMODATION_SUCCESS', () => {
      const action = {
        type: DISABLE_ACCOMMODATION_SUCCESS,
        disabledGuestHouseData: {
          id: 'wrtiuy56_u',
          houseName: 'Somolu Falls',
          location: 'Lagos',
          bathRooms: '2',
          disabled: true,
          imageUrl: 'https://www.lol.com',
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
        }
      };

      const state = {
        ...initialState,
        guestHouses: guestHouses
      };

      const newState = accommodation(state, action);
      const expectedState = {
        ...state,
        guestHouses: guestHouses.filter(list => list.id !== 'wrtiuy56_u'),
        disabledGuestHouses: [action.disabledGuestHouseData],
        disabling: false,
      };

      expect(newState).toEqual(expectedState);
    });

    it('should handle DISABLE_ACCOMMODATION_SUCCESS II', () => {
      const action = {
        type: DISABLE_ACCOMMODATION_SUCCESS,
        disabledGuestHouseData: {
          id: 'wrtiuy56_u',
          houseName: 'Somolu Falls',
          location: 'Lagos',
          bathRooms: '2',
          disabled: true,
          imageUrl: 'https://www.lol.com',
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
        }
      };

      const state = {
        ...initialState,
        guestHouses: guestHouses,
        disabledGuesthouses: disabledGuestHouses
      };

      const newState = accommodation(state, action);
      let update = [{ ...action.disabledGuestHouseData }, ...state.disabledGuestHouses];
      const expectedState = {
        ...state,
        guestHouses: guestHouses.filter(list => list.id !== 'wrtiuy56_u'),
        disabledGuestHouses: [...update],
        disabling: false,
      };

      expect(newState).toEqual(expectedState);
    });

    it('should handle DISABLE_ACCOMMODATION_FAILURE', () => {
      const error = 'Failed to disable guest house';
      const action = {
        type: DISABLE_ACCOMMODATION_FAILURE,
        error
      };

      const newState = accommodation(initialState, action);
      const expectedState = {
        disabling: false,
        error: 'Failed to disable guest house'
      };
      expect(newState).toMatchObject(expectedState);
    });

    it(`should handle FETCH_DISABLED_ACCOMMODATION
    action`, () => {
      const action = {
        type: FETCH_DISABLED_ACCOMMODATION
      };
      expect(accommodation(initialState, action)).toEqual({
        ...initialState,
        isLoading: true,
      });
    });

    it(`should handle FETCH_DISABLED_ACCOMMODATION_SUCCESS
    action`, () => {
      const action = {
        type: FETCH_DISABLED_ACCOMMODATION_SUCCESS,
        disabledGuestHouses
      };
      expect(accommodation(initialState, action)).toEqual({
        ...initialState,
        isLoading: false,
        disabledGuestHouses: disabledGuestHouses
      });
    });

    it(`should handle FETCH_DISABLED_ACCOMMODATION_FAILURE
    action`, () => {
      const action = {
        type: FETCH_DISABLED_ACCOMMODATION_FAILURE,
        error
      };
      expect(accommodation(initialState, action)).toEqual({
        ...initialState,
        isLoading: false,
        error,
      });
    });

    it('should handle RESTORE_DISABLED_ACCOMMODATION', () => {
      const action = {
        type: RESTORE_DISABLED_ACCOMMODATION,
      };

      const newState = accommodation(initialState, action);
      const expectedState = {
        ...initialState,
        restoring: true,
        isLoading: true,
      };

      expect(newState).toEqual(expectedState);
    });

    it('should handle RESTORE_DISABLED_ACCOMMODATION_SUCCESS', () => {
      const action = {
        type: RESTORE_DISABLED_ACCOMMODATION_SUCCESS,
        restoredGuestHouseData: {
          id: 'juhiuhoji0',
          houseName: 'Guest House A',
          location: 'Nairobi, Kenya',
          bathRooms: 5,
          imageUrl: 'http://images/guest-house.jpg',
          genderPolicy: 'unisex',
          disabled: false,
          rooms: [
            {
              id: 'bvuh9iei8bh',
              roomName: 'ZAPTIU',
              roomType: 'Ensuite',
              bedCount: 2,
              faulty: false,
            },
            {
              id: 'NBiojnn98u',
              roomName: 'AFEIK',
              roomType: 'Ensuite',
              bedCount: 2,
              faulty: false,
            }
          ]
        }
      };

      const state = {
        ...initialState,
        disabledGuestHouses: disabledGuestHouses
      };

      const newState = accommodation(state, action);
      const expectedState = {
        ...state,
        disabledGuestHouses: disabledGuestHouses.filter(list => list.id !== 'juhiuhoji0'),
        guestHouses: [action.restoredGuestHouseData],
        disabling: false,
      };

      expect(newState).toEqual(expectedState);
    });

    it('should handle RESTORE_DISABLED_ACCOMMODATION_FAILURE', () => {
      const error = 'Failed to restore guest house';
      const action = {
        type: RESTORE_DISABLED_ACCOMMODATION_FAILURE,
        error
      };

      const newState = accommodation(initialState, action);
      const expectedState = {
        disabling: false,
        error: 'Failed to restore guest house'
      };
      expect(newState).toMatchObject(expectedState);
    });

    it(`returns the correct state for ACCOMMODATION_LOADER when given false parameter
    action`, () => {
      const action = {
        type: SAVING_ACCOMMODATION,
        condition: false
      };
      expect(accommodation(initialState, action)).toEqual({
        ...initialState,
        isSaving: false,
      });
    });

    it(`returns the correct state for ACCOMMODATION_LOADER when given true parameter
    action`, () => {
      const action = {
        type: SAVING_ACCOMMODATION,
        condition: true
      };
      expect(accommodation(initialState, action)).toEqual({
        ...initialState,
        isSaving: true,
      });
    });
  });
});
