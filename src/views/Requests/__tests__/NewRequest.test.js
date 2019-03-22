import React from 'react';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
import { RequestPage as RequestPageHOC } from '../NewRequests';
import travelChecklistMockData from '../../../mockData/travelChecklistMockData';
import beds from '../../AvailableRooms/__mocks__/mockData/availableRooms';
import { submissionInfo } from '../../../mockData/checklistSubmissionMockData';

const RequestPage = RequestPageHOC();

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
  fetchUserRequests: sinon.spy(() => Promise.resolve()),
  fetchRoleUsers: sinon.spy(() => Promise.resolve()),
  updateUserProfile: sinon.spy(() => Promise.resolve()),
  fetchAvailableRooms: sinon.spy(() => Promise.resolve()),
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
  modalType: null,
  page: 'Requests',
  match: {
    params: { requestId: 'xDh20btGx' }
  },
  editRequest: jest.fn(),
  submissionInfo,
  fileUploads: {},
  fetchSubmission: jest.fn(),
  postSubmission: jest.fn(),
  fetchAllTravelReasons: sinon.spy(() => Promise.resolve()),
  listTravelReasons: {},
  validateTrips: jest.fn(),
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
    const wrapper = mount(<RequestPage {...props} />
    );
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });

  it('calls the componentDidMount method', () => {
    const spy = sinon.spy(RequestPage.prototype, 'componentDidMount');
    const { fetchUserRequests, fetchRoleUsers, fetchAllTravelReasons} = props;
    const wrapper = mount(<RequestPage {...props} />);
    expect(spy.called).toEqual(true);
    expect(fetchRoleUsers.called).toEqual(true);
    expect(fetchRoleUsers.calledWith(53019)).toEqual(true);
    expect(fetchAllTravelReasons.called).toEqual(true);
    wrapper.unmount();
  });

  it('should render the Requests for editing', () => {
    const RequestPage = RequestPageHOC(true);
    const wrapper = mount(<RequestPage {...props} />);
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });

});
