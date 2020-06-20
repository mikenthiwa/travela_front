import {
  getAllDynamicChecklists,
  getAllDynamicChecklistsSuccess,
  getAllDynamicChecklistsFailure,
  deleteChecklist,
  deleteChecklistSuccess,
  deleteChecklistFailure,
  getDeletedChecklists,
  getDeletedChecklistsSuccess,
  restoreSingleChecklist,
  restoreSingleChecklistSuccess,
  restoreSingleChecklistFailure,
  restoreAllChecklists,
  restoreAllChecklistsSuccess,
  restoreAllChecklistsFailure,
  getSingleChecklist,
  getSingleChecklistSuccess,
  updateChecklist,
  updateChecklistSuccess,
  getChecklistFromStorage,
  getChecklistFromStorageSuccess,
  undoChecklist,
  redoChecklist,
  resetChecklist
} from '../travelChecklistWizardActions';
  
const checklists = [
  {
    'id': 1,
    'createdBy': 'Jude Afam',
    'name': 'poland-Uganda-dnZjGPGwo',
    'config': [
      {
        'url': '',
        'type': 'image',
        'order': 1,
        'prompt': 'Do you have a passport',
        'configuration': {
          'url': '',
          'options': [],
          'behaviour': {
            'name': 'preview image',
            'action': {
              'type': 'PREVIEW_IMAGE',
              'payload': 'http://url'
            }
          }
        }
      }
    ],
    'createdAt': '2019-07-18T15:16:35.047Z',
    'updatedAt': '2019-07-18T15:16:35.047Z',
    'ChecklistDestinations': 1,
    'user': {
      'fullName': 'Jude Afam'
    }
  },
  {
    'id': 2,
    'createdBy': 'Jude Afam',
    'name': 'poland-Uganda-SNFDsMImM',
    'config': [
      {
        'url': '',
        'type': 'image',
        'order': 1,
        'prompt': 'Do you have a passport',
        'configuration': {
          'url': '',
          'options': [],
          'behaviour': {
            'name': 'preview image',
            'action': {
              'type': 'PREVIEW_IMAGE',
              'payload': 'http://url'
            }
          }
        }
      }
    ],
    'createdAt': '2019-07-18T15:17:07.114Z',
    'updatedAt': '2019-07-18T15:17:07.114Z',
    'ChecklistDestinations': 1,
    'user': {
      'fullName': 'Jude Afam'
    }
  }
];

