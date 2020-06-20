import React from 'react';
import { mount } from 'enzyme';
import TravelCosts from '../TravelCosts';


describe('<TravelCosts />', () => {

  it('should match snapshot', () => {
    const props = {
      hotelEstimates: [{id: 1, amount: 300, countryId: 1, country: {country: 'Nigeria'}}],
      flightCosts: [{id: 1, origin: 'Lagos, Portugal', destination: 'Lagos, Nigeria', cost: 1000}],
      stipends: [{id: 1, amount: 500, country: 'Nigeria'}],
      isLoading: false,
      trips: [{origin: 'Lagos, Portugal', destination: 'Lagos, Nigeria', departureDate: '2019-06-01', returnDate: '2019-06-14', travelReasons: null,}]
    };
    const wrapper = mount(<TravelCosts {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should not render if no estimates', () => {
    const props = {
      hotelEstimates: [],
      flightCosts: [],
      stipends: [],
      isLoading: false,
      trips: [{origin: 'Lagos, Portugal', destination: 'Lagos, Nigeria', departureDate: '2019-06-01', returnDate: '2019-06-14', travelReasons: null,}]
    };
    const wrapper = mount(<TravelCosts {...props} />);
    const estimates = wrapper.find('.breakdown-box-content');

    expect(estimates.length).toEqual(0);
  });
  it('should render if estimates are available', () => {
    const props = {
      hotelEstimates: [{id: 1, amount: 300, countryId: 1, country: {country: 'Nigeria'}}],
      flightCosts: [{id: 1, origin: 'Portugal', destination: 'Nigeria', cost: 1000}],
      stipends: [{id: 1, amount: 500, country: 'Nigeria'}],
      isLoading: false,
      trips: [{origin: 'Lagos, Portugal', destination: 'Lagos, Nigeria', departureDate: '2019-06-01', returnDate: '2019-06-14', travelReasons: null, accomodationType: 'Residence'}]
    };
    const wrapper = mount(<TravelCosts {...props} />);
    const estimates = wrapper.find('.breakdown-box-content');

    expect(estimates.length).toEqual(2);
  });
});

