import React from 'react';
import { mount } from 'enzyme';
import RadioButtonField from '../CheckListItems/RadioButtonField';


describe('<RadioButtonField />', () => {
  const props = {
    postSubmission: jest.fn(),
    handleDuoField: jest.fn(),
    tripId: '1',
    requestId: '1',
    checklistItem : { submissions: [{}] },
    checkId: '1-1'

  };

  const wrapper = mount(<RadioButtonField {...props} />);

  it('should render the radio buttons on mount', () => {
    expect(wrapper.find('.radio-buttons').length).toBe(1);
    expect(wrapper.find('.radio-button').length).toBe(3);
    expect(wrapper.find('.radio-button').at(1).hasClass('checked')).toEqual(false);
  });

  it('should check a button if it has a value on mount', () => {
    const checklistItem =  { submissions: [{userResponse: 'yes'}] }
    const newProps = { ...props, checklistItem}
    const newWrapper = mount(<RadioButtonField {...newProps} />);
    expect(newWrapper.find('.radio-button').at(1).hasClass('checked')).toEqual(false);
  });

  it('should check button when clicked', () => {
    const radioButton = wrapper.find('.radio-button').at(1).find('.input-radio-button');
    radioButton.simulate('click');
    expect(wrapper.find('.radio-button').at(1).hasClass('checked')).toEqual(true);

  });

  it('should show other buttons if yes is selected for duo field', () => {
    wrapper.instance().handleRadioSubmit('yes')
    expect(props.handleDuoField).toHaveBeenCalled();
  });
});
