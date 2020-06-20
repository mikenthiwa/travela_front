import {
  UPDATE_TRAVEL_CHECKLIST,
  UPDATE_TRAVEL_CHECKLIST_SUCCESS,
  UPDATE_TRAVEL_CHECKLIST_FAILURE,
  CREATE_TRAVEL_CHECKLIST,
  CREATE_TRAVEL_CHECKLIST_SUCCESS,
  CREATE_TRAVEL_CHECKLIST_FAILURE,
  FETCH_TRAVEL_CHECKLIST,
  FETCH_TRAVEL_CHECKLIST_SUCCESS,
  FETCH_TRAVEL_CHECKLIST_FAILURE,
  DELETE_TRAVEL_CHECKLIST,
  DELETE_TRAVEL_CHECKLIST_SUCCESS,
  DELETE_TRAVEL_CHECKLIST_FAILURE,
  FETCH_DELETED_CHECKLISTITEMS,
  FETCH_DELETED_CHECKLISTITEMS_SUCCESS,
  FETCH_DELETED_CHECKLISTITEMS_FAILURE,
  RESTORE_TRAVEL_CHECKLIST,
  RESTORE_TRAVEL_CHECKLIST_SUCCESS,
  RESTORE_TRAVEL_CHECKLIST_FAILURE
} from '../constants/actionTypes';

let checklistUpdate, disabledListsUpdate, destination;

export const initialState = {
  isLoading: false,
  updatingChecklist: false,
  creatingChecklist: false,
  fetchingChecklists: false,
  checklistItems: [],
  deletedCheckListItems: [],
  error: ''
};
const traveChecklist = (state = initialState, action) => {
  let update;
  switch (action.type) {
  case FETCH_TRAVEL_CHECKLIST:
    return { ...state, isLoading: true };
  case FETCH_TRAVEL_CHECKLIST_SUCCESS:
    return {
      ...state,
      isLoading: false,
      checklistItems: action.travelChecklists,
      userCenters: action.userCenters,
      error: ''
    };
  case FETCH_TRAVEL_CHECKLIST_FAILURE:
    return { ...state, isLoading: false, error: action.error, checklistItems: [] };
  case CREATE_TRAVEL_CHECKLIST:
    return { ...state, creatingChecklist: true };
  case CREATE_TRAVEL_CHECKLIST_SUCCESS:
    checklistUpdate = state.checklistItems.length
      ? [{ ...action.checklistItem }, ...state.checklistItems[0].checklist]
      : [{ ...action.checklistItem }];
    return {
      ...state,
      creatingChecklist: false,
      checklistItems: [
        {
          checklist: checklistUpdate
        }
      ],
      error: ''
    };
  case CREATE_TRAVEL_CHECKLIST_FAILURE:
    return { ...state, creatingChecklist: false, error: action.error };
  case UPDATE_TRAVEL_CHECKLIST:
    return { ...state, updatingChecklist: true };
  case UPDATE_TRAVEL_CHECKLIST_SUCCESS:
    destination = state.checklistItems[0].destinationName;
    action.updatedChecklistItem.id = action.checklistItemId;
    checklistUpdate = state.checklistItems[0].checklist
      .map(list => action.checklistItemId === list.id && action.updatedChecklistItem || list);

    return {
      ...state,
      checklistItems: [
        {
          destinationName: destination,
          checklist: [...checklistUpdate]
        }
      ],
      updatingChecklist: false };
  case UPDATE_TRAVEL_CHECKLIST_FAILURE:
    return { ...state, updatingChecklist: false, error: action.error };
  case DELETE_TRAVEL_CHECKLIST:
    return {
      ...state,
      deletingChecklist: true,
      error: ''
    };
  case DELETE_TRAVEL_CHECKLIST_SUCCESS:
    action.disabledChecklistItem.resources = [];

    disabledListsUpdate = state.deletedCheckListItems.length
      ? [{ ...action.disabledChecklistItem }, ...state.deletedCheckListItems]
      : [{ ...action.disabledChecklistItem }];

    checklistUpdate = state.checklistItems[0].checklist
      .filter(list => action.checklistItemId !== list.id);
    return {
      ...state,
      deletingChecklist: false,
      checklistItems: [
        {
          checklist: [...checklistUpdate]
        }
      ],
      deletedCheckListItems: [...disabledListsUpdate],
      error: ''
    };
  case DELETE_TRAVEL_CHECKLIST_FAILURE:
    return {
      ...state,
      deletingChecklist: false,
      error: action.error
    };
  case FETCH_DELETED_CHECKLISTITEMS:
    return {
      ...state,
      isLoading: true,
    };
  case FETCH_DELETED_CHECKLISTITEMS_SUCCESS:
    return {
      ...state,
      isLoading: false,
      deletedCheckListItems: action.deletedTravelChecklists,
      error: ''
    };
  case FETCH_DELETED_CHECKLISTITEMS_FAILURE:
    return {
      ...state,
      isLoading: false,
      deletedCheckListItems: [],
      error: action.error
    };
  case RESTORE_TRAVEL_CHECKLIST:
    return { ...state, updatingChecklist: true };
  case RESTORE_TRAVEL_CHECKLIST_SUCCESS:
    action.updatedChecklistItem.id = action.checklistItemId;
    checklistUpdate = state.checklistItems.length
      ? [{ ...action.updatedChecklistItem }, ...state.checklistItems[0].checklist]
      : [{ ...action.updatedChecklistItem }];

    disabledListsUpdate = state.deletedCheckListItems
      .filter(list => action.checklistItemId !== list.id);

    return {
      ...state,
      checklistItems: [
        {
          checklist: [...checklistUpdate]
        }
      ],
      deletedCheckListItems: [...disabledListsUpdate],
      updatingChecklist: false };
  case RESTORE_TRAVEL_CHECKLIST_FAILURE:
    return { ...state, updatingChecklist: false, error: action.error };
  default: return state;
  }
};

export default traveChecklist;
