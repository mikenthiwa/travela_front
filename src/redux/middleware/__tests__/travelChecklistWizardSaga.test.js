import { call } from "redux-saga/effects";
import { throwError } from "redux-saga-test-plan/providers";
import * as matchers from "redux-saga-test-plan/matchers";
import { expectSaga } from "redux-saga-test-plan";
import toast from "toastr";
import travelDynamiChecklistApi from "../../../services/travelDynamiChecklistApi";

import {
  watchAddChecklistWizard,
  watchHandleChecklistItems,
  watchAddQuestion,
  watchDeleteItems,
  watchDeleteQuestion,
  watchUpdateBehaviour,
  watchUpdateNationality,
  watchUpdateDestination,
  watchCreateDynamicChecklist,
  watchgetAllDynamicChecklists,
  watchDeleteChecklistWizard,
  watchGetDeletedChecklists,
  watchRestoreAChecklist,
  watchRestoreAllChecklists,
  watchGetSingleChecklist,
  watchUpdateDynamicChecklist,
  watchGetChecklistFromStorage,
  watchGetOneChecklist
} from "../travelChecklistWizardSaga";

import {
  UPDATE_NATIONALITY,
  UPDATE_NATIONALITY_SUCCESS,
  UPDATE_DESTINATION,
  UPDATE_DESTINATION_SUCCESS,
  ADD_NEW_CHECKLIST_ITEM,
  ADD_NEW_CHECKLIST_ITEM_SUCCESS,
  ADD_QUESTION,
  ADD_QUESTION_SUCCESS,
  DELETE_QUESTION,
  DELETE_QUESTION_SUCCESS,
  UPDATE_BEHAVIOUR,
  UPDATE_BEHAVIOUR_SUCCESS,
  HANDLE_ITEMS,
  HANDLE_ITEMS_SUCCESS,
  DELETE_ITEM,
  DELETE_ITEM_SUCCESS,
  CREATE_DYNAMIC_CHECKLIST,
  CREATE_DYNAMIC_CHECKLIST_SUCCESS,
  GET_ALL_DYNAMIC_CHECKLISTS,
  GET_ALL_DYNAMIC_CHECKLISTS_SUCCESS,
  GET_ALL_DYNAMIC_CHECKLISTS_FAILURE,
  DELETE_CHECKLIST_SUCCESS,
  DELETE_CHECKLIST,
  DELETE_CHECKLIST_FAILURE,
  GET_ALL_DELETED_CHECKLISTS_SUCCESS,
  GET_DELETED_CHECKLISTS,
  RESTORE_CHECKLIST_SUCCESS,
  RESTORE_CHECKLIST,
  RESTORE_CHECKLIST_FAILURE,
  RESTORE_ALL_CHECKLISTS,
  RESTORE_ALL_CHECKLISTS_SUCCESS,
  RESTORE_ALL_CHECKLISTS_FAILURE,
  GET_SINGLE_CHECKLIST,
  GET_SINGLE_CHECKLIST_SUCCESS,
  UPDATE_CHECKLIST,
  UPDATE_CHECKLIST_SUCCESS,
  GET_CHECKLIST_FROM_STORAGE,
  GET_CHECKLIST_FROM_STORAGE_SUCCESS,
  GET_ONE_CHECKLIST,
  GET_ONE_CHECKLIST_SUCCESS,
  GET_ONE_CHECKLIST_FAILURE
} from "../../constants/actionTypes";

const response = {
  data: {
    checklists: [
      {
        id: 1,
        createdBy: "Jude Afam",
        name: "poland-Uganda-dnZjGPGwo",
        config: [
          {
            url: "",
            type: "image",
            order: 1,
            prompt: "Do you have a passport",
            configuration: {
              url: "",
              options: [],
              behaviour: {
                name: "preview image",
                action: {
                  type: "PREVIEW_IMAGE",
                  payload: "http://url"
                }
              }
            }
          }
        ],
        ChecklistDestinations: 1,
        user: {
          fullName: "Jude Afam"
        }
      }
    ]
  }
};

const response2 = {
  data: { message: "checklist created successfully" }
};

const error = {
  response: {
    data: {
      status: 400,
      error: "An error occurred"
    }
  }
};

