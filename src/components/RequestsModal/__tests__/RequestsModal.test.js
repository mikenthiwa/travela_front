import React from 'react';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import moxios from 'moxios';
import ConnectedRequestDetailsModal, {
  RequestDetailsModal
} from '../RequestsModal';
import {
  fetchRequestsDetailsResponse,
  userImage,
  userEmail
} from '../../../redux/__mocks__/reduxMocks';
import requestData from '../__mocks__/requestData';
import testRequestDetailsResp from '../../../services/__mocks__/mockApprovals';
import rootSaga from '../../../redux/middleware';
import RequestDetailsHeader from '../RequestDetailsHeader';
import RequestModalHelper from '../RequestModalHelper';

const getRequestTripsDetailsSpy = jest.spyOn(RequestModalHelper, 'getRequestTripsDetails');
const renderStatusAsBadgeSpy = jest.spyOn(RequestModalHelper, 'renderStatusAsBadge');

const baseUrl = 'http://127.0.0.1:5000/api/v1';

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureStore([sagaMiddleware]);
const store = mockStore({
  requests: { requestData: { tripType: 'multi', trips: [] } },
  approvals: [],
  modal: { modal: {} },
  auth: { ...userImage },
  user: { ...userEmail }
});

store.runSagas = sagaMiddleware.run;

let wrapper;
const props = {
  requestId: 'xDh20cuGx',
  user: {
    picture: 'http://my-image'
  },
  result: {
    email: 'hari2@gmail.com'
  },
  requestData: {
    id: 'xDh20cuGx',
    name: 'Test user C',
    origin: 'Lagos',
    destination: 'Nairobi',
    manager: 'Samuel Kubai',
    department: 'TDD',
    role: 'Software Developer',
    status: 'Approved',
    userId: '-MUyHJmKrxA90lPNQ1FOLNm',
    departureDate: '2018-09-12',
    arrivalDate: '2018-11-12',
    createdAt: '2018-09-04T10:38:12.141Z',
    tripType: 'multi',
    trips: [
      {
        origin: 'Lagos',
        destination: 'Nairobi',
        departureDate: '2018-12-09',
        arrivalDate: '2018-12-15'
      },
      {
        origin: 'Nairobi',
        destination: 'New York',
        departureDate: '2018-12-15',
        arrivalDate: '2019-01-10'
      },
      {
        origin: 'New York',
        destination: 'Lagos',
        departureDate: '2019-01-10',
        arrivalDate: '2019-01-20'
      },
      {
        origin: 'Lagos',
        destination: 'Nairobi',
        departureDate: '2019-01-30',
        arrivalDate: '2019-02-13'
      }
    ],
    comments: [
      {
        id: 1,
        userName: 'Random User',
        comment: 'This is a comment',
        createdAt: '2018-09-04T10:38:12.141Z',
        picture: 'http://my-image'
      },
      {
        id: 2,
        userName: 'Random User Two',
        comment: 'This is another comment',
        createdAt: '2018-10-04T10:38:12.141Z',
        picture: 'http://my-image'
      }
    ]
  },
  fetchUserRequestDetails: sinon.spy(() => Promise.resolve()),
  requests: {
    requestData: {
      id: '1',
      name: 'Orion',
      status: 'Approved'
    }
  },
  updateRequestStatus: jest.fn(() => Promise.resolve()),
  isStatusUpdating: false,
  url: 'travela.andela.com/requests/',
  redirectLink: '/requests'
};

const componentDidMountSpy = sinon.spy(
  RequestDetailsModal.prototype,
  'componentDidMount'
);

