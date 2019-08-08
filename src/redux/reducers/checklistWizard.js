import shortId from 'shortid';
import helpers from '../../views/ChecklistWizard/helpers';
import UndoStack from '../../helper/UndoStack';

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
  GET_ONE_CHECKLIST,
  GET_ONE_CHECKLIST_SUCCESS,
  GET_ONE_CHECKLIST_FAILURE,
  DELETE_CHECKLIST,
  DELETE_CHECKLIST_SUCCESS,
  DELETE_CHECKLIST_FAILURE,
  GET_ALL_DELETED_CHECKLISTS_SUCCESS,
  RESTORE_CHECKLIST,
  RESTORE_CHECKLIST_SUCCESS,
  RESTORE_CHECKLIST_FAILURE,
  RESTORE_ALL_CHECKLISTS,
  RESTORE_ALL_CHECKLISTS_SUCCESS,
  RESTORE_ALL_CHECKLISTS_FAILURE,
  GET_SINGLE_CHECKLIST_SUCCESS,
  GET_CHECKLIST_FROM_STORAGE_SUCCESS
} from '../constants/actionTypes';


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
  deletedChecklists: [],
  isDeleting: false,
  isRestoring: false,
  loading: false,
  error: null,
  nationality: ChecklistStorage.current.nationality,
  destinations: ChecklistStorage.current.destinations,
  items: ChecklistStorage.current.items,
  disableUndo: ChecklistStorage.disableUndo,
  disableRedo: ChecklistStorage.disableRedo,
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
  case GET_ONE_CHECKLIST:
    return { ...state, loading: true };
  case GET_ONE_CHECKLIST_SUCCESS:
    return { ...state, checklist: action.payload, loading: false };
  case GET_ONE_CHECKLIST_FAILURE:
    return { ...state, error: action.error, loading: false };
  case DELETE_CHECKLIST:
    return { ...state, isDeleting: true };
  case DELETE_CHECKLIST_SUCCESS:
    return { 
      ...state,
      checklists: state.checklists.filter(checklist => checklist.id !== Number(action.checklistId)),
      deletedChecklists: state.deletedChecklists.concat(action.deletedChecklist),
      isDeleting: false
    };
  case DELETE_CHECKLIST_FAILURE:
    return { ...state, isDeleting: false };
  case GET_ALL_DELETED_CHECKLISTS_SUCCESS:
    return { ...state, deletedChecklists: [...action.deletedChecklists] };
  case RESTORE_CHECKLIST:
    return { ...state, isRestoring: true };
  case RESTORE_CHECKLIST_SUCCESS:
    return { 
      ...state,
      deletedChecklists: state.deletedChecklists.filter(checklist => checklist.id !== Number(action.checklistId)),
      checklists: state.checklists.concat(action.restoredChecklist),
      isRestoring: false
    };
  case RESTORE_CHECKLIST_FAILURE:
    return { ...state, isRestoring: false };
  case RESTORE_ALL_CHECKLISTS:
    return { ...state, isRestoring: true };
  case RESTORE_ALL_CHECKLISTS_SUCCESS:
    return { 
      ...state,
      checklists: [...state.checklists, ...state.deletedChecklists],
      deletedChecklists: [],
      isRestoring: false
    };
  case RESTORE_ALL_CHECKLISTS_FAILURE:
    return { ...state, isRestoring: false };
  case GET_SINGLE_CHECKLIST_SUCCESS:
    ChecklistStorage.save({ ...state, nationality: action.origin, destinations: action.destinations, items: action.config });
    return { 
      ...state,
      nationality: ChecklistStorage.current.nationality,
      destinations: ChecklistStorage.current.destinations,
      items: ChecklistStorage.current.items,
    };
  case GET_CHECKLIST_FROM_STORAGE_SUCCESS:
    return { 
      ...state,
      nationality: Object.assign(state.nationality, action.origin),
      destinations: action.destinations,
      items: Object.assign(state.items, action.config)
    };
  default: return state;
  }
};

export default checklistWizard;
