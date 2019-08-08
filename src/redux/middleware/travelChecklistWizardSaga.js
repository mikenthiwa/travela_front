import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import travelDynamicChecklistApi from '../../services/travelDynamiChecklistApi';

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
  GET_ONE_CHECKLIST
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
  getOneChecklistFailure
} from '../actionCreator/travelChecklistWizardActions';
import apiErrorHandler from '../../services/apiErrorHandler';


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
  } catch(err) {
    toast.error(err.message);
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
    yield put(getOneChecklistSuccess(data.checklists));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(getOneChecklistFailure(errorMessage));
  }
}
