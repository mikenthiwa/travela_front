import React from 'react';
import DisableReminderTemplateForm from '../DisableReminderTemplate';

describe('Renders',() => {
  let wrapper;

  const props = {
    closeModal: jest.fn(),
    disableEmailReminder: jest.fn(),
    shouldOpen: true, 
    modalType: 'disable reminder condtion', 
    handleInputChange: jest.fn(),
    disableReason: 'Not working', 
    conditionReason: 'Not working', 
    templateReason: 'Did not work'
  };
  
  beforeEach(() => {
    wrapper = mount( <DisableReminderTemplateForm {...props}
    />);
  });
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
