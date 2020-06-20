import React from 'react';
import { shallow } from 'enzyme';
import UserInfo from '../UserInfo';
import requestData from '../../__mocks__/requestData';

const props = {
  user: {
    picture: 'http://my-image'
  },
  requestData:{
    picture: 'http://my-image'
  }
};

describe('UserComments component', () => {
  const wrapper = mount(<UserInfo {...props} />);

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the UserComments component as expected', () => {
    expect(wrapper.find('.modal__user-info').length).toBe(1);
    expect(wrapper.find('.user-role').length).toBe(1);
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.length).toBe(1);
  });
});
