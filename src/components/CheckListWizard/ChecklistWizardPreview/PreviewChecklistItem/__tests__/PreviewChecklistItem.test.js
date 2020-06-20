import React from 'react';
import { shallow } from 'enzyme';
import PreviewChecklistItem from '../index';

const props = {
  item: {
    id: 1,
    type: 'radio',
    prompt: 'Do you have valid visa',
    order: 1,
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
  },
  handleSkipToQuestion: jest.fn()
};

describe('<PreviewChecklistItem />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<PreviewChecklistItem {...props} />);
    expect(wrapper.find('div'));
  });

  it('should animate order position update', () => {
    const wrapper = shallow(<PreviewChecklistItem {...props} />);
    props.item.id = 2;
    wrapper.setProps({...props});
    const event = { target: { classList: { remove: jest.fn() } } };
    wrapper.find('.preview-order').first().simulate('animationend', event);
    expect(event.target.classList.remove).toHaveBeenCalled();
  });
});
