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
  CREATE_DYNAMIC_CHECKLIST_SUCCESS,
  UNDO_DYNAMIC_CHECKLIST,
  REDO_DYNAMIC_CHECKLIST,
  RESET_DYNAMIC_CHECKLIST,
} from '../constants/actionTypes';
import helpers from '../../views/ChecklistWizard/helpers';
import UndoStack from '../../helper/UndoStack';

const config = {
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
};

const ChecklistStorage = new UndoStack(config);

export const initialState = {
  checklists: [],
  loading: false,
  error: null,
  nationality: ChecklistStorage.current.nationality,
  destinations: ChecklistStorage.current.destinations,
  items: ChecklistStorage.current.items,
  message: '',
  disableUndo: ChecklistStorage.disableUndo,
  disableRedo: ChecklistStorage.disableRedo,
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
    ChecklistStorage.save({ ...state, items: Object.assign(state.items, action.newItem) });
    return { 
      ...state, 
      items: ChecklistStorage.current.items,
      disableUndo: ChecklistStorage.disableUndo,
      disableRedo: ChecklistStorage.disableRedo,
    };
  case HANDLE_ITEMS_SUCCESS:
    ChecklistStorage.save({ ...state, items: action.newItem });
    return { 
      ...state, 
      items: ChecklistStorage.current.items,
      disableUndo: ChecklistStorage.disableUndo,
      disableRedo: ChecklistStorage.disableRedo, 
    };
  case ADD_QUESTION_SUCCESS:
    ChecklistStorage.save({ ...state, items: action.newItems });
    return { 
      ...state, 
      items: ChecklistStorage.current.items,
      disableUndo: ChecklistStorage.disableUndo,
      disableRedo: ChecklistStorage.disableRedo,
    };
  case DELETE_ITEM_SUCCESS:
    ChecklistStorage.save({ ...state, items: reorder(state, action.order) });
    return { 
      ...state, 
      items: ChecklistStorage.current.items,
      disableUndo: ChecklistStorage.disableUndo,
      disableRedo: ChecklistStorage.disableRedo,
    };
  case DELETE_QUESTION_SUCCESS:
    ChecklistStorage.save({ ...state });
    return { ...state };
  case UPDATE_BEHAVIOUR_SUCCESS:
    ChecklistStorage.save({...state, items: Object.assign(state.items, action.newItems) });
    return { 
      ...state, 
      items: ChecklistStorage.current.items,
      disableUndo: ChecklistStorage.disableUndo,
      disableRedo: ChecklistStorage.disableRedo, 
    };
  case UPDATE_NATIONALITY_SUCCESS:
    ChecklistStorage.save({ ...state, nationality: action.nationality });
    return { 
      ...state, 
      nationality: ChecklistStorage.current.nationality, 
      disableUndo: ChecklistStorage.disableUndo,
      disableRedo: ChecklistStorage.disableRedo,
    };
  case UPDATE_DESTINATION_SUCCESS:
    ChecklistStorage.save({ ...state, destinations: action.destination });
    return { 
      ...state, 
      destinations: ChecklistStorage.current.destinations,
      disableUndo: ChecklistStorage.disableUndo,
      disableRedo: ChecklistStorage.disableRedo,
    };
  case CREATE_DYNAMIC_CHECKLIST_SUCCESS:
    return { ...state, message: action.response };
  case UNDO_DYNAMIC_CHECKLIST: {
    const { nationality, destinations, items} = ChecklistStorage.undo();
    const { disableRedo, disableUndo } = ChecklistStorage;
    return { 
      ...state, 
      nationality,
      destinations, 
      items,
      disableRedo,
      disableUndo
    };
  }
  case REDO_DYNAMIC_CHECKLIST: {
    const { nationality, destinations, items } = ChecklistStorage.redo();
    const { disableRedo, disableUndo } = ChecklistStorage;
    return { 
      ...state, 
      nationality,
      destinations, 
      items,
      disableRedo,
      disableUndo
    };
  }
  case RESET_DYNAMIC_CHECKLIST: {
    ChecklistStorage.reset();
    const { nationality, destinations, items } = ChecklistStorage.current;
    const { disableRedo, disableUndo } = ChecklistStorage;
    return { 
      ...state, 
      nationality,
      destinations, 
      items,
      disableRedo,
      disableUndo,
    };
  }
  default: return state;
  }
};

export default checklistWizard;
