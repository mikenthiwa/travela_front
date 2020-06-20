import React from 'react';
import { shallow } from 'enzyme';
import Teammates from '../index';

const props = {
  teammates: {
    payload: [{
      picture: 'tes.pic.png',
      name: 'Test User',
      destination: 'Nairobi',
      departureDate: '2019-11-11',
      returnDate: '2019-11-11'
    }],
    isLoading: false
  }
};

const props2 = {
  teammates: {
    payload: [],
    isLoading: false,
  }
};

describe('<Teammates />', () => {
  it('should render requests table correctly', () => {
    const wrapper = shallow(<Teammates {...props} />);
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.find('.message').length).toBe(0);
  });

  it('should render 404 message if no requests made yet', () => {
    const wrapper = shallow(<Teammates {...props2} />);
    expect(wrapper.find('.message').length).toBe(1);
    expect(wrapper.find('img').length).toBe(0);
  });
});
