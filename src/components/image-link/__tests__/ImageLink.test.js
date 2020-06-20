import React from 'react';
import { shallow } from 'enzyme';
import ImageLink from '../ImageLink';

// describe what we are testing
describe('Render SearchBar component', () => {
  const props = {
    imageSrc: '',
    altText: '',
    imageClass: ''
  };
  // make our assertions and what we expect to happen
  it('should match snapshot', () => {
    const wrapper = shallow(<ImageLink {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the ImageLink component as expected', () => {
    const wrapper = shallow(<ImageLink {...props} />);
    expect(wrapper.length).toBe(1);
  });
});
