import React from 'react';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import ConnectedRole, { Role } from '../index';

const props = {
  roles: [
    {
      id: 401938,
      roleName: 'Requester',
      description: 'Can make travel request',
      createdAt: '2018-08-16T11:11:52.181Z',
      updatedAt: '2018-08-16T11:11:52.181Z',
      users: [{ email: 'taiwo.sunday@andela.com' }]
    },
    {
      id: 53019,
      roleName: 'Manager',
      description: 'Can request and approve travel request ',
      createdAt: '2018-08-16T11:11:52.181Z',
      updatedAt: '2018-08-16T11:11:52.181Z',
      users: []
    }
  ],
  user: {
    UserInfo: {
      name: 'John Doe',
      id: '-LHJlG',
      picture: 'http://www.image.com/jepg'
    }
  },
  isLoaded: true,
  getCurrentUserRole: ['Super Administrator', 'Requester'],
  getRoleData: sinon.spy(() => Promise.resolve()),
  isLoading: false,
  history: {
    push: jest.fn()
  },
  putRoleData: jest.fn(),
  errors: [],
  shouldOpen: false,
  modalType: null,
  openModal: jest.fn(),
  onNotificationToggle: jest.fn(),
  closeModal: jest.fn(),
  addRole: jest.fn(),
  updateRole: jest.fn()
};

const initialState = {
  role: {
    putRoleData: [],
    getRole: {},
    roleErrors: ''
  },
  modalReducer: {
    shouldOpen: false,
    modalType: null
  },
  auth: {
    user: {
      UserInfo: {
        name: 'John Doe',
        id: '-LHJlG',
        picture: 'http://www.image.com/jepg'
      }
    }
  },
  modal: {
    shouldOpen: false,
    modalType: null
  }
};

const mockStore = configureStore();
const store = mockStore(initialState);

describe('<RolePage>', () => {
  it('should render the RolesPage without crashing', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ConnectedRole {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });

  it('calls the componentDidMount method', () => {
    const spy = sinon.spy(Role.prototype, 'componentDidMount');
    const { getRoleData } = props;
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Role {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(spy.called).toEqual(true);
    expect(getRoleData.called).toEqual(true);
    wrapper.unmount();
  });

  it('should not redirect the user when the user is an admin', () => {
    const { history } = props;
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Role {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(history.push).toHaveBeenCalledTimes(0);
    wrapper.unmount();
  });

  it('should set `visibility` prop to `visible` when add new role button is clicked', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Role {...{ ...props, shouldOpen: true, modalType: 'new model' }} />
        </MemoryRouter>
      </Provider>
    );
    wrapper.find('.btn-new-request').simulate('click');
    expect(
      wrapper
        .find('Modal')
        .at(0)
        .props().visibility
    ).toEqual('visible');
  });
});
