import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import travelDynamicChecklistApi from '../../services/travelDynamiChecklistApi';
import apiErrorHandler from '../../services/apiErrorHandler';

import {
  UPDATE_NATIONALITY,
  UPDATE_DESTINATION,
  ADD_NEW_CHECKLIST_ITEM,
  ADD_QUESTION,
  DELETE_QUESTION,
  UPDATE_BEHAVIOUR,
  HANDLE_ITEMS,
  DELETE_ITEM,
  CREATE_DYNAMIC_CHECKLIST,
  GET_ONE_CHECKLIST,
  GET_ALL_DYNAMIC_CHECKLISTS,
  DELETE_CHECKLIST,
  GET_DELETED_CHECKLISTS,
  RESTORE_CHECKLIST,
  RESTORE_ALL_CHECKLISTS,
  GET_SINGLE_CHECKLIST,
  UPDATE_CHECKLIST,
  GET_CHECKLIST_FROM_STORAGE
} from '../constants/actionTypes';
import {
  addChecklistItemSuccess,
  handleItemsSuccess,
  addQuestionSuccess,
  deleteItemsSuccess,
  deleteQuestionSuccess,
  updateBehaviourSuccess,
  updateNationalitySuccess,
  updateDestinationSuccess,
  createDynamicChecklistSuccess,
  getOneChecklistSuccess,
  getOneChecklistFailure,
  getAllDynamicChecklistsSuccess,
  getAllDynamicChecklistsFailure,
  deleteChecklistSuccess,
  deleteChecklistFailure,
  getDeletedChecklistsSuccess,
  restoreSingleChecklistSuccess,
  restoreSingleChecklistFailure,
  restoreAllChecklistsSuccess,
  restoreAllChecklistsFailure,
  getSingleChecklistSuccess,
  updateChecklistSuccess,
  getChecklistFromStorageSuccess
} from '../actionCreator/travelChecklistWizardActions';
import apiValidationErrorHandler from '../../services/apiValidationErrorHandler';


export function* addNewChecklistItem(newItems) {
  yield put(addChecklistItemSuccess(newItems.item));
}

export function* watchAddChecklistWizard() {
  yield takeLatest(ADD_NEW_CHECKLIST_ITEM, addNewChecklistItem);
}

export function* handleChecklistItems(newItems) {
  yield put(handleItemsSuccess(newItems.item));
}

export function* watchHandleChecklistItems() {
  yield takeLatest(HANDLE_ITEMS, handleChecklistItems);
}

export function* addNewQuestion(newItems) {
  yield put(addQuestionSuccess(newItems.items));
}

export function* watchAddQuestion() {
  yield takeLatest(ADD_QUESTION, addNewQuestion);
}

export function* deleteItems(newItem) {
  yield put(deleteItemsSuccess(newItem.order));
}

export function* watchDeleteItems() {
  yield takeLatest(DELETE_ITEM, deleteItems);
}

export function* deleteQuestion(newItem) {
  yield put(deleteQuestionSuccess(newItem.items));
}

export function* watchDeleteQuestion() {
  yield takeLatest(DELETE_QUESTION, deleteQuestion);
}

export function* updateBehaviour(newItem) {
  yield put(updateBehaviourSuccess(newItem.items));
}

export function* watchUpdateBehaviour() {
  yield takeLatest(UPDATE_BEHAVIOUR, updateBehaviour);
}

export function* updateNationality(newItem) {
  yield put(updateNationalitySuccess(newItem.items));
}

export function* watchUpdateNationality() {
  yield takeLatest(UPDATE_NATIONALITY, updateNationality);
}

export function* updateDestination(newItem) {
  yield put(updateDestinationSuccess(newItem.items));
}

export function* watchUpdateDestination() {
  yield takeLatest(UPDATE_DESTINATION, updateDestination);
}

export function* createChecklist(checklist) {
  try {
    const checklistPayload = {
      origin: { country: checklist.payload.nationality.name },
      destinations: { countries: checklist.payload.destinations.map(dest => dest.name) },
      config: checklist.payload.items
    };
  
    const response = yield call(travelDynamicChecklistApi.createDynamicChecklist, checklistPayload);
    yield put(createDynamicChecklistSuccess(response.data.message));
    toast.success(response.data.message);
  } catch(error) {
    const errorMessage = apiErrorHandler(error);
    yield call(toast.error, errorMessage);
  }
}

export function* watchCreateDynamicChecklist() {
  yield takeLatest(CREATE_DYNAMIC_CHECKLIST, createChecklist);
}

export function* watchGetOneChecklist() {
  yield takeLatest(GET_ONE_CHECKLIST, getOneChecklistSaga);
}

export function* getOneChecklistSaga(action) {
  try {
    const { data } = yield call(travelDynamicChecklistApi.getOneChecklist, action.requestId);
    yield put(getOneChecklistSuccess({
      checklists: data.checklists, 
      trips: data.trips,
    }));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(getOneChecklistFailure(errorMessage));
  }
}

