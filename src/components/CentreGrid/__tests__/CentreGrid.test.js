import React from 'react';
import { shallow } from 'enzyme';
import WithLoadingCentreGrid, { CentreGrid } from '..';
import guestHouses from '../../../views/Accommodation/__mocks__/mockData/guestHouses';
import disabledGuestHouses from '../../../views/Accommodation/__mocks__/mockData/disabledGuestHouses';

const props = {
  guestHouses,
  disabledGuestHouses,
  handleOnRestore: () => null
};

describe('<CentreGrid />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CentreGrid {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the right number of centres', () => {
    expect(wrapper.find('CentreCard').length).toBe(8);
  });

  it('renders the placeholder when the app is loading', () => {
    wrapper = shallow(<WithLoadingCentreGrid {...{...props, isLoading: true}} />);
    expect(wrapper.find('ResidencePlaceholder').length).toBe(1);
    expect(wrapper.find('CentreCard').length).toBe(0);
  });

  it('renders a div with text when there are no centres', () => {
    wrapper.setProps({
      guestHouses: []
    });
    expect(wrapper.find('CentreCard').length).toBe(4);
    expect(wrapper.find('.table__requests--empty').text())
      .toEqual('No accommodation centres at the moment');
  });

  it('renders a div with text when there are no centres', () => {
    wrapper.setProps({
      guestHouses: []
    });
    expect(wrapper.find('CentreCard').length).toBe(4);
    expect(wrapper.find('.table__requests--empty').text())
      .toEqual('No accommodation centres at the moment');
  });

  it(`renders a div with error when there is an
    error fetching accommodation`, () => {
    wrapper.setProps({
      guestHouses: null,
      error: 'Error fetching accommodation'
    });
    expect(wrapper.find('CentreCard').length).toBe(4);
    expect(wrapper.find('.table__requests--error').text())
      .toEqual('Error fetching accommodation');
  });

  it('passes the right props to the CentreCard component', () => {
    const expectedProps = {
      bathrooms: 3,
      beds: 5,
      cardImage:'http://images/guest-house.jpg',
      countryFlagImage: 'https://www.countryflags.io/KE/flat/64.png',
      guestHouse: {
        bathRooms: 3,
        houseName: 'Guest House 2',
        id: 'wrtnytom_9',
        imageUrl: 'http://images/guest-house.jpg',
        genderPolicy: 'unisex',
        location: 'Nairobi, Kenya',
        rooms: [{
          bedCount: 1,
          faulty: false,
          id: 'plmyt0pol',
          roomName: 'Santana',
          roomType: 'Single',
        }, {
          bedCount: 4,
          faulty: false,
          id: 'plmmnuyt',
          roomName: 'Shiloh',
          roomType: 'Single',
        }],
      },
      guestHouseLocation: 'Nairobi, Kenya',
      guestHouseName: 'Guest House 2',
      imageAlt: 'Guest House 2 image',
      guesthouseId: 'wrtnytom_9',
    };
    const secondExpectedProps = {
      bathrooms: 4,
      beds: 4,
      cardImage:'http://images/guest-house.jpg',
      countryFlagImage: 'https://www.countryflags.io/NG/flat/64.png',
      guestHouse: {
        bathRooms: 4,
        houseName: 'Guest House 3',
        id: 'bytrwqjk9',
        imageUrl: 'http://images/guest-house.jpg',
        genderPolicy: 'unisex',
        location: 'Lagos, Nigeria',
        rooms: [{
          bedCount: 2,
          faulty: false,
          id: 'btrfdseq23',
          roomName: 'Aben',
          roomType: 'Ensuite',
        }, {
          bedCount: 2,
          faulty: false,
          id: 'btrfdsnytr3',
          roomName: 'Aben',
          roomType: 'Ensuite',
        }],
      },
      guestHouseLocation: 'Lagos, Nigeria',
      guestHouseName: 'Guest House 3',
      imageAlt: 'Guest House 3 image',
      guesthouseId: 'bytrwqjk9',
      disabledGuestHouse: {}
    };
    const secondCentre = wrapper.find('CentreCard').at(1);
    const thirdCentre = wrapper.find('CentreCard').at(2);

    /* Using `toEqual` instead of `toMatchObject` fails the test as with the error that
    Compared values have no visual difference.
    */
    expect(secondCentre.props()).toMatchObject(expectedProps);
    expect(thirdCentre.props()).toMatchObject(secondExpectedProps);
  });
});
