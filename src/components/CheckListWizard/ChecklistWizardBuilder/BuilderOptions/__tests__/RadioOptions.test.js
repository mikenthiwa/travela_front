import React from 'react';
import { shallow } from 'enzyme';
import RadioOption from '../RadioOptions';
import NotifyEmailBehaviour from '../../BuilderBehaviour/NotifyEmailBehaviour';

jest.mock('react-redux', () => ({
  connect: (state, dispatch) => {
    return component => component;
  }
}));

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

const props3 = {
  behaviour: { type: 'NOTIFY_EMAIL', payload: {} },
  handleBehaviour: jest.fn(),
  closeModal: jest.fn(), 
  openModal: jest.fn(),
  shouldOpen: false,
};

const mockNotify = props3 => {
  return shallow(<NotifyEmailBehaviour {...props3} />);
};

const setup = props => {
  return shallow(<RadioOption {...props} />);
};

const setup2 = props => {
  return mount(<RadioOption {...props} />);
};
describe('<RadioOption />', () => {
  let wrapper;
  let secondWrapper;
  let wrapper3;
  beforeEach(() => {
    wrapper = setup(props);
    secondWrapper = setup2(props);
    wrapper3 = mockNotify(props3);
  });
  it('should render RenderCheckbox component properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render RenderCheckbox component properly', () => {
    expect(secondWrapper).toMatchSnapshot();
  });

  it('should handle update behaviour', () => {
    const mockEvents = { target: { value: 'Passport?'} };
    const btn = secondWrapper.find('#option-name-input');
    btn.simulate('change', mockEvents);
    wrapper.instance().changeBehaviour(wrapper.behaviour);
    expect(wrapper.updateBehaviour).toBeCalled;
  });

  it('should handle delete icon onChange', () => {
    const mockEvents = { target: { value: 'Passport?'} };
    const deleteIcon = secondWrapper.find('button#option-del-icon');
    deleteIcon.simulate('click', mockEvents);
    expect(wrapper.deleteQuestion).toBeCalled;
  });

  it('should handle show behaviour btn', () => {
    const mockEvents = jest.fn();
    const btn = secondWrapper.find('.set-behaviour-btn');
    btn.simulate('click', mockEvents);
    expect(wrapper.showListOfBehaviours).toBeCalled;
  });

  it('should handle show behaviour btn', () => {
    
    const wrapper = mount(<RadioOption {...props} />);
    wrapper.find('.set-behaviour-btn').first().simulate('click');
    const input = wrapper3.find('.create-email-template-button');
    input.simulate('click');
    expect(input).toHaveLength(1);
    expect(wrapper.instance().props.updateBehaviour).toBeCalled;
  });
});
