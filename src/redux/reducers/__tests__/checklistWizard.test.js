import checklistWizard, { initialState } from '../checklistWizard';
import {
  handleAddChecklistItem,
  addChecklistItemSuccess,
  handleChecklistItems,
  handleItemsSuccess,
  addChecklistQuestion,
  addQuestionSuccess,
  deleteChecklistItems,
  deleteItemsSuccess,
  deleteQuestionSuccess,
  updateChecklistBehaviour,
  updateBehaviourSuccess,
  updateChecklistNationality,
  updateNationalitySuccess,
  updateChecklistDestination,
  updateDestinationSuccess,
  createDynamicChecklist,
  createDynamicChecklistSuccess,
  undoChecklist,
  redoChecklist,
  resetChecklist,
  getOneChecklist,
  getOneChecklistSuccess,
  getOneChecklistFailure
} from '../../actionCreator/travelChecklistWizardActions';

import travelDynamicChecklist from '../../../mockData/travelChecklistWizardMockData';
import {
  GET_ALL_DYNAMIC_CHECKLISTS,
  GET_ALL_DYNAMIC_CHECKLISTS_SUCCESS,
  GET_ALL_DYNAMIC_CHECKLISTS_FAILURE,
  GET_ONE_CHECKLIST,
  GET_ONE_CHECKLIST_SUCCESS,
  GET_ONE_CHECKLIST_FAILURE,
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

describe('Travel checklists wizard reducer', () => {
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

  it('should add checklist item to items on successful item addition',
    (done) => {
      const currentState = {
        ...initialState,
      };

      const action = handleItemsSuccess(travelDynamicChecklist.checklist2.items);
      const newState = checklistWizard(currentState, action);

      expect(newState).toMatchObject(travelDynamicChecklist.checklist2);
      done();
    });

  it('should update "item" on handle item success',
    (done) => {
      const currentState = {
        ...initialState,
      };

      const action = addChecklistItemSuccess(travelDynamicChecklist.checklist2.items);
      const newState = checklistWizard(currentState, action);

      expect(newState).toMatchObject(travelDynamicChecklist.checklist2);
      done();
    });

  it('should update "item" on add new question success',
    (done) => {
      const currentState = {
        ...initialState,
      };

      const action = addQuestionSuccess(travelDynamicChecklist.checklist2.items);
      const newState = checklistWizard(currentState, action);

      expect(newState).toMatchObject(travelDynamicChecklist.checklist2);
      done();
    });

  it('should update "item" on delete items success',
    (done) => {
      const currentState = {
        ...initialState,
      };

      const action = deleteItemsSuccess(travelDynamicChecklist.checklist2.items);
      const newState = checklistWizard(currentState, action);

      expect(newState).toMatchObject(travelDynamicChecklist.checklist2);
      done();
    });

  it('should update "item" on delete question success',
    (done) => {
      const currentState = {
        ...initialState,
      };

      const action = deleteQuestionSuccess(travelDynamicChecklist.checklist2.items);
      const newState = checklistWizard(currentState, action);

      expect(newState).toMatchObject(travelDynamicChecklist.checklist2);
      done();
    });

  it('should update "item" on update behaviour success',
    (done) => {
      const currentState = {
        ...initialState,
      };

      const action = updateBehaviourSuccess(travelDynamicChecklist.checklist2.items);
      const newState = checklistWizard(currentState, action);

      expect(newState).toMatchObject(travelDynamicChecklist.checklist2);
      done();
    });

  it('should update "nationality" on update nationality success',
    (done) => {
      const currentState = {
        ...initialState,
        nationality: {name: 'nigeria', emoji: '9ja'}
      };

      const action = updateNationalitySuccess({name: 'nigeria', emoji: '9ja'});
      const newState = checklistWizard(currentState, action);
      expect(newState.nationality).toMatchObject(currentState.nationality);
      done();
    });

  it('should update "destination" on update destination success',
    (done) => {
      const currentState = {
        ...initialState,
        destinations: [{name: 'nigeria'}, {name: 'kenya'}]
      };

      const action = updateDestinationSuccess([{name: 'nigeria'}, {name: 'kenya'}]);
      const newState = checklistWizard(currentState, action);
      expect(newState.destinations).toMatchObject(currentState.destinations);
      done();
    });

  it('should undo succesfully',
    (done) => {
      const currentState = {
        ...initialState,
        destinations: [{name: 'nigeria'}, {name: 'kenya'}]
      };

      const action = undoChecklist();
      const newState = checklistWizard(currentState, action);
      expect(newState.destinations).toMatchObject([]);
      done();
    });

  it('should redo succesfully',
    (done) => {
      const currentState = {
        ...initialState,
        destinations: [{name: 'nigeria'}, {name: 'kenya'}],
        disableUndo: false
      };

      const action = redoChecklist();
      const newState = checklistWizard(currentState, action);
      expect(newState).toMatchObject(currentState);
      done();
    });

  it('should reset succesfully',
    (done) => {
      const currentState = {
        ...initialState,
        destinations: [{name: 'nigeria'}, {name: 'kenya'}],
        disableUndo: false
      };

      const action = resetChecklist();
      const newState = checklistWizard(currentState, action);
      expect(newState.nationality).toMatchObject({name: '', emoji: ''});
      expect(newState.destinations).toEqual([]);
      done();
    });

  it('should create "checklist" successfully',
    (done) => {
      const currentState = {
        ...initialState,
        message: 'checklist created successfully'
      };

      const action = createDynamicChecklistSuccess('checklist created successfully');
      const newState = checklistWizard(currentState, action);
      expect(newState.message).toEqual('checklist created successfully');
      done();
    });

  it('should return default state', (done) => {
    const newState = checklistWizard(initialState, {});
  
    expect(newState).toMatchObject(initialState);
    done();
    expect(newState).toMatchObject(initialState);
    done();
  });

  it('returns the correct state for GET_ONE_CHECKLIST', () => {
    const action = {
      type: GET_ONE_CHECKLIST
    };
    expect(checklistWizard(initialState, action)).toEqual({
      ...initialState,
      loading: true
    });
  });

  it('returns the correct state for GET_ONE_CHECKLIST_SUCCESS', () => {
    const checklist = [{
      'id': 2,
      'createdBy': '2414',
      'name': 'Nigeria-Angola',
      'config': [
        {
          'id': 'W8rf1uoGJ',
          'type': 'image',
          'order': 1,
          'prompt': 'Do you have a passport',
          'behaviour': {},
          'configuration': {
            'options': [
              {
                'id': 'KGCe-ZmzYG',
                'name': '',
                'behaviour': {}
              }
            ]
          }
        }
      ],
      'createdAt': '2019-07-30T20:46:23.771Z',
      'updatedAt': '2019-07-30T20:46:23.771Z',
      'destinations': [
        {
          'id': 2,
          'checklistId': 2,
          'countryId': 3,
          'regionId': null,
          'createdAt': '2019-07-30T20:46:23.863Z',
          'updatedAt': '2019-07-30T20:46:23.863Z',
          'country': {
            'id': 3,
            'country': 'Angola',
            'createdAt': '2019-07-30T20:46:23.797Z',
            'updatedAt': '2019-07-30T20:46:23.797Z',
            'regionId': 9999
          },
          'region': null
        }
      ],
      'origin': [
        {
          'id': 2,
          'checklistId': 2,
          'countryId': 101,
          'regionId': null,
          'createdAt': '2019-07-30T20:46:23.787Z',
          'updatedAt': '2019-07-30T20:46:23.787Z',
          'country': {
            'id': 101,
            'country': 'Nigeria',
            'createdAt': '2019-10-05T09:37:11.170Z',
            'updatedAt': '2019-10-05T09:37:11.170Z',
            'regionId': 1002
          },
          'region': null
        }
      ]
    }];
    const action = {
      type: GET_ONE_CHECKLIST_SUCCESS,
      payload: checklist
    };
    expect(checklistWizard(initialState, action)).toEqual({
      ...initialState,
      loading: false,
      checklist: action.payload
    });
  });

  it('returns the correct state for GET_ONE_CHECKLIST_FAILURE', () => {
    const action = {
      type: GET_ONE_CHECKLIST_FAILURE,
      error: 'something broke'
    };
    expect(checklistWizard(initialState, action)).toEqual({
      ...initialState,
      loading: false,
      error: action.error
    });
  });
});
