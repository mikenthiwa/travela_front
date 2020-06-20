import React from 'react';
import { shallow } from 'enzyme';
import BuilerOption from '../index';
import RadioOptions from '../RadioOptions';
import NotifyEmailBehaviour from '../../BuilderBehaviour/NotifyEmailBehaviour';

jest.mock('react-redux', () => ({
  connect: (state, dispatch) => {
    return component => component;
  }
}));

const props = {
  item: {
    id: 'kjlkd',
    name: 'awesome',
    configuration: {
      options: [{
        id: 'kldskd',
        name: 'are you serious?',
        behaviour: {
          type: 'NOTIFY_EMAIL',
          payload: 'john@example.com'
        }
      }, {
        id: 'kldadf',
        name: 'are you really serious?',
        behaviour: {
          type: 'PREVIEW_DOCUMENT',
          payload: 'john2@example.com'
        }
      }]
    }
  },
  handleItems: jest.fn(),
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

describe('<BuilerOption />', () => {
  let wrapper3;
  beforeEach(() => {
    wrapper3 = mockNotify(props3);
  });
  it('should render correctly', () => {
    const wrapper = shallow(<BuilerOption {...props} />);
    expect(wrapper.find(RadioOptions)).toHaveLength(2);
  });

  it('should handle add another question', () => {
    const wrapper = mount(<BuilerOption {...props} />);
    const mockEvents = jest.fn();
    const btn = wrapper.find('.anoter-question-btn');
    btn.first().simulate('click', mockEvents);
    expect(wrapper.props().handleItems).toHaveBeenCalledTimes(1);
  });

  it('should handle delete question', () => {
    const wrapper = mount(<BuilerOption {...props} />);
    const btn = wrapper.find('.builder-delete-icon');
    props.handleItems.mockClear();
    btn.first().simulate('click');
    expect(wrapper.props().handleItems).toHaveBeenCalledTimes(1);
  });

  it('should handle update behaviour', () => {
    const wrapper = mount(<BuilerOption {...props} />);
    wrapper.find('.set-behaviour-btn').first().simulate('click');
    props.handleItems.mockClear();
    const input = wrapper3.find('.create-email-template-button').simulate('click');
    expect(input).toHaveLength(1);
    expect(wrapper.props().handleItems).toHaveBeenCalledTimes(0);
  });
});
