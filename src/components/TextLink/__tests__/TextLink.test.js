import React from 'react';
import TextLink from '../TextLink';

const props = {
  imageSrc: '',
  textLinkClass: '',
  textClass: '',
  altText: '',
  text: '',
  link: ''

};
it('should render the text-link component', ()=>{
  const wrapper = shallow(<TextLink {...props} />);
  expect(wrapper.find('p')).toHaveLength(1);
});
