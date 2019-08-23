import React from 'react';
import { shallow, mount } from 'enzyme';
import moment from 'moment';
import TripForm from '../TripForm';



describe('Trip Form Test Suite', () => {
  const props = {
    trip: {
     
      id: 'trip2',
      bedId: null,
      origin: 'Kampala, Uganda',
      request: {
        tripType: 'return'
      },
      createdAt: '2019-08-17T21:00:05.610Z',
      deletedAt: null,
      requestId: 'hZjKdAVKr',
      updatedAt: '2019-08-17T21:00:05.610Z',
      returnDate: '2019-09-09',
      checkInDate: null,
      checkStatus: 'Not Checked In',
      destination: 'Lagos, Nigeria',
      checkOutDate: null,
      departureDate: '2019-08-31',
      flightDetails: {
        ticket: 'https://res.cloudinary.com/authors-haven/image/upload/v1566298523/bzpe951qf0kxri2ehyzd.png',
        airline: 'K-AIRLINES',
        arrivalTime: '2019-08-31T00:00:00.000Z',
        flightNumber: '12345',
        departureTime: '2019-08-31'
      },
      travelReasons: 2,
      lastNotifyDate: null,
      travelCompletion: 'false',
      accommodationType: 'Not Required',
      notificationCount: 0,
      otherTravelReasons: null
        
    },
    handleTrips: jest.fn(),
  };

  const props2 = {
    trip: {
     
      id: 'trip2',
      bedId: null,
      origin: 'Kampala, Uganda',
      request: {
        tripType: 'return'
      },
      createdAt: '2019-08-17T21:00:05.610Z',
      deletedAt: null,
      requestId: 'hZjKdAVKr',
      updatedAt: '2019-08-17T21:00:05.610Z',
      returnDate: '2019-09-09',
      checkInDate: null,
      checkStatus: 'Not Checked In',
      destination: 'Lagos, Nigeria',
      checkOutDate: null,
      departureDate: '2019-08-31',
      travelReasons: 2,
      lastNotifyDate: null,
      travelCompletion: 'false',
      accommodationType: 'Not Required',
      notificationCount: 0,
      otherTravelReasons: null
        
    },
    handleTrips: jest.fn(),
  };
    
  const wrapper = mount(<TripForm {...props} />);
  const wrapper2 = mount(<TripForm {...props2} />);

  it('should render correctly', () => {
    expect(wrapper.length).toBe(1);
  });

  it('should handle input change', () => {
    const date = moment(new Date().toISOString());
    const event = { target: { name: props.trip.flightDetails, value: date }};
    wrapper.find('DateInput').first().simulate('change', event);
    wrapper.instance().handleInputChange(event);
  });

  it('should handle input blur', () => {
    const event = { target: { name: props.trip.flightDetails }};
    wrapper.find('DateInput').first().simulate('blur', event);
    // wrapper.setState({})
    wrapper.instance().handleBlur(event);
  });

  it('should handle ticket upload', () => {
    const ticket = props.trip.flightDetails.ticket;
    wrapper.instance().handleTicketUpload(ticket);
  });

  it('should call generate flight details', () => {
    expect(wrapper2.length).toBe(1);
  });
});
