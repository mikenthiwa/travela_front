import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import toast from 'toastr';
import TripsAPI from '../../../services/TripsAPI';
import {
  watchFetchTrips,
  watchUpdateTrip,
  watchUpdateTripRoom, watchValidateTrips
} from '../tripsSaga';
import {
  tripsResponse,
  updateTripResponse
} from '../../__mocks__/reduxMocks';
import {
  FETCH_TRIPS,
  FETCH_TRIPS_SUCCESS,
  FETCH_TRIPS_FAILURE,
  UPDATE_TRIP,
  UPDATE_TRIP_SUCCESS,
  UPDATE_TRIP_FAILURE,
  UPDATE_TRIP_ROOM,
  UPDATE_TRIP_ROOM_FAILURE,
  INIT_FETCH_TIMELINE_DATA
} from '../../constants/actionTypes';

const error = 'Possible network error, please reload the page';
const fetchResponse = {
  data: tripsResponse
};
const updateResponse = {
  data: updateTripResponse
};

toast.success = jest.fn();
toast.error = jest.fn();

describe('Test suite for Trips Saga', () => {
  describe('Tests for trips fetch requests', () => {
    it('fetches trips successfully', () => {
      return expectSaga(watchFetchTrips, TripsAPI)
        .provide([
          [call(TripsAPI.getTrips), fetchResponse]
        ])
        .put({
          type: FETCH_TRIPS_SUCCESS,
          trips: fetchResponse.data.trips,
          message: fetchResponse.data.message,
          success: fetchResponse.data.success
        })
        .dispatch({
          type: FETCH_TRIPS
        })
        .silentRun();
    });

    it('should throw an error if an error occurred while fetching trips', () => {
      return expectSaga(watchFetchTrips, TripsAPI)
        .provide([
          [call(TripsAPI.getTrips), throwError(error)]
        ])
        .put({
          type: FETCH_TRIPS_FAILURE,
          error
        })
        .dispatch({
          type: FETCH_TRIPS
        })
        .silentRun();
    });
  });

  describe('Test suite for trip update requests', () => {
    const action = {
      tripId: 3,
      tripData: {
        checkType: 'checkIn'
      }
    };
    it('should return updated trip if update request was successful', () => {
      return expectSaga(watchUpdateTrip, TripsAPI)
        .provide([
          [call(TripsAPI.updateTrip, action.tripId, action.tripData), updateResponse]
        ])
        .put({
          type: UPDATE_TRIP_SUCCESS,
          trip: updateTripResponse.trip,
          message: updateTripResponse.message,
          success: updateTripResponse.success
        })
        .dispatch({
          type: UPDATE_TRIP,
          tripId: action.tripId,
          tripData: action.tripData
        })
        .silentRun();
    });

    it('should throw an error if update fails', () => {
      const error = {
        response: {
          status: 422,
          data: {
            errors: [{msg: 'CheckType must be "checkIn" or "checkOut"'}]
          }
        }
      };
      return expectSaga(watchUpdateTrip, TripsAPI)
        .provide([
          [call(TripsAPI.updateTrip, action.tripId, action.tripData), throwError(error)]
        ])
        .put({
          type: UPDATE_TRIP_FAILURE,
          error: 'CheckType must be "checkIn" or "checkOut"'
        })
        .dispatch({
          type: UPDATE_TRIP,
          tripId: action.tripId,
          tripData: action.tripData
        })
        .silentRun();
    });
  });

  describe('Test suite for trip room update requests', () => {
    const action = {
      tripId: 1,
      data: {
        bedId: 2,
        reason: 'Reason',
        guestHouseId: 'xyr123dsw',
        startDate: '2018-10-01',
        endDate: '2018-10-31'
      },
      tripData: {
        bedId: 2,
        reason: 'Reason',
      }
    };
    it('should return updated trip if update request was successful', () => {
      return expectSaga(watchUpdateTripRoom, TripsAPI)
        .provide([
          [call(TripsAPI.updateTripRoom, action.tripId, action.tripData), updateResponse]
        ])
        .put({
          type: INIT_FETCH_TIMELINE_DATA,
          guestHouseId: action.data.guestHouseId,
          startDate: action.data.startDate,
          endDate: action.data.endDate
        })
        .dispatch({
          type: UPDATE_TRIP_ROOM,
          tripId: action.tripId,
          data: action.data
        })
        .silentRun();
    });

    it('should have called the toast success method', () => {
      expect(toast.success).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if update fails', () => {
      const error = {
        response: {
          status: 422,
          data: {
            errors: [{msg: 'Reason for change is required'}]
          }
        }
      };
      return expectSaga(watchUpdateTripRoom, TripsAPI)
        .provide([
          [call(TripsAPI.updateTripRoom, action.tripId, action.tripData), throwError(error)]
        ])
        .put({
          type: UPDATE_TRIP_ROOM_FAILURE,
          error: 'Reason for change is required'
        })
        .dispatch({
          type: UPDATE_TRIP_ROOM,
          tripId: action.tripId,
          data: action.data
        })
        .silentRun();
    });

    it('should have called the toast error method', () => {
      expect(toast.error).toHaveBeenCalledTimes(1);
    });

    it('validates a trip', () => {
      const action = {
        tripData: {
          trips: [{
            'origin':'Nashville, United States',
            'destination':'Dschang, Cameroon',
            'departureDate':'2019-04-20',
            'returnDate':'2019-04-30',
            'bedId':-1
          }]
        },
      };
      return expectSaga(watchValidateTrips, TripsAPI)
        .provide([call(TripsAPI.validateTrips, action.tripData), {}])
        .dispatch({
          type: 'VALIDATE_TRIP',
          tripData: action.tripData,
          cb: jest.fn(),
          errorFunction: jest.fn(),
        })
        .silentRun();
    });
  });
});
