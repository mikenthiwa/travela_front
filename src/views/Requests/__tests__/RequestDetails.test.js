import React from 'react';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
import { RequestDetailsPage } from '../RequestDetails/index';
import travelChecklistMockData from '../../../mockData/travelChecklistMockData';
import beds from '../../AvailableRooms/__mocks__/mockData/availableRooms';
import { submissionInfo } from '../../../mockData/checklistSubmissionMockData';


let wrapper;
const request = {
  comments: [{
    comment: '<p>testing <strong>#b5tdJCef7 #b5tdJCef7 #b5tdJCef7 #b5tdJCef7 #b5tdJCef7</strong></p>',
    createdAt: '2019-02-26T16:29:13.579Z',
    deletedAt: null,
    documentId: null,
    id: 'b-PDWlDkm',
    isEdited: false,
    requestId: 'b5tdJCef7',
    updatedAt: '2019-02-26T16:29:13.579Z',
    user: {
      createdAt: '2019-02-25T10:54:30.214Z',
      department: 'Fellowship-Programs',
      email: 'christopher.akanmu@andela.com',
      fullName: 'Christopher Akanmu',
      gender: 'Male',
      id: 1,
      location: 'Lagos',
      manager: 'Christopher Akanmu',
      occupation: 'Technical Team Lead',
      passportName: 'Christopher Akanmu',
      picture: 'https://lh3.googleusercontent.com/-0IiIxTNUkIY/AAAAAAAAAAI/AAAAAAAAAAc/bjqhX-Jagqc/photo.jpg?sz=50',
      updatedAt: '2019-02-27T12:44:18.033Z',
      userId: '-LVoI8g-LZGO0W4S2xRt',
    },
    userId: 1
  }],
  createdAt: '2019-02-25T10:59:03.299Z',
  deletedAt: null,
  department: 'Fellowship-Programs',
  gender: 'Male',
  id: 'nXCj4U57J',
  manager: 'David Muhanguzi',
  name: 'David Muhanguzi',
  picture: 'https://lh3.googleusercontent.com/-0IiIxTNUkIY/AAAAAAAAAAI/AAAAAAAAAAc/bjqhX-Jagqc/photo.jpg?sz=50',
  role: 'Technical Team Lead',
  status: 'Open',
  tripType: 'oneWay',
  trips: [{
    accommodationType: 'Hotel Booking',
    bedId: null,
    beds: null,
    checkInDate: null,
    checkOutDate: null,
    checkStatus: 'Not Checked In',
    createdAt: '2019-02-25T10:59:03.310Z',
    deletedAt: null,
    departureDate: '2019-02-25',
    destination: 'New York, United States',
    id: 'M8M9iehHfO',
    lastNotifyDate: null,
    notificationCount: 0,
    origin: 'Lagos, Nigeria',
    otherTravelReasons: 'Travelling for fun',
    reasons: null,
    requestId: 'nXCj4U57J',
    returnDate: '2019-03-25',
    travelCompletion: 'false',
    travelReasons: null,
    updatedAt: '2019-02-25T11:41:30.437Z'
  }],
  updatedAt: '2019-02-25T10:59:03.299Z',
  userId: '-LVoI8g-LZGO0W4S2xRt'
};

const showComments = jest.fn(() => {});

const props = {
  fetchUserRequestDetails:  sinon.spy(() => Promise.resolve()),
  renderComments:  jest.fn(),
  isLoading: true,
  headerTags: ['Managers Approval'],
  requestId: 'nXCj4U57J',
  request,
  match: {
    params: {
      requestId: 'nXCj4U57J'
    }
  },
};

const initialState = {
  commentTitle: 'Show Comments',
  collapse: false,
};
const mockStore = configureStore();
const store = mockStore(initialState);

describe('<RequestsDetails>', () => {
  beforeEach(() => {
    mockStore({});
    wrapper = shallow(<RequestDetailsPage showComments={showComments} {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render the RequestDetailsPage without crashing', () => {
    const wrapper = mount(<RequestDetailsPage {...props} />);
    expect(wrapper.length).toBe(1);
  });

  it('calls the componentDidMount method', () => {
    const spy = sinon.spy(RequestDetailsPage.prototype, 'componentDidMount');
    const { fetchUserRequestDetails, match: { params: { requestId } } } = props;
    mount(<RequestDetailsPage {...props} />);
    expect(spy.called).toEqual(true)
    expect(fetchUserRequestDetails.called).toEqual(true);
    expect(fetchUserRequestDetails.calledWith(requestId)).toEqual(true);
  });

  it('should display comments section when showComment method is rendered', () => {
    wrapper.instance().showComments();
    expect(wrapper.state().collapse).toEqual(true);
    expect(wrapper.state().commentTitle).toEqual('Hide Comment');
  });

  it('should hide comments section when showComment method is rendered with comments showing', () => {
    wrapper.setState({ collapse: true });
    wrapper.instance().showComments();
    expect(wrapper.state().collapse).toEqual(false);
    expect(wrapper.state().commentTitle).toEqual('Add comment');
  });

});
