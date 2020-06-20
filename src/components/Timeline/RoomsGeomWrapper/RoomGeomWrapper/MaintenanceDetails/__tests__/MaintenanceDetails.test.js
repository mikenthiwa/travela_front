import React from 'react';
import MaintenanceDetails from '..';
import moment from 'moment';

const props = {
  toggleBookingDetails: jest.fn(),
  handleEditMaintenanceModal: jest.fn(),
  handleDeleteMaintenanceModal: jest.fn(),
  maintenance:{
    reason:'Bad window',
    departureDate: '11-10-2018',
    returnDate: '11-10-2018'
  },
  timelineStartDate: moment().startOf('month'),
  tripDayWidth: 31,
  timelineViewType: 'month',
  status: false
};

describe('<MaintenanceDetails />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<MaintenanceDetails {...props} />);
  });

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call the handleEditMaintenanceModal edit button is clicked', () => {
    const handleEditMaintenanceModal = jest.fn();
    wrapper.find('.trip-booking-details__button').at(0).simulate('click');
    expect(handleEditMaintenanceModal).toBeCalled;
  });

  it('should call the handleDeleteMaintenanceModal prop when delete delete button is clicked', () => {
    const handleDeleteMaintenanceModal = jest.fn();
    wrapper.find('.trip-booking-details__button').at(1).simulate('click');
    expect(handleDeleteMaintenanceModal).toBeCalled;
  });

  it('should call the handleClickMaintenanceDetailsBody prop when click is simulated', () => {
    const handleClickMaintenanceDetailsBody = jest.fn();
    const e = { stopPropagation: jest.fn()};
    wrapper.find('#trip-booking-details').simulate('click', e);
    expect(handleClickMaintenanceDetailsBody).toBeCalled;
  });

  it('should call the handleCloseDetailsButton prop when close button is clicked', () => {
    const handleCloseDetailsButton = jest.fn();
    wrapper.find('.close-button').simulate('click');
    expect(handleCloseDetailsButton).toBeCalled;
  });
});
