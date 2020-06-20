import {
  fetchCenters,
  fetchCentersSuccess,
  fetchCentersFailure,
} from '../centersActions';

const centersResponse = {
  data: {
    centers: [{
      id: 1,
      location: 'Lagos, Nigeria'
    },
    {
      id: 2,
      location: 'Nairobi, Kenya'
    }]
  }
};
describe('Centers Actions', () => {
  describe('Fetch centers', () => {
    it('should return action type FETCH_CENTERS', () => {
      const expectedAction = {
        type: 'FETCH_CENTERS',
      };
      const createdAction = fetchCenters();
      expect(createdAction).toEqual(expectedAction);
    });
    it('should return action type FETCH_CENTERS_SUCCESS', () => {
      const { centers } = centersResponse.data;
      const expectedAction = {
        type: 'FETCH_CENTERS_SUCCESS',
        centers: centers
      };
      const newAction = fetchCentersSuccess(centersResponse.data);
      expect(newAction).toEqual(expectedAction);
    });
    it('should return action type FETCH_CENTERS_FAILURE', () => {
      const error = 'An error occurred. Please reload page';
      const expectedAction = {
        type: 'FETCH_CENTERS_FAILURE',
        error
      };
      const newAction = fetchCentersFailure(error);
      expect(newAction).toEqual(expectedAction);
    });
  });
});
