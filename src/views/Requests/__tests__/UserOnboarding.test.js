import React from 'react';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import { MemoryRouter, Link } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import MutationObserver from 'mutation-observer';
import { UserOnboardingRequestPage as RequestPageHOC } from '../NewRequests/UserOnboarding';

const UserOnboardingRequestPage = RequestPageHOC();
global.MutationObserver = MutationObserver;
window.document.getSelection = () => {};

let props = {
  requestOnEdit: {
    id: '1',
    name: 'Seun Undefined',
    manager: 1,
    gender: 'Male',
    department: 'Talent & Development',
    role: 'Software Developer',
    status: 'Open',
    userId: 'lorem-ipsum',
    createdAt: '2018-09-26T15:15:49.808Z',
    updatedAt: '2018-09-26T15:15:49.808Z',
  },
  userData: {
    result: {
      id: '2',
      fullName: 'Collins Muru',
      email: 'collins.muru@andela.com',
      userId: '-LJNw1BsT0LP_E4l2peP',
      passportName: 'Collins Njau',
      department: 'Talent & Development',
      occupation: 'Software Developer',
      manager: 'Collins',
      gender: 'Male',
      createdAt: '2018-09-14T12:48:11.266Z',
      updatedAt: '2018-09-16T07:53:48.835Z',
      roleId: 401938
    }
  },
  roleUsers: [
    { id: 1, fullName: 'Samuel Kubai', email: 'samuel@andela.com' },
    { id: 2, fullName: 'Chris Akanmu', email: 'chris@andela.com' }
  ],
  pagination: {
    currentPage: 1,
    pageCount: 3,
    onPageChange: sinon.spy()
  },
  fetchUserRequests: sinon.spy(() => Promise.resolve()),
  fetchRoleUsers: sinon.spy(() => Promise.resolve()),
  updateUserProfile: sinon.spy(() => Promise.resolve()),
  isLoading: false,
  history: {
    push: jest.fn()
  },
  location: {
    search: '?page=1',
    pathname: '/welcome-page'
  },
  user: {
    UserInfo: {
      name: 'John Doe'
    }
  },
  createNewRequest: jest.fn(),
  getOccupation: jest.fn(),
  getUserData: jest.fn(),
  loading: false,
  errors: [],
  page: 'welcome-page',
  match: {
    params: { requestId: 'xDh20btGx' }
  },
  fetchEditRequest: jest.fn(),

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
  },
  user: { userData: { result: {} } },
  requestsReducer: {
    requests: [],
    request: {},
    loading: false,
    errors: []
  },
  roleUsers: [
    { id: 1, fullName: 'Samuel Kubai', email: 'samuel@andela.com' },
    { id: 2, fullName: 'Chris Akanmu', email: 'chris@andela.com' }
  ],
  getCurrentUserRole: 'tomato',
};
const mockStore = configureStore();
const store = mockStore(initialState);

describe('<Requests>', () => {
  process.env.REACT_APP_CITY = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD-fvLImnNbTfYV3Pd1nJuK7NbzZJNr4ug&libraries=places';

  it('should render the Requests without crashing', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <UserOnboardingRequestPage {...props} />
        </MemoryRouter>
      </Provider>);
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });
  it('calls the componentDidMount method', () => {
    const spy = sinon.spy(UserOnboardingRequestPage.prototype, 'componentDidMount');
    const { fetchUserRequests, fetchRoleUsers } = props;
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <UserOnboardingRequestPage {...props} />
        </MemoryRouter>
      </Provider>);
    expect(spy.called).toEqual(true);
    expect(fetchRoleUsers.called).toEqual(true);
    expect(fetchRoleUsers.calledWith(53019)).toEqual(true);
    wrapper.unmount();
  });
  it('should render the Requests for editing', () => {
    const UserOnboardingRequestPage = RequestPageHOC(true);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <UserOnboardingRequestPage {...props} />
        </MemoryRouter>
      </Provider>);
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });
});