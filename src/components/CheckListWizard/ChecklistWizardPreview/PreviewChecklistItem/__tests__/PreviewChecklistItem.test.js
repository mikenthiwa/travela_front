import React from 'react';
import { shallow } from 'enzyme';
import PreviewChecklistItem from '../index';

const props = {
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
  }
};

describe('<PreviewChecklistItem />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<PreviewChecklistItem {...props} />);
    expect(wrapper.find('div'));
  });
});
