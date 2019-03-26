import React from 'react';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import ConnectedRoleDetails, { RoleDetails } from '../index';


let wrapper;
const props = {
  roleUsers: [
    {
      id: 1,
      fullName: 'A user',
      centers: [{
        id: 12345,
        location: 'Lagos, Nigeria'
      }]
    },
    {
      id: 2,
      fullName: 'B user',
      centers: [{
        id: 44445,
        location: 'Lagos, Nigeria'
      }]
    }
  ],
  meta: {
    currentPage: 1,
    pageCount: 2,
  },
  update: {
    isLoading: false,
  },
  closeModal: jest.fn(),
  fetchRoleUsers: sinon.spy(),
  updateBudgetChecker: jest.fn(),
  getRoleData: jest.fn(),
  isLoading: false,
  getCurrentUserRole: ['Travel Administrator', 'Requester'],
  history: {
    push: jest.fn(),
  },
  isLoaded: true,
  openModal: jest.fn(),
  shouldOpen: false,
  modalType: 'new model',
  match: {
    params: {
      roleId: '335498'
    }
  },
  location: {
    search: 'search',
    pathname: '/settings/roles/10948'
  },
  roleName: 'Travel team member',
  fetchCenters: sinon.spy(),
  centers: [
    {
      id: 1444,
      location: 'Nairobi, Kenya'
    },
    {
      id: 33441,
      location: 'Lagos, Nigeria'
    }
  ],
  putRoleData: sinon.spy(),
  deleteModalRoleId: 1,
  deleteModalState: 'invisible',
  hideDeleteRoleModal: jest.fn(),
  showDeleteRoleModal: jest.fn(),
  deleteUserRole: jest.fn(),
  getAllUsersEmail: jest.fn()
};


const initialState = {
  modal: {
    shouldOpen: false,
    modalType: null
  },
  centers: {
    update: {
      isLoading: false,
    },
  },
};


const user = {
  id: 1,
  role: ['Travel team member'],
  center: 'lagos'
};


const mockStore = configureStore();
const store = mockStore(initialState);


describe('<RoleDetails />', () => {
  beforeEach(() => {
    wrapper = shallow(<RoleDetails {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it(`calls the fetchRoleUser prop method on
    componentDidMount`, () => {
    const { match: { params: { roleId } } } = props;
    expect(props.fetchRoleUsers.called).toEqual(true);
    expect(props.fetchRoleUsers.calledWith(roleId)).toEqual(true);
  });

  it(`calls renders the RoleDetails Table with
    the correct number of users`, () => {
    const roleDetailsTable = wrapper
      .find('WithLoading')
      .dive()
      .find('RoleDetailsTable')
      .dive();
    expect(roleDetailsTable.find('.table__rows').length).toEqual(2);
  });


  it('should call handleEditRole', () => {
    const newProps = { ...props, deleteModalState: 'visible' };
    const shallowWrapper = shallow(<RoleDetails {...newProps} />);
    shallowWrapper.setState({
      headTitle: 'Edit Budget Checker Role',
      userDetail: user ,
    });
    sinon.spy(shallowWrapper.instance(), 'handleEditRole');
    shallowWrapper.instance().handleEditRole(user);
    expect(shallowWrapper.instance().handleEditRole.calledOnce).toEqual(true);
  });

  it('should call `handleAddUser`', (done) => {
    const newProps = { ...props, deleteModalState: 'visible' };
    wrapper = shallow(<RoleDetails {...newProps} />);

    const handleAddUserSpy = jest
      .spyOn(wrapper.instance(), 'handleAddUser');
    wrapper.instance().handleAddUser();
    expect(handleAddUserSpy).toHaveBeenCalled();

    done();
  });

  it('should call `handleDeleteUserRole`', (done) => {
    const handleDeleteUserRoleSpy = jest
      .spyOn(wrapper.instance(), 'handleDeleteUserRole');
    wrapper.instance().handleDeleteUserRole(1);
    expect(handleDeleteUserRoleSpy).toHaveBeenCalled();
    expect(props.deleteUserRole).toHaveBeenCalledTimes(1);

    done();
  });

  it('should render the RolesPage without crashing', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ConnectedRoleDetails {...props} />
        </MemoryRouter>
      </Provider>
    );
    wrapper.setState({
      headTitle: 'Change Center',
      userDetail: user,
    });
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });

  it('should not render pagination with no user roles data', (done) => {
    const newProps = { ...props, roleUsers: [] };
    wrapper = shallow(<RoleDetails {...newProps} />);
    const pagination = wrapper.find('Pagination');
    expect(pagination.length).toBe(0);
    done();
  });

  it('should render pagination with user roles data', (done) => {
    const newProps = { ...props, };
    wrapper = shallow(<RoleDetails {...newProps} />);
    const pagination = wrapper.find('Pagination');
    expect(pagination.length).toBe(1);
    done();
  });

  it('should call handlePageChange with page = 2 when next page button is clicked', () => {
    const wrapper = mount(
      <RoleDetails {...props} />
    );
    const onPageChange = jest.spyOn(wrapper.instance(), 'handlePageChange');

    wrapper.find('#next-button').simulate('click');
    expect(onPageChange).toHaveBeenCalledWith(2);
    expect(props.history.push)
      .toHaveBeenCalledWith('/settings/roles/10948?page=2');
  });

  it('should show loading icon when the `updatingRole` is true', () => {
    const newProps = {
      ...props,
      shouldOpen: true,
      updatingRole: true
    };
    const wrapper = mount(
      <RoleDetails {...newProps} />
    );
    expect(wrapper.find('i.loading-icon').length).toBe(1);
  });

  it('should show loading icon when the `isUpdating` is true', () => {
    const newProps = {
      ...props,
      shouldOpen: true,
      isUpdating: true
    };
    const wrapper = mount(
      <RoleDetails {...newProps} />
    );
    expect(wrapper.find('i.loading-icon').length).toBe(1);
  });

  it('should not show loading icon when the `updatingRole` is false', () => {
    const newProps = {
      ...props,
      shouldOpen: true,
      updatingRole: false
    };
    const wrapper = mount(
      <RoleDetails {...newProps} />
    );
    expect(wrapper.find('i.loading-icon').length).toBe(0);
  });

  it('should not show loading icon when the `isUpdating` is false', () => {
    const newProps = {
      ...props,
      shouldOpen: true,
      isUpdating: false
    };
    const wrapper = mount(
      <RoleDetails {...newProps} />
    );
    expect(wrapper.find('i.loading-icon').length).toBe(0);
  });
});
