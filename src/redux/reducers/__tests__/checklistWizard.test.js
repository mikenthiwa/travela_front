import checklistWizard from '../checklistWizard';
import {
  GET_ALL_DYNAMIC_CHECKLISTS,
  GET_ALL_DYNAMIC_CHECKLISTS_SUCCESS,
  GET_ALL_DYNAMIC_CHECKLISTS_FAILURE
} from '../../constants/actionTypes';

const checklists = [{
  id: 1,
  createdBy: 'Jude Afam',
  name: 'poland-Uganda-dnZjGPGwo',
  config: [
    {
      url: '',
      type: 'image',
      order: 1,
      prompt: 'Do you have a passport',
      configuration: {
        url: '',
        options: [],
        behaviour: {
          name: 'preview image',
          action: {
            type: 'PREVIEW_IMAGE',
            payload: 'http://url'
          }
        }
      }
    }
  ],
  createdAt: '2019-07-18T15:16:35.047Z',
  updatedAt: '2019-07-18T15:16:35.047Z',
  ChecklistDestinations: 1,
  user: {
    fullName: 'Jude Afam'
  }
}];

const initialState = {
  checklists: [],
  loading: false,
  error: null
};

describe('Dynamic Checklist reducer', () => {
  it('returns the initial state', () => {
    expect(checklistWizard(undefined, {})).toEqual({
      ...initialState
    });
  });

  it('returns the correct state for GET_ALL_DYNAMIC_CHECKLISTS', () => {
    const action = {
      type: GET_ALL_DYNAMIC_CHECKLISTS
    };
    expect(checklistWizard(initialState, action)).toEqual({
      ...initialState,
      loading: true
    });
  });

  it('returns the correct state for GET_ALL_DYNAMIC_CHECKLISTS_SUCCESS', () => {
    const action = {
      type: GET_ALL_DYNAMIC_CHECKLISTS_SUCCESS,
      checklists
    };
    expect(checklistWizard(initialState, action)).toEqual({
      ...initialState,
      loading: false,
      checklists: action.checklists
    });
  });

  it('returns the correct state for GET_ALL_DYNAMIC_CHECKLISTS_FAILURE', () => {
    const action = {
      type: GET_ALL_DYNAMIC_CHECKLISTS_FAILURE,
      error: 'An error occurred'
    };
    expect(checklistWizard(initialState, action)).toEqual({
      ...initialState,
      loading: false,
      error: action.error
    });
  });
});
