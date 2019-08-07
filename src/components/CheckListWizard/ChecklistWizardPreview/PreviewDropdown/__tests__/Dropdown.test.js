import React from 'react';
import { shallow } from 'enzyme';
import Dropdown from '../Dropdown';

const props = {
  handleCheckName: jest.fn(),
  configuration: {
    options: [
      {
        id: 1,
        name: 'Apple',
        behaviour: {
          action: {
            type: '',
            payload: ''
          }
        }
      }
    ]
  },
  handleClick: jest.fn(),
  value: 'Apple',
  onChange: jest.fn(),
  handleItemChoice: jest.fn(),
  behaviourName: 'preview document',
  payload: { name: 'Apple.pdf' }
};

describe('<Dropdown />', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<Dropdown {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle click', () => {
    const wrapper = shallow(<Dropdown {...props} />);
    const instance = wrapper.instance();
    wrapper.setState({
      open: false
    });
    const input = wrapper.find('input');
    input.simulate('click');
    instance.handleClick = jest.fn();
    expect(instance.state.open).toBe(true);
  });

  it('should handle hiding the dropdown onclicking outside', () => {
    const wrapper = mount(<Dropdown {...props} />);
    const e = {
      target: {
        name: ''
      }
    };
    const div = wrapper.find('div').first();
    div.simulate('click', e);
    const instance = wrapper.instance();
    wrapper.setState({
      open: true
    });
    instance.handleClickOutside({ preventDefault: jest.fn() });
    instance.componentWillUnmount();
    expect(instance.state.open).toBe(false);
  });

  it('should handle item choice', () => {
    const wrapper = mount(<Dropdown {...props} />);
    const instance = wrapper.instance();
    const itemChoice = wrapper.find('input');
    itemChoice.simulate('change');
    instance.handleItemChoice(props.value);
    wrapper.setState({
      open: true
    });
    wrapper.find('li').simulate('click');
  });
});
