import React from 'react';
import { shallow } from 'enzyme';
import PreviewRadio from '../index';

const props = {
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

describe('<PreviewRadio />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<PreviewRadio {...props} />);
    expect(wrapper.find('div'));
  });


  it('should hadle checkname function', () => {
    const wrapper = shallow(<PreviewRadio {...props} />);
    wrapper.instance().handleCheckName('upload a document', 1);
    expect(wrapper.state('preview')).toEqual(true);
    expect(wrapper.state('behaviourName')).toEqual('upload a document');
  });
});
