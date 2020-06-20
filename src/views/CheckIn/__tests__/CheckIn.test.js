import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import moment from 'moment';
import ConnectedCheckIn, { CheckIn } from '..';
import { notCheckInTrips } from '../../../redux/__mocks__/reduxMocks';

const props = { 
  fetchTrips: jest.fn(),
  updateTrip: jest.fn(),
  user: {
    UserInfo: {
      name: 'John Doe'
    }
  },
  trips: notCheckInTrips.trips,
  loading: false,
  dateToday: moment(new Date()).format('YYYY-MM-DD')
};

const initialState = {
  auth: {
    isAuthenticated: true,
    user: {
      UserInfo: {
        name: 'Tomato Jos',
        picture: 'http://picture.com/gif'
      }
    }
  },
  tripsReducer: {
    trips: [],
    loading: false,
    tripError: ''
  },
  getCurrentUserRole: 'tomato'
};
const mockStore = configureStore();
const store = mockStore(initialState);

const setup = () => {
  /* Replace departure date to today's date */
  const newDepartureDate = moment(new Date()).format('YYYY-MM-DD');
  props.trips[0].departureDate = newDepartureDate;

  return mount(
    <Provider store={store}>
      <MemoryRouter>
        <CheckIn {...props} />
      </MemoryRouter>
    </Provider>
  );
};

describe('Test Suite for CheckIn Component', () => {
  it('should render the component properly', () => {
    const wrapper = setup();
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });

  it('should render the pending checkin records', () => {
    const wrapper = setup();
    expect(wrapper.find('.checkInTable__row').length).toBe(1);
    wrapper.unmount();
  });


  it('should call fetchTrip function when component mounts', () => {
    const wrapper = setup();
    const { fetchTrips } = props;
    expect(fetchTrips).toHaveBeenCalled();
    wrapper.unmount();
  });

  it('should call updateTrip function when checkin button is clicked', () => {
    const wrapper = setup();
    const { updateTrip } = props;
    const component = wrapper.find(CheckIn);
    component.find('.checkInTable__button-checkin').at(0).simulate('click');
    expect(updateTrip).toHaveBeenCalled();
    wrapper.unmount();
  });

  it('renders as expected', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ConnectedCheckIn {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render properly for a one way trip', () => {
    const newProps = {...props};
    newProps.trips[0].returnDate = null;
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ConnectedCheckIn {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });
});
