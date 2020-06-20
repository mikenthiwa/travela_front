import React from 'react';
import { shallow } from 'enzyme';
import Button from '../Buttons';

// describe what we are testing
describe('Render SearchBar component', () => {
  const props = {
    imageSrc:'image',
    buttonClass:'',
    buttonId:'',
    altText:'',
    imageClass:'',
    text:''
  };
  // make our assertions and what we expect to happen
  it('should match snapshot', () => {
    const wrapper = shallow(<Button {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the Button component as expected', () => {
    const wrapper = shallow(<Button {...props} />);
    expect(wrapper.length).toBe(1);
  });
});
