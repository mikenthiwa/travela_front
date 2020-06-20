import React from 'react';
import { shallow } from 'enzyme';
import DropdownSelect from '../DropdownSelect';

describe('<DropdownSelect />', () => {
  const choices = ['manager', 'associate'];
  const onChange = () => {};
  it('renders fine', () => {
    const wrapper = shallow(<DropdownSelect value="" size="245px" choices={choices} onChange={onChange} />);
    expect (wrapper).toMatchSnapshot();
  });
  it('test onClick event of choices in dropdown', () => {
    const wrapper = mount(<DropdownSelect value="" size="245px" choices={choices} onChange={onChange} />);
    expect (wrapper.find('div.input')).toHaveLength(1);
    wrapper.find('div.input').simulate('click');
    wrapper.find('#choice').at(0).simulate('click');
    expect (wrapper.state('dropdownOpen')).toBe(false);
  });
  it('clone should call handleOptClick when clicked', () => {
    const wrapper = mount(<DropdownSelect value="" size="245px" choices={choices} onChange={onChange} />);
    const spy = jest.spyOn(wrapper.instance(), 'handleOptClick');
    wrapper.update();
    wrapper.find('div.input').simulate('click');
    wrapper.find('div#choice').at(0).simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('handles scrolling', () => {
    const props = {
      value: '',
      size: '150x',
      choices: choices,
      onChange: jest.fn(),
      templatesCount: 8,
      fetchAllEmailTemplates: jest.fn(),
      currentPage: 2,
      pageCount: 4,
    };

    const event = {
      target: {
        scrollTop: 200,
      },
    };

    const wrapper = mount(<DropdownSelect {...props} />);
    const spy = jest.spyOn(wrapper.instance(), 'handleDropDownScroll');
    wrapper.instance().handleDropDownScroll(event);
    wrapper.update();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
