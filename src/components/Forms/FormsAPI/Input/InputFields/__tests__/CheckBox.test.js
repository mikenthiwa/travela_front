import React from 'react';
import sinon from 'sinon';
import CheckBox from '../CheckBox';

describe('<CheckBox />', () => {
  const props = {
    name: '',
    onChange: jest.fn(),
    value: ''
  };

  it('renders as expected', () => {
    const wrapper = shallow(<CheckBox {...props} />);
    expect(wrapper.length).toEqual(1);
  });

  it('handle onChange function', () => {
    const wrapper = shallow(<CheckBox {...props} />);
    const event = {
      target: { checked: false },
    };
    wrapper.find('#checkbox').simulate('change', event);
    expect(props.onChange).toHaveBeenCalledTimes(1);
  });

  it('should change state with `value = true` ', () => {
    const wrapper = mount(<CheckBox {...props} />);    
    const event = {
      target: { checked: true },
    };
    wrapper.find('#checkbox').simulate('change', event);
    expect(wrapper.state().condition).toBe(true);
  });

  it('should change state with `value = false` ', () => {
    const wrapper = mount(<CheckBox {...props} />);
    const event = {
      target: { checked: false },
    };
    wrapper.find('#checkbox').simulate('change', event);
    expect(wrapper.state().condition).toBe(false);
  });
});
