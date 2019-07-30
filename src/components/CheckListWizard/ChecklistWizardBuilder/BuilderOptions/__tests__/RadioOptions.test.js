import React from 'react';
import { shallow } from 'enzyme';
import RadioOption from '../RadioOptions';

const props = {
  item: {
    id: 'kldskd',
    name: 'are you serious?',
    behaviour: {
      type: 'NOTIFY_EMAIL',
      payload: 'john@example.com'
    }
  },
  updateBehaviour: jest.fn(),
  deleteQuestion: jest.fn(),
};

describe('<RadioOption />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<RadioOption {...props} />);
    expect(wrapper.find('div'));
  });

  it('should handle update behaviour', () => {
    
    const wrapper = mount(<RadioOption {...props} />);
    const mockEvents = { target: { value: 'Passport?'} };
    const btn = wrapper.find('#option-name-input');
    btn.simulate('change', mockEvents);
    expect(wrapper.updateBehaviour).toBeCalled;
  });

  it('should handle delete icon onChange', () => {
    const wrapper = mount(<RadioOption {...props} />);
    const mockEvents = { target: { value: 'Passport?'} };
    const deleteIcon = wrapper.find('button#option-del-icon');
    deleteIcon.simulate('click', mockEvents);
    expect(wrapper.deleteQuestion).toBeCalled;
  });

  it('should handle show behaviour btn', () => {
    
    const wrapper = mount(<RadioOption {...props} />);
    const mockEvents = jest.fn();
    const btn = wrapper.find('.set-behaviour-btn');
    btn.simulate('click', mockEvents);
    expect(wrapper.showListOfBehaviours).toBeCalled;
  });

  it('should handle show behaviour btn', () => {
    
    const wrapper = mount(<RadioOption {...props} />);
    wrapper.find('.set-behaviour-btn').first().simulate('click');
    const input = wrapper.find('#emailToSend');
    input.first().simulate('change');
    expect(input).toHaveLength(1);
    expect(wrapper.instance().props.updateBehaviour).toBeCalled;
  });
});
