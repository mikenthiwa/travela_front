import moment from 'moment';
import createEventHandlersFor from '..';

describe('Default eventHandlers', () => {
  let eventHandlers, targetForm, targetField, validate, setState;

  beforeEach(() => {
    validate = jest.fn(field => {});
    setState = jest.fn((newState, callback) => {
      callback();
    });
    targetForm = {
      state: {values: {}},
      setState,
      validate
    };
  });

  it('calls setState with the correct new state object', () => {
    const name = 'John Doe';
    targetField = 'fullname';
    eventHandlers = createEventHandlersFor(targetForm, targetField, 'validate');
    eventHandlers.handleInputChange({target: {value: name}});
    const setStateFirstArg = targetForm.setState.mock.calls[0][0];
    expect(setStateFirstArg).toEqual({values: {fullname: name}});
  });

  it('validates the target input field with change date', () => {
    const date = moment(new Date());
    targetField = 'dateOfBirth';
    eventHandlers = createEventHandlersFor(targetForm, targetField, 'validate');
    eventHandlers.handleSelectDate(date);
    expect(targetForm.validate).toHaveBeenCalledWith(targetField);
  });

  it('validates the target input field on dropdown change', () => {
    const selection = 'john.mutuma@andela.com';
    targetField = 'manager';
    eventHandlers = createEventHandlersFor(targetForm, targetField, 'validate');
    eventHandlers.handleSelectDropdown(selection);
    expect(targetForm.validate).toHaveBeenCalledWith(targetField);
  });
});
