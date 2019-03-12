import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { props } from '../__mocks__';
import RequestDetails from '..';

const setupConnectedComponent = (props, store) => {
  return mount(
    <Router>
      <RequestDetails
        {...props}
      />
    </Router>
  );
};

describe('TEST REQUEST DETAILS COMPONENT', () => {

  describe('TEST COMPONENT WHEN REQUEST IS LOADING', () => {
    const wrapper = setupConnectedComponent(props);
    it('should return loader when request is still fetching', () => {
      expect(wrapper).toMatchSnapshot();
      const loader = wrapper.find('.spinner');
      expect(loader).toHaveLength(1);
    });

  });

  describe('TEST COMPONENT WHEN REQUEST DOES NOT EXIST', () => {
    it('should render "no request found" when request does not exist', () => {
      const wrapper = setupConnectedComponent({ ...props, request: {}, isLoading: false });
      expect(wrapper.find('.error-msg')).toHaveLength(1);
      expect(wrapper.find('.error-msg').text()).toBe('This request does not exist');
    });
  });

  describe('TEST COMPONENT WHEN REQUEST EXISTS', () => {
    it('should render requests with otherTravelReason', () => {
      const wrapper = setupConnectedComponent({
        ...props,
        request: { ...props.request, stipend: 1000 },
        isLoading: false
      });
      expect(wrapper.find('.partition')).toHaveLength(6);
    });

    it('should render with travelReason', () => {
      const trips = {
        ...props.request.trips[0],
        reasons: { title: 'for holiday' },
        otherTravelReasons: ''
      };
      const request = {
        ...props.request,
        trips: [trips]
      };
      const wrapper = setupConnectedComponent({ ...props, request, isLoading: false });
      expect(wrapper.find('.text--black').at(4).text()).toBe('For holiday');
    });

    it('should render N/A when travelReason and otherTravelReason does not exist', () => {
      const trips = {
        ...props.request.trips[0],
        reasons: '',
        otherTravelReasons: null
      };
      const request = {
        ...props.request,
        trips: [trips]
      };
      const wrapper = setupConnectedComponent({
        ...props,
        request,
        approvalPage: false,
        isLoading: false
      });
      expect(wrapper.find('.text--black').at(4).text()).toBe('N/A');
    });
  });
});