export function* getAllDynamicChecklistsSaga() {
  try {
    const { data } = yield call(travelDynamicChecklistApi.getAllDynamicChecklists);
    yield put(getAllDynamicChecklistsSuccess(data.checklists));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(getAllDynamicChecklistsFailure(errorMessage));
  }
}

export function* watchgetAllDynamicChecklists() {
  yield takeLatest(GET_ALL_DYNAMIC_CHECKLISTS, getAllDynamicChecklistsSaga);
}

export function* deleteChecklistWizard(checklist) {
  try {
    const { deletedChecklist, checklistId } = checklist;
    const response = yield call(travelDynamicChecklistApi.deleteAChecklist, checklistId);

    yield put(deleteChecklistSuccess(deletedChecklist, checklistId));
    toast.success(response.data.message);
  } catch(err) {
    yield put(deleteChecklistFailure());
    toast.error('Unable to delete this checklist, please try again!!!');
  }
}

export function* watchDeleteChecklistWizard() {
  yield takeLatest(DELETE_CHECKLIST, deleteChecklistWizard);
}

export function* getDeletedChecklists() {
  try {
    const response = yield call(travelDynamicChecklistApi.deletedChecklists);
    yield put(getDeletedChecklistsSuccess(response.data.checklists));
  } catch(error) {
    const errorMessage = apiErrorHandler(error);
    yield put(getAllDynamicChecklistsFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watchGetDeletedChecklists() {
  yield takeLatest(GET_DELETED_CHECKLISTS, getDeletedChecklists);
}

export function* restoreAChecklist(checklist) {
  try {
    const { restoredChecklist, checklistId } = checklist;
    const response = yield call(travelDynamicChecklistApi.restoreAChecklist, checklistId);
    yield put(restoreSingleChecklistSuccess(restoredChecklist, checklistId));
    toast.success(response.data.message);
  } catch(error) {
    const errorMessage = apiErrorHandler(error);
    yield put(restoreSingleChecklistFailure());
    toast.error(errorMessage);
  }
}

export function* watchRestoreAChecklist() {
  yield takeLatest(RESTORE_CHECKLIST, restoreAChecklist);
}

export function* restoreAllChecklists() {
  try {
    const response = yield call(travelDynamicChecklistApi.restoreAllChecklists);
    yield put(restoreAllChecklistsSuccess());
    toast.success(response.data.message);
  } catch(error) {
    const errorMessage = apiErrorHandler(error);
    yield put(restoreAllChecklistsFailure());
    toast.error(errorMessage);
  }
}

export function* watchRestoreAllChecklists() {
  yield takeLatest(RESTORE_ALL_CHECKLISTS, restoreAllChecklists);
}

export function* getSingleChecklist(checklist) {
  const { checklistId } = checklist;
  try {
    const response = yield call(travelDynamicChecklistApi.getSingleChecklist, checklistId);

    const { origin, destinations, config } = response.data.checklist;
    const { country } = origin[0];

    const originFrom = { emoji: '', name: country.country };
    const destination = destinations.map(dest => {
      return { name: dest.country.country };
    });

    yield put(getSingleChecklistSuccess(originFrom, destination, config));
  } catch(error) {
    apiErrorHandler(error);
  }
}

export function* watchGetSingleChecklist() {
  yield takeLatest(GET_SINGLE_CHECKLIST, getSingleChecklist);
}

export function* getChecklistFromStorage(checklist) {
  const { checklistWizard } = checklist;
  const checklistStorage = {
    origin: { 
      emoji: '',
      name: checklistWizard.nationality.name },
    destinations: checklistWizard.destinations,
    config: checklistWizard.items
  };
  const { origin, destinations, config } = checklistStorage;

  yield put(getChecklistFromStorageSuccess(origin, destinations, config));
}

export function* watchGetChecklistFromStorage() {
  yield takeLatest(GET_CHECKLIST_FROM_STORAGE, getChecklistFromStorage);
}

export function* updateDynamicChecklist(payload) {
  try {
    const { checklistId, checklist } = payload;
    const checklistPayload = {
      origin: { country: checklist.nationality.name },
      destinations: { countries: checklist.destinations.map(dest => dest.name) },
      config: checklist.items
    };

    yield call(travelDynamicChecklistApi.updateChecklist, checklistId, checklistPayload);
    yield put(updateChecklistSuccess());
    toast.success('Checklist updated successfully');
  } catch(error) {
    let errors;
    if (error.response.status === 409) {
      errors = apiValidationErrorHandler(error);
    } else {
      let errorMessage = apiErrorHandler(error);
      toast.error(errorMessage);
    }
    yield call(toast.error, errors);
  }
}

export function* watchUpdateDynamicChecklist() {
  yield takeLatest(UPDATE_CHECKLIST, updateDynamicChecklist);
}
