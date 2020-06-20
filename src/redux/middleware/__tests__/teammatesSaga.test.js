import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as  matchers from 'redux-saga-test-plan/matchers';

import { watchFetchTeammates } from '../homeSaga';
import HomeAPI from '../../../services/HomeAPI';
import {
  FETCH_TEAMMATES_SUCCESS,
  FETCH_TEAMMATES,
  FETCH_TEAMMATES_FAILURE,
} from '../../constants/actionTypes';

const responseMock =  {
  'name': 'Alice Doe',
  'picture': 'https://randomuser.me/api/portraits/men/25.jpg',
  'destination': 'Lagos',
  'departureDate': '2019-10-16',
  'returnDate': '2018-07-20'
};

const error = 'Error Message';
describe('Test Home Saga', () => {
  const response = {
    data:  { teammates: [responseMock] }
  };

  it('should fetch all the teammates successfully', () => {
    return expectSaga(watchFetchTeammates, HomeAPI)
      .provide([[matchers.call.fn(HomeAPI.getTeammates, 'TDD'), response]])
      .put({
        type: FETCH_TEAMMATES_SUCCESS,
        payload: response.data.teammates
      })
      .dispatch({
        type: FETCH_TEAMMATES,
        query: 'TDD'
      })
      .silentRun();
  });

  it('throws an error when fetching teammates fails', () => {
    const error = new Error('Server error, try again');
    error.response = { status: 500 };
    expectSaga(watchFetchTeammates, HomeAPI)
      .provide([
        [matchers.call.fn(HomeAPI.getTeammates, 'TDD'), throwError(error)]
      ])
      .put({
        type: FETCH_TEAMMATES_FAILURE,
        error
      })
      .dispatch({
        type: FETCH_TEAMMATES,
        query: 'TDD'
      })
      .silentRun();
  });
});
