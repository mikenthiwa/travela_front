import React from 'react';
import { shallow } from 'enzyme';
import PreviewOptionConfiguration from '../index';
import PreviewImage from '../../PreviewImage';
import PreviewRadio from '../../PreviewRadio';
import PreviewCheckbox from '../../PreviewCheckbox';

const props = {
  item: {
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
  },
  handleSkipToQuestion: jest.fn(),
};

describe('<PreviewOptionConfiguration />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<PreviewOptionConfiguration {...props} />);
    expect(wrapper.find(PreviewRadio));
  });

  it('should render correctly: checkbox', () => {
    props.item.type = 'checkbox';
    const wrapper = shallow(<PreviewOptionConfiguration {...props} />);
    expect(wrapper.find(PreviewCheckbox));
  });

  it('should render correctly: dropdown', () => {
    props.item.type = 'dropdown';
    const wrapper = shallow(<PreviewOptionConfiguration {...props} />);
    expect(wrapper.find('div'));
  });

  it('should render correctly: image', () => {
    props.item.type = 'image';
    const wrapper = shallow(<PreviewOptionConfiguration {...props} />);
    expect(wrapper.find(PreviewImage).length).toEqual(1);
  });

  it('should render correctly: video', () => {
    props.item.type = 'video';
    const wrapper = shallow(<PreviewOptionConfiguration {...props} />);
    expect(wrapper.find('div'));
  });

  it('should render correctly: scale', () => {
    props.item.type = 'scale';
    const wrapper = shallow(<PreviewOptionConfiguration {...props} />);
    expect(wrapper.find('div'));
  });

  it('should render correctly: default', () => {
    props.item.type = '';
    const wrapper = shallow(<PreviewOptionConfiguration {...props} />);
    expect(wrapper.find('div'));
  });
});
