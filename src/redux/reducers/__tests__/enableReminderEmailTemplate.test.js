import enableReminderEmailTemplateReducer from '../enableReminderEmailTemplate';

import {
  enableReminderEmailTemplate,
  enableReminderEmailTemplateFailure,
} from '../../actionCreator/reminderManagementActions';

import {
  ENABLE_REMINDER_EMAIL_TEMPLATE_SUCCESS,
} from '../../constants/actionTypes';

describe('enable reminder email template reducer', () =>{
  const initialState = {
    templates: [],
    errors:{},
    pagination: {},
    isLoading: false,
  };

  it('returns initial state if action is anonymous', () =>{
    const action = () => ({
      type: 'ANONYMOUS_ACTION'
    });
    const output = enableReminderEmailTemplateReducer(initialState, action);
    expect(output).toEqual(initialState);
  });

  it('sets islLoading to true when action is ENABLE_REMINDER_EMAIL_TEMPLATE', () => {
    const templateId = 1;
    const action = enableReminderEmailTemplate(templateId);
    const expectedOutput = { ...initialState, isLoading: true };
    const output = enableReminderEmailTemplateReducer(initialState, action);
    expect(output).toEqual(expectedOutput);
  });

  it('updates application state with a list of errors', () => {
    const errors = {
      error: 'A server error occurred'
    };
    const action = enableReminderEmailTemplateFailure(errors);
    const expectedOutput = {
      errors,
      isLoading: false,
      pagination: {},
      templates: [],
    };
    expect(enableReminderEmailTemplateReducer(initialState, action)).toEqual(expectedOutput);
  });

  it('should handle ENABLE_REMINDER_EMAIL_TEMPLATE_SUCCESS', () => {
    const initialState = {
      templates: [],
      errors:{},
      pagination: {},
      isLoading: false,
    };
    const action = {
      type: ENABLE_REMINDER_EMAIL_TEMPLATE_SUCCESS,
    };
    const newState = enableReminderEmailTemplateReducer(initialState, action);
    const expectedState = {
      ...initialState,
      isLoading: false

    };

    expect(newState).toEqual(expectedState);
  });
});
