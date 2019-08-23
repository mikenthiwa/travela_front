import React from 'react';
import { shallow } from 'enzyme';
import RequesterViewCheckbox from '..';

const props = {
  item: {
    id: 'lkakdfa',
    prompt: 'are you sure?',
    order: 1,
    type: 'checkbox',
    behaviour: {
      type: 'UPLOAD_DOCUMENT'
    },
    configuration: {
      options: [{
        id: 'dkladjfa',
        name: 'yes'
      }]
    },
    response: {
      id: 'lkakdfa',
      selectedValue: ['dkladjfa'],
      behaviour: {
        document: {
          data: {
            imageName: 'image.png'
          }
        },
        payload: 'passport',
        type: 'UPLOAD_DOCUMENT'
      }
    }
  },
  handleSkipToQuestion: jest.fn(),
  handleResponse: jest.fn(),
};

describe('<PreviewCheckbox />', () => {
  it('render <PreviewCheckbox />', () => {
    const wrapper = shallow(<RequesterViewCheckbox {...props} />);
    wrapper.find('.checkbox-preview-wrapper');
    expect(wrapper.find('.checkbox-preview-wrapper')).toHaveLength(1);
  });

  it('should handle handleCheckbox', () => {
    const wrapper = shallow(<RequesterViewCheckbox {...props} />);
    const event = { target: { checked: true } };
    wrapper.find('.checkbox-input').first().simulate('change', event);
    wrapper.instance().handleBehaviour(props.item.behaviour);
    expect(props.handleResponse).toHaveBeenCalled();
    wrapper.instance().renderPreviewBehavior();
  });
});
