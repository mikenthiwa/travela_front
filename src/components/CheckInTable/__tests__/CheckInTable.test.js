import React from 'react';
import { shallow, mount } from 'enzyme';
import { CheckInTable } from '..';
import { notCheckInTrips } from '../../../redux/__mocks__/reduxMocks';

const props = { 
  handleCheckStatus: jest.fn(),
  trips: notCheckInTrips.trips,
  tripError: '',
  dateToday: '2018-09-27'
};

const setup = (props) => {
  return shallow(<CheckInTable {...props} />);
};

describe('Test Suite for Accommodation Component', () => {
  it('should render the component properly', () => {
    const wrapper = setup(props);
    expect(wrapper.length).toBe(1);
  });

  it('should render the pending checkin records', () => {
    const wrapper = setup(props);
    expect(wrapper.find('.checkInTable__row').length).toBe(1);
  });


  it('should call handleCheck function when button is clicked', () => {
    const wrapper = setup(props);
    const handleCheckSpy = jest.spyOn(wrapper.instance(), 'handleCheck');
    wrapper.find('.checkInTable__button-checkin').at(0).simulate('click');
    expect(handleCheckSpy).toHaveBeenCalled();
  });

  it('should call handleCheckStatus function when button is clicked', () => {
    const wrapper = setup(props);
    const { handleCheckStatus } = props;
    wrapper.find('.checkInTable__button-checkin').at(0).simulate('click');
    expect(handleCheckStatus).toHaveBeenCalled();
  });

  it('renders as expected', () => {
    const wrapper = setup(props);
    expect(wrapper).toMatchSnapshot();
  });

  it('should display error if error exists', () => {
    props.tripError = 'Network error occurred';
    const wrapper = setup(props);
    expect(wrapper.find('.checkInTable__trips--error').length).toBe(1);
  });

  it('should display no records message', () => {
    props.tripError = '';
    props.trips = [];
    const wrapper = setup(props);
    expect(wrapper.find('.checkInTable__trips--empty').length).toBe(1);
  });
});
