import {
  getAllDynamicChecklists,
  getAllDynamicChecklistsSuccess,
  getAllDynamicChecklistsFailure
} from '../checklistWizardActions';
  
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
});
