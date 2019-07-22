import React from 'react';
import { shallow } from 'enzyme';
import BuilerOption from '../index';

const props = {
  order: 1,
  type: 'radio',
  prompt: 'Do you hava a valid visa?',
  configuration: {
    options: [
      {
        id: 1,
        name: 'Yes',
        behaviour: {
          name: 'upload a document',
          payload: 'UPLOAD_DOCUMENT',
        }
      },
    ]
  },
  addQuestion: jest.fn(),
  updateBehaviour: jest.fn(),
  deleteQuestion: jest.fn(),
};

describe('<BuilerOption />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<BuilerOption {...props} />);
    expect(wrapper.find('div'));
  });

  it('should handle add another question', () => {
    
    const wrapper = mount(<BuilerOption {...props} />);

    const mockEvents = jest.fn();
    const btn = wrapper.find('.anoter-question-btn');
    btn.simulate('click', mockEvents);
    expect(wrapper.addQuestion).toBeCalled;
  });
});
