import React from 'react';
import { shallow } from 'enzyme';
import TripDetails from '../TripDetails';

describe('Trip Details Test Suite', () => {
  const props = {
    trips: [{
      id: 1,
      tripType: 'return'
    },
    {
      id: 2,
      tripType: 'return'
    },
    ]
  };

  const wrapper = shallow(<TripDetails {...props} />);

  it('should render correctly', () => {
    expect(wrapper.length).toBe(1);
  });
});
