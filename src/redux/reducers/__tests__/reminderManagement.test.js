import reminderTemplatesReducer from '../reminderManagement';
import {
  createReminderEmailTemplate,
  createReminderEmailTemplateSuccess,
  createReminderEmailTemplateFailure,
  getSingleReminderEmailTemplate,
  getSingleReminderEmailTemplateSuccess,
  getSingleReminderEmailTemplateFailure,
  updateSingleReminderEmailTemplate,
  updateSingleReminderEmailTemplateSuccess,
  updateSingleReminderEmailTemplateFailure
} from '../../actionCreator/reminderManagementActions';
import {
  reminderTemplateData,
  errorResponse
} from '../../../views/ReminderSetup/__mocks__/ReminderSetup';

describe('Reminder Email Templates reducer', () => {
  const initialState = {
    newEmailTemplate: {
      isSaving: false,
      errors: {},
      data: {}
    },
    updatedEmailTemplate: {
      isSaving: false,
      errors: {},
      data: {}
    }
  };

  it('returns default state if no action dispatched', () => {
    const output = reminderTemplatesReducer(initialState, {});
    expect(output).toEqual(initialState);
  });

  it('sets isSaving to true when reminder email template created', () => {
    const action = createReminderEmailTemplate(reminderTemplateData, {});
    const expectedOutput = {
      errors: {},
      isSaving: true
    };
    const output = reminderTemplatesReducer(initialState, action);
    expect({...output.newEmailTemplate}).toEqual(expectedOutput);
  });

  it('sets isSaving to false and updates with data on success', () => {
    const action = createReminderEmailTemplateSuccess({reminderEmailTemplate: reminderTemplateData});
    const expectedOutput = {
      errors: {},
      isSaving: false,
      data: {...reminderTemplateData}
    };
    const output = reminderTemplatesReducer(initialState, action);
    expect(output.newEmailTemplate).toEqual(expectedOutput);
  });

  it('sets isSaving to false and updates with errors on failure', () => {
    const action = createReminderEmailTemplateFailure({...errorResponse});
    const expectedOutput = {
      ...errorResponse
    };
    const output = reminderTemplatesReducer(initialState, action);
    expect(output.newEmailTemplate.errors).toEqual(expectedOutput);
  });

  it('sets isFetching to true when fetching one reminder template', () => {
    const action = getSingleReminderEmailTemplate(1, {});
    const expectedOutput = {
      isFetching: true,
      errors: {}
    };
    const output = reminderTemplatesReducer(initialState, action);
    expect(output.updatedEmailTemplate).toEqual(expectedOutput);
  });

  it('sets isFetching to false and updates with data on success', () => {
    const action = getSingleReminderEmailTemplateSuccess({
      reminderEmailTemplate: reminderTemplateData
    });
    const expectedOutput = {
      isFetching: false,
      data: {...reminderTemplateData},
      errors: {}
    };
    const output = reminderTemplatesReducer(initialState, action);
    expect(output.updatedEmailTemplate).toEqual(expectedOutput);
  });

  it('sets isFetching to false and updates with errors on failure', () => {
    const action = getSingleReminderEmailTemplateFailure({
      ...errorResponse
    });
    const expectedOutput = {
      isFetching: false,
      errors: {...errorResponse}
    };
    const output = reminderTemplatesReducer(initialState, action);
    expect(output.updatedEmailTemplate).toEqual(expectedOutput);
  });

  it('sets isUpdating to true when updating one reminder template', () => {
    const action = updateSingleReminderEmailTemplate(
      1,
      {},
      reminderTemplateData
    );
    const expectedOutput = {
      isSaving: true,
      errors: {}
    };
    const output = reminderTemplatesReducer(initialState, action);
    expect(output.updatedEmailTemplate).toEqual(expectedOutput);
  });

  it('sets isUpdating to false and updates with data on success', () => {
    const action = updateSingleReminderEmailTemplateSuccess({
      reminderEmailTemplate: reminderTemplateData
    });
    const expectedOutput = {
      isSaving: false,
      data: {...reminderTemplateData},
      errors: {}
    };
    const output = reminderTemplatesReducer(initialState, action);
    expect(output.updatedEmailTemplate).toEqual(expectedOutput);
  });

  it('sets isFetching to false and updates with errors on failure', () => {
    const action = updateSingleReminderEmailTemplateFailure({
      ...errorResponse
    });
    const expectedOutput = {
      isSaving: false,
      errors: {...errorResponse}
    };
    const output = reminderTemplatesReducer(initialState, action);
    expect(output.updatedEmailTemplate).toEqual(expectedOutput);
  });
});
