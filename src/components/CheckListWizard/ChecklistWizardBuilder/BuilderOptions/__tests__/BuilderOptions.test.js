import React from 'react';
import { shallow } from 'enzyme';
import BuilerOption from '../index';
import RadioOptions from '../RadioOptions';

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

describe('<BuilerOption />', () => {
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
    wrapper.find('#emailToSend').first().simulate('change', { target: { value: 'some@email.com' } });
    expect(wrapper.props().handleItems).toHaveBeenCalledTimes(1);
  });
});
