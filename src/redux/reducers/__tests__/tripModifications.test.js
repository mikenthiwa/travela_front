import tripModifications from '../tripModifications';
import {
  fetchModificationRequest, fetchModificationRequestFailure, fetchModificationRequestSuccess,
  submitModificationRequest,
  submitModificationRequestFailure,
  submitModificationRequestSuccess, updateModification, updateModificationFailure, updateModificationSuccess
} from '../../actionCreator/tripModificationActions';

const reducer = (action, initialState) => {
  return tripModifications(initialState, action);
};

const modification = {
  id: 1,
  type: 'Cancel Trip',
  status: 'Open'
};
describe('Trip modifications reducer', () => {
  describe('view single request reducer', () => {
    it('submit modification request', () => {
      const result = reducer( submitModificationRequest(1, 'Cancel Trip', 'Some reason'));

      expect(result.viewRequest).toMatchObject({
        submittingRequest: true,
        pending: false
      });
    });

    it('submit modification success', () => {
      expect(reducer(submitModificationRequestSuccess({ modification})).viewRequest)
        .toMatchObject({
          submittingRequest: false,
          pendingModification: modification
        });
    });

    it('submit modification failure', () => {
      expect(reducer(submitModificationRequestFailure('something went wrong')).viewRequest)
        .toMatchObject({
          submittingRequest: false,
          errors: 'something went wrong'
        });
    });

    it('fetch modification request', () => {
      expect(reducer(fetchModificationRequest(1)).viewRequest)
        .toMatchObject({
          fetchingModifications: true,
          submittingRequest: false
        });
    });

    it('fetch modification request success', () => {
      expect(reducer(fetchModificationRequestSuccess({
        pendingModification: modification,
        pastModifications: []
      })).viewRequest)
        .toMatchObject({
          fetchingModifications: false,
          pendingModification: modification,
          pastModifications: []
        });
    });

    it('fetch modification request failure', () => {
      expect(reducer(fetchModificationRequestFailure('something went wrong')).viewRequest)
        .toMatchObject({
          fetchingModifications: false,
          errors: 'something went wrong'
        });
    });

    it('should return the default state', () => {
      expect(reducer({ type: 'none'}).viewRequest)
        .toMatchObject({
          submittingRequest: false,
          fetchingModifications: false,
          errors: '',
          pastModifications: [],
          pendingModification: null
        });
    });
  });

  describe('update request sub reducer', () => {
    it('update modification request', () => {
      expect(reducer(updateModification(1, 'Approved')).updateRequest)
        .toMatchObject({
          updatingStatus: true
        });
    });
    it('update modification success', () => {
      expect(reducer(updateModificationSuccess({})).updateRequest)
        .toMatchObject({
          updatingStatus: false
        });
    });

    it('update modification failure', () => {
      expect(reducer(updateModificationFailure('something went wrong')).updateRequest)
        .toMatchObject({
          updatingStatus: false,
          errors: 'something went wrong'
        });
    });

    it('should return the default status', () => {
      expect(reducer({type: 'none'}).updateRequest)
        .toMatchObject({
          updatingStatus: false,
          errors: ''
        });
    });
  });
});
