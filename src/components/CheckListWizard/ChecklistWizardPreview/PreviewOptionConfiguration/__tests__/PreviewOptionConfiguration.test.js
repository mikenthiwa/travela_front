import React from 'react';
import { shallow } from 'enzyme';
import PreviewOptionConfiguration from '../index';

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

describe('<PreviewOptionConfiguration />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<PreviewOptionConfiguration {...props} />);
    expect(wrapper.find('div'));
  });

  it('should render correctly: checkbox', () => {
    props.type = 'checkbox';
    const wrapper = shallow(<PreviewOptionConfiguration {...props} />);
    expect(wrapper.find('div'));
  });

  it('should render correctly: dropdown', () => {
    props.type = 'dropdown';
    const wrapper = shallow(<PreviewOptionConfiguration {...props} />);
    expect(wrapper.find('div'));
  });

  it('should render correctly: image', () => {
    props.type = 'image';
    const wrapper = shallow(<PreviewOptionConfiguration {...props} />);
    expect(wrapper.find('div'));
  });

  it('should render correctly: video', () => {
    props.type = 'video';
    const wrapper = shallow(<PreviewOptionConfiguration {...props} />);
    expect(wrapper.find('div'));
  });

  it('should render correctly: scale', () => {
    props.type = 'scale';
    const wrapper = shallow(<PreviewOptionConfiguration {...props} />);
    expect(wrapper.find('div'));
  });

  it('should render correctly: default', () => {
    props.type = '';
    const wrapper = shallow(<PreviewOptionConfiguration {...props} />);
    expect(wrapper.find('div'));
  });

});
