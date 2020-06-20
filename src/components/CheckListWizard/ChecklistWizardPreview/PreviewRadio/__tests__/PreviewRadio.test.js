import React from 'react';
import { shallow, mount } from 'enzyme';
import PreviewRadio from '../index';

const props = {
  item: {
    prompt: 'Do you have valid visa',
    id: 'klakdja',
    configuration: {
      options: [
        {
          id: 1,
          name: 'Yes',
          behaviour: {
            type: 'UPLOAD_DOCUMENT',
          }
        },
      ]
    }
  },
  handleSkipToQuestion: jest.fn(),
};

describe('<PreviewRadio />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<PreviewRadio {...props} />);
    expect(wrapper.find('div'));
  });


  it('should hadle checkname function', () => {
    const wrapper = mount(<PreviewRadio {...props} />);
    wrapper.find('.radio-btn.checklist-preview').first().simulate('change');
    expect(wrapper.state('preview')).toEqual(true);
    expect(wrapper.state('behaviour')).toEqual(props.item.configuration.options[0].behaviour);
  });
});
