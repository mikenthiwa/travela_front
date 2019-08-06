import React from 'react';
import { shallow } from 'enzyme';
import Dropdown from '../index';
import MetaData from '../metaData';

const props = {
  dropdownOptions: MetaData.itemTypeDropdownMetaData,
  value: '',
  changeFunc: jest.fn()
};

describe('<Dropdown />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Dropdown {...props} />);
    expect(wrapper.find('div'));
  });

  it('should handle select option click', () => {
    const wrapper = mount(<Dropdown {...props} />);
    const mockEvents = jest.fn();
    wrapper.setState({optionsOpen: true});
    const btn = wrapper.find('#IMAGE');
    btn.simulate('click', mockEvents);
    expect(wrapper.selectOption).toBeCalled;
    expect(wrapper.instance().closeOption(mockEvents));
    wrapper.setState({optionsOpen: true});
    wrapper.unmount();
  });

  it('should handle click outside container', () => {
    const wrapper = shallow(<Dropdown {...props} />);
    const mockEvents = jest.fn();
    wrapper.setState({optionsOpen: true});
    const btn = wrapper.find('.select-option-container');
    btn.simulate('click', mockEvents);
    expect(wrapper.closeOption).toBeCalled;
  });
});
