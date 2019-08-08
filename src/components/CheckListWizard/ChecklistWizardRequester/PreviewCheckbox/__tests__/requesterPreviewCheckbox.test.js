import React from 'react';
import { mount } from 'enzyme';
import RequesterViewCheckbox from '..';
import PreviewBehaviour from '../../../ChecklistWizardPreview/PreviewBehaviour';

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
    }
  },
  handleSkipToQuestion: jest.fn(),
};

describe('<PreviewCheckbox />', () => {
  it('render <PreviewCheckbox />', () => {
    const wrapper = mount(<RequesterViewCheckbox {...props} />);
    wrapper.find('.checkbox-preview-wrapper');
    expect(wrapper.find('.checkbox-preview-wrapper')).toHaveLength(1);
  });

  it('should handle handleCheckbox', () => {
    const wrapper = mount(<RequesterViewCheckbox {...props} />);
    const event = { target: { checked: true } };
    const event2 = { target: { checked: false } };

    wrapper.find('.checkbox-input').first().simulate('change', event);
    expect(wrapper.state('isChecked')).toBe(1);
    expect(wrapper.find(PreviewBehaviour)).toHaveLength(1);

    wrapper.find('.checkbox-input').first().simulate('change', event2);
    expect(wrapper.state('isChecked')).toBe(0);
  });
});
