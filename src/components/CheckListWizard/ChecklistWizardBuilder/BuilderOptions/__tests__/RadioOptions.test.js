import React from 'react';
import { shallow } from 'enzyme';
import RadioOption from '../RadioOptions';

const props = {
  order: 1,
  optionId: 1,
  optionNumber: 1,
  name: 'yes',
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
});
