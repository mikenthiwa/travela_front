import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import ButtonGroup from '../ButtonGroup';


const props = {
  openRequestsCount: 1,
  pastRequestsCount: 1,
  cancelledTripsCount: 1,
  modifiedTripsCount: 1,
  url: '?page=2',
  fetchRequests: sinon.spy(() => Promise.resolve()),
  fetchApprovals: jest.fn(),
  buttonsType: 'requests',
  activeStatus: 'all',
};

let spy;

describe('<ButtonGroup />', () => {
  it('should render successfully', () => {
    const wrapper = shallow(<ButtonGroup {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('calls the fetchUserRequests method when the `all` button is clicked', () => {
    const wrapper = mount(<ButtonGroup {...props} />);
    spy = sinon.spy(wrapper.instance(), 'filterEntries');
    const allButton = wrapper.find('#all-button');
    allButton.simulate('click');
    expect(spy.calledOnce).toEqual(true);
    expect(spy.calledWith('requests', '')).toBe(true);
    spy.resetHistory();
  });

  it('calls the fetchUserRequests method when the `open requests` button is clicked', () => {
    const wrapper = mount(<ButtonGroup {...props} />);
    spy = sinon.spy(wrapper.instance(), 'filterEntries');
    const openButton = wrapper.find('#open-button');
    openButton.simulate('click');
    expect(spy.calledOnce).toEqual(true);
    expect(spy.calledWith('requests', '&status=open')).toBe(true);
    spy.resetHistory();
  });

  it('calls the fetchUserRequests method when the `past requests` button is clicked', () => {
    const wrapper = mount(<ButtonGroup {...props} />);
    spy = sinon.spy(wrapper.instance(), 'filterEntries');
    const pastButton = wrapper.find('#past-button');
    pastButton.simulate('click');
    expect(spy.calledOnce).toEqual(true);
    expect(spy.calledWith('requests', '&status=past')).toBe(true);
  });

  it('calls the fetchRequests props method with the correct query', () => {
    const wrapper = mount(<ButtonGroup {...{...props, url: '?page=2&limit=3'}} />);
    spy = sinon.spy(wrapper.instance(), 'filterEntries');
    const pastButton = wrapper.find('#past-button');
    const { fetchRequests } = props;
    pastButton.simulate('click');
    expect(spy.calledOnce).toEqual(true);
    expect(spy.calledWith('requests', '&status=past')).toBe(true);
    expect(fetchRequests.called).toEqual(true);
    expect(fetchRequests.calledWith('?page=1&limit=3&status=past'));
  });

  it('sets the correct active button based on the activeStatus props', () => {
    const wrapper = mount(<ButtonGroup {...{...props, activeStatus: 'all' }} />);
    const allButton = wrapper.find('#all-button');
    expect(allButton.hasClass('bg-btn--active')).toEqual(true);
  });

  it('sets the correct active button based on the activeStatus props', () => {
    const wrapper = mount(<ButtonGroup {...{...props, activeStatus: 'open' }} />);
    const openButton = wrapper.find('#open-button');
    expect(openButton.hasClass('bg-btn--active')).toEqual(true);
  });

  it('sets the correct active button based on the activeStatus props', () => {
    const wrapper = mount(<ButtonGroup {...{...props, activeStatus: 'past' }} />);
    const pastButton = wrapper.find('#past-button');
    expect(pastButton.hasClass('bg-btn--active')).toEqual(true);
  });
  describe('Trip modifications', () => {
    const wrapper = mount(<ButtonGroup {...{...props, modificationType: 'all', buttonsType: 'modifications' }} />);

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should display the trip modification buttons', () => {
      expect(wrapper.find('Button[text="Trip Cancellation"]').length).toEqual(1);
    });

    it('should fetch all the trip modifications', () => {
      wrapper.find('#all-button').simulate('click');
      expect(props.fetchApprovals).toHaveBeenCalledWith('??page=2&page=1');
    });

    it('should filter the cancelled trips', () => {
      wrapper.find('#open-button').simulate('click');
      expect(props.fetchApprovals).toHaveBeenCalledWith('??page=2&page=1&status=open&type=Cancel Trip');
    });

    it('should filter the modified date trips', () => {
      wrapper.find('#past-button').simulate('click');
      expect(props.fetchApprovals).toHaveBeenCalledWith('??page=2&page=1&status=open&type=Modify Dates');
    });
  });
});
