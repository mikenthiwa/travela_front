import React from 'react';
import ReminderFormInputFields from '../ReminderFormInputFields';
import { Input } from '../../../FormsAPI';

const props = {
  totalReminders: 3,
  addNewReminder: jest.fn(),
  removeReminder: jest.fn(),
  onInputChange: jest.fn(),
  onReminderTemplateChange: jest.fn(),
  onReminderPeriodChange: jest.fn(),
  templates: [{
    id: '1',
    name: 'Email Reminder'
  }],
  currentPage: 3,
  loading: false,
  pageCount: 4,
  values: {
    'date-0': 1,
    'date-1': 2,
    'date-2': 10
  },
  fetchAllEmailTemplates: jest.fn(),
};
describe('ReminderFormInputFields', () => {
  const setup = (props) => shallow(<ReminderFormInputFields {...props} />);
  it('should render correctly', () => {
    const wrapper = setup(props);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the condition Input', () => {
    const wrapper = setup(props);
    const conditionInput = wrapper.find(Input).at(0);
    expect(conditionInput.length).toBe(1);
  });

  it('should render the correct number of reminder inputs', () => {
    const wrapper = setup(props);
    const remindersFieldset = wrapper.find('.reminders-fieldset');
    const totalInputs = remindersFieldset.find(Input);
    expect(totalInputs.length).toBe(9); // 3 input fields per reminder
  });

  it('should render the correct singular or plural form of dates', () => {
    const wrapper = setup(props);
    const singular = ['Day', 'Week', 'Month', 'Year'];
    const plural = singular.map((period) => `${period}s`);
    expect(wrapper.find('Input[name="period-0"]').props().choices).toEqual(singular);
    expect(wrapper.find('Input[name="period-1"]').props().choices).toEqual(plural);
    expect(wrapper.find('Input[name="period-2"]').props().choices).toEqual(plural);
  });

  it('should simulate onchange and onclick when they are called', () => {
    const wrapper = setup(props);
    const event = { preventDefault: jest.fn()};
    wrapper.find('[name="reminderTemplate-2"]').simulate('change', event);
    expect(props.onReminderTemplateChange).toBeCalled();
    wrapper.find('[name="period-0"]').simulate('change', event);
    expect(props.onReminderPeriodChange).toBeCalled();
    wrapper.find('.delete-icon').at(0).simulate('click');
    expect(props.removeReminder).toBeCalled();
  });
});
