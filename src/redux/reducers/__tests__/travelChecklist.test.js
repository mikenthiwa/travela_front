import travelChecklistReducer, { initialState } from '../travelChecklist';
import {
  fetchTravelChecklist,
  fetchTravelChecklistFailure,
  fetchTravelChecklistSuccess,
  createChecklistFailure,
  createTravelChecklist,
  createChecklistSuccess,
  fetchDeletedChecklistItems,
  fetchDeletedChecklistItemsSuccess,
  fetchDeletedChecklistItemsFailure,
  restoreChecklist,
  restoreChecklistSuccess,
  restoreChecklistFailure
} from '../../actionCreator/travelChecklistActions';
import travelChecklistMockData from '../../__mocks__/travelChecklistsMockData';
import { 
  DELETE_TRAVEL_CHECKLIST_FAILURE,
  DELETE_TRAVEL_CHECKLIST_SUCCESS,
  DELETE_TRAVEL_CHECKLIST
} from '../../constants/actionTypes';

describe('Travel checklists reducer', () => {
  describe('Fetch travel checklists reducer', () => {
    it(`should update 'isLoading' state to true
    while sending get travel checklist server request`, (done) => {
      const action = fetchTravelChecklist('request-test-id');
      const newState = travelChecklistReducer(initialState, action);
      expect(newState.isLoading).toBe(true);
      done();
    });

    it('should add travelChecklist to state on successful fetching',
      (done) => {
        const currentState = {
          ...initialState,
          isLoading: true,
          checklistItems: travelChecklistMockData
        };
        const response = {
          travelChecklists: travelChecklistMockData
        };

        const action = fetchTravelChecklistSuccess(response);
        const newState = travelChecklistReducer(currentState, action);

        expect(newState.isLoading).toBe(false);
        expect(newState.checklistItems).toMatchObject(travelChecklistMockData);
        done();
      });

    it('should add error to state on unsuccessful fetching',
      (done) => {
        const currentState = {
          ...initialState,
          isLoading: true,
          checklistItems: travelChecklistMockData
        };
        const error = 'Server Error';

        const action = fetchTravelChecklistFailure(error);
        const newState = travelChecklistReducer(currentState, action);

        expect(newState).toEqual({
          ...initialState,
          isLoading: false,
          checklistItems: [],
          error: 'Server Error'
        });

        done();
      });
  });

  describe('Update travel checklist reducer', () => {
    const initialState = {
      updatingChecklist: false,
      checklistItems: [
        {
          checklist: [
            {name: 'Tax clearance', id: 'sd343f4'},
            {name: 'Passport', id: '34ffr4'}
          ]
        }
      ],
      error: ''
    };

    let action, newState, expectedState;


    it('should handle UPDATE_TRAVEL_CHECKLIST', () => {
      action = {
        type: 'UPDATE_TRAVEL_CHECKLIST',
        checklistItems: [
          {
            checklist: [
              {name: 'Tax clearance', id: 'sd343f4'},
              {name: 'Passport', id: '34ffr4'}
            ]
          }
        ],
      };

      newState = travelChecklistReducer(initialState, action);
      expectedState = {
        updatingChecklist: true,
        checklistItems: [
          {
            checklist: [{id: 'sd343f4', name: 'Tax clearance'}, {id: '34ffr4', name: 'Passport'}]
          }
        ],
        error: ''
      };

      expect(newState).toEqual(expectedState);
    });
    it('should handle UPDATE_TRAVEL_CHECKLIST_SUCCESS', () => {
      action = {
        type: 'UPDATE_TRAVEL_CHECKLIST_SUCCESS',
        updatedChecklistItem: {name: 'Tax clearance', id: 'sd343f4'},
        checklistItemId: 'sd343f4'
      };

      newState = travelChecklistReducer(initialState, action);
      expectedState = {
        checklistItems: [
          {
            checklist: [
              {name: 'Tax clearance', id: 'sd343f4'},
              {name: 'Passport', id: '34ffr4'}
            ]
          }
        ],
        updatingChecklist: false
      },

      expect(newState).toMatchObject(expectedState);
    });
    it('should handle UPDATE_TRAVEL_CHECKLIST_FAILURE', () => {
      action = {
        type: 'UPDATE_TRAVEL_CHECKLIST_FAILURE',
        error: {message: 'Something went wrong'}
      };

      newState = travelChecklistReducer(initialState, action);

      expectedState = {
        updatingChecklist: false,
        checklistItems: [
          {
            checklist: [{id: 'sd343f4', name: 'Tax clearance'}, {id: '34ffr4', name: 'Passport'}]
          }
        ],
        error: {message: 'Something went wrong'}
      };

      expect(newState).toEqual(expectedState);
    });
  });

  describe('Delete travelChecklist reducer', () => {
    let action, newState, expectedState;

    it('should return initial state', () => {
      expect(travelChecklistReducer(undefined, {})).toEqual({
        ...initialState
      });
    });

    it('should handle DELETE_TRAVEL_CHECKLIST', () => {
      action = {
        type: DELETE_TRAVEL_CHECKLIST,
        checklistItemId: 'zcis7csUe',
      };

      newState = travelChecklistReducer(initialState, action);
      expectedState = {
        checklistItems: [],
        creatingChecklist: false,
        deletedCheckListItems: [],
        deletingChecklist: true,
        error: '',
        fetchingChecklists: false,
        isLoading: false,
        updatingChecklist: false
      },

      expect(newState).toEqual(expectedState);
    });

    it('should handle DELETE_TRAVEL_CHECKLIST_SUCCESS', () => {
      const currentState = {
        ...initialState,
        isLoading: false,
        checklistItems: [{
          checklist: [
            { name: 'Tax clearance', id: 'sd343f4' },
            { name: 'Green Card', id: 'sb879f4' }
          ]
        }]
      };
      action = {
        type: DELETE_TRAVEL_CHECKLIST_SUCCESS,
        checklistItemId: 'wsis45cUe',
        disabledChecklistItem: { 
          resources: []
        },
      };

      newState = travelChecklistReducer(currentState, action);

      expectedState = {
        checklistItems: [{
          checklist: [
            { name: 'Tax clearance', id: 'sd343f4' },
            { name: 'Green Card', id: 'sb879f4' }
          ]
        }],
        creatingChecklist: false,
        deletedCheckListItems: [
          {
            resources: []
          }
        ],
        deletingChecklist: false,
        error: '',
        fetchingChecklists: false,
        isLoading: false,
        updatingChecklist: false
      },
      expect(newState).toEqual(expectedState);
    });

    it('should handle DELETE_TRAVEL_CHECKLIST_FAILURE', () => {
      const error = 'Checklist item not found';
      action = {
        type: DELETE_TRAVEL_CHECKLIST_FAILURE,
        error
      };

      newState = travelChecklistReducer(initialState, action);
      expectedState = {
        deletingChecklist: false,
        error: 'Checklist item not found'
      };
      expect(newState).toMatchObject(expectedState);
    });
  });
  describe('Create travel checklist reducer', () => {
    it('should return initial state', () => {
      expect(travelChecklistReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle CREATE_TRAVEL_CHECKLIST', () => {
      const action = createTravelChecklist({
        name: 'name',
        requiresFiles: true,
        label: 'label',
        link: 'link'
      });
      const newState = travelChecklistReducer(initialState, action);
      expect(newState.creatingChecklist).toBe(true);
    });

    it('should handle CREATE_TRAVEL_CHECKLIST_SUCCESS',
      () => {
        const currentState = {
          ...initialState,
          creatingChecklist: true,
          checklistItems: [{
            checklist: []
          }]
        };
        const checklist = {
          name: 'name',
          requiresFiles: true,
          label: 'label',
          link: 'link'
        };

        const action = createChecklistSuccess(checklist);
        const newState = travelChecklistReducer(currentState, action);

        expect(newState.creatingChecklist).toBe(false);
        expect(newState.checklistItems).toEqual([{checklist: [checklist]}]);
      });

    it('should handle CREATE_TRAVEL_CHECKLIST_FAILURE',
      () => {
        const currentState = {
          ...initialState,
          creatingChecklist: true,
          checklistItems: travelChecklistMockData
        };
        const error = 'Error';
        const action = createChecklistFailure(error);
        const newState = travelChecklistReducer(currentState, action);
        expect(newState.creatingChecklist).toEqual(false);
        expect(newState.error).toEqual(error);
      });
  });

  describe('View deleted checklist items reducer', () => {
    it(`should update 'isLoading' state to true while 
      sending get deleted checklist items server request`, (done) => {
      const action = fetchDeletedChecklistItems('destinationName');
      const newState = travelChecklistReducer(initialState, action);
      expect(newState.isLoading).toBe(true);
      done();
    });

    it('should handle FETCH_DELETED_CHECKLISTITEMS_SUCCESS',
      (done) => {
        const currentState = {
          ...initialState,
          isLoading: true,
          deletedCheckListItems: []
        };
        const response = {
          deletedTravelChecklists: travelChecklistMockData
        };
        const action = fetchDeletedChecklistItemsSuccess(response);
        const newState = travelChecklistReducer(currentState, action);
        expect(newState.isLoading).toBe(false);
        expect(newState.deletedCheckListItems).toMatchObject(travelChecklistMockData);
        done();
      });

    it('should handle FETCH_DELETED_CHECKLISTITEMS_FAILURE',
      (done) => {
        const currentState = {
          ...initialState,
          isLoading: true,
          deletedCheckListItems: []
        };
        const error = 'Error';
        const action = fetchDeletedChecklistItemsFailure(error);
        const newState = travelChecklistReducer(currentState, action);
        expect(newState.isLoading).toBe(false);
        expect(newState.error).toEqual(error);
        done();
      });
  });

  describe('Restore travel checklist reducer', () => {
    const initialState = {
      updatingChecklist: false,
      checklistItems: [
        {
          checklist: [
            {name: 'Tax clearance', id: 'sd343f4'},
            {name: 'Passport', id: '34ffr4'}
          ]
        }
      ],
      error: ''
    };

    let action, newState, expectedState;


    it('should handle RESTORE_TRAVEL_CHECKLIST', () => {
      action = {
        type: 'RESTORE_TRAVEL_CHECKLIST',
        checklistItems: [
          {
            checklist: [
              {name: 'Tax clearance', id: 'sd343f4'},
              {name: 'Passport', id: '34ffr4'}
            ]
          }
        ],
      };

      newState = travelChecklistReducer(initialState, action);
      expectedState = {
        updatingChecklist: true,
        checklistItems: [
          {
            checklist: [{id: 'sd343f4', name: 'Tax clearance'}, {id: '34ffr4', name: 'Passport'}]
          }
        ],
        error: ''
      };

      expect(newState).toEqual(expectedState);
    });
    it('should handle RESTORE_TRAVEL_CHECKLIST_SUCCESS', () => {
      const currentState = {
        ...initialState,
        deletedCheckListItems: [
          {id: 'sd343f4', name: 'Tax clearance'},
          {id: '34ffr4', name: 'Passport'}
        ],
        checklistItems: []
      };

      action = {
        type: 'RESTORE_TRAVEL_CHECKLIST_SUCCESS',
        updatedChecklistItem: { name: 'Tax clearance', id: 'sd343f4', deletedAt: null },
        checklistItemId: 'sd343f4'
      };

      newState = travelChecklistReducer(currentState, action);
      expectedState = {
        checklistItems: [
          {
            checklist: [
              { name: 'Tax clearance', id: 'sd343f4', deletedAt: null }
            ]
          },
        ],
        deletedCheckListItems: [ 
          {id: '34ffr4', name: 'Passport'}
        ],
        updatingChecklist: false,
        error: ''
      },

      expect(newState).toMatchObject(expectedState);
    });
    it('should handle RESTORE_TRAVEL_CHECKLIST_SUCCESS and update the state', () => {
      const currentState = {
        ...initialState,
        deletedCheckListItems: [
          {id: 'sd343f4', name: 'Tax clearance'},
          {id: '34ffr4', name: 'Passport'},
        ],
        checklistItems: [
          {
            checklist: [
              { name: 'Green Card', id: '2d390d5', deletedAt: null }
            ]
          }
        ]
      };

      action = {
        type: 'RESTORE_TRAVEL_CHECKLIST_SUCCESS',
        updatedChecklistItem: { name: 'Tax clearance', id: 'sd343f4', deletedAt: null },
        checklistItemId: 'sd343f4'
      };

      newState = travelChecklistReducer(currentState, action);
      expectedState = {
        checklistItems: [
          {
            checklist: [
              { name: 'Tax clearance', id: 'sd343f4', deletedAt: null },
              { name: 'Green Card', id: '2d390d5', deletedAt: null }
            ]
          },
        ],
        deletedCheckListItems: [ 
          {id: '34ffr4', name: 'Passport'}
        ],
        updatingChecklist: false,
        error: ''
      },

      expect(newState).toMatchObject(expectedState);
    });
    it('should handle RESTORE_TRAVEL_CHECKLIST_FAILURE', () => {
      action = {
        type: 'RESTORE_TRAVEL_CHECKLIST_FAILURE',
        error: {message: 'Something went wrong'}
      };

      newState = travelChecklistReducer(initialState, action);

      expectedState = {
        updatingChecklist: false,
        checklistItems: [
          {
            checklist: [{id: 'sd343f4', name: 'Tax clearance'}, {id: '34ffr4', name: 'Passport'}]
          }
        ],
        error: {message: 'Something went wrong'}
      };

      expect(newState).toEqual(expectedState);
    });
  });
});
