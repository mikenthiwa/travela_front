import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import RadioButton from '../CheckListItems/RadioButtonField/RadioButton';

describe('<RadioButton />', () => {
  const props = {
    onChange: sinon.spy(),
    checked: false,
    value: ''
  };

  const wrapper = mount(<RadioButton {...props} />);

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should set the correct state when the component mounts', () => {
    expect(wrapper.instance().state).toEqual({
      checked: false
    });
  });
  it('should render radio button', () => {
    expect(wrapper.find('.input-radio-button').length).toBe(1);
    expect(wrapper.find('.input-radio-button').hasClass('checked')).toEqual(false);
  });

  it('should check the button onClick', () => {
    const radioButton = wrapper.find('.input-radio-button');
    radioButton.simulate('click');
    expect(wrapper.find('.input-radio-button').hasClass('checked')).toEqual(true);
    radioButton.simulate('click');
    expect(wrapper.find('.input-radio-button').hasClass('checked')).toEqual(false);
  });

  it('should check the butto on props change', () => {
    wrapper.setProps({ checked: true})
    expect(wrapper.find('.input-radio-button').hasClass('checked')).toEqual(true);
  });
});
