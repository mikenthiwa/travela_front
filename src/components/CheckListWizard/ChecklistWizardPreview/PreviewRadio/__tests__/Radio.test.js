import React from 'react';
import { shallow } from 'enzyme';
import Radio from '../Radio';

const props = {
  prompt: 'Do you have valid visa',
  behaviourName: 'Yes',
  handleCheckName: jest.fn(),
  options: {
    id: 1,
    name: 'Yes',
    behaviour: {
      name: 'upload a document',
      payload: 'UPLOAD_DOCUMENT',
    }
  },
  optionId: 1,
  radioId: 1,
  order: 1,
};

describe('<Radio />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Radio {...props} />);
    expect(wrapper.find('div'));
  });

  it('should handle prompt input onChange', () => {
    const wrapper = mount(<Radio {...props} />);
    const mockEvents = { target: { value: 'Passport?'} };
    const input = wrapper.find('.radio-btn');
    input.simulate('change', mockEvents);
    expect(wrapper.handleCheckName).toBeCalled;
  });

  it('should handle change of behaviour', () => {
    const wrapper = shallow(<Radio {...props} />);
    wrapper.setProps({behaviourName: 'skip to another question'});
    expect(wrapper.handleCheckName).toBeCalled;
  });
});
