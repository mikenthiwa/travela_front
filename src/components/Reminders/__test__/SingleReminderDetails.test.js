import React from 'react';
import SingleReminderDetails from '../SingleReminderDetails';

const props = {
  conditionId: 1,
  activeDocument: 'passport',
  singleReminder: {
    data: {
      conditionName: 'Passport Expiry',
      id: 1,
      reminders: [
        {
          frequency: '2 Months',
          id: 1,
          reminderTemplateId: 1,
        },
        {
          frequency: '3 Weeks',
          id: 2,
          reminderTemplateId: 1,
        }
      ],
    },
  },
  closeModal: jest.fn(),
  handleCancel: jest.fn(),
  handleOnSend: jest.fn(),
  shouldOpen: true,
  modalType: 'reminder details1',
  history: {
    push: jest.fn()
  }
};

describe('<SingleReminderDetails />', ()=> {
  it('should render correctly', () =>{
    const wrapper = mount(<SingleReminderDetails {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should display reminder with two frequncy', () =>{
    const wrapper = mount(<SingleReminderDetails {...props} />);
    const reminders = wrapper.find('ReminderItem');
    expect(reminders).toHaveLength(2);
    expect(wrapper.find('Modal .frequncy_count').first().text()).toBe('Reminder 1');
  });

  it('should not open reminder details modal when \'shouldOpen\' is false', () =>{
    const wrapper = mount(<SingleReminderDetails {...props} shouldOpen={false} />);
    const reminders = wrapper.find('ReminderItem');
    expect(reminders).toHaveLength(0);
  });

  it('should open reminder details modal with reminder details \'shouldOpen\' is true', () =>{
    const wrapper = mount(<SingleReminderDetails {...props} shouldOpen />);
    const reminderDeailsTitle = wrapper.find('ReminderItem .frequncy_count');
    const reminderDetailsFrequency = wrapper.find('ReminderItem .frequency');
    expect(reminderDeailsTitle.at(0).text()).toBe('Reminder 1');
    expect(reminderDeailsTitle.at(1).text()).toBe('Reminder 2');
    expect(reminderDetailsFrequency.at(0).text())
      .toBe('To be sent 2 Months to Expiry');
    expect(reminderDetailsFrequency.at(1).text())
      .toBe('To be sent 3 Weeks to Expiry');
  });

  it('should close reminder details modal when \'closeModal\' function is called', () =>{
    const wrapper = mount(<SingleReminderDetails {...props} shouldOpen />);
    const handleCancel = jest.spyOn(wrapper.instance(), 'handleCancel');
    const closeModal = jest.spyOn(wrapper.props(), 'closeModal');
    const cancelButton = wrapper.find('#cancel');
    cancelButton.simulate('click');
    expect(handleCancel).toHaveBeenCalledTimes(1);
    expect(closeModal).toHaveBeenCalledTimes(1);
  });

  it('should push router to edit page with conditionId when\'handleOnSend\' is called', () =>{
    const wrapper = mount(<SingleReminderDetails {...props} shouldOpen />);
    const handleOnSend = jest.spyOn(wrapper.instance(), 'handleOnSend');
    const editButton = wrapper.find('#submit');
    editButton.simulate('click');
    expect(handleOnSend).toHaveBeenCalledTimes(1);
    expect(props.history.push)
      .toHaveBeenCalledWith('/settings/reminders/edit/1');
  });
});
