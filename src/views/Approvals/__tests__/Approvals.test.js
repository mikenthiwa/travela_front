import React from 'react';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import { Approvals as ApprovalsWrapper } from '..';
import { submissionInfo } from '../../../mockData/checklistSubmissionMockData';
import PageHeader from '../../../components/PageHeader';

const Approvals = ApprovalsWrapper();

const BudgetApprovals = ApprovalsWrapper('budget');

const middleware = [createSagaMiddleware];
const mockStore = configureStore(middleware);

const props = {
  actionBtn: 'New Request',
  onClickItem: jest.fn(),
  fetchUserApprovals: jest.fn(),
  openModal: jest.fn(),
  getCurrentUserRole: ['Manager'],
  approvals: {
    approvals: [
      {
        id: '245923RTF',
        duration: '3 days',
        status: 'Approved',
        name: 'Jomo Kenyatta',
        tripType: 'oneWay',
        trips: [
          {
            departureDate: '2018-09-20',
            origin: 'Lagos',
            destination: 'Angola'
          }
        ]
      }
    ],
    pagination: {
      currentPage: 1,
      pageCount: 1,
      dataCount: 10,
      onPageChange: jest.fn()
    },
    isLoading: false,
    pastApprovalsCount: 1,
    openApprovalsCount: 1
  },
  history: {
    push: jest.fn()
  },
  location: {
    pathname: '/requests/',
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

describe('<ApprovalsPage>', () => {
  it('should render the Approvals page without crashing', () => {
    const wrapper = shallow(
      <MemoryRouter>
        <Approvals {...props} />
      </MemoryRouter>
    );
    expect(wrapper.find('Approvals').length).toBe(1);
    wrapper.unmount();
  });

  it('calls the onPageChange method', () => {
    props.approvals.pagination.pageCount = 4;
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Approvals {...props} />
        </MemoryRouter>
      </Provider>
    );
    const spy = sinon.spy(
      wrapper.find(Approvals).instance(),
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
          <Approvals {...props} />
        </MemoryRouter>
      </Provider>
    );
    const spy = sinon.spy(
      wrapper.find(Approvals).instance(),
      'getEntriesWithLimit'
    );
    wrapper
      .find('.dropdown__list__item')
      .first()
      .simulate('click');
    expect(spy.calledOnce).toEqual(true);
    wrapper.unmount();
  });

  describe('Approvals page filters', () => {
    let wrapper;
    let budgetWrapper;

    beforeEach(() => {
      wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <Approvals {...props} location={{...props.location, pathname: '/requests/my-approvals'}} />
          </MemoryRouter>
        </Provider>
      );

      budgetWrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <BudgetApprovals {...props} location={{...props.location, pathname: '/requests/budgets/'}} />
          </MemoryRouter>
        </Provider>
      );
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('it filters approvals by status=open', () => {
      const openButton = wrapper.find('#open-button');
      openButton.simulate('click');
      expect(props.history.push).toHaveBeenCalledWith('/requests/my-approvals?page=1&status=open');
    });

    it('it filters approvals by status=past', () => {
      const openButton = wrapper.find('#past-button');
      openButton.simulate('click');
      expect(props.history.push).toHaveBeenCalledWith('/requests/my-approvals?page=1&status=past');
    });

    it('it fetches all approvals by clicking all', () => {
      const openButton = wrapper.find('#all-button');
      openButton.simulate('click');
      expect(props.history.push).toHaveBeenCalledWith('/requests/my-approvals?page=1');
    });

    it('should render the Budget Approvals page', () => {
      expect(budgetWrapper.find(PageHeader).props().title).toEqual('BUDGET APPROVALS');
      expect(wrapper.find(PageHeader).props().title).toEqual('MANAGER APPROVALS');
    });

    it('should fetch all budget approvals by clicking all', () => {
      budgetWrapper.find('#all-button').simulate('click');
      expect(props.history.push).toHaveBeenCalledWith('/requests/budgets/?page=1');
    });

    it('filters budget approvals based on budgetStatus=past', () => {
      budgetWrapper.find('#past-button').simulate('click');
      expect(props.history.push).toHaveBeenCalledWith('/requests/budgets/?page=1&budgetStatus=past');
    });

    it('ensures the fetchUserApprovals is called when the navigation is changed', () => {
      jest.resetAllMocks();
      const history = {
        push: jest.fn((url) => {
          props.location.search = url;
          wrapper.setProps({ location: { search: url}});
          wrapper.update();
        })};

      const wrapper = mount( <Approvals {...props} history={history} location={{...props.location, pathname: '/requests/my-approvals'}} /> );
      wrapper.find('#past-button').simulate('click');

      expect(history.push).toHaveBeenCalledWith('/requests/my-approvals?page=1&status=past');
      expect(props.fetchUserApprovals).toHaveBeenCalled();
    });
  });
});