const checklistPayload = {
  checklists: [],
  deletedChecklists: [],
  destinations: [
    {
      name: "Andorra",
      native: "Andorra",
      phone: "376",
      continent: "EU",
      capital: "Andorra la Vella"
    },
    {
      name: "United Arab Emirates",
      native: "دولة الإمارات العربية المتحدة",
      phone: "971",
      continent: "AS",
      capital: "Abu Dhabi"
    }
  ],
  disableRedo: true,
  disableUndo: false,
  error: null,
  isDeleting: false,
  isRestoring: false,
  items: [
    {
      id: "wkTebrKO-",
      order: 1,
      prompt: "Do you think this makes sense?",
      type: "radio"
    }
  ],
  loading: false,
  message: "",
  nationality: {
    emoji: "",
    name: "Afghanistan"
  }
};

toast.error = jest.fn();
toast.success = jest.fn();

describe("Checklist wizard sagas api requests", () => {
  it("creates a new checklist", () => {
    return expectSaga(watchCreateDynamicChecklist, travelDynamiChecklistApi)
      .provide([
        [
          matchers.call.fn(
            travelDynamiChecklistApi.createDynamicChecklist,
            checklistPayload
          ),
          response2
        ]
      ])
      .put({
        type: CREATE_DYNAMIC_CHECKLIST_SUCCESS,
        response: response2.data.message
      })
      .dispatch({
        type: CREATE_DYNAMIC_CHECKLIST,
        payload: checklistPayload
      })
      .silentRun();
  });

  it("throws error if there is an error creating a checklist", () => {
    return expectSaga(watchCreateDynamicChecklist, travelDynamiChecklistApi)
      .provide([
        [
          matchers.call.fn(travelDynamiChecklistApi.createDynamicChecklist),
          throwError(error)
        ]
      ])
      .call(toast.error, "An error occurred")
      .dispatch({
        type: CREATE_DYNAMIC_CHECKLIST,
        payload: checklistPayload
      })
      .silentRun();
  });

  it("throws error if unable to fetch single checklist", () => {
    return expectSaga(watchGetSingleChecklist, travelDynamiChecklistApi)
      .provide([
        [
          matchers.call.fn(travelDynamiChecklistApi.getSingleChecklist),
          throwError(error)
        ]
      ])
      .dispatch({
        type: GET_SINGLE_CHECKLIST,
        checklistId: 1
      })
      .silentRun();
  });

  it("delete dynamic checklists", () => {
    return expectSaga(watchDeleteChecklistWizard, travelDynamiChecklistApi)
      .provide([
        [
          matchers.call.fn(travelDynamiChecklistApi.deleteAChecklist, 1),
          response2
        ]
      ])
      .put({
        type: DELETE_CHECKLIST_SUCCESS,
        deletedChecklist: response.data.checklists,
        checklistId: 1
      })
      .dispatch({
        type: DELETE_CHECKLIST,
        deletedChecklist: response.data.checklists,
        checklistId: 1
      })
      .silentRun();
  });

  it("throws error if there is an error deleting a checklist", () => {
    return expectSaga(watchDeleteChecklistWizard, travelDynamiChecklistApi)
      .provide([
        [
          matchers.call.fn(travelDynamiChecklistApi.deleteAChecklist),
          throwError(error)
        ]
      ])
      .put({
        type: DELETE_CHECKLIST_FAILURE
      })
      .dispatch({
        type: DELETE_CHECKLIST
      })
      .silentRun();
  });

  it("fetch deleted checklists successfully", () => {
    return expectSaga(watchGetDeletedChecklists, travelDynamiChecklistApi)
      .provide([
        [matchers.call.fn(travelDynamiChecklistApi.deletedChecklists), response]
      ])
      .put({
        type: GET_ALL_DELETED_CHECKLISTS_SUCCESS,
        deletedChecklists: response.data.checklists
      })
      .dispatch({
        type: GET_DELETED_CHECKLISTS
      })
      .silentRun();
  });

  it("throws error if there is an error fetching deleted checklists", () => {
    return expectSaga(watchGetDeletedChecklists, travelDynamiChecklistApi)
      .provide([
        [
          matchers.call.fn(travelDynamiChecklistApi.deletedChecklists),
          throwError(error)
        ]
      ])
      .put({
        type: GET_ALL_DYNAMIC_CHECKLISTS_FAILURE,
        error: error.response.data.error
      })
      .dispatch({
        type: GET_DELETED_CHECKLISTS
      })
      .silentRun();
  });

  it("gets all dynamic checklists", () => {
    return expectSaga(watchgetAllDynamicChecklists, travelDynamiChecklistApi)
      .provide([
        [
          matchers.call.fn(travelDynamiChecklistApi.getAllDynamicChecklists),
          response
        ]
      ])
      .put({
        type: GET_ALL_DYNAMIC_CHECKLISTS_SUCCESS,
        checklists: response.data.checklists
      })
      .dispatch({
        type: GET_ALL_DYNAMIC_CHECKLISTS
      })
      .silentRun();
  });

  it("throws error if unable to get all checklists", () => {
    return expectSaga(watchgetAllDynamicChecklists, travelDynamiChecklistApi)
      .provide([
        [
          matchers.call.fn(travelDynamiChecklistApi.getAllDynamicChecklists),
          throwError(error)
        ]
      ])
      .put({
        type: GET_ALL_DYNAMIC_CHECKLISTS_FAILURE,
        error: error.response.data.error
      })
      .dispatch({
        type: GET_ALL_DYNAMIC_CHECKLISTS
      })
      .silentRun();
  });

  it("throws error if there is an error fetching deleted checklists", () => {
    return expectSaga(watchGetDeletedChecklists, travelDynamiChecklistApi)
      .provide([
        [
          matchers.call.fn(travelDynamiChecklistApi.deletedChecklists),
          throwError(error)
        ]
      ])
      .put({
        type: GET_ALL_DYNAMIC_CHECKLISTS_FAILURE,
        error: error.response.data.error
      })
      .dispatch({
        type: GET_DELETED_CHECKLISTS
      })
      .silentRun();
  });

  it("restore a deleted checklist", () => {
    return expectSaga(watchRestoreAChecklist, travelDynamiChecklistApi)
      .provide([
        [
          matchers.call.fn(travelDynamiChecklistApi.restoreAChecklist, 1),
          response
        ]
      ])
      .put({
        type: RESTORE_CHECKLIST_SUCCESS,
        restoredChecklist: response.data.checklists,
        checklistId: 1
      })
      .dispatch({
        type: RESTORE_CHECKLIST,
        restoredChecklist: response.data.checklists,
        checklistId: 1
      })
      .silentRun();
  });

  it("throws error if unable to restore a deleted checklist", () => {
    return expectSaga(watchRestoreAChecklist, travelDynamiChecklistApi)
      .provide([
        [
          matchers.call.fn(travelDynamiChecklistApi.restoreAChecklist, 1),
          throwError(error)
        ]
      ])
      .put({
        type: RESTORE_CHECKLIST_FAILURE
      })
      .dispatch({
        type: RESTORE_CHECKLIST,
        restoredChecklist: response.data.checklists,
        checklistId: 1
      })
      .silentRun();
  });

  it("restore all deleted checklist", () => {
    return expectSaga(watchRestoreAllChecklists, travelDynamiChecklistApi)
      .provide([
        [matchers.call.fn(travelDynamiChecklistApi.restoreAllChecklists)]
      ])
      .put({
        type: RESTORE_ALL_CHECKLISTS_SUCCESS
      })
      .dispatch({
        type: RESTORE_ALL_CHECKLISTS
      })
      .silentRun();
  });

  it("throws error if unable to restore all deleted checklist", () => {
    return expectSaga(watchRestoreAllChecklists, travelDynamiChecklistApi)
      .provide([
        [
          matchers.call.fn(travelDynamiChecklistApi.restoreAllChecklists),
          throwError(error)
        ]
      ])
      .put({
        type: RESTORE_ALL_CHECKLISTS_FAILURE
      })
      .dispatch({
        type: RESTORE_ALL_CHECKLISTS
      })
      .silentRun();
  });

  it("should update checklist", () => {
    return expectSaga(watchUpdateDynamicChecklist, travelDynamiChecklistApi)
      .provide([
        [
          matchers.call.fn(
            travelDynamiChecklistApi.updateChecklist,
            1,
            checklistPayload
          )
        ]
      ])
      .dispatch({
        type: UPDATE_CHECKLIST,
        checklist: checklistPayload,
        checklistId: 1
      })
      .silentRun();
  });

  it("throws error if unable to update a checklist", () => {
    return expectSaga(watchUpdateDynamicChecklist, travelDynamiChecklistApi)
      .provide([
        [
          matchers.call.fn(travelDynamiChecklistApi.updateChecklist),
          throwError(error)
        ]
      ])
      .call(toast.error, "An error occurred")
      .dispatch({
        type: UPDATE_CHECKLIST,
        checklist: checklistPayload,
        checklistId: 1
      })
      .silentRun();
  });
});

