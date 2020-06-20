import React from 'react';
import TimelineBarWrapper from '..';

const props = {
  setBookingDetailsAbsolutePos: jest.fn(),
  toggleBookingDetails: jest.fn(),
  tripStats: {},
  children: {}
};

describe('TimelineBarWrappper', () => {
  let wrapper, onFocusHandler, onBlurHandler;

  beforeEach(() => {
    wrapper = shallow(<TimelineBarWrapper {...props} />);
  });

  it('calls booking details toggler on mouse focus with right arg(s)', () => {
    const onFocusHandler = wrapper.find('.timeline-trip-geometry').prop('onFocus');
    onFocusHandler();
    expect(props.toggleBookingDetails).toHaveBeenCalledWith('open');
  });

  it('calls booking details toggler on blur with right arg(s)', () => {
    const onBlurHandler = wrapper.find('.timeline-trip-geometry').prop('onBlur');
    onBlurHandler();
    expect(props.toggleBookingDetails).toHaveBeenCalledWith('close');
  });

  it('ignore tab focus on trip bar to prevent distorted positioning', () => {
    expect(wrapper.prop('tabIndex')).toEqual('-1');
  });

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
