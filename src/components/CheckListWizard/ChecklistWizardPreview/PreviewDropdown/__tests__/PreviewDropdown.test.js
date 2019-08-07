import React from 'react';
import { shallow, mount} from 'enzyme';
import PreviewDropdown from '..';

const props = {
  item: {
    prompt: 'Do you have a valid visa?',
    order: 1,
    configuration: {
      options: [
        {
          id: 1,
          name: 'Apple',
          behaviour: {
            action: 'preview dropdown',
            action: {
              type: '',
              payload: ''
            }
          }
        }
      ]
    },
  },
  behaviour: {},
  showBehaviour: false,
  handleCheckName: jest.fn()
};

describe('<PreviewDropdown />', () => {
  it('should render without crashing', () => {
    const wrapper = mount(<PreviewDropdown {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle check name', () => {
    const wrapper = mount(<PreviewDropdown {...props} />);
    const instance = wrapper.instance();
    wrapper.setState({
      behaviour: {},
      showBehaviour: true,
      payload: ''
    });
    instance.handleCheckName(props.behaviour);
    expect(instance.state.showBehaviour).toBe(true);
  });
});
