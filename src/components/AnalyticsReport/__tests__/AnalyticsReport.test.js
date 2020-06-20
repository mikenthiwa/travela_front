import React from 'react';
import { shallow, mount } from 'enzyme';
import AnalyticsReport from '../index';
import tripsPerMonthData from '../__mocks__/analyticsReportMockData';
import TripsPerMonthPlaceholder from '../../Placeholders/TripsPerMonthPlaceholder';


const defaultProps = {
  departmentTrips: {
    report: tripsPerMonthData,
    loading: false,
  },
  context: {
    state: { range: {
      start: '2018-05-20',
      end: '2018-07-22'
    }},
    handleFilter: jest.fn()
  },
  fetchDepartmentTrips: jest.fn(),
  fetchReadiness: jest.fn(),
  exportReadiness: jest.fn(),
  readiness: {
    isLoading: false,
  },

};

const setup = (props) => {
  const actualProps = props || defaultProps;
  return shallow(<AnalyticsReport {...actualProps} />);
};

describe('Test suite for Analytics Report Component', () => {
  it('should render the component properly', () => {
    const wrapper = setup();
    expect(wrapper.length).toBe(1);
  });

  it('should match the snapshot', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should display no records found when there\'s no record', () => {
    const newProps = {
      ...defaultProps,
      departmentTrips: {
        report: [],
        loading: false,
      }
    };
    const wrapper = setup(newProps);
    const noRecordsDiv = wrapper.find('#no-records');
    expect(noRecordsDiv.length).toBe(1);
  });

  it('should display Oops! An error occurred in retrieving this data when server error occurs', () => {
    const newProps = {
      ...defaultProps,
      departmentTrips:
        { ...defaultProps.departmentTrips,
          error: 'server error, try again',
          report: [],
        }
    };
    const wrapper = setup(newProps);
    const serverError = wrapper.find('.dashboard-component__error-text--style');
    expect(serverError.text()).toEqual('Oops! An error occurred in retrieving this data');
  });

  it('should display TripsPerMonthPlaceholder, when the page is loading ', () => {
    const newProps = {
      ...defaultProps,
      departmentTrips: {
        ...defaultProps.departmentTrips,
        loading: true
      }
    };
    newProps.departmentTrips.report = [];
    const wrapper = setup(newProps);
    expect(wrapper.contains(<TripsPerMonthPlaceholder />)).toBe(true);
  });

  it('should call fetchDepartmentTrips when export button is clicked', () => {
    const wrapper = setup();
    const button = wrapper.find('#btnExportTripsPerMonth');
    button.simulate('click');
    expect(defaultProps.fetchDepartmentTrips).toHaveBeenCalled();
  });

  it('should call fetchDepartmentTrips if it a new start date is selected', () => {
    const wrapper = setup();
    wrapper.setProps({
      context: {
        state: { range: {
          start: '2018-06-21',
          end: '2018-07-22'
        }},
        handleFilter: jest.fn()
      }
    });
    expect(defaultProps.fetchDepartmentTrips).toHaveBeenCalled();
    expect(defaultProps.fetchDepartmentTrips).toHaveBeenCalledWith({
      filterBy: 'month',
      type: 'json',
      firstDate: '2018-06-21',
      lastDate: '2018-07-22'
    });
  });

  it('should call fetchDepartmentTrips if it a new end date is selected', () => {
    const wrapper = setup();
    wrapper.setProps({
      context: {
        state: { range: {
          start: '2018-05-20',
          end: '2018-08-29'
        }},
        handleFilter: jest.fn()
      }
    });
    expect(defaultProps.fetchDepartmentTrips).toHaveBeenCalled();
    expect(defaultProps.fetchDepartmentTrips).toHaveBeenCalledWith({
      filterBy: 'month',
      type: 'json',
      firstDate: '2018-05-20',
      lastDate: '2018-08-29'
    });
  });
});
