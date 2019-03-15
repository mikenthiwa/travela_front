import React from 'react';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Requests, mapStateToProps } from '..';
import travelChecklistMockData from '../../../mockData/travelChecklistMockData';
import beds from '../../AvailableRooms/__mocks__/mockData/availableRooms';
import { submissionInfo } from '../../../mockData/checklistSubmissionMockData';

let props = {
  requests: [
    {
      id: 'xDh20btGz',
      name: 'Amarachukwo Agbo',
      tripType: 'oneWay',
      manager: 'Ezrqn Kiptanui',
      gender: 'Female',
      status: 'Open',
      trips: [
        {
          departureDate: '2018-09-20',
          origin: 'Lagos',
          destination: 'Angola',
          bedId: beds[0].id
        }
      ],
      department: 'TDD',
      role: 'Learning Facilitator'
    },
    {
      id: 'xDh20btGy',
      name: 'Amarachukwo Agbo',
      tripType: 'oneWay',
      manager: 'Ezrqn Kiptanui',
      gender: 'Female',
      status: 'Approved',
      trips: [
        {
          departureDate: '2018-09-20',
          origin: 'Lagos',
          destination: 'Angola',
          bedId: beds[0].id
        }
      ],
      department: 'TDD',
      role: 'Learning Facilitator'
    },
    {
      id: 'xDh20btGx',
      name: 'Amarachukwo Agbo',
      tripType: 'oneWay',
      manager: 'Ezrqn Kiptanui',
      gender: 'Female',
      status: 'Verified',
      trips: [
        {
          departureDate: '2018-09-20',
          origin: 'Lagos',
          destination: 'Angola',
          bedId: beds[0].id
        }
      ],
      department: 'TDD',
      role: 'Learning Facilitator'
    }
  ],
  requestOnEdit: {
    id: '1',
    name: 'Seun Undefined',
    tripType: 'multi',
    manager: 'Faluyi Seun',
    gender: 'Male',
    department: 'Talent & Development',
    role: 'Software Developer',
    status: 'Open',
    userId: 'lorem-ipsum',
    createdAt: '2018-09-26T15:15:49.808Z',
    updatedAt: '2018-09-26T15:15:49.808Z',
    trips: [
      {
        id: '1',
        origin: 'Abuja Nigeria',
        destination: 'Lagos Nigeria',
        departureDate: '2018-09-30',
        returnDate: '2018-09-30',
        createdAt: '2018-09-27T18:49:03.626Z',
        updatedAt: '2018-09-27T18:49:43.803Z',
        requestId: 'NfR-9KoCP',
        bedId: beds[0].id
      }
    ]
  },
  availableRooms: {
    beds
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
  pagination: {
    currentPage: 1,
    pageCount: 4,
    dataCount: 10,
    onPageChange: sinon.spy()
  },
  fetchEditRequest: sinon.spy(() => Promise.resolve()),
  fetchUserRequests: sinon.spy(() => Promise.resolve()),
  fetchRoleUsers: sinon.spy(() => Promise.resolve()),
  updateUserProfile: sinon.spy(() => Promise.resolve()),
  fetchAvailableRooms: sinon.spy(() => Promise.resolve()),
  fetchTravelChecklist: sinon.spy(() => Promise.resolve()),
  deleteRequest: sinon.spy(() => Promise.resolve()),
  fetchUserRequestsError: null,
  openRequestsCount: 1,
  pastRequestsCount: 1,
  isLoading: false,
  history: {
    push: jest.fn()
  },
  location: {
    search: '?page=1',
    pathname: '/requests'
  },
  user: {
    UserInfo: {
      name: 'John Doe'
    }
  },
  createNewRequest: jest.fn(),
  getOccupation: jest.fn(),
  getUserData: jest.fn(),
  fetchAvailableRoomsSuccess: jest.fn(),
  fetchAllTravelStipends: jest.fn(),
  loading: false,
  errors: [],
  shouldOpen: false,
  fetchCenters: jest.fn(),
  requestStatus: 'Open',
  modalType: null,
  openModal: sinon.spy(() => Promise.resolve()),
  closeModal: sinon.spy(() => Promise.resolve()),
  page: 'Requests',
  match: {
    params: { requestId: 'xDh20btGx' }
  },
  editRequest: jest.fn(),
  submissionInfo,
  fileUploads: {},
  fetchSubmission: jest.fn(),
  postSubmission: jest.fn(),
  validateTrips: jest.fn(),
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
  modalReducer: {
    shouldOpen: false,
    modalType: null
  },
  roleUsers: [
    { fullName: 'Samuel Kubai', email: 'samuel@andela.com' },
    { fullName: 'Chris Akanmu', email: 'chris@andela.com' }
  ],
  getCurrentUserRole: 'tomato',
  travelChecklist: { checklistItems: travelChecklistMockData }
};
const mockStore = configureStore();
const store = mockStore(initialState);

describe('<Requests>', () => {
  process.env.REACT_APP_CITY = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD-fvLImnNbTfYV3Pd1nJuK7NbzZJNr4ug&libraries=places';

  it('should render the Requests without crashing', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Requests {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });

  it('calls the componentDidMount method', () => {
    const spy = sinon.spy(Requests.prototype, 'componentDidMount');
    const { fetchUserRequests, fetchRoleUsers, requestId, openModal} = props;
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Requests {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(spy.called).toEqual(true);
    expect(fetchUserRequests.called).toEqual(true);
    expect(fetchUserRequests.calledWith('?page=1')).toEqual(true);
    expect(fetchRoleUsers.called).toEqual(true);
    expect(openModal.called).toEqual(true);
    expect(fetchRoleUsers.calledWith(53019)).toEqual(true);
    wrapper.unmount();
  });


  it(`calls the fetchRequests method
    when the next pagination button is clicked`, () => {
    const { fetchUserRequests } = props;
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Requests {...props} />
        </MemoryRouter>
      </Provider>
    );
    const spy = sinon.spy(wrapper.find(Requests).instance(), 'fetchRequests');
    wrapper.find('#next-button').simulate('click');
    expect(spy.calledOnce).toEqual(true);
    expect(fetchUserRequests.called).toEqual(true);
    wrapper.unmount();
  });

  it(`calls the fetchRequests method with the correct query
    when the next pagination button is clicked`, () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Requests
            {...{
              ...props,
              location: {
                search: ''
              }
            }}
          />
        </MemoryRouter>
      </Provider>
    );
    const spy = sinon.spy(wrapper.find(Requests).instance(), 'fetchRequests');
    wrapper.find('#next-button').simulate('click');
    expect(spy.called).toEqual(true);
    expect(spy.calledWith('?page=2')).toEqual(true);
    wrapper.unmount();
  });

  it(`calls the fetchRequests method
    with the selected limit when a limit is selected`, () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Requests {...props} />
        </MemoryRouter>
      </Provider>
    );
    const spy = sinon.spy(wrapper.find(Requests).instance(), 'fetchRequests');
    wrapper
      .find('.dropdown__list__item')
      .first()
      .simulate('click');
    expect(spy.calledOnce).toEqual(true);
    expect(spy.calledWith('?page=1&limit=10')).toEqual(true);
    wrapper.unmount();
  });

  it(`calls the fetchRequests method with the last possible page
  when a limit and a page above the available pages is selected`, () => {
    const { pagination } = props;
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Requests
            {...{
              ...props,
              pagination: { ...pagination, currentPage: 4 },
              location: { search: '?page=4&status=open' }
            }}
          />
        </MemoryRouter>
      </Provider>
    );
    const spy = sinon.spy(wrapper.find(Requests).instance(), 'fetchRequests');
    wrapper
      .find('.dropdown__list__item')
      .last()
      .simulate('click');
    expect(spy.calledOnce).toEqual(true);
    expect(spy.calledWith('?page=1&status=open&limit=30')).toEqual(true);
    wrapper.unmount();
  });

  it('should render the child components', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Requests {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find('.rp-requests__header').length).toBe(1); // RequestsPanelHeader
    expect(wrapper.find('Table').length).toBe(1);
    expect(wrapper.find('RequestPanelHeader').length).toBe(1);
    expect(wrapper.find('WithLoading').length).toBe(1); //WithLoading HOC containing Requests
    // Since the element is always on the DOM, the page length will always be one
    expect(wrapper.find('Pagination').length).toBe(1);
    wrapper.unmount();
  });

  it('should call renderRequestPanelHeader method', () => {
    const wrapper = shallow(<Requests {...props} />);
    const instance = wrapper.instance();
    const spyon = jest.spyOn(instance, 'renderRequestPanelHeader');
    expect(spyon).toHaveBeenCalledTimes(0);
  });

  it('renders as expected', () => {
    const wrapper = shallow(<Requests {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  
  it('should set `shouldOpen` prop to `true` when new request button is clicked', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Requests {...{...props, shouldOpen: true, modalType: 'new model'}} />
        </MemoryRouter>
      </Provider>
    );
    wrapper.find('.btn-new-request').simulate('click');
    expect(wrapper.find('Requests').props().shouldOpen).toBe(true);
    expect(props.openModal.called).toBe(true);
  });

  it('should set `visibility` prop to `visible` when new request button is clicked', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Requests
            {...{ ...props, shouldOpen: true, modalType: 'new model' }}
          />
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

  it('maps state to props and return the expected object', () => {
    const requests = {
      requests: [],
      errors: [],
      loading: false
    };

    const modal = {
      modal: {
        shouldOpen: false,
        modalType: null
      }
    };
    const user = {
      getUserData: {}
    };

    const travelChecklist = {
      checklistItems: travelChecklistMockData,
      isLoading: false
    };
    const props = mapStateToProps({requests, modal, user, travelChecklist});
    expect(props).toEqual({
      ...requests, ...modal.modal,
      userData: user.getUserData,
      travelChecklists: travelChecklist
    });
  });


  it('should handle edit request', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Requests {...{...props}} />
      </Provider>
    );
    const mountWrapper = wrapper.find('li#iconBtn');
    mountWrapper.simulate('click');
    expect(props.fetchEditRequest.called).toBe(true);
    expect(props.openModal.called).toBe(true);
  });

  it('should handle delete request', () => {
    const event = { preventDefault: jest.fn() };
    const newProps = {
      ...props,
      shouldOpen: true,
      modalType: 'delete request'
    };
    const wrapper = shallow(<Requests {...newProps} />
    );
    const instance = wrapper.instance();
    const spyon = jest.spyOn(instance, 'handleDeleteRequest');
    wrapper.instance().handleDeleteRequest('xDh20btGz');
    expect(spyon).toHaveBeenCalledTimes(1);
    expect(instance.props.deleteRequest.called).toBe(true);
    expect(instance.props.deleteRequest.calledWith('xDh20btGz')).toBe(true);
  });

  it('should handle close travel checklist submission modal', () => {
    const wrapper = shallow(<Requests {...props} />
    );
    const instance = wrapper.instance();
    const handleCloseSubmissionModalSpy = jest.spyOn(instance, 'handleCloseSubmissionModal');
    wrapper.instance().handleCloseSubmissionModal();
    expect(handleCloseSubmissionModalSpy).toHaveBeenCalledTimes(1);
  });

  it('should set openChecklist to true', () => {
    const prevProps = {
      ...props,
      match: {
        path: '/requests/:requestId/checklist',
        params: {requestId: 'xDh20btGz'}
      },
      requests: []
    };
    const wrapper = mount(<Requests {...prevProps} />);
    wrapper.setProps({...props});
    expect(wrapper.state('openChecklist')).toBe(true);
  });

});
