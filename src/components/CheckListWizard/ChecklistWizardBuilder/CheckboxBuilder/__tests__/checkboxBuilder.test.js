import React from 'react';
import { shallow, mount } from 'enzyme';
import RenderCheckbox from '..';
import CheckboxOption from '../CheckboxOption';
import NotifyEmailBehaviour from '../../BuilderBehaviour/NotifyEmailBehaviour';

jest.mock('react-redux', () => ({
  connect: (state, dispatch) => {
    return component => component;
  }
}));

const props = {
  item: {
    id: 'kljaidjaiodf',
    order: 1,
    behaviour: {
      type: 'NOTIFY_EMAIL',
      payload: 'document',
    },
    configuration: {
      options: [
        {
          id: 'dkadajfda',
          name: 'are you awesome?'
        }
      ]
    }
  },
  handleItems: jest.fn(),
  addQuestion: jest.fn(),
  configuration: { options: [{ behaviour: { name: 'upload a document', action: { payload: ' '} } }] },
  updateBehaviour: jest.fn(),
  order: 1,
  optionId: 1,
  deleteQuestion: jest.fn(),
  deleteRadioOptionBehaviour: jest.fn(),
};

const props2 = {
  option: {
    id: 'klksjlfa',
    name: 'are you awesome?'
  },
  deleteQuestion: jest.fn(),
  updateBehaviour: jest.fn(),
  optionId: 1,
  name: '',
  order: 1,
  deleteRadioOptionBehaviour: jest.fn(),
};

const props3 = {
  behaviour: { type: 'NOTIFY_EMAIL', payload: {} },
  handleBehaviour: jest.fn(),
  closeModal: jest.fn(), 
  openModal: jest.fn(),
  shouldOpen: false,
};

const setup = props => {
  return mount(<RenderCheckbox {...props} />);
};

const setup2 = props => {
  return mount(<CheckboxOption {...props} />);
};

const mockNotify = props3 => {
  return shallow(<NotifyEmailBehaviour {...props3} />);
};

describe('<RenderCheckbox/>', () => {
  let wrapper;
  let wrapper2;
  let wrapper3;
  beforeEach(() => {
    wrapper = setup(props);
    wrapper2 = setup2(props2);
    wrapper3 = mockNotify(props3);
  });

  it('should render RenderCheckbox component properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render RenderCheckbox component properly', () => {
    expect(wrapper2).toMatchSnapshot();
  });
  it('shoudl call showListOfBehaviours when button is clicked', () => {
    jest.spyOn(wrapper.instance(), 'showListOfBehaviours');
    wrapper.find('.set-behaviour-btn').first().simulate('click');
    expect(wrapper.state('showBehaviourList')).toEqual(true);
  });
  it('shoudl call addQuestion when addQuestion button is clicked', () => {
    const spy = jest.spyOn(wrapper.instance(), 'addQuestion');
    wrapper.find('.anoter-question-btn').first().simulate('click');
    expect(props.handleItems).toHaveBeenCalled;
  });

  it('shoudl call updateBehaviour when updateBehaviour button is clicked', () => {
    const event = { target: { value: 'yes' }};
    wrapper2.find('input').simulate('change', event, 1, 1, 'name');
    expect(props2.updateBehaviour).toHaveBeenCalledWith({ ...props2.option, name: 'yes' });
  });

  it('should handle delete icon onChange', () => {
    const mockEvents = { target: { value: 'Passport?'} };
    const deleteIcon = wrapper2.find('button#option-del-icon');
    deleteIcon.simulate('click', mockEvents);
    expect(wrapper.deleteQuestion).toBeCalled;
  });

  it('should handle update question', () => {
    props.handleItems.mockClear();
    const mockEvents = { target: { value: 'Passport?'} };
    const BehaviourInput = wrapper.find('#option-name-input').first();
    BehaviourInput.simulate('change', mockEvents);
    expect(wrapper.instance().props.handleItems).toHaveBeenCalledTimes(1);
  });

  it('should handle delete question', () => {
    props.handleItems.mockClear();
    const BehaviourInput = wrapper.find('#option-del-icon').first();
    BehaviourInput.simulate('click');
    expect(wrapper.instance().props.handleItems).toHaveBeenCalledTimes(1);
  });

  it('should handle update behaviour', () => {
    props.handleItems.mockClear();
    wrapper.find('.set-behaviour-btn').first().simulate('click');
    const input = wrapper3.find('.create-email-template-button');
    input.simulate('click');
    wrapper.instance().updateBehaviour(props.behaviour);
    expect(wrapper.instance().props.handleItems).toHaveBeenCalledTimes(1);
  });
});
