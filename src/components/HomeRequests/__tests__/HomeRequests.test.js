import React from 'react';
import { shallow } from 'enzyme';
import HomeRequests from '../index';

const props = {
  requests: [{
    status: 'Verified',
    trips: [{
      departureDate: '2019-11-11',
      returnDate: '2019-11-11',
      requestId: 'ewafcsacsfw2',
      destination: 'Nairobi, Kenya'
    }]
  }],
  isLoading: false,
  history: {
    push: jest.fn()
  }
};

const props2 = {
  requests: [],
  isLoading: false,
  history: {
    push: jest.fn()
  }
};

describe('<HomeRequests />', () => {
  it('should render requests table correctly', () => {
    const wrapper = shallow(<HomeRequests {...props} />);
    expect(wrapper.find('.card--request-table').length).toBe(1);
    expect(wrapper.find('.message').length).toBe(0);
  });

  it('should render 404 message if no requests made yet', () => {
    const wrapper = shallow(<HomeRequests {...props2} />);
    expect(wrapper.find('.message').length).toBe(1);
    expect(wrapper.find('.card--request-table').length).toBe(0);
  });
});
