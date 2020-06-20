import { put, call, takeLatest } from 'redux-saga/effects';
import {
  fetchAvailableRooms,
  fetchAvailableRoomsSuccess,
  fetchAvailableRoomsfailure
} from '../actionCreator/availableRoomsActions';
import { FETCH_AVAILABLE_ROOMS } from '../constants/actionTypes';
import AvailableRoomsAPI from '../../services/AvailableRoomsAPI';
import apiErrorHandler from '../../services/apiErrorHandler';

export function* fetchAvailableRoomsSaga(action) {
  try {
    delete action.type;
    const response = yield call(AvailableRoomsAPI.getAvailableRooms, action);
    const { data } = response;
    yield put(fetchAvailableRoomsSuccess(data));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(fetchAvailableRoomsfailure(errorMessage));
  }
}

export function* watchFetchAvailableRooms() {
  yield takeLatest(FETCH_AVAILABLE_ROOMS, fetchAvailableRoomsSaga);
}
