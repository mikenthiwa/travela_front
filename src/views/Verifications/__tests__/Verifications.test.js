import React from 'react';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import { Verifications } from '..';
import { submissionInfo } from '../../../mockData/checklistSubmissionMockData';

const middleware = [createSagaMiddleware];
const mockStore = configureStore(middleware);

const props = {
  actionBtn: 'New Request',
  onClickItem: jest.fn(),
  fetchUserApprovals: jest.fn(),
  openModal: jest.fn(),
  getCurrentUserRole: ['Travel Team Member'],
  approvals: {
    approvals: [{
      id: '245923RTF',
      duration: '3 days',
      status: 'Approved',
      name: 'Jomo Kenyatta',
      tripType: 'oneWay',
      trips: [{
        departureDate: '2018-09-20',
        origin: 'Lagos',
        destination: 'Angola'
      }]
    }],
    approvedApprovalsCount: 2,
    verifiedApprovalsCount: 1,
    pagination: {
      currentPage: 1,
      pageCount: 4,
      dataCount: 10,
      onPageChange: jest.fn()
    },
    isLoading: false
  },
  history: {
    push: jest.fn(),
    location: {
      search: ''
    },
  },
  location: {
    search: ''
  },
  fetchRequestsError: jest.fn(),
  message: '',
  match: {
    params: {
      requestId: '245923RTF'
    }
  },
  submissionInfo
};

const initialState = {
  auth: {
    isAuthenticated: true,
    user: {
      UserInfo: {
        name: 'Tomato Jos',
        picture: 'http://picture.com/gif'
      }
    }
  }
};

const store = mockStore(initialState);

it('should render the Verifications page without crashing', () => {
  const wrapper = shallow(
    <MemoryRouter>
      <Verifications {...props} />
    </MemoryRouter>
  );
  expect(wrapper.find('Verifications').length).toBe(1);
  wrapper.unmount();
}); 

it('calls the onPageChange method', () => {
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <Verifications {...props} />
      </MemoryRouter>
    </Provider>
  );
  const spy = sinon.spy(
    wrapper.find(Verifications).instance(),
    'fetchFilteredApprovals'
  );
  wrapper.find('#next-button').simulate('click');
  expect(spy.calledOnce).toEqual(true);
  wrapper.find('#previous-button').simulate('click');
  wrapper.unmount();
});

it('calls get entries with limit on select items per page', () => {
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <Verifications {...props} />
      </MemoryRouter>
    </Provider>
  );
  const spy = sinon.spy(
    wrapper.find(Verifications).instance(),
    'getEntriesWithLimit'
  );
  wrapper
    .find('.dropdown__list__item')
    .first()
    .simulate('click');
  expect(spy.calledOnce).toEqual(true);
  wrapper.unmount();
});

describe('Verifications page filters', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Verifications {...props} />
        </MemoryRouter>
      </Provider>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('it filters Verifications by status=open', () => {
    const openButton = wrapper.find('#open-button');
    openButton.simulate('click');
    expect(props.history.push).toHaveBeenCalledWith('/requests/my-verifications?page=1&status=approved');
  });

  it('it filters Verifications by status=past', () => {
    const openButton = wrapper.find('#past-button');
    openButton.simulate('click');
    expect(props.history.push).toHaveBeenCalledWith('/requests/my-verifications?page=1&status=verified');
  });

  it('it fetches all Verifications by clicking all', () => {
    const openButton = wrapper.find('#all-button');
    openButton.simulate('click');
    expect(props.history.push).toHaveBeenCalledWith('/requests/my-verifications?page=1');
  });

  it('updates searchQuery on receiving receiving location props', () => {
    const approvals = wrapper.find(Verifications);
    approvals.instance().fetchFilteredApprovals('?status=open');
    expect(approvals.instance().state.searchQuery).toEqual('?status=open');
  });
});

