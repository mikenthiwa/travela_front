import React from 'react';
import { shallow } from 'enzyme';
import AddComment from '../AddComment';

describe('AddComment component', () => {
  const wrapper = shallow(<AddComment />);

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the AddComment component as expected', () => {
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('span').length).toBe(2);
    expect(wrapper.find('ImageLink').length).toBe(1);
    expect(wrapper.length).toBe(1);
  });
});
