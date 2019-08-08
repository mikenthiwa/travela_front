import checklistWizard, { initialState } from '../checklistWizard';
import {
  addChecklistItemSuccess,
  handleItemsSuccess,
  addQuestionSuccess,
  deleteItemsSuccess,
  deleteQuestionSuccess,
  updateBehaviourSuccess,
  updateNationalitySuccess,
  updateDestinationSuccess,
  createDynamicChecklistSuccess,
  undoChecklist,
  redoChecklist,
  resetChecklist,
  getOneChecklist,
  getOneChecklistSuccess,
  getOneChecklistFailure,
  deleteChecklist,
  deleteChecklistSuccess,
  deleteChecklistFailure,
  getDeletedChecklistsSuccess,
  restoreSingleChecklist,
  restoreSingleChecklistSuccess,
  restoreSingleChecklistFailure,
  restoreAllChecklists,
  restoreAllChecklistsSuccess,
  restoreAllChecklistsFailure,
  getSingleChecklistSuccess,
  getChecklistFromStorageSuccess
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

  it('should trigger loader on click of delete "checklist"',
    (done) => {
      const currentState = {
        ...initialState,
      };

      const action = deleteChecklist({}, 1);
      const newState = checklistWizard(currentState, action);
      expect(newState.isDeleting).toEqual(true);
      done();
    });

  it('should update the state on succesfully deleting a checklist',
    (done) => {
      const currentState = {
        ...initialState,
        deletedChecklists: [{ name: 'checklist'}],
        checklists: [{ item: [{name: 'checklist'}]}],
      };

      const action = deleteChecklistSuccess({}, 1);
      const newState = checklistWizard(currentState, action);
      expect(newState.isDeleting).toEqual(false);
      expect(newState.checklists).toEqual([{ item: [{name: 'checklist'}]}]);
      expect(newState.deletedChecklists).toEqual([{ name: 'checklist'}, {}]);
      done();
    });

  it('should set delete state to false on checklist delete failure',
  (done) => {
    const currentState = {
      ...initialState,
    };

    const action = deleteChecklistFailure();
    const newState = checklistWizard(currentState, action);
    expect(newState.isDeleting).toEqual(false);
    done();
  });

  it('should update deletedChecklist state with fetch deleted checklist data',
  (done) => {
    const currentState = {
      ...initialState,
    };

    const action = getDeletedChecklistsSuccess([{name: 'deleted checklist'}]);
    const newState = checklistWizard(currentState, action);
    expect(newState.deletedChecklists).toEqual([{name: 'deleted checklist'}]);
    done();
  });

  it('should set restoring state to true when restoring a deleted checklist',
  (done) => {
    const currentState = {
      ...initialState,
    };

    const action = restoreSingleChecklist({}, 1);
    const newState = checklistWizard(currentState, action);
    expect(newState.isRestoring).toEqual(true);
    done();
  });

  it('should update the state on successfully restoring a checklist',
  (done) => {
    const currentState = {
      ...initialState,
      deletedChecklists: [{name: 'remove from deleted checklists'}],
      checklists: [{name: 'restored checklist'}]
    };

    const action = restoreSingleChecklistSuccess({}, 1);
    const newState = checklistWizard(currentState, action);
    expect(newState.isRestoring).toEqual(false);
    expect(newState.deletedChecklists).toEqual([{name: 'remove from deleted checklists'}]);
    expect(newState.checklists).toEqual([{name: 'restored checklist'}, {}]);
    done();
  });

  it('should set restoring state to false when restoring a deleted checklist fails',
  (done) => {
    const currentState = {
      ...initialState,
    };

    const action = restoreSingleChecklistFailure();
    const newState = checklistWizard(currentState, action);
    expect(newState.isRestoring).toEqual(false);
    done();
  });

  it('should set restoring state to true when restoring all checklists',
  (done) => {
    const currentState = {
      ...initialState,
    };

    const action = restoreAllChecklists();
    const newState = checklistWizard(currentState, action);
    expect(newState.isRestoring).toEqual(true);
    done();
  });

  it('should update the state on successfully restoring all checklist',
  (done) => {
    const currentState = {
      ...initialState,
      deletedChecklists: [],
      checklists: [{name: 'restored checklist'}]
    };

    const action = restoreAllChecklistsSuccess({}, 1);
    const newState = checklistWizard(currentState, action);
    expect(newState.isRestoring).toEqual(false);
    expect(newState.deletedChecklists).toEqual([]);
    expect(newState.checklists).toEqual([{name: 'restored checklist'}]);
    done();
  });

  it('should set restoring state to false when restoring all checklists fails',
  (done) => {
    const currentState = {
      ...initialState,
    };

    const action = restoreAllChecklistsFailure();
    const newState = checklistWizard(currentState, action);
    expect(newState.isRestoring).toEqual(false);
    done();
  });

  it('should update state on successfully fetching a single checklist',
  (done) => {
    const currentState = {
      ...initialState,
    };

    const action = getSingleChecklistSuccess({ name: 'Nigeria'}, [{ name: 'ghana'}, {name: 'Nigeria'}], [{ name: 'items' }]);
    const newState = checklistWizard(currentState, action);
    expect(newState.nationality).toEqual({ name: 'Nigeria'});
    expect(newState.destinations).toEqual([{ name: 'ghana'}, {name: 'Nigeria'}]);
    expect(newState.items).toEqual([{ name: 'items' }]);
    done();
  });

  it('should update state on successfully fetching a checklist from localstorage',
  (done) => {
    const currentState = {
      ...initialState,
    };

    const action = getChecklistFromStorageSuccess({ name: 'Nigeria'}, [{ name: 'ghana'}, {name: 'Nigeria'}], [{ name: 'items' }]);
    const newState = checklistWizard(currentState, action);
    expect(newState.nationality).toEqual({ emoji: "", name: 'Nigeria'});
    expect(newState.destinations).toEqual([{ name: 'ghana'}, {name: 'Nigeria'}]);
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
