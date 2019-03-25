import reminderSetupReducer from '../listEmailTemplates';
import reminderTemplateDisableReducer from '../reminderTemplateDisable';
import reminderTemplateCreateReducer from '../reminderManagement';
import {
  fetchAllEmailTemplates,
  fetchAllEmailTemplatesFailure,
  fetchAllEmailTemplatesSuccess
} from '../../actionCreator/listEmailTemplatesActions';
import {
  disableEmailTemplate,
  disableEmailTemplateSuccess,
  disableEmailTemplateFailure,
  createReminderEmailTemplate,
  createReminderEmailTemplateSuccess,
  createReminderEmailTemplateFailure,
  enableReminderEmailTemplateSuccess
} from '../../actionCreator/reminderManagementActions';
import {
  DISABLE_EMAIL_TEMPLATE_SUCCESS
} from '../../constants/actionTypes';
import templates from '../../../views/ReminderSetup/__mocks__/ReminderSetup';
import {fetchTemplate } from '../../actionCreator/templatedetailsAction';

const { listOfTemplates, allTemplates } = templates;

describe('reminder setup reducer', () =>{
  const initialState = {
    selectedTemplate: {
      id: 1
    },
    templates: [
      {
        id: 1
      },
      {
        id: 2
      }
    ],
    errors:{},
    pagination: {},
    isLoading: false,
  };

  const initialState2 = {
    newEmailTemplate: {
      isSaving: true,
      errors: {},
    }
  };

  const initialState3 = {
    newEmailTemplate: {
      isSaving: false,
      errors: {},
    }
  };

  it('returns initial state if action is anonymous', () =>{
    const action = () => ({
      type: 'ANONYMOUS_ACTION'
    });
    const output = reminderSetupReducer(initialState, action);
    expect(output).toEqual(initialState);
  });

  it('sets islLoading to true when action is CREATE_REMINDER_EMAIL_TEMPLATES', () => {
    const action = createReminderEmailTemplate({payload: { data: {}}}, 'setting/url/create');
    const expectedOutput = { ...initialState2 };
    const output = reminderTemplateCreateReducer(initialState3, action);
    expect(output).toEqual(expectedOutput);
  });

  it('sets islLoading to true when action is CREATE_REMINDER_EMAIL_TEMPLATES_SUCCESS', () => {
    const action = createReminderEmailTemplateSuccess({response: { data: {}}});
    const expectedOutput = { ...initialState3 };
    const output = reminderTemplateCreateReducer(initialState3, action);
    expect(output).toEqual(expectedOutput);
  });

  it('sets islLoading to true when action is CREATE_REMINDER_EMAIL_TEMPLATES_FAILURE', () => {
    const action = createReminderEmailTemplateFailure({});
    const expectedOutput = { ...initialState3 };
    const output = reminderTemplateCreateReducer(initialState3, action);
    expect(output).toEqual(expectedOutput);
  });

  it('sets islLoading to true when action is FETCH_ALL_EMAIL_TEMPLATES', () => {
    const action = fetchAllEmailTemplates('?type=visa');
    const expectedOutput = { ...initialState, isLoading: true };
    const output = reminderSetupReducer(initialState, action);
    expect(output).toEqual(expectedOutput);
  });

  it('sets selected template', () =>{
    const action=fetchTemplate(1);
    const expectedOutput = {...initialState};
    const output = reminderSetupReducer(initialState, action);
    expect(output).toEqual(expectedOutput);
  });

  it('updates state with list of templates if action with type FETCH_ALL_EMAIL_TEMPLATES_SUCCESS', () => {
    const { templates, pagination } = listOfTemplates;
    const action = fetchAllEmailTemplatesSuccess(listOfTemplates);
    const output = reminderSetupReducer(initialState, action);
    const expectedResult = {
      selectedTemplate: {
        id: 1
      },
      templates,
      errors: {},
      isLoading: false,
      pagination
    };
    expect(output).toEqual(expectedResult);
  });

  it('updates application state with a list of errors', () => {
    const errors = {
      error: 'A server error occurred'
    };
    const action = fetchAllEmailTemplatesFailure(errors);
    const expectedOutput = {
      selectedTemplate: {
        id: 1
      },
      templates: [
        {
          id: 1
        },
        {
          id: 2
        }
      ],
      errors,
      pagination: {},
      isLoading: false
    };
    expect(reminderSetupReducer(initialState, action)).toEqual(expectedOutput);
  });

  it('updates state with disabled template if action with type DISABLE_EMAIL_TEMPLATE_SUCCESS', () => {
    const { templates } = listOfTemplates;
    templates[0].disabled = true;
    templates[0].reason = 'Reason';
    const action = disableEmailTemplateSuccess(templates[0], 'Reason');
    const output = reminderSetupReducer(allTemplates, action);
    const expectedResult = {
      templates,
      errors: {},
      isLoading: false,
    };
    expect(output).toEqual(expectedResult);
  });

  it('sets islLoading to true when action is DISABLE_EMAIL_TEMPLATE', () => {
    const action = disableEmailTemplate(listOfTemplates.templates[0]);
    const expectedOutput = { ...initialState, isLoading: true };
    const output = reminderTemplateDisableReducer(initialState, action);
    expect(output).toEqual(expectedOutput);
  });

  it('updates `isLoading` to false when DISABLE_EMAIL_TEMPLATE_SUCCESS is fired', () => {
    const initialState = {
      templates: [],
      errors:{},
      pagination: {},
      isLoading: false,
    };

    const action = {
      type: DISABLE_EMAIL_TEMPLATE_SUCCESS,
    };

    const output = reminderTemplateDisableReducer(initialState, action);
    const expectedResult = {
      ...initialState,
      isLoading: false,
    };
    expect(output).toEqual(expectedResult);
  });

  it('updates application state with a list of errors', () => {
    const errors = {
      error: 'A server error occurred'
    };
    const action = disableEmailTemplateFailure(errors);
    const expectedOutput = {
      selectedTemplate: {
        id: 1
      },
      templates: [
        {
          id: 1
        },
        {
          id: 2
        }
      ],
      errors,
      pagination: {},
      isLoading: false
    };
    expect(reminderTemplateDisableReducer(initialState, action)).toEqual(expectedOutput);
  });

  it('tests enable email template success', ()=>{
    const enabledTemplate = {
      id: 2,
      disabled: true
    };
    const action = enableReminderEmailTemplateSuccess(enabledTemplate,  2);
    const expectedOutput = {
      ...initialState,
      isLoading: false,
      templates: [
        {id: 1},
        {disabled: true,
          id: 2}]
    };
    expect(reminderSetupReducer(initialState, action)).toEqual(expectedOutput);
  });
});
