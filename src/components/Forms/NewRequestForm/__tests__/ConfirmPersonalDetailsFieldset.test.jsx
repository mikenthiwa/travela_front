import React from 'react';
import { shallow, mount } from 'enzyme';
import ConfirmPersonalDetailsFieldset from '../FormFieldsets/ConfirmPersonalDetails';

describe('<ConfirmPersonalDetailsFieldset/>',()=> {
  const props = {
    managers:['Mananger1'],
    occupations:['Software Developer'],
    departments: [{id:'dept', text:'finance', parentId: null}],
    collapsible: jest.fn(),
    collapse: false,
    userDetails: jest.fn(),
    nextStep: jest.fn(),
    values: {},
    savePersonalDetails: jest.fn(),
    onChangeAutoSuggestion: jest.fn(),
    hasBlankFields: true,
    getUserDetails: jest.fn(),
  };
  it('renders correctly', () => {
    const wrapper = shallow(<ConfirmPersonalDetailsFieldset {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('tests handleDisableInputs', ()=>{
    const wrapper = shallow(<ConfirmPersonalDetailsFieldset {...props} />);
    const instance = wrapper.instance();
    instance.handleDisableInputs('clicked');
    expect(wrapper.state('disableInputs')).toBe('disable-details');
  });
  it('tests onChangeAutoSuggestion inputField for role', () => {
    const event = { target: { value: 'yes' } };
    const wrapper = shallow(<ConfirmPersonalDetailsFieldset {...props} />);
    wrapper.find('Input#your-role').simulate('change', event);
    expect(wrapper.instance().props.onChangeAutoSuggestion).toHaveBeenCalledTimes(1);

  });
  it('tests onChangeAutoSuggestion inputField for manager', () => {
    const event = { target: { value: 'yes' } };
    const wrapper = shallow(<ConfirmPersonalDetailsFieldset {...props} />);
    wrapper.find('Input#your-manager').simulate('change', event);
    expect(wrapper.instance().props.onChangeAutoSuggestion).toHaveBeenCalledTimes(2);

  });

  it('tests onChangeAutoSuggestion inputField for Location', () => {
    const event = { target: { value: 'yes' } };
    const wrapper = shallow(<ConfirmPersonalDetailsFieldset {...props} />);
    wrapper.find('Input#user-location').simulate('change', event);
    expect(wrapper.instance().props.onChangeAutoSuggestion).toHaveBeenCalledTimes(3);

  });
  it('tests onChangeAutoSuggestion inputField for department', () => {
    const event = { target: { value: 'yes' } };
    const wrapper = shallow(<ConfirmPersonalDetailsFieldset {...props} />);
    wrapper.find('Input#your-department').simulate('change', event);
    expect(wrapper.instance().props.onChangeAutoSuggestion).toHaveBeenCalledTimes(3);

  });
  it('invalidates wrong input', () => {
    const invalidProps = {
      ...props,
      title: '',
    };
    const wrapper = shallow(<ConfirmPersonalDetailsFieldset {...invalidProps} />);
    const result = wrapper.find('#submit');
    expect(result.props().disabled).toEqual(true);
  });
  it('validtes correct input', () => {
    const wrapper = shallow(<ConfirmPersonalDetailsFieldset {...props} />);
    const result = wrapper.find('#submit');
    expect(result.props().disabled).toEqual(true);
  });
  it('It makes a call when the next button is click', () => {
    const event = { target: { value: 'yes' } };
    const wrapper = shallow(<ConfirmPersonalDetailsFieldset {...props} />);
    wrapper.find('button').simulate('click', event);
    expect(props.nextStep).toHaveBeenCalledTimes(1);
  });
});
