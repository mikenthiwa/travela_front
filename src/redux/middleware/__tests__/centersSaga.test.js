import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';
import CentersAPI from '../../../services/CentersAPI';
import { watchFetchCenters, watchUpdateUserCenters } from '../centersSaga';
import {
  UPDATE_USER_CENTER,
  UPDATE_USER_CENTER_SUCCESS,
  UPDATE_USER_CENTER_FAILURE
} from '../../constants/actionTypes';

const error = {
  response: {
    data: {
      error: 'An error occurred'
    }
  }
};

const userId = 1;

const response = {
  data: {
    centers: [
      {
        id: 1,
        location: 'Lagos, Nigeria'
      },
      {
        id: 2,
        location: 'Nairobi, Kenya'
      }
    ]
  }
};

const response11 = {
  data: {
    newCenter: {
      center: 'New York, USA'
    }
  }
};


const action = {
  newCenter: {
    center: 'New York, USA'
  }
};

const data = {
  email: 'tomato@andela.com',
  roleName: 'Travel Team Member',
  center: ['Lagos', 'New York']
};
describe('Centers Saga', () => {
  it('fetches centers', () => {
    return expectSaga(watchFetchCenters, CentersAPI)
      .provide([[matchers.call.fn(CentersAPI.fetchCenters), response]])
      .put({
        type: 'FETCH_CENTERS_SUCCESS',
        centers: response.data.centers
      })
      .dispatch({
        type: 'FETCH_CENTERS'
      })
      .silentRun();
  });
  it('throws error if there is an error fetching centers', () => {
    return expectSaga(watchFetchCenters, CentersAPI)
      .provide([[matchers.call.fn(CentersAPI.fetchCenters), throwError(error)]])
      .put({
        type: 'FETCH_CENTERS_FAILURE',
        error: error.response.data.error
      })
      .dispatch({
        type: 'FETCH_CENTERS'
      })
      .silentRun();
  });
});
describe('Centers Saga', () => {
  const data = {
    email: 'tomato@andela.com',
    roleName: 'Travel Team Member',
    center: ['Lagos', 'New York']
  };

  const response = {
    data: {
      success: true,
      message: 'Centres updated successfully',
      add: [[{
        userId: 1,
        roleId: 29187,
        createdAt: '2019-04-17T08:12:34.815Z',
        updatedAt: '2019-04-17T08:12:34.815Z'
      }]]
    }
  };

  it('Update user centers', () => {    
    return expectSaga(watchUpdateUserCenters, CentersAPI)
      .provide([
        [matchers.call.fn(CentersAPI.updateUserCenters, data), response]
      ])
      .put({
        type: UPDATE_USER_CENTER_SUCCESS,
        response: response.data
      })
      .dispatch({
        type: UPDATE_USER_CENTER,
        data
      })
      .silentRun();
  });

  it('throws error if there is an error fupdating the user centers', () => {
    return expectSaga(watchUpdateUserCenters, CentersAPI)
      .provide([[matchers.call.fn(CentersAPI.updateUserCenters), throwError(error)]])
      .put({
        type: UPDATE_USER_CENTER_FAILURE,
        error: error.response.data.error
      })
      .dispatch({
        type: UPDATE_USER_CENTER
      })
      .silentRun();
  });
});
