import reminders, { initialState } from '../reminders';
import {
  CREATE_REMINDER,
  CREATE_REMINDER_SUCCESS,
  CREATE_REMINDER_FAILURE,
  FETCH_ALL_EMAIL_TEMPLATES,
  FETCH_ALL_EMAIL_TEMPLATES_SUCCESS,
  CREATE_REMINDER_EMAIL_TEMPLATE,
  GET_SINGLE_REMINDER,
  GET_SINGLE_REMINDER_SUCCESS,
  GET_SINGLE_REMINDER_FAILURE,
  EDIT_REMINDER,
  EDIT_REMINDER_SUCCESS,
  EDIT_REMINDER_FAILURE
} from '../../constants/actionTypes';

describe('reminders reducer', () => {
  it('returns the initial state', () => {
    expect(reminders(undefined, {})).toEqual(initialState);
  });

  it('handles CREATE_REMINDER action', () => {
    const expectedState = {
      ...initialState,
      newReminder: {
        ...initialState.newReminder,
        isCreating: true,
        errors: {}
      }
    };
    expect(reminders(initialState, {
      type: CREATE_REMINDER,
    })).toEqual(expectedState);
  });

  it('handles CREATE_REMINDER_SUCCESS action', () => {
    const expectedState = {
      ...initialState,
      newReminder: {
        ...initialState.newReminder,
        isCreating: false,
        data: {id: 1},
        errors: {}
      }
    };

    expect(reminders(initialState, {
      type: CREATE_REMINDER_SUCCESS,
      reminder: {id: 1}
    })).toEqual(expectedState);
  });

  it('handles CREATE_REMINDER_FAILURE action', () => {
    const expectedState = {
      ...initialState,
      newReminder: {
        ...initialState.newReminder,
        isCreating: false,
        errors: {conditionName: 'condition name must be unique'}
      }
    };

    expect(reminders(initialState, {
      type: CREATE_REMINDER_FAILURE,
      errors: {conditionName: 'condition name must be unique'}
    })).toEqual(expectedState);
  });

  it('handles FETCH_ALL_EMAIL_TEMPLATES action', () => {
    const expectedState = {
      ...initialState,
      isLoading: true
    };

    expect(reminders(initialState, {
      type: FETCH_ALL_EMAIL_TEMPLATES,
    })).toEqual(expectedState);
  });

  it('handles FETCH_ALL_EMAIL_TEMPLATES_SUCCESS action', () => {
    const expectedState = {
      ...initialState,
      isLoading: false,
      currentPage: 5,
    };

    expect(reminders(initialState, {
      type: FETCH_ALL_EMAIL_TEMPLATES_SUCCESS,
      pagination: {
        currentPage: 5
      },
      templates: [{id: 1}]
    })).toEqual(expectedState);
  });

  it('does not append new templates to existing templates when at the last pagination', () => {
    const expectedState = {
      ...initialState,
      isLoading: false,
      templates: [],
      currentPage: 0,
    };

    expect(reminders(initialState, {
      type: FETCH_ALL_EMAIL_TEMPLATES_SUCCESS,
      pagination: {
        currentPage: 0
      },
      templates: [{id: 1}]
    })).toEqual(expectedState);
  });

  it('resets the template state when CREATE_REMINDER_EMAIL_TEMPLATE is fired', () => {
    const expectedState = {
      ...initialState,
      templates: [],
    };

    expect(reminders(initialState, {
      type: CREATE_REMINDER_EMAIL_TEMPLATE
    })).toEqual(expectedState);
  });

  it('upates update single reminder state when GET_SINGLE_REMINDER is fired', () => {
    const expectedState = {
      ...initialState,
      singleReminder: {
        data: {},
        isLoading: true,
        errors: {},
      }
    };
    expect(reminders(initialState, {
      type: GET_SINGLE_REMINDER
    })).toEqual(expectedState);
  });

  it('successfully returns new reminder when GET_SINGLE_REMINDER_SUCCESS is fired', () => {
    const singleReminder ={
      isLoading: false,
      errors: {},
      data: {
        currentName: 'Passport EXpiry',
        documenType: 'Visa',
        reminders: [
          {
            frequency: '9 Days',
            remninderTemplateId: 1,
            id: 1,
          }
        ],
      },
    };
    const expectedState = {
      ...initialState,
      singleReminder,
    };

    expect(reminders(initialState, {
      type: GET_SINGLE_REMINDER_SUCCESS,
      reminder: {
        reminder: singleReminder.data
      }
    })).toEqual(expectedState);
  });

  it('resets the template state when GET_SINGLE_REMINDER_FAILURE is fired', () => {
    const singleReminder ={
      isLoading: false,
      data: {},
      errors: {
        message: 'coditionId should be a number'
      }
    };
    const expectedState = {
      ...initialState,
      singleReminder
    };

    expect(reminders(initialState, {
      type: GET_SINGLE_REMINDER_FAILURE,
      errors: {
        message: 'coditionId should be a number'
      }
    })).toEqual(expectedState);
  });

  it('upates a reminder state when EDIT_REMINDER is fired', () => {
    const expectedState = {
      ...initialState,
      updatedReminder: {
        data: {},
        isUpdating: true,
        errors: {},
      }
    };
    expect(reminders(initialState, {
      type: EDIT_REMINDER
    })).toEqual(expectedState);
  });

  it('successfully returns new reminder when EDIT_REMINDER_SUCCESS is fired', () => {
    const updatedReminder ={
      isUpdating: false,
      errors: {},
      data: {
        currentName: 'Passport EXpiry',
        documenType: 'Visa',
        reminders: [
          {
            frequency: '9 Days',
            remninderTemplateId: 1,
            id: 1,
          }
        ],
      },
    };
    const expectedState = {
      ...initialState,
      updatedReminder,
    };

    expect(reminders(initialState, {
      type: EDIT_REMINDER_SUCCESS,
      reminder: updatedReminder.data
    })).toEqual(expectedState);
  });

  it('resets the template state when EDIT_REMINDER_FAILURE is fired', () => {
    const updatedReminder ={
      isUpdating: false,
      data: {},
      errors: {
        message: 'coditionId should be a number'
      }
    };
    const expectedState = {
      ...initialState,
      updatedReminder
    };

    expect(reminders(initialState, {
      type: EDIT_REMINDER_FAILURE,
      errors: {
        message: 'coditionId should be a number'
      }
    })).toEqual(expectedState);
  });

});
