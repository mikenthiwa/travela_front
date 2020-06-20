import React from 'react';
import { shallow, mount } from 'enzyme';
import TravelReadiness  from '../index';
import travelReadinessData from '../__mocks__/travelReadinessMockData';
import AnalyticsPagination from '../../Pagination/AnalyticsPagination';

const defaultProps = {
  readiness: {
    response: travelReadinessData,
    isLoading: false,
    readiness: [{
      departureDate: '2018-10-04',
      request: {
        name: 'Lazuli Doe'
      },
      travelReadiness: '0% complete',
      arrivalDate: '2018-10-05T00:00:00.000Z'
    }],
    pagination:  {
      pageCount: 3,
      currentPage: 2,
      dataCount: 13,
      prevPage: 1,
      nextPage: 3
    },
  },
  range: {},
  fetchReadiness: jest.fn(),
  renderButton: jest.fn(),
  departmentTrips: {
    report: ''
  },
  fetchDepartmentTrips: jest.fn(),
  exportReadiness: jest.fn(),
  getReadinessCSV: jest.fn(),
  renderNotFound: jest.fn(),
  center: 'Nairobi, Kenya'
};

const setup = (props) => {
  const actualProps = props || defaultProps;
  return shallow(<TravelReadiness {...actualProps} />);
};
describe('Test suite for Travel Readiness Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });

  it('should render the component properly when inflow or during first render', () => {
    const analyticsReport = wrapper.find('.analyticsReport__row');
    const getTravelFlowSpy = jest.spyOn(wrapper.instance(), 'getTravelFlow');
    wrapper.find('.travel-readiness-toggle-button-0').simulate('click');
    expect(getTravelFlowSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('#active-travel-flow-button').length).toBe(1);
    expect(analyticsReport.length).toBe(3);
  });
  it('should render component properly when outflow travel readiness is requested', () => {
    const analyticsReport = wrapper.find('.analyticsReport__row');
    const getTravelFlowSpy = jest.spyOn(wrapper.instance(), 'getTravelFlow');
    wrapper.find('.travel-readiness-toggle-button-1').simulate('click');
    expect(getTravelFlowSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('#active-travel-flow-button').length).toBe(1);
    expect(analyticsReport.length).toBe(3);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should display Oops! An error occurred in retrieving this data when server error occurs', () => {
    const newProps = {
      ...defaultProps,
      readiness: {
        error: 'server error, try again',
        readiness: [],
      }
    };
    const wrapper = setup(newProps);
    const serverError = wrapper.find('.dashboard-component__error-text--style');
    expect(serverError.text()).toEqual('Oops! An error occurred in retrieving this data');
  });

  it('should render NotFound when there are ro records to display', () => {
    const newProps = {...defaultProps };
    newProps.readiness.readiness = [];
    const newWrapper = setup(newProps);
    expect(newProps.renderNotFound).toHaveBeenCalled();
  });

  it('should call export readiness action when export button is clicked', () => {
    const newWrapper = mount(<TravelReadiness {...defaultProps} />);
    const exportBtn = newWrapper.find('#btnExportReadinessCSV').first();
    exportBtn.simulate('click');
    expect(defaultProps.exportReadiness).toHaveBeenCalled();
  });

  it('should obtain next page when handlePagination is called', () => {
    const newWrapper = mount(<TravelReadiness {...defaultProps} />);
    const nextbtn = newWrapper.find('#Next');
    nextbtn.simulate('click');
    expect(defaultProps.fetchReadiness).toHaveBeenCalled();
  });
  it('should obtain previous page when handlePagination is called', () => {
    const newWrapper = mount(<TravelReadiness {...defaultProps} />);
    const nextbtn = newWrapper.find('#Previous');
    nextbtn.simulate('click');
    expect(defaultProps.fetchReadiness).toHaveBeenCalled();
  });
  it('should load the Travel Placeholder when isLoading is true', () => {
    const newProps = {...defaultProps };
    newProps.readiness.isLoading = true;
    wrapper.setProps({newProps});
    expect(wrapper.find('TravelReadinessPlaceholder').length).toBe(1);
  });
  it('should not render the pagination component if no data exists', () => {
    let newProps = { ...defaultProps }
    newProps.readiness.readiness = [];
    newProps.readiness.pagination.dataCount = 0;
    wrapper = setup(newProps);
    expect(wrapper.find(AnalyticsPagination).exists()).toBeFalsy();
  });
});
