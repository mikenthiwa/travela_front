import React from 'react';
import { shallow, mount } from 'enzyme';
import RenderCheckbox from '..';
import CheckboxOption from '../CheckboxOption';

const props = {
  addQuestion: jest.fn(),
  configuration: { options: [{ behaviour: { name: 'upload a document', action: { payload: ' '} } }] },
  updateBehaviour: jest.fn(),
  order: 1,
  deleteQuestion: jest.fn()
};

const props2 = {
  updateBehaviour: jest.fn(),
  deleteQuestion: jest.fn(),
  optionId: 1,
  name: '',
  order: 1
};

const setup = props => {
  return shallow(<RenderCheckbox {...props} />);
};

const setup2 = props => {
  return mount(<CheckboxOption {...props} />);
};

describe('<RenderCheckbox/>', () => {
  let wrapper;
  let wrapper2;
  beforeEach(() => {
    wrapper = setup(props);
    wrapper2 = setup2(props2);
  });

  it('should render RenderCheckbox component properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('shoudl call showListOfBehaviours when button is clicked', () => {
    jest.spyOn(wrapper.instance(), 'showListOfBehaviours');
    wrapper.find('button').at(0).simulate('click', 1);
    expect(wrapper.state('showBehaviourList')).toEqual(true);
  });

  it('shoudl call addQuestion when addQuestion button is clicked', () => {
    wrapper.find('button').at(1).simulate('click', 1);
    expect(props.addQuestion).toHaveBeenCalledTimes(1);
    expect(props.addQuestion).toHaveBeenCalledWith(1);
  });

  it('shoudl call updateBehaviour when updateBehaviour button is clicked', () => {
    const event = { target: { value: 'yes' }};
    wrapper2.find('input').simulate('change', event, 1, 1, 'name');
    expect(props2.updateBehaviour).toHaveBeenCalledWith('yes', 1, 1, 'name');
  });

  it('should handle delete icon onChange', () => {
    const mockEvents = { target: { value: 'Passport?'} };
    const deleteIcon = wrapper2.find('button#option-del-icon');
    deleteIcon.simulate('click', mockEvents);
    expect(wrapper.deleteQuestion).toBeCalled;
  });
});