describe("Travel Checklist Wizard Saga test", () => {
  it("adds checklist item successfully", () => {
    return expectSaga(watchAddChecklistWizard)
      .put({
        type: ADD_NEW_CHECKLIST_ITEM_SUCCESS,
        newItem: [{}]
      })
      .dispatch({
        type: ADD_NEW_CHECKLIST_ITEM,
        item: [{}]
      })
      .silentRun();
  });

  it("handles checklist item", () => {
    return expectSaga(watchHandleChecklistItems)
      .put({
        type: HANDLE_ITEMS_SUCCESS,
        newItem: [{}]
      })
      .dispatch({
        type: HANDLE_ITEMS,
        item: [{}]
      })
      .silentRun();
  });

  it("adds question to the checklist item", () => {
    return expectSaga(watchAddQuestion)
      .put({
        type: ADD_QUESTION_SUCCESS,
        newItems: [{}]
      })
      .dispatch({
        type: ADD_QUESTION,
        items: [{}]
      })
      .silentRun();
  });

  it("removes an item from a checklist item", () => {
    return expectSaga(watchDeleteItems)
      .put({
        type: DELETE_ITEM_SUCCESS,
        order: 1
      })
      .dispatch({
        type: DELETE_ITEM,
        order: 1
      })
      .silentRun();
  });

  it("removes question from a checklist item", () => {
    return expectSaga(watchDeleteQuestion)
      .put({
        type: DELETE_QUESTION_SUCCESS,
        newItems: [{}]
      })
      .dispatch({
        type: DELETE_QUESTION,
        items: [{}]
      })
      .silentRun();
  });

  it("updates a checklist behaviour", () => {
    return expectSaga(watchUpdateBehaviour)
      .put({
        type: UPDATE_BEHAVIOUR_SUCCESS,
        newItems: [{}]
      })
      .dispatch({
        type: UPDATE_BEHAVIOUR,
        items: [{}]
      })
      .silentRun();
  });

  it("updates a checklist origin/nationality", () => {
    return expectSaga(watchUpdateNationality)
      .put({
        type: UPDATE_NATIONALITY_SUCCESS,
        nationality: {}
      })
      .dispatch({
        type: UPDATE_NATIONALITY,
        items: {}
      })
      .silentRun();
  });

  it("updates a checklist destination", () => {
    return expectSaga(watchUpdateDestination)
      .put({
        type: UPDATE_DESTINATION_SUCCESS,
        destination: [{}]
      })
      .dispatch({
        type: UPDATE_DESTINATION,
        items: [{}]
      })
      .silentRun();
  });

  it("get storage from local storage", () => {
    return expectSaga(watchGetChecklistFromStorage)
      .put({
        type: GET_CHECKLIST_FROM_STORAGE_SUCCESS,
        origin: checklistPayload.nationality,
        destinations: checklistPayload.destinations,
        config: checklistPayload.items
      })
      .dispatch({
        type: GET_CHECKLIST_FROM_STORAGE,
        checklistWizard: checklistPayload
      })
      .silentRun();
  });

  it('gets one checklist', () => {
    return expectSaga(watchGetOneChecklist, travelDynamiChecklistApi)
      .provide([[matchers.call.fn(travelDynamiChecklistApi.getOneChecklist), response]])
      .put({
        type: GET_ONE_CHECKLIST_SUCCESS,
        payload: response.data.checklists
      })
      .dispatch({
        type: GET_ONE_CHECKLIST
      })
      .silentRun();
  });

  it('throws error if there is an error getting a checklist', () => {
    return expectSaga(watchGetOneChecklist, travelDynamiChecklistApi)
      .provide([[matchers.call.fn(travelDynamiChecklistApi.getOneChecklist), throwError(error)]])
      .put({
        type: GET_ONE_CHECKLIST_FAILURE,
        error: error.response.data.error
      })
      .dispatch({
        type: GET_ONE_CHECKLIST
      })
      .silentRun();
  });
});