describe('Get all Checklist wizard actions', () => {
  it('should return action type GET_ALL_DYNAMIC_CHECKLISTS', () => {
    const expectedAction = {
      type: 'GET_ALL_DYNAMIC_CHECKLISTS',
    };
    const newAction = getAllDynamicChecklists();
    expect(newAction).toEqual(expectedAction);
  });

  it('should return action type GET_ALL_DYNAMIC_CHECKLISTS_SUCCESS', () => {
    const expectedAction = {
      type: 'GET_ALL_DYNAMIC_CHECKLISTS_SUCCESS',
      checklists
    };
    const newAction = getAllDynamicChecklistsSuccess(checklists);
    expect(newAction).toEqual(expectedAction);
  });

  it('should return action type GET_ALL_DYNAMIC_CHECKLISTS_FAILURE', () => {
    const error = 'Unable to get all dynamic checklists';
    const expectedAction = {
      type: 'GET_ALL_DYNAMIC_CHECKLISTS_FAILURE',
      error
    };
    const newAction = getAllDynamicChecklistsFailure(error);
    expect(newAction).toEqual(expectedAction);
  });

  it('should return action of type DELETE_CHECKLIST', (done) => {
    const expectedAction = {
      type: 'DELETE_CHECKLIST',
      deletedChecklist: [{}],
      checklistId: 1
    };

    const newAction = deleteChecklist([{}], 1);
    expect(newAction).toEqual(expectedAction);
    done();
  });

  it('should return action of type DELETE_CHECKLIST_SUCCESS', (done) => {
    const expectedAction = {
      type: 'DELETE_CHECKLIST_SUCCESS',
      deletedChecklist: [{}],
      checklistId: 1
    };

    const newAction = deleteChecklistSuccess([{}], 1);
    expect(newAction).toEqual(expectedAction);
    done();
  });

  it('should return action of type DELETE_CHECKLIST_FAILURE', (done) => {
    const expectedAction = {
      type: 'DELETE_CHECKLIST_FAILURE',
    };

    const newAction = deleteChecklistFailure();
    expect(newAction).toEqual(expectedAction);
    done();
  });

  it('should return action of type GET_DELETED_CHECKLISTS', (done) => {
    const expectedAction = {
      type: 'GET_DELETED_CHECKLISTS',
    };

    const newAction = getDeletedChecklists();
    expect(newAction).toEqual(expectedAction);
    done();
  });

  it('should return action of type GET_ALL_DELETED_CHECKLISTS_SUCCESS', (done) => {
    const expectedAction = {
      type: 'GET_ALL_DELETED_CHECKLISTS_SUCCESS',
      deletedChecklists: [{}]
    };

    const newAction = getDeletedChecklistsSuccess([{}]);
    expect(newAction).toEqual(expectedAction);
    done();
  });

  it('should return action of type RESTORE_CHECKLIST', (done) => {
    const expectedAction = {
      type: 'RESTORE_CHECKLIST',
      restoredChecklist: [{}],
      checklistId: 1
    };

    const newAction = restoreSingleChecklist([{}], 1);
    expect(newAction).toEqual(expectedAction);
    done();
  });

  it('should return action of type RESTORE_CHECKLIST_SUCCESS', (done) => {
    const expectedAction = {
      type: 'RESTORE_CHECKLIST_SUCCESS',
      restoredChecklist: [{}],
      checklistId: 1
    };

    const newAction = restoreSingleChecklistSuccess([{}], 1);
    expect(newAction).toEqual(expectedAction);
    done();
  });

  it('should return action of type RESTORE_CHECKLIST_FAILURE', (done) => {
    const expectedAction = {
      type: 'RESTORE_CHECKLIST_FAILURE',
    };

    const newAction = restoreSingleChecklistFailure();
    expect(newAction).toEqual(expectedAction);
    done();
  });

  it('should return action of type RESTORE_ALL_CHECKLISTS', (done) => {
    const expectedAction = {
      type: 'RESTORE_ALL_CHECKLISTS',
    };

    const newAction = restoreAllChecklists();
    expect(newAction).toEqual(expectedAction);
    done();
  });

  it('should return action of type RESTORE_ALL_CHECKLISTS_SUCCESS', (done) => {
    const expectedAction = {
      type: 'RESTORE_ALL_CHECKLISTS_SUCCESS',
    };

    const newAction = restoreAllChecklistsSuccess();
    expect(newAction).toEqual(expectedAction);
    done();
  });

  it('should return action of type RESTORE_ALL_CHECKLISTS_FAILURE', (done) => {
    const expectedAction = {
      type: 'RESTORE_ALL_CHECKLISTS_FAILURE',
    };

    const newAction = restoreAllChecklistsFailure();
    expect(newAction).toEqual(expectedAction);
    done();
  });

  it('should return action of type GET_SINGLE_CHECKLIST', (done) => {
    const expectedAction = {
      type: 'GET_SINGLE_CHECKLIST',
      checklistId: 1
    };

    const newAction = getSingleChecklist(1);
    expect(newAction).toEqual(expectedAction);
    done();
  });

  it('should return action of type GET_SINGLE_CHECKLIST_SUCCESS', (done) => {
    const expectedAction = {
      type: 'GET_SINGLE_CHECKLIST_SUCCESS',
      origin: {},
      destinations: [{}],
      config: [{}]
    };

    const newAction = getSingleChecklistSuccess({}, [{}], [{}]);
    expect(newAction).toEqual(expectedAction);
    done();
  });

  it('should return action of type UPDATE_CHECKLIST', (done) => {
    const expectedAction = {
      type: 'UPDATE_CHECKLIST',
      checklist: [{}],
      checklistId: 1
    };

    const newAction = updateChecklist([{}], 1);
    expect(newAction).toEqual(expectedAction);
    done();
  });

  it('should return action of type UPDATE_CHECKLIST_SUCCESS', (done) => {
    const expectedAction = {
      type: 'UPDATE_CHECKLIST_SUCCESS',
    };

    const newAction = updateChecklistSuccess();
    expect(newAction).toEqual(expectedAction);
    done();
  });

  it('should return action of type GET_CHECKLIST_FROM_STORAGE', (done) => {
    const expectedAction = {
      type: 'GET_CHECKLIST_FROM_STORAGE',
      checklistWizard: checklists,
    };

    const newAction = getChecklistFromStorage(checklists);
    expect(newAction).toEqual(expectedAction);
    done();
  });

  it('should return action of type GET_CHECKLIST_FROM_STORAGE_SUCCESS', (done) => {
    const expectedAction = {
      type: 'GET_CHECKLIST_FROM_STORAGE_SUCCESS',
      origin: {},
      destinations: [{}],
      config: [{}]
    };

    const newAction = getChecklistFromStorageSuccess({}, [{}], [{}]);
    expect(newAction).toEqual(expectedAction);
    done();
  });

  it('should return action of type UNDO_DYNAMIC_CHECKLIST', (done) => {
    const expectedAction = {
      type: 'UNDO_DYNAMIC_CHECKLIST',
    };

    const newAction = undoChecklist();
    expect(newAction).toEqual(expectedAction);
    done();
  });

  it('should return action of type REDO_DYNAMIC_CHECKLIST', (done) => {
    const expectedAction = {
      type: 'REDO_DYNAMIC_CHECKLIST',
    };

    const newAction = redoChecklist();
    expect(newAction).toEqual(expectedAction);
    done();
  });

  it('should return action of type RESET_DYNAMIC_CHECKLIST', (done) => {
    const expectedAction = {
      type: 'RESET_DYNAMIC_CHECKLIST',
    };

    const newAction = resetChecklist();
    expect(newAction).toEqual(expectedAction);
    done();
  });
});
