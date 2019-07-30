import shortId from 'shortid';
import {
  GET_ALL_DYNAMIC_CHECKLISTS,
  GET_ALL_DYNAMIC_CHECKLISTS_FAILURE,
  GET_ALL_DYNAMIC_CHECKLISTS_SUCCESS,
  ADD_NEW_CHECKLIST_ITEM_SUCCESS,
  ADD_QUESTION_SUCCESS,
  HANDLE_ITEMS_SUCCESS,
  DELETE_ITEM_SUCCESS,
  DELETE_QUESTION_SUCCESS,
  UPDATE_BEHAVIOUR_SUCCESS,
  UPDATE_NATIONALITY_SUCCESS,
  UPDATE_DESTINATION_SUCCESS,
  CREATE_DYNAMIC_CHECKLIST_SUCCESS
} from '../constants/actionTypes';
import helpers from '../../views/ChecklistWizard/helpers';

export const initialState = {
  checklists: [],
  loading: false,
  error: null,
  nationality: { 
    name: '', 
    emoji: ''
  },
  destinations: [],
  items: [
    {
      id: shortId.generate(),
      order: 1,
      prompt: '',
      type: '',
      behaviour: {},
      configuration: {
        options: [
          {
            id: shortId.generate(),
            name: '',
            behaviour: {}
          },
        ]
      }
    },
  ],
  message: ''
};

const reorder = (state, order) => {
  const newState = state.items.filter(item => item.order !== order);
  const stateToReorder = helpers.arrangeChecklistByOrder([...newState]);
  helpers.reorderItems(stateToReorder);
  return stateToReorder;
};

const checklistWizard = (state = initialState, action) => {
  switch (action.type) {
  case GET_ALL_DYNAMIC_CHECKLISTS:
    return { ...state, loading: true };
  case GET_ALL_DYNAMIC_CHECKLISTS_SUCCESS:
    return { ...state, checklists: action.checklists, loading: false};
  case GET_ALL_DYNAMIC_CHECKLISTS_FAILURE:
    return { ...state, error: action.error, loading: false};
  case ADD_NEW_CHECKLIST_ITEM_SUCCESS:
    return { ...state, items: Object.assign(state.items, action.newItem) };
  case HANDLE_ITEMS_SUCCESS:
    return { ...state, items: action.newItem };
  case ADD_QUESTION_SUCCESS:
    return { ...state, items: Object.assign(state.items, action.newItems) };
  case DELETE_ITEM_SUCCESS:
    return { ...state, items: reorder(state, action.order) };
  case DELETE_QUESTION_SUCCESS:
    return { ...state };
  case UPDATE_BEHAVIOUR_SUCCESS:
    return { ...state, items: Object.assign(state.items, action.newItems) };
  case UPDATE_NATIONALITY_SUCCESS:
    return { ...state, nationality: Object.assign(state.nationality, action.nationality) };
  case UPDATE_DESTINATION_SUCCESS:
    return { ...state, destinations: action.destination };
  case CREATE_DYNAMIC_CHECKLIST_SUCCESS:
    return { ...state, message: action.response };
  default: return state;
  }
};

export default checklistWizard;
