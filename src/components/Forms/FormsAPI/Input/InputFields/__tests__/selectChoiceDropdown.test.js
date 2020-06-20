import React from 'react';
import { shallow, mount } from 'enzyme';
import SelectChoiceDropdown from '../SelectChoiceDropdown';

describe('<SelectChoiceDropdown />', () => {
  const props = {
    options: [
      {
        name: 'Departments',
        items: ['Success']
      }
    ],
    selectedOption: 0,
    value: 'Technology',
    handleMenuClick: jest.fn(),
    handleClick: jest.fn(),
    handleChoice: jest.fn(),
    hideDropdownOnClickOutside: jest.fn(),
    onChange: jest.fn()
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<SelectChoiceDropdown {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle click', () => {
    const wrapper = mount(<SelectChoiceDropdown {...props} />);
    const instance = wrapper.instance();
    wrapper.setState({
      open: false
    });
    const menu = wrapper.find('input');
    menu.simulate('click');
    expect(instance.state.open).toBe(true);
  });

  it('should handle menu click', () => {
    const wrapper = mount(<SelectChoiceDropdown {...props} />);
    const instance = wrapper.instance();
    wrapper.setState({
      selectedOption: 0
    });
    const menu = wrapper.find('li').first();
    menu.simulate('click');
    expect(instance.state.selectedOption).toBe(0);
  });

  it('should handle hiding the dropdown onclicking outside', () => {
    const wrapper = mount(<SelectChoiceDropdown {...props} />);
    const e = {
      target: {
        name:'',
      }
    };
    wrapper.find('div').at(0).simulate('click', {e} );
    const instance = wrapper.instance();
    wrapper.setState({
      open: false
    });
    instance.hideDropdownOnClickOutside({ preventDefault: jest.fn() });
    instance.componentWillUnmount();
    expect(instance.state.open).toBe(false);
  });

  it('should handle choice', () => {
    const wrapper = mount(<SelectChoiceDropdown {...props} />);
    const instance = wrapper.instance();
    wrapper.setState({
      open: false,
      openInner: true,
      value: {
        value: 'Technology',
        option: 'Departments'
      },
      options: [
        {
          items: [],
          name: 'Departments'
        }
      ]
    });
    const choice = wrapper.find('li').last();
    choice.simulate('click');
    instance.handleChoice(props.value);
    expect(instance.state.value).toBe('Technology');
  });

  it('should handle toggleInnerDropdown', () => {
    const wrapper = mount(<SelectChoiceDropdown {...props} />);
    const instance = wrapper.instance();
    wrapper.setState({
      open: false,
      openInner: true,
      value: {
        value: 'Technology',
        option: 'Departments'
      },
      options: [
        {
          items: [],
          name: 'Departments'
        }
      ]
    });
    wrapper.find('.selectChoice-dropdown__dropdown__menu img').simulate('click');
    instance.handleChoice(props.value);
    expect(instance.state.value).toBe('Technology');
  });

  it('should have onChange default props', () => {
    const result = SelectChoiceDropdown.defaultProps.onChange();
    expect(result).toBe(undefined);
  });
});
