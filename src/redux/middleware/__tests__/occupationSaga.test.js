import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';
import { fetchOccupationsResponse } from '../../__mocks__/reduxMocks';
import { watchFetchOccupations } from '../occupationSaga';
import OccupationAPI from '../../../services/OccupationAPI';

const error = {
  response: {
    data: {
      error: 'Possible network error, please reload the page'
    }
  }
};

describe('occupations saga', () => {
  it('fetches occupations from API', () => {
    return expectSaga(watchFetchOccupations, OccupationAPI)
      .provide([
        [call(OccupationAPI.getOccupationData), fetchOccupationsResponse]
      ])
      .put({
        type: 'FETCH_OCCUPATIONS_SUCCESS',
        occupations: fetchOccupationsResponse.data.occupations
      })
      .dispatch({
        type: 'FETCH_OCCUPATIONS'
      })
      .silentRun();
  }
  );

  it('throws error if there is an error fetching a user\'s requests', () => {
    return expectSaga(watchFetchOccupations, OccupationAPI)
      .provide([
        [
          matchers.call.fn(OccupationAPI.getOccupationData, fetchOccupationsResponse),
          throwError(error)
        ]
      ])
      .put({
        type: 'FETCH_OCCUPATIONS_FAILURE',
        error: error.response.data.error
      })
      .dispatch({
        type: 'FETCH_OCCUPATIONS'
      })
      .silentRun();
  });
});
