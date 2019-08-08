import {
  UPDATE_NATIONALITY,
  UPDATE_NATIONALITY_SUCCESS,
  UPDATE_DESTINATION,
  UPDATE_DESTINATION_SUCCESS,
  ADD_NEW_CHECKLIST_ITEM,
  ADD_NEW_CHECKLIST_ITEM_SUCCESS,
  ADD_QUESTION,
  DELETE_QUESTION,
  DELETE_QUESTION_SUCCESS,
  UPDATE_BEHAVIOUR,
  UPDATE_BEHAVIOUR_SUCCESS,
  HANDLE_ITEMS,
  HANDLE_ITEMS_SUCCESS,
  DELETE_ITEM,
  DELETE_ITEM_SUCCESS,
  ADD_QUESTION_SUCCESS,
  CREATE_DYNAMIC_CHECKLIST,
  CREATE_DYNAMIC_CHECKLIST_SUCCESS,
  GET_ONE_CHECKLIST,
  GET_ONE_CHECKLIST_SUCCESS,
  GET_ONE_CHECKLIST_FAILURE
} from '../../constants/actionTypes';

import {
  handleAddChecklistItem,
  addChecklistItemSuccess,
  handleChecklistItems,
  handleItemsSuccess,
  addChecklistQuestion,
  addQuestionSuccess,
  deleteChecklistItems,
  deleteItemsSuccess,
  deleteChecklistQuestion,
  deleteQuestionSuccess,
  updateChecklistBehaviour,
  updateBehaviourSuccess,
  updateChecklistNationality,
  updateNationalitySuccess,
  updateChecklistDestination,
  updateDestinationSuccess,
  createDynamicChecklist,
  createDynamicChecklistSuccess,
  getOneChecklist,
  getOneChecklistSuccess,
  getOneChecklistFailure

} from '../travelChecklistWizardActions';

