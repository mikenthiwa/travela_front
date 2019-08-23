import {
  POST_CHECKLIST_SUBMISSION_STARTED,
  POST_CHECKLIST_SUBMISSION_SUCCESS,
  POST_CHECKLIST_SUBMISSION_FAILURE,
  FETCH_CHECKLIST_SUBMISSION,
  FETCH_CHECKLIST_SUBMISSION_SUCCESS,
  FETCH_CHECKLIST_SUBMISSION_FAILURE,
  UPDATE_CHECKLIST_SUBMISSION,
} from '../constants/actionTypes';

const handleDisabledItems = (checklists, newChecklist) => {
  const newChecklistItems = newChecklist.reduce((acc, curr) => acc.concat(curr.config), []);
    
  return checklists.map((checklist) => {
    const newConfig = checklist.config.map((config) => {
      const newItem = newChecklistItems.find(item => item.id === config.id);
      return { ...config, notApplicable: !!newItem.notApplicable };
    });
    return { ...checklist, config: newConfig };
  });
};

const postChecklistSubmissionStarted = state => ({
  ...state,
  isSaving: true,
});

const postChecklistSubmissionSuccess = (state, { payload: { checklist: { trips, checklists, ...rest } } }) => ({
  ...state,
  ...rest,
  checklists: handleDisabledItems(state.checklists, checklists),
  isSaving: false,
});

const postChecklistSubmissionFailure = (state, { payload }) => ({
  ...state,
  isSaving: false,
  error: payload,
});

const fetchChecklistSubmission = state => ({
  ...state,
  isLoading: true,
});

const fetchChecklistSubmissionSuccess = (state, { payload: { checklist } }) => ({
  ...state,
  ...checklist,
  isLoading: false,
});

const fetchChecklistSubmissionFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  error: payload,
});

const updateChecklistSubmission = (state, { payload: { field, data, isFieldArray } }) => ({
  ...state,
  [field]: isFieldArray ?  state[field].map(item => item.id === data.id ? data : item) : data,
});

const initialState = {
  id: '',
  checklists: [],
  trips: [],
  updatedAt: '',
  isSubmitted: false,
  isLoading: false,
  isSaving: false,
  completionCount: 0,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
  case POST_CHECKLIST_SUBMISSION_STARTED: return postChecklistSubmissionStarted(state);
  case POST_CHECKLIST_SUBMISSION_SUCCESS: return postChecklistSubmissionSuccess(state, action);
  case POST_CHECKLIST_SUBMISSION_FAILURE: return postChecklistSubmissionFailure(state, action);
  case FETCH_CHECKLIST_SUBMISSION: return fetchChecklistSubmission(state);
  case FETCH_CHECKLIST_SUBMISSION_SUCCESS: return fetchChecklistSubmissionSuccess(state, action);
  case FETCH_CHECKLIST_SUBMISSION_FAILURE: return fetchChecklistSubmissionFailure(state, action);
  case UPDATE_CHECKLIST_SUBMISSION: return updateChecklistSubmission(state, action);
  default: return state;
  }
};

export default reducer;
