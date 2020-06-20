import React from 'react';
import { shallow } from 'enzyme';
import DashboardHeader from '..';

const initialState = {
  isDropdownOpen: false
};

const props = {
  context: {
    state: {
      city: 'Nairobi'
    },
    handleFilter: jest.fn()
  },
  icon: 'http:/ss.ds',
  showCalendar: jest.fn(),
  hideCalendar: jest.fn(),
  handleChange: jest.fn(),
  downloadCsv: jest.fn(),
};

const context = { name: 'foo' };
const wrapper = shallow(<DashboardHeader {...props} />);
const wrapperInstance = wrapper.instance();

describe('<DashboardHeader>', () => {
  it('should show the dropdown items when showCalendar is called', () => {
    wrapperInstance.showCalendar();
    expect(wrapper.find('.open').length).toBe(1);
  });

  it('should hide the dropdown items when hideCalendar is called', () => {
    wrapperInstance.hideCalendar();
    expect(wrapper.find('.open').length).toBe(0);
  });

  it('should render the correct dropdown items', () => {
    wrapperInstance.handleChange({start: '2018-12-21', end: '2018-12-25'});
    expect(wrapper.find('.open').length).toBe(0);
  });
});
