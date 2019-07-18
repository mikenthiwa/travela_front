import React from 'react';
import { shallow, mount } from 'enzyme';
import MultipleChoiceDropdown from '../MultipleChoiceDropdown';

describe('<MultipleChoiceDropdown />', () => {
  const props = {
    options: [
      {
        name: 'Countries',
        items: ["Aruba"]
      }
    ],
    selectedOption: 0,
    value: 'France',
    handleMenuClick: jest.fn(),
    handleClick: jest.fn(),
    handleChoice: jest.fn(),
    hideDropdownOnClickOutside: jest.fn(),
    onChange: jest.fn()
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<MultipleChoiceDropdown {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle click', () => {
    const wrapper = mount(<MultipleChoiceDropdown {...props} />);
    const instance = wrapper.instance();
    wrapper.setState({
      open: false
    });
    const menu = wrapper.find('input');
    menu.simulate('click');
    expect(instance.state.open).toBe(true);
  });

  it('should handle menu click', () => {
    const wrapper = mount(<MultipleChoiceDropdown {...props} />);
    const instance = wrapper.instance();
    wrapper.setState({
      selectedOption: 0
    });
    const menu = wrapper.find('li').first();
    menu.simulate('click');
    expect(instance.state.selectedOption).toBe(0);
  });

  it('should handle hiding the dropdown onclicking outside', () => {
    const wrapper = mount(<MultipleChoiceDropdown {...props} />);
    const e = {target:{
      name:""
    }}
    const div = wrapper.find('div').first();
    div.simulate('click', e );
    const instance = wrapper.instance();
    wrapper.setState({
      open: false
    });
    instance.hideDropdownOnClickOutside({ preventDefault: jest.fn() });
    instance.componentWillUnmount()
    expect(instance.state.open).toBe(false);
  });

  it('should handle choice', () => {
    const wrapper = mount(<MultipleChoiceDropdown {...props} />);
    const instance = wrapper.instance();
    wrapper.setState({
      open: false,
      value: {
        value: 'France',
        option: 'Countries'
      },
      options: [
        {
          items: [],
          name: 'Countries'
        }
      ]
    });
    const choice = wrapper.find('li').last();
    choice.simulate('click');
    instance.handleChoice(props.value);
    expect(instance.state.value).toBe('France');
  });

  it('should have onChange default props', () => {
    const result = MultipleChoiceDropdown.defaultProps.onChange();
    expect(result).toBe(undefined);
  });
});
