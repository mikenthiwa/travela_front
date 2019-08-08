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
  UNDO_DYNAMIC_CHECKLIST,
  REDO_DYNAMIC_CHECKLIST,
  RESET_DYNAMIC_CHECKLIST,
  GET_ONE_CHECKLIST,
  GET_ONE_CHECKLIST_SUCCESS,
  GET_ONE_CHECKLIST_FAILURE,
  GET_ALL_DYNAMIC_CHECKLISTS,
  GET_ALL_DYNAMIC_CHECKLISTS_FAILURE,
  GET_ALL_DYNAMIC_CHECKLISTS_SUCCESS,
  DELETE_CHECKLIST,
  DELETE_CHECKLIST_SUCCESS,
  DELETE_CHECKLIST_FAILURE,
  GET_DELETED_CHECKLISTS,
  GET_ALL_DELETED_CHECKLISTS_SUCCESS,
  RESTORE_CHECKLIST,
  RESTORE_CHECKLIST_SUCCESS,
  RESTORE_CHECKLIST_FAILURE,
  RESTORE_ALL_CHECKLISTS,
  RESTORE_ALL_CHECKLISTS_SUCCESS,
  RESTORE_ALL_CHECKLISTS_FAILURE,
  GET_SINGLE_CHECKLIST,
  GET_SINGLE_CHECKLIST_SUCCESS,
  UPDATE_CHECKLIST,
  UPDATE_CHECKLIST_SUCCESS,
  GET_CHECKLIST_FROM_STORAGE,
  GET_CHECKLIST_FROM_STORAGE_SUCCESS
} from '../constants/actionTypes';


export const handleAddChecklistItem = item => ({
  type: ADD_NEW_CHECKLIST_ITEM,
  item
});

export const addChecklistItemSuccess = newItem => ({
  type: ADD_NEW_CHECKLIST_ITEM_SUCCESS,
  newItem
});


export const handleChecklistItems = item => ({
  type: HANDLE_ITEMS,
  item
});

export const handleItemsSuccess = newItem => ({
  type: HANDLE_ITEMS_SUCCESS,
  newItem
});

export const addChecklistQuestion = items => ({
  type: ADD_QUESTION,
  items
});

export const addQuestionSuccess = newItems => ({
  type: ADD_QUESTION_SUCCESS,
  newItems
});

export const deleteChecklistItems = order => ({
  type: DELETE_ITEM,
  order
});

export const deleteItemsSuccess = order => ({
  type: DELETE_ITEM_SUCCESS,
  order
});

export const deleteChecklistQuestion = items => ({
  type: DELETE_QUESTION,
  items
});

export const deleteQuestionSuccess = newItems => ({
  type: DELETE_QUESTION_SUCCESS,
  newItems
});


export const updateChecklistBehaviour = items => ({
  type: UPDATE_BEHAVIOUR,
  items
});

export const updateBehaviourSuccess = newItems => ({
  type: UPDATE_BEHAVIOUR_SUCCESS,
  newItems
});

export const updateChecklistNationality = items => ({
  type: UPDATE_NATIONALITY,
  items
});

export const updateNationalitySuccess = nationality => ({
  type: UPDATE_NATIONALITY_SUCCESS,
  nationality
});

export const updateChecklistDestination = items => ({
  type: UPDATE_DESTINATION,
  items
});

export const updateDestinationSuccess = destination => ({
  type: UPDATE_DESTINATION_SUCCESS,
  destination
});

export const createDynamicChecklist = payload => ({
  type: CREATE_DYNAMIC_CHECKLIST,
  payload
});

export const createDynamicChecklistSuccess = response => ({
  type: CREATE_DYNAMIC_CHECKLIST_SUCCESS,
  response
});

export const undoChecklist = () => ({
  type: UNDO_DYNAMIC_CHECKLIST
});

export const redoChecklist = () => ({
  type: REDO_DYNAMIC_CHECKLIST
});

export const resetChecklist = () => ({
  type: RESET_DYNAMIC_CHECKLIST
});

export const getOneChecklist = (requestId) => ({
  type: GET_ONE_CHECKLIST,
  requestId
});

export const getOneChecklistSuccess = checklist => ({
  type: GET_ONE_CHECKLIST_SUCCESS,
  payload: checklist
});

export const getOneChecklistFailure = error => ({
  type: GET_ONE_CHECKLIST_FAILURE,
  error
});

export const getAllDynamicChecklists = () => ({
  type: GET_ALL_DYNAMIC_CHECKLISTS
});

export const getAllDynamicChecklistsSuccess = checklists => ({
  type: GET_ALL_DYNAMIC_CHECKLISTS_SUCCESS,
  checklists
});

export const getAllDynamicChecklistsFailure = error => ({
  type: GET_ALL_DYNAMIC_CHECKLISTS_FAILURE,
  error
});

export const deleteChecklist = (deletedChecklist, checklistId) => ({
  type: DELETE_CHECKLIST,
  deletedChecklist,
  checklistId
});

export const deleteChecklistSuccess = (deletedChecklist, checklistId) => ({
  type: DELETE_CHECKLIST_SUCCESS,
  deletedChecklist,
  checklistId
});

export const deleteChecklistFailure = () => ({
  type: DELETE_CHECKLIST_FAILURE,
});

export const getDeletedChecklists = () => ({
  type: GET_DELETED_CHECKLISTS,
});

export const getDeletedChecklistsSuccess = (deletedChecklists) => ({
  type: GET_ALL_DELETED_CHECKLISTS_SUCCESS,
  deletedChecklists,
});

export const restoreSingleChecklist = (restoredChecklist, checklistId) => ({
  type: RESTORE_CHECKLIST,
  restoredChecklist,
  checklistId
});

export const restoreSingleChecklistSuccess = (restoredChecklist, checklistId) => ({
  type: RESTORE_CHECKLIST_SUCCESS,
  restoredChecklist,
  checklistId
});

export const restoreSingleChecklistFailure = () => ({
  type: RESTORE_CHECKLIST_FAILURE,
});

export const restoreAllChecklists = () => ({
  type: RESTORE_ALL_CHECKLISTS,
});

export const restoreAllChecklistsSuccess = () => ({
  type: RESTORE_ALL_CHECKLISTS_SUCCESS,
});

export const restoreAllChecklistsFailure = () => ({
  type: RESTORE_ALL_CHECKLISTS_FAILURE,
});

export const getSingleChecklist = (checklistId) => ({
  type: GET_SINGLE_CHECKLIST,
  checklistId
});

export const getSingleChecklistSuccess = (origin, destinations, config) => ({
  type: GET_SINGLE_CHECKLIST_SUCCESS,
  origin,
  destinations,
  config
});

export const updateChecklist = (checklist, checklistId) => ({
  type: UPDATE_CHECKLIST,
  checklist,
  checklistId
});

export const updateChecklistSuccess = () => ({
  type: UPDATE_CHECKLIST_SUCCESS
});

export const getChecklistFromStorage = (checklistWizard) => ({
  type: GET_CHECKLIST_FROM_STORAGE,
  checklistWizard
});

export const getChecklistFromStorageSuccess = (origin, destinations, config) => ({
  type: GET_CHECKLIST_FROM_STORAGE_SUCCESS,
  origin,
  destinations,
  config
});
