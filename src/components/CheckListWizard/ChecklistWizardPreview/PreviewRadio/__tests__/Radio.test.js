import React from 'react';
import { shallow } from 'enzyme';
import Radio from '../Radio';

const props = {
  option: {
    id: 'kjaslda',
    name: 'Yes',
    order: 1,
    behaviour: {
      type: 'UPLOAD_DOCUMENT',
    }
  },
  checked: false,
  handleCheckName: jest.fn()
};

describe('<Radio />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Radio {...props} />);
    expect(wrapper.find('label.radio-cell'));
  });

  it('should handle prompt input onChange', () => {
    const wrapper = mount(<Radio {...props} />);
    const input = wrapper.find('.radio-btn');
    input.simulate('change');
    expect(wrapper.instance().props.handleCheckName).toBeCalled;
  });
});
