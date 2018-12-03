import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import ConnectedDashboard, { Dashboard, mapStateToProps } from '..';
import checkUserPermission from '../../../helper/permissions';


const initialState = {
  analytics: {
    payload: {
      total_requests: 230
    },
    error: '',
    isLoading: false,
    success: false
  }
};

const props = {
  getCurrentUserRole: ['Travel Administrator'],
  history: {
    push: jest.fn()
  },
  departmentTrips: {
    report: [],
    loading: false,
  },
  fetchDepartmentTrips: jest.fn(),
  fetchReadiness: jest.fn(),
  exportReadiness: jest.fn(),
  downloadCsv: jest.fn(),
  downloadAnalytics: jest.fn(),

  readiness: {
    isLoading: false,
  },
  isLoaded: false,
};

localStorage.setItem('location', 'Nairobi, Kenya');
jest.mock('../../../helper/permissions', () => jest.fn());

describe('<Dashboard />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Dashboard {...props} />);
  });
  it('maps the correct state to props', () => {
    const mapper = mapStateToProps(
      {
        user : {getCurrentUserRole: ['Travel Admin']},
        analytics: {departmentTrips: {
          report: [],
          loading: false,
        }}
      });
    expect(mapper.getCurrentUserRole[0]).toEqual('Travel Admin');
  });

  it('should call the checkUserPermission method if isLoaded is true', () => {
    const newProps = { ...props, isLoaded: true };
    const newWrapper = shallow(<Dashboard {...newProps} />);
    expect(newWrapper.length).toBe(1);
    expect(checkUserPermission).toHaveBeenCalled();
  });
});