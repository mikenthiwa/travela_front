import React from 'react';
import { shallow } from 'enzyme';
import BuilderOptionConfiguration from '../index';

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

describe('<BuilderOptionConfiguration />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<BuilderOptionConfiguration {...props} />);
    expect(wrapper.find('div'));
  });

  it('should render correctly: checkbox', () => {
    props.type = 'checkbox';
    const wrapper = shallow(<BuilderOptionConfiguration {...props} />);
    expect(wrapper.find('div'));
  });

  it('should render correctly: dropdown', () => {
    props.type = 'dropdown';
    const wrapper = shallow(<BuilderOptionConfiguration {...props} />);
    expect(wrapper.find('div'));
  });

  it('should render correctly: image', () => {
    props.type = 'image';
    const wrapper = shallow(<BuilderOptionConfiguration {...props} />);
    expect(wrapper.find('div'));
  });

  it('should render correctly: video', () => {
    props.type = 'video';
    const wrapper = shallow(<BuilderOptionConfiguration {...props} />);
    expect(wrapper.find('div'));
  });

  it('should render correctly: scale', () => {
    props.type = 'scale';
    const wrapper = shallow(<BuilderOptionConfiguration {...props} />);
    expect(wrapper.find('div'));
  });

  it('should render correctly: default', () => {
    props.type = '';
    const wrapper = shallow(<BuilderOptionConfiguration {...props} />);
    expect(wrapper.find('div'));
  });
});
