import {
  CREATE_ACCOMMODATION_DATA,
  CREATE_ACCOMMODATION_DATA_SUCCESS,
  CREATE_ACCOMMODATION_DATA_FAILURE,
  FETCH_ACCOMMODATION_CENTRES,
  FETCH_ACCOMMODATION_CENTRES_SUCCESS,
  FETCH_ACCOMMODATION_CENTRES_FAILURE,
  INIT_FETCH_TIMELINE_DATA,
  FETCH_TIMELINE_DATA_SUCCESS,
  FETCH_TIMELINE_DATA_FAILURE,
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
} from '../constants/actionTypes';

import {
  disableGuestHouseSuccessState, restoreGuestHouseSuccessState
} from '../../helper/accommodationReducer';

const initialState = {
  postAccommodationData: [],
  createAccommodationLoading: false,
  errors: [],
  guestHouses: [],
  editAccommodationData: {},
  editingAccommodation: false,
  guestHouseData: {},
  guestHouse: {
    rooms: []
  },
  disabledGuestHouses: [],
  disabling: false,
  restoring: false,
  isLoading: false,
  isSaving: false,
};

const accommodation = (state = initialState, action) => {
  switch (action.type) {
  case CREATE_ACCOMMODATION_DATA:
    return { ...state, createAccommodationLoading: true };
  case CREATE_ACCOMMODATION_DATA_SUCCESS:
    return {
      ...state, createAccommodationLoading: false,
      postAccommodationData: action.accommodationData, };
  case CREATE_ACCOMMODATION_DATA_FAILURE:
    return { ...state, createAccommodationLoading: false, errors: action.error, };
  case FETCH_ACCOMMODATION_CENTRES:
    return { ...state, isLoading: true };
  case SAVING_ACCOMMODATION:
    return { ...state, isSaving: action.condition };
  case FETCH_ACCOMMODATION_CENTRES_SUCCESS:
    return {
      ...state, isLoading: false, guestHouses: action.guestHouses
    };
  case FETCH_ACCOMMODATION_CENTRES_FAILURE:
    return {  ...state, isLoading: false, guestHouses: null,
      accommodationError: action.error
    };
  case INIT_FETCH_TIMELINE_DATA:
    return { ...state, guestHouse: { rooms: []}, isLoading: true };
  case FETCH_TIMELINE_DATA_SUCCESS:
    return guestHouseTimelineDataSuccessState(state, action);
  case FETCH_TIMELINE_DATA_FAILURE:
    return guestHouseTimelineDataFailureState(state, action);
  case EDIT_ACCOMMODATION_DATA:
    return { ...state, editingAccommodation: true,
      guestHouseData: action.guestHouseData, guestHouseId: action.guestHouseId };
  case EDIT_ACCOMMODATION_DATA_SUCCESS:
    return { ...state, editingAccommodation: false,
      guestHouse: Object.assign(state.guestHouse, {...action.guestHouseData}) };
  case EDIT_ACCOMMODATION_DATA_FAILURE:
    return { ...state, editingAccommodation: false, error: action.error };
  case DISABLE_ACCOMMODATION:
    return { ...state, disabling: true };
  case DISABLE_ACCOMMODATION_SUCCESS:
    return disableGuestHouseSuccessState(state, action);
  case DISABLE_ACCOMMODATION_FAILURE:
    return { ...state, disabling: false, error: action.error };
  case FETCH_DISABLED_ACCOMMODATION:
    return { ...state, isLoading: true };
  case FETCH_DISABLED_ACCOMMODATION_SUCCESS:
    return { ...state, isLoading: false, disabledGuestHouses: action.disabledGuestHouses };
  case FETCH_DISABLED_ACCOMMODATION_FAILURE:
    return {  ...state, isLoading: false, error: action.error };
  case RESTORE_DISABLED_ACCOMMODATION:
    return { ...state, isLoading: true,
      restoring: true, disabledguestHouse: action.guestHouseData };
  case RESTORE_DISABLED_ACCOMMODATION_SUCCESS:
    return restoreGuestHouseSuccessState(state, action);
  case RESTORE_DISABLED_ACCOMMODATION_FAILURE:
    return { ...state, isLoading: false, restoring: false, error: action.error };
  default:
    return state;
  }
};

const guestHouseTimelineDataSuccessState = (state, successAction) => ({
  ...state,
  isLoading: false,
  guestHouse: successAction.guestHouse
});

const guestHouseTimelineDataFailureState = (state, failureAction) => ({
  ...state,
  isLoading: false,
  guestHouse: failureAction.guestHouse,
  error: failureAction.error
});

export default accommodation;
