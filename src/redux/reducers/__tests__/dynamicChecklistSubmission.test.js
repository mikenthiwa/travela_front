import dynamicChecklistSubmissionReducer from '../dynamicChecklistSubmission';
import * as actions from '../../actionCreator/dynamicChecklistSubmissionActions';

describe('Dynamic Checklist Submissions Reducer', () => {
  const initialState = {
    id: '',
    checklists: [],
    trips: [],
    updatedAt: '',
    isSubmitted: false,
    isLoading: false,
    isSaving: false,
    completionCount: 0,
    error: null,
  };

  const payload = {
    checklist: {
      checklists: [],
      trips: []
    }
  };

  it('return initial state', () => {
    expect(dynamicChecklistSubmissionReducer(undefined, { type: 'INVALID_ACTION'})).toEqual(initialState);
  });

  it('post checklist submission reducer', () => {
    expect(dynamicChecklistSubmissionReducer(initialState, actions.postChecklistSubmissionStarted()))
      .toEqual({ ...initialState, isSaving: true });
  });

  it('post checklist submission success', () => {
    expect(dynamicChecklistSubmissionReducer(initialState, actions.postChecklistSubmissionSuccess(payload)))
      .toEqual({ ...initialState, isSaving: false, ...payload.checklist });
  });

  it('post checklist submission failure', () => {
    const  error = 'something went wrong';
    expect(dynamicChecklistSubmissionReducer(initialState, actions.postChecklistSubmissionFailure(error)))
      .toEqual({ ...initialState, isSaving: false, error});
  });
  
  it('fetch checklist submission', () => {
    expect(dynamicChecklistSubmissionReducer(initialState, actions.fetchChecklistSubmission()))
      .toEqual({ ...initialState, isLoading: true});
  });
  
  it('fetch checklist submission success', () => {
    expect(dynamicChecklistSubmissionReducer(initialState, actions.fetchChecklistSubmissionSuccess(payload)))
      .toEqual({ ...initialState, isLoading: false, ...payload.checklist});
  });
  
  it('fetch checklist submission failure', () => {
    const  error = 'something went wrong';
    expect(dynamicChecklistSubmissionReducer(initialState, actions.fetchChecklistSubmissionFailure(error)))
      .toEqual({ ...initialState, isLoading: false, error});
  });

  it('update checklist submission', () => {
    const payload = {
      field: 'checklists',
      isFieldArray: true,
      data: { id: 'some' },
    };
    
    expect(dynamicChecklistSubmissionReducer({ ...initialState, checklists: [{ id: 'some' }]}, actions.updateChecklistSubmission(payload)).checklists)
      .toEqual([{ id: 'some' }]);
  });
});
