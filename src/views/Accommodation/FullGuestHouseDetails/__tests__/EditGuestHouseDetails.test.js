import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import ConnectedGuestHouseDetails, { GuestHouseDetails } from '..';


const props = {
  guestHouse: {
    'id': 'zNnGJAJH5',
    'houseName': 'Bukoto heights',
    'location': 'Kampala',
    'bathRooms': '4',
    'imageUrl': 'https://www.lol.com',
    'genderPolicy': 'unisex',
    'createdAt': '2018-10-05T00:07:22.276Z',
    'updatedAt': '2018-10-07T03:17:09.928Z',
    'userId': '-LJNzPWupJiiToLowHq9',
    rooms: [
      {
        'id': 'dtnJtaRE7Y',
        'roomName': 'Rwenzori',
        'roomType': 'non-ensuite',
        'bedCount': 1,
        'faulty': false,
        'createdAt': '2018-10-05T00:07:22.281Z',
        'updatedAt': '2018-10-07T03:17:09.938Z',
        'guestHouseId': 'zNnGJAJH5'
      }
    ],
    beds: [
      [
        {
          'id': 68,
          'bedName': 'bed 1',
          'booked': false,
          'createdAt': '2018-10-07T03:17:09.969Z',
          'updatedAt': '2018-10-07T03:17:09.969Z',
          'roomId': 'dtnJtaRE7Y'
        }
      ]
  
    ]
  },
  accommodation: {
    error: '',
  },
  availableBeds: [],
  addmaintenanceRecord: sinon.spy(),
  fetchAccommodation: sinon.spy(),
  fetchAvailableRooms: sinon.spy(),
  editAccommodation: jest.fn(),
  editingAccommodation: false,
  updateMaintenanceRecord: jest.fn(),
  deleteMaintenanceRecord: jest.fn(),
  disableAccommodation: jest.fn(),
  modalType: null,
  openModal: jest.fn(),
  initFetchTimelineData: jest.fn(),
  closeModal: jest.fn(),
  updateTripRoom: jest.fn(),
  match: {
    params: { }
  },
  history: {
    push: jest.fn()
  },
  modal: {
    shouldOpen: false,
    modalType: null
  },
  loading: false,
  isLoading: false,
  loadingBeds: false,
  handleOnEdit: jest.fn(),
  updateRoomState: jest.fn()
};

describe('<Accommodation />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<GuestHouseDetails {...props} />);
  });


  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleOnEdit', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleOnEdit');
    wrapper.instance().handleOnEdit();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call callUpdateTripRoom', () => {
    const spy = jest.spyOn(wrapper.instance(), 'callUpdateTripRoom');
    wrapper.instance().callUpdateTripRoom(1, 1, 'reason', 'startDate', 'endDate');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(props.updateTripRoom).toHaveBeenCalled();
  });

});
