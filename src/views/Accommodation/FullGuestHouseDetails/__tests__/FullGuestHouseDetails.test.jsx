import React from 'react';
import moment from 'moment';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { GuestHouseDetails } from '..';

const props = {
  availableBeds: [
    {id: 'bed-1'}
  ],
  match: {
    params: {
      guestHouseId: 'guest-house-1'
    }
  },
  history: {
    goBack: jest.fn(),
    push: jest.fn()
  },
  guestHouse: {
    id: 'guest-house-1',
    houseName: 'Ndovu',
    genderPolicy: 'Unisex',
    rooms: [{
      id: '1',
      roomName: 'Presidential suite',
      faulty: true,
      bedCount: 1,
      beds: [{
        bedName: 'bed1',
        id: 'bed-1',
        booked: false,
        trips: [
          {
            'id': 'trip-id-1',
            'origin': 'Lagos',
            'destination': 'Nairobi',
            'departureDate': '2018-12-09',
            'arrivalDate': '2018-12-11',
            'createdAt': '2018-08-15T11:11:52.181Z',
            'checkInDate': '2018-01-01',
            'checkOutDate': '2018-01-10',
            'request': {
              'name': 'Alice Doe',
              'gender': 'Female'
            }
          }
        ]
      }
      ],
      maintainances: [
        {
          id: 1,
          start: '2018-12-21',
          end: '2019-01-03'
        }
      ]
    }]
  },
  accommodation:{
    error:'',
  },
  updateRoomState: jest.fn(),
  modal: {
    shouldOpen: false,
    modalType: null
  },
  initFetchTimelineData: jest.fn(),
  addmaintenanceRecord: jest.fn(),
  editingAccommodation: false,
  updateMaintenanceRecord: jest.fn(),
  deleteMaintenanceRecord: jest.fn(),
  fetchAvailableRooms: jest.fn(),
  fetchTimelineRoomsData: jest.fn(),
  guestHouseId: 'guest-house-id-1',
  updateTripRoom: jest.fn(),
  loadingBeds: false,
  openModal: jest.fn(),
  closeModal: jest.fn(),
  handlePeriod: jest.fn(),
  modalType: 'change-room-modal',
  shouldOpen: true,
  loading: false,
  isLoading: false,
  handleOnEdit: jest.fn(),
  editAccommodation: jest.fn(),
  disableAccommodation: jest.fn(),
  fetchAccommodation: jest.fn()
};

const newProps = {
  ...props,
  guestHouse: {
    rooms: []
  }
};

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureStore([sagaMiddleware]);
const store = mockStore({});

describe('<GuestHouseDetails />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<GuestHouseDetails {...props} />);
  });

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('passes to timeline a method that initiates fetching of timeline data', () => {
    const timeline = wrapper.find('Timeline');
    const fetchDataHandler = timeline.prop('fetchTimelineRoomsData');
    fetchDataHandler();
    expect(props.initFetchTimelineData).toHaveBeenCalledTimes(1);
  });

  it('returns zero when there are no guest rooms', () => {
    const zeroWrapper = shallow(<GuestHouseDetails {...newProps} />);
  });

  it('should call handleOnDisable', () => { 
    const instance = wrapper.instance();
    jest.spyOn(instance, 'handleOnDisable');
    const button = wrapper.find('#handleOnDisableId');
    button.simulate('click');
    expect(instance.handleOnDisable).toBeCalled;
  });

  it('should call disableGuestHouse when the button is clicked', () => { 
    const instance = wrapper.instance();
    jest.spyOn(instance, 'disableGuestHouse');
    const button = wrapper.find('#disableGuestHouseId');
    button.simulate('click');
    expect(instance.disableGuestHouse).toBeCalled;});
  it('checks whether a room is unavailable', () => {
    const state = { 
      startDate: moment(), timelineViewType:'month', period: 'January 2019' };
    wrapper = mount(
      <Provider store={store}>
        <GuestHouseDetails {...props} />
      </Provider>);
    wrapper.setState(state);
    const unavailableGuestHouse = wrapper.find('div.time-font').last();
    
    // Always generate future date; but same month and year as today
    const futureDate = moment(new Date(), 'YYYY/MM/DD');
    const month = futureDate.format('MMMM');
    const year = futureDate.format('YYYY');

    expect(unavailableGuestHouse.text()).toBe('month');
    expect(wrapper.instance().state.timelineViewType).toBe('month');
  });

  it('checks whether a room is unavailable within a week', () => {
    const state = { 
      startDate: moment(), timelineViewType:'week', };
    wrapper = mount(
      <Provider store={store}>
        <GuestHouseDetails {...props} />
      </Provider>);
    wrapper.setState(state);
    const cloneDate = state.startDate;
    const startDate = cloneDate.startOf('week').format('D');
    const endDate = cloneDate.endOf('week').format('D MMM YYYY');
    const unavailableGuestHouse = wrapper.find('div.time-font').last();
    const viewTypeDropdownButton = wrapper.find('.timeline-view-type-selector');
    viewTypeDropdownButton.simulate('focus');
    const selectTime = wrapper.find('.week');
    selectTime.simulate('click');
    expect(unavailableGuestHouse.text()).toBe(`${startDate} - ${endDate}`);
    expect(wrapper.instance().state.timelineViewType).toBe('week');
  });
});
