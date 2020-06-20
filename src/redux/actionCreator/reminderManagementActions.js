import {
  CREATE_REMINDER_EMAIL_TEMPLATE,
  CREATE_REMINDER_EMAIL_TEMPLATE_FAILURE,
  CREATE_REMINDER_EMAIL_TEMPLATE_SUCCESS,
  ENABLE_REMINDER_EMAIL_TEMPLATE,
  ENABLE_REMINDER_EMAIL_TEMPLATE_SUCCESS,
  ENABLE_REMINDER_EMAIL_TEMPLATE_FAILURE,
  DISABLE_EMAIL_TEMPLATE,
  DISABLE_EMAIL_TEMPLATE_SUCCESS,
  DISABLE_EMAIL_TEMPLATE_FAILURE,
  FETCH_ONE_EMAIL_TEMPLATE,
  FETCH_ONE_EMAIL_TEMPLATE_FAILURE,
  FETCH_ONE_EMAIL_TEMPLATE_SUCCESS,
  UPDATE_REMINDER_EMAIL_TEMPLATE,
  UPDATE_REMINDER_EMAIL_TEMPLATE_FAILURE,
  UPDATE_REMINDER_EMAIL_TEMPLATE_SUCCESS
} from '../constants/actionTypes';

export const createReminderEmailTemplate = (payload, history) => ({
  type: CREATE_REMINDER_EMAIL_TEMPLATE,
  payload,
  history
});

export const createReminderEmailTemplateSuccess = response => ({
  type: CREATE_REMINDER_EMAIL_TEMPLATE_SUCCESS,
  response
});

export const createReminderEmailTemplateFailure = errors => ({
  type: CREATE_REMINDER_EMAIL_TEMPLATE_FAILURE,
  errors
});

export const enableReminderEmailTemplate = templateId => ({
  type: ENABLE_REMINDER_EMAIL_TEMPLATE,
  templateId
});

export const enableReminderEmailTemplateSuccess = (enabledTemplate, templateId )=> ({
  type: ENABLE_REMINDER_EMAIL_TEMPLATE_SUCCESS,
  enabledTemplate,
  templateId
});

export const enableReminderEmailTemplateFailure = errors => ({
  type: ENABLE_REMINDER_EMAIL_TEMPLATE_FAILURE,
  errors,
});
// disable email templates
export const disableEmailTemplate = (templateId, disableReason) => ({
  type: DISABLE_EMAIL_TEMPLATE,
  templateId,
  disableReason
});

export const disableEmailTemplateSuccess = (disabledTemplate, reason) => ({
  type: DISABLE_EMAIL_TEMPLATE_SUCCESS,
  disabledTemplate,
  reason,
});

export const disableEmailTemplateFailure = (error) => ({
  type: DISABLE_EMAIL_TEMPLATE_FAILURE,
  error,
});

export const getSingleReminderEmailTemplate = (templateId, history) => ({
  type: FETCH_ONE_EMAIL_TEMPLATE,
  templateId,
  history
});

export const getSingleReminderEmailTemplateSuccess = response => ({
  type: FETCH_ONE_EMAIL_TEMPLATE_SUCCESS,
  response
});

export const getSingleReminderEmailTemplateFailure = errors => ({
  type: FETCH_ONE_EMAIL_TEMPLATE_FAILURE,
  errors
});

export const updateSingleReminderEmailTemplate = (templateId, history, payload) => ({
  type: UPDATE_REMINDER_EMAIL_TEMPLATE,
  templateId,
  history,
  payload
});

export const updateSingleReminderEmailTemplateSuccess = response => ({
  type: UPDATE_REMINDER_EMAIL_TEMPLATE_SUCCESS,
  response
});

export const updateSingleReminderEmailTemplateFailure = errors => ({
  type: UPDATE_REMINDER_EMAIL_TEMPLATE_FAILURE,
  errors
});
