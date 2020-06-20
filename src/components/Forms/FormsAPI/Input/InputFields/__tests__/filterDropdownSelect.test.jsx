import React from 'react';
import { shallow, mount } from 'enzyme';
import FilterDropdownSelect from '../filterDropdownSelect';

describe('<filterDropdownSelect/>', () => {
  const choices = ['manager', 'associate'];
  const props = {
    onChange: jest.fn(),
    value: 'manager',
    size: 'medium'
  };

  it('shows receives error class name', () => {
    const wrapper = shallow( <FilterDropdownSelect {...props} /> );
    expect(wrapper).toMatchSnapshot();
  });
  it('input responds to onChange event', () => {
    const wrapper = shallow(<FilterDropdownSelect {...props} />);
    wrapper.find('input').simulate('change', {target: {value: 'Your new Value'}});
    expect (wrapper.state('dropdownClass')).toBe('select-dropdown');
  });
  it('test onClick event of choices in dropdown', () => {
    const wrapper = mount(<FilterDropdownSelect {...props} choices={choices} />);
    wrapper.find('input').simulate('change', {target: {name:'role', value: 'manager'}});
    wrapper.find('li').simulate('click', { preventDefault() {} });
    expect (wrapper.state('dropdownClass')).toBe('select-dropdown');
  });
  it('test onClick event of choices in dropdown', () => {
    const props = { size: '245px', value: '' };
    const onChange = () => {};
    const wrapper = mount(<FilterDropdownSelect {...props} choices={choices} onChange={onChange} />);
    wrapper.find('input').simulate('change', {target: {name:'role', value: 'manager'}});
    wrapper.find('#choice').at(0).simulate('click');
    expect (wrapper.state('dropdownOpen')).toBe(false);
  });

  it(' should call handleClickOnOption when clicked', () => {
    const props = { size: '245px', value: '' };
    const onChange = () => {};
    const wrapper = mount(<FilterDropdownSelect {...props} choices={choices} onChange={onChange} />);
    const spy = jest.spyOn(wrapper.instance(), 'handleClickOnOption');
    wrapper.update();
    wrapper.find('.occupationInput').simulate('change', {target: {name:'role', value: 'manager'}});
    wrapper.find('#choice').at(1).simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });

});
