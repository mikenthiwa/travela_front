import {
  CREATE_TRAVEL_CHECKLIST,
  CREATE_TRAVEL_CHECKLIST_SUCCESS,
  CREATE_TRAVEL_CHECKLIST_FAILURE,
  FETCH_TRAVEL_CHECKLIST_SUCCESS,
  FETCH_TRAVEL_CHECKLIST_FAILURE,
  FETCH_TRAVEL_CHECKLIST,
  UPDATE_TRAVEL_CHECKLIST,
  UPDATE_TRAVEL_CHECKLIST_SUCCESS,
  UPDATE_TRAVEL_CHECKLIST_FAILURE,
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

export const createTravelChecklist = (checklistItemData) => ({
  type: CREATE_TRAVEL_CHECKLIST,
  checklistItemData
});

export const createChecklistSuccess = (checklistItem) => ({
  type: CREATE_TRAVEL_CHECKLIST_SUCCESS,
  checklistItem,
});

export const createChecklistFailure = (error) => ({
  type: CREATE_TRAVEL_CHECKLIST_FAILURE,
  error,
});

export const updateTravelChecklist = (checklistItemId, checklistItemData) => ({
  type: UPDATE_TRAVEL_CHECKLIST,
  checklistItemId,
  checklistItemData
});

export const updateChecklistSuccess = (updatedChecklistItem, checklistItemId) => ({
  type: UPDATE_TRAVEL_CHECKLIST_SUCCESS,
  updatedChecklistItem,
  checklistItemId
});

export const updateChecklistFailure = (error) => ({
  type: UPDATE_TRAVEL_CHECKLIST_FAILURE,
  error,
});

export const fetchTravelChecklist = (requestId, destinationName) => ({
  type: FETCH_TRAVEL_CHECKLIST,
  requestId,
  destinationName
});

export const fetchTravelChecklistSuccess = (response) => ({
  type: FETCH_TRAVEL_CHECKLIST_SUCCESS,
  travelChecklists: response.travelChecklists,
  userCenters: response.userCenters
});

export const deleteTravelChecklist = (checklistItemId, deleteReason) => ({
  type: DELETE_TRAVEL_CHECKLIST,
  checklistItemId,
  deleteReason
});

export const deleteChecklistSuccess = (disabledChecklistItem, checklistItemId) => ({
  type: DELETE_TRAVEL_CHECKLIST_SUCCESS,
  disabledChecklistItem,
  checklistItemId,
});

export const deleteChecklistFailure = (error) => ({
  type: DELETE_TRAVEL_CHECKLIST_FAILURE,
  error,
});


export const fetchTravelChecklistFailure = (error) => ({
  type: FETCH_TRAVEL_CHECKLIST_FAILURE,
  error
});

export const fetchDeletedChecklistItems = (destinationName) => ({
  type: FETCH_DELETED_CHECKLISTITEMS,
  destinationName,
});

export const fetchDeletedChecklistItemsSuccess = (response) => ({
  type: FETCH_DELETED_CHECKLISTITEMS_SUCCESS,
  deletedTravelChecklists: response.deletedTravelChecklists,
});

export const fetchDeletedChecklistItemsFailure = (error) => ({
  type: FETCH_DELETED_CHECKLISTITEMS_FAILURE,
  error,
});


export const restoreChecklist = (checklistItemId, checklistItemData) => ({
  type: RESTORE_TRAVEL_CHECKLIST,
  checklistItemId,
  checklistItemData
});

export const restoreChecklistSuccess = (updatedChecklistItem, checklistItemId) => ({
  type: RESTORE_TRAVEL_CHECKLIST_SUCCESS,
  updatedChecklistItem,
  checklistItemId
});

export const restoreChecklistFailure = (error) => ({
  type: RESTORE_TRAVEL_CHECKLIST_FAILURE,
  error,
});
