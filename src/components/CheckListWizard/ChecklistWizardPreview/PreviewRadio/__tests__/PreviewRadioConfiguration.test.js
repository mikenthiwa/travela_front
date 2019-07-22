import React from 'react';
import { shallow } from 'enzyme';
import PreviewRadioConfiguration from '../PreviewRadioConfiguration';

const props = {
  behaviourName: 'upload a document',
};

describe('<PreviewRadioConfiguration />', () => {
  it('should render correctly: upload doc', () => {
    const wrapper = shallow(<PreviewRadioConfiguration {...props} />);
    expect(wrapper.find('div'));
  });

  it('should render correctly: skip to another question', () => {
    props.behaviourName = 'skip to another question';
    const wrapper = shallow(<PreviewRadioConfiguration {...props} />);
    expect(wrapper.find('div'));
  });

  it('should render correctly: preview document', () => {
    props.behaviourName = 'preview document';
    const wrapper = shallow(<PreviewRadioConfiguration {...props} />);
    expect(wrapper.find('div'));
  });

  it('should render correctly: notify an email address', () => {
    props.behaviourName = 'notify an email address';
    const wrapper = shallow(<PreviewRadioConfiguration {...props} />);
    expect(wrapper.find('div'));
  });

  it('should render correctly: notify an email address', () => {
    props.behaviourName = '';
    const wrapper = shallow(<PreviewRadioConfiguration {...props} />);
    expect(wrapper.find('div'));
  });
});
