import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import DateInput from '../TripDate';

describe('Trip Date Test Suite', () => {
  const props = {
    error: false,
    className: '',
    name: '',
    onBlur: jest.fn(),
    onChange: jest.fn(),
    minimumDate: {},
    maximumDate: {},
    minTime: {},
    maxTime: {},
    openToDate: {},
    showYearDropdown: false,
    showTimeSelect: false,
    dateFormat: '',
    timeFormat: '',
    onChangeRaw: jest.fn(),
    disabled: false,
  };

  const wrapper = shallow(<DateInput {...props} />);

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toBe(1);
  });

  it('should call handleBlur', () => {
    const event = { target: { value: moment(new Date()) } };
    wrapper.find('DatePicker').simulate('blur', event);
    wrapper.instance().handleBlur(event);
    expect(props.onBlur).toHaveBeenCalled();
  });

  it('should call handleChange', () => {
    const date = moment(new Date());
    const event = moment(new Date());
    wrapper.find('DatePicker').simulate('change', event);
    wrapper.instance().handleChange(date, event);
    expect(props.onChange).toHaveBeenCalled();  
  });
  
});
