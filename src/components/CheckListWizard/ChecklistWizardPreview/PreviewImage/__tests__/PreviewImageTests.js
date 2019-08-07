import React from 'react';
import { shallow, mount } from 'enzyme';
import PreviewImage from '..';

describe ('Preview image tests', () => {
  const props = {
    prompt: 'test question',
    item: {
      imageURL: '',
    },
    order: 1
  };

  it('renders <PreviewImage />', () => {
    const wrapper = shallow(<PreviewImage {...props} />);
    
    expect(wrapper).toMatchSnapshot;
    expect(wrapper.find('.single-preview-item.image').length).toEqual(1);
  });
});