describe('Travel checklists Wizard actions test', () => {
  it('should return action of type ADD_NEW_CHECKLIST_ITEM', (done) => {
    const expectedAction = {
      type: ADD_NEW_CHECKLIST_ITEM,
      item: [{}]
    };

    const newAction = handleAddChecklistItem([{}]);
    expect(newAction).toEqual(expectedAction);
    done();
  });

  it('should return action of type ADD_NEW_CHECKLIST_ITEM_SUCCESS', (done) => {
    const expectedAction = {
      type: ADD_NEW_CHECKLIST_ITEM_SUCCESS,
      newItem: [{}]
    };

    const newAction = addChecklistItemSuccess([{}]);
    expect(newAction).toEqual(expectedAction);
    done();
  });

  it('should return action of type HANDLE_ITEMS', (done) => {
    const expectedAction = {
      type: HANDLE_ITEMS,
      item: [{}]
    };

    const newAction = handleChecklistItems([{}]);
    expect(newAction).toEqual(expectedAction);
    done();
  });

  it('should return action of type HANDLE_ITEMS_SUCCESS', (done) => {
    const expectedAction = {
      type: HANDLE_ITEMS_SUCCESS,
      newItem: [{}]
    };

    const newAction = handleItemsSuccess([{}]);
    expect(newAction).toEqual(expectedAction);
    done();
  });

  it('should return action of type ADD_QUESTION', (done) => {
    const expectedAction = {
      type: ADD_QUESTION,
      items: [{}]
    };

    const newAction = addChecklistQuestion([{}]);
    expect(newAction).toEqual(expectedAction);
    done();
  });

  it('should return action of type ADD_QUESTION_SUCCESS', (done) => {
    const expectedAction = {
      type:  ADD_QUESTION_SUCCESS,
      newItems: [{}]
    };

    const newAction = addQuestionSuccess([{}]);
    expect(newAction).toEqual(expectedAction);
    done();
  });

  it('should return action of type DELETE_ITEM', (done) => {
    const expectedAction = {
      type:  DELETE_ITEM,
      order: 1
    };

    const newAction = deleteChecklistItems(1);
    expect(newAction).toEqual(expectedAction);
    done();
  });

  it('should return action of type DELETE_ITEM_SUCCESS', (done) => {
    const expectedAction = {
      type:  DELETE_ITEM_SUCCESS,
      order: 1
    };

    const newAction = deleteItemsSuccess(1);
    expect(newAction).toEqual(expectedAction);
    done();
  });

  it('should return action of type DELETE_QUESTION', (done) => {
    const expectedAction = {
      type:  DELETE_QUESTION,
      items: [{}]
    };

    const newAction = deleteChecklistQuestion([{}]);
    expect(newAction).toEqual(expectedAction);
    done();
  });

  it('should return action of type  DELETE_QUESTION_SUCCESS', (done) => {
    const expectedAction = {
      type:   DELETE_QUESTION_SUCCESS,
      newItems: [{}]
    };

    const newAction = deleteQuestionSuccess([{}]);
    expect(newAction).toEqual(expectedAction);
    done();
  });

  it('should return action of type UPDATE_BEHAVIOUR', (done) => {
    const expectedAction = {
      type:   UPDATE_BEHAVIOUR,
      items: [{}]
    };

    const newAction = updateChecklistBehaviour([{}]);
    expect(newAction).toEqual(expectedAction);
    done();
  });

  it('should return action of type UPDATE_BEHAVIOUR_SUCCESS', (done) => {
    const expectedAction = {
      type:   UPDATE_BEHAVIOUR_SUCCESS,
      newItems: [{}]
    };

    const newAction = updateBehaviourSuccess([{}]);
    expect(newAction).toEqual(expectedAction);
    done();
  });

  it('should return action of type UPDATE_NATIONALITY', (done) => {
    const expectedAction = {
      type:   UPDATE_NATIONALITY,
      items: { name: 'Nigeria' }
    };

    const newAction = updateChecklistNationality({ name: 'Nigeria' });
    expect(newAction).toEqual(expectedAction);
    done();
  });

  it('should return action of type UPDATE_NATIONALITY_SUCCESS', (done) => {
    const expectedAction = {
      type:   UPDATE_NATIONALITY_SUCCESS,
      nationality: { name: 'Nigeria' }
    };

    const newAction = updateNationalitySuccess({ name: 'Nigeria' });
    expect(newAction).toEqual(expectedAction);
    done();
  });

  it('should return action of type UPDATE_DESTINATION', (done) => {
    const expectedAction = {
      type:   UPDATE_DESTINATION,
      items: [{ name: 'Nigeria' }, { name: 'Kenya' }]
    };

    const newAction = updateChecklistDestination([{ name: 'Nigeria' }, { name: 'Kenya' }]);
    expect(newAction).toEqual(expectedAction);
    done();
  });

  it('should return action of type UPDATE_DESTINATION_SUCCESS', (done) => {
    const expectedAction = {
      type:   UPDATE_DESTINATION_SUCCESS,
      destination: [{ name: 'Nigeria' }, { name: 'Kenya' }]
    };

    const newAction = updateDestinationSuccess([{ name: 'Nigeria' }, { name: 'Kenya' }]);
    expect(newAction).toEqual(expectedAction);
    done();
  });

  it('should return action of type CREATE_DYNAMIC_CHECKLIST', (done) => {
    const expectedAction = {
      type:   CREATE_DYNAMIC_CHECKLIST,
      payload: {}
    };

    const newAction = createDynamicChecklist({});
    expect(newAction).toEqual(expectedAction);
    done();
  });

  it('should return action of type CREATE_DYNAMIC_CHECKLIST_SUCCESS', (done) => {
    const expectedAction = {
      type:   CREATE_DYNAMIC_CHECKLIST_SUCCESS,
      response: {}
    };

    const newAction = createDynamicChecklistSuccess({});
    expect(newAction).toEqual(expectedAction);
    done();
  });

  it('should return action type GET_ONE_CHECKLIST', (done) => {
    const expectedAction = {
      type: GET_ONE_CHECKLIST,
      requestId: 'chj7989'
    };
    const newAction = getOneChecklist('chj7989');
    expect(newAction).toEqual(expectedAction);
    done();
  });
   it('should return action type GET_ONE_CHECKLIST_SUCCESS', (done) => {
    const expectedAction = {
      type: GET_ONE_CHECKLIST_SUCCESS,
      payload: [{}]
    };
    const newAction = getOneChecklistSuccess([{}]);
    expect(newAction).toEqual(expectedAction);
    done();
  });
   it('should return action type GET_ONE_CHECKLIST_FAILURE', (done) => {
    const expectedAction = {
      type: GET_ONE_CHECKLIST_FAILURE,
      error: 'error'
    };
    const newAction = getOneChecklistFailure('error');
    expect(newAction).toEqual(expectedAction);
    done();
  });
});
