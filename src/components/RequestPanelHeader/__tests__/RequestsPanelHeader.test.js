import React from 'react';
import { shallow } from 'enzyme';
import RequestPanelHeader from '../RequestPanelHeader';

const props = {
  openRequestsCount: 1,
  pastRequestsCount: 0,
  url: '',
  activeStatus: 'all',
  getRequestsWithLimit: jest.fn(),
  fetchRequests: jest.fn(),
  openModal: jest.fn(),
  requestsLength: 2,
  openNewRequestPage: jest.fn(),
};

describe('<RequestPanelHeader />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<RequestPanelHeader {...props} />);
    expect(wrapper.find('HeaderPagination').length).toBe(1);
    expect(wrapper.find('PageHeader').length).toBe(1);
  });
  it('does not display the pagination data if there are no requests', () => {
    const wrapper = shallow(<RequestPanelHeader {...{...props, requestsLength: 0}} />);
    expect(wrapper.find('HeaderPagination').length).toBe(0);
  });
});