describe('Render RequestsModal component', () => {
  beforeEach(() => {
    wrapper = shallow(<RequestDetailsModal {...props} />);
  });
  // make our assertions and what we expect to happen
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('tests that the component successfully rendered', () => {
    expect(wrapper.find('div').exists()).toBeTruthy();
  });

  it('should call componentDidMount()', () => {
    const { fetchUserRequestDetails, requestData } = props;
    expect(componentDidMountSpy.called).toBe(true);
    expect(fetchUserRequestDetails.called).toEqual(true);
    expect(fetchUserRequestDetails.calledWith(requestData.id)).toEqual(true);
  });

  it('should render the RequestsModal as expected', () => {
    expect(wrapper.length).toBe(1);
  });

  it('should call updateRequestStatus', () => {
    const spy = jest.spyOn(wrapper.instance(), 'updateRequestStatus');
    wrapper.instance().updateRequestStatus();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call handleConfirmModal', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleConfirmModal');
    wrapper.instance().handleConfirmModal('Approve');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(wrapper.state('buttonSelected')).toBe(false);
  });

  it('should call handleButtonState', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleButtonState');
    wrapper.instance().handleButtonState('Approve', '', 'Approve');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(wrapper.state('buttonSelected')).toBe('Approve');
  });

  it('should call handleApprove', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleApprove');
    wrapper.instance().handleApprove('2jhd13');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call handleReject', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleReject');
    wrapper.instance().handleReject('2jhd13');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call getRequestTripsDetails', () => {
    expect(getRequestTripsDetailsSpy).toHaveBeenCalled();
  });

  it('should render approveTextColor when button is clicked', () => {
    const approveButton = wrapper.find('#b1').at(0);
    approveButton.simulate('click');
    expect(wrapper.state('buttonSelected')).toBe('Approve');
  });

  it('should render rejectColor when button is clicked', () => {
    const rejectButton = wrapper.find('#b2').at(0);
    rejectButton.simulate('click');
    expect(wrapper.state('buttonSelected')).toBe('Reject');
  });

  it('should call renderStatusAsBadge function', () => {
    const newProps = { ...props, navigatedPage: 'Requests' };
    shallow(<RequestDetailsModal {...newProps} />);
    expect(renderStatusAsBadgeSpy).toHaveBeenCalled();
  });

  it('should call changeButtonColor for approval function', () => {
    const button = {
      id: 1
    };
    const action = wrapper.instance();
    const changeButtonColor = jest.spyOn(
      wrapper.instance(),
      'changeButtonColor'
    );
    action.changeButtonColor(button, 'Approved');
    expect(changeButtonColor.mock.calls.length).toBe(1);
  });

  it('should call changeButtonColor for rejection function', () => {
    const button = {
      id: 2
    };
    const action = wrapper.instance();
    const changeButtonColor = jest.spyOn(
      wrapper.instance(),
      'changeButtonColor'
    );
    action.changeButtonColor(button, 'Rejected');
    expect(changeButtonColor.mock.calls.length).toBe(1);
  });

  describe('RequestModal API fetch actions', () => {
    beforeAll(() => {
      store.runSagas(rootSaga);
    });

    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });
  });

  describe('Connected RequestDetailsModal component', () => {
    it('tests that the component successfully rendered', () => {
      const wrapper = shallow(
        <Provider store={store}>
          <ConnectedRequestDetailsModal />
        </Provider>
      );
      expect(wrapper.length).toBe(1);
    });
  });

  describe('RequestDetailsHeader to match snapshot', () => {
    const requestData = {
      tripType: {
        multi: '',
        oneWay: ''
      }
    };
    const headerWrapper = shallow(<RequestDetailsHeader requestData={requestData} />);
    expect(headerWrapper).toMatchSnapshot();
  });

  describe('Connected RequestDetailsModal component', () => {
    it('tests that the component successfully rendered', () => {
      const requestData = {
        tripType: {
          return: '',
          oneWay: ''
        }
      };
      const headerWrapper = shallow(<RequestDetailsHeader requestData={requestData} />);
      expect(headerWrapper).toMatchSnapshot();
    });
  });

  describe('Connected RequestDetailsModal component', () => {
    it('tests that the component successfully rendered when type is Multi', () => {
      const requestData = {
        tripType: 'multi'
      };
      const headerWrapper = shallow(<RequestDetailsHeader requestData={requestData} />);
      expect(headerWrapper).toMatchSnapshot();
    });
  });

  describe('Connected RequestDetailsModal component', () => {
    it('tests that the component successfully rendered when type is one way', () => {
      const requestData = {
        tripType: 'oneWay'
      };
      const headerWrapper = shallow(<RequestDetailsHeader requestData={requestData} />);
      expect(headerWrapper).toMatchSnapshot();
    });
  });
});
