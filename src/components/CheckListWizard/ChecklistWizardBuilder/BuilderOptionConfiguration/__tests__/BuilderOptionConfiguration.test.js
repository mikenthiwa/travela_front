import React from 'react';
import { shallow } from 'enzyme';
import BuilderOptionConfiguration from '../index';
import BuilderImage from '../../BuilderImage';
import BuilderOptions from '../../BuilderOptions';
import RenderCheckbox from '../../CheckboxBuilder';

const props = {
  item: {
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
  },
  handleItems: jest.fn(),
};

describe('<BuilderOptionConfiguration />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<BuilderOptionConfiguration {...props} />);
    expect(wrapper.find(BuilderOptions)).toHaveLength(1);
  });

  it('should render correctly: checkbox', () => {
    props.item.type = 'checkbox';
    const wrapper = shallow(<BuilderOptionConfiguration {...props} />);
    expect(wrapper.find(RenderCheckbox)).toHaveLength(1);
  });

  it('should render correctly: dropdown', () => {
    props.item.type = 'dropdown';
    const wrapper = shallow(<BuilderOptionConfiguration {...props} />);
    expect(wrapper.find('div'));
  });

  it('should render correctly: image', () => {
    props.item.type = 'image';
    const wrapper = shallow(<BuilderOptionConfiguration {...props} />);
    expect(wrapper.find(BuilderImage).length).toEqual(1);
  });

  it('should render correctly: video', () => {
    props.item.type = 'video';
    const wrapper = shallow(<BuilderOptionConfiguration {...props} />);
    expect(wrapper.find('div'));
  });

  it('should render correctly: scale', () => {
    props.item.type = 'scale';
    const wrapper = shallow(<BuilderOptionConfiguration {...props} />);
    expect(wrapper.find('div'));
  });

  it('should render correctly: default', () => {
    props.item.type = '';
    const wrapper = shallow(<BuilderOptionConfiguration {...props} />);
    expect(wrapper.find('div'));
  });
});
