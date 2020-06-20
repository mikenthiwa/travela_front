import React from 'react';
import TripDetails from '..';
import TripDetail from '../TripDetail';

describe('<TripDetails />', () => {
  let wrapper, tripDetails, accomodation;

  beforeEach(() => {
    tripDetails = {
      'origin': 'Lagos',
      'destination': 'Nairobi',
      'departureDate': '2018-12-09',
      'arrivalDate': '2018-12-11',
      'createdAt': '2018-08-15T11:11:52.181Z',
      'beds':{
        'bedName':'Bed 1','rooms': {
          'roomName':'Ndovu','guestHouses':{
            'houseName':'Guest House C'
          }
        }
      }
    };
    const accomodation = 'Guest';
    wrapper = mount(
      <TripDetails tripDetails={tripDetails} />
    );
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it ('renders Accomodation details', () => {
    expect(wrapper.find('#trip-detail')).toHaveLength(1);
  });
});
