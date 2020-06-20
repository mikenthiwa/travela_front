import React from 'react';
import { shallow } from 'enzyme';
import PreviewRadioConfiguration from '..';
import UploadDocument from '../UploadDocument';
import SkipToAnotherQuestion from '../SkipToAnotherQuestion';
import NotifyEmail from '../NotifyEmail';

const props = {
  behaviour: {
    type: 'UPLOAD_DOCUMENT',
    payload: 'payload'
  },
  handleSkipToQuestion: jest.fn()
};

describe('<PreviewBehaviour />', () => {
  it('should render correctly: upload doc', () => {
    const wrapper = shallow(<PreviewRadioConfiguration {...props} />);
    expect(wrapper.find(UploadDocument));
  });

  it('should render correctly: skip to another question', () => {
    props.behaviour.type = 'SKIP_QUESTION';
    const wrapper = shallow(<PreviewRadioConfiguration {...props} />);
    expect(wrapper.find(SkipToAnotherQuestion));
  });

  it('should render correctly: preview document', () => {
    props.behaviour.type = 'PREVIEW_DOCUMENT';
    const wrapper = shallow(<PreviewRadioConfiguration {...props} />);
    expect(wrapper.find('div'));
  });

  it('should render correctly: notify an email address', () => {
    props.behaviour.type = 'NOTIFY_EMAIL';
    const wrapper = mount(<PreviewRadioConfiguration {...props} />);
    expect(wrapper.find(NotifyEmail)).toHaveLength(1);
  });

  it('should render correctly: notify an email address', () => {
    props.behaviour = {};
    const wrapper = shallow(<PreviewRadioConfiguration {...props} />);
    expect(wrapper.find('div'));
  });
});
