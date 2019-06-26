import React from 'react';
import { mount } from 'enzyme';
import RequestDetail from '../RequestDetails';


const props = {
  closeModal: jest.fn(),
  currentUser: {id: 62, fullName: 'Hope Uwa', email: 'hope.uwa@andela.com', userId: '-LSZHlCYZHY6-9lHqmCY', passportName: 'Hope Uwa',},
  fetchSubmission: jest.fn(),
  downloadAttachments: jest.fn(),
  fetchingRequest: false,
  fileUploads: {isUploading: '', uploadSuccess: '', cloudinaryUrl: '', error: ''},
  history: {createHref: jest.fn()},
  modalType: null,
  openModal: jest.fn(),
  postSubmission: jest.fn(),
  requestData:{
    approver: 'Hope Uwa',
    approverImage: 'https://lh5.googleusercontent.com/-cSAPvfr-h',
    budgetApprovedAt: null,
    budgetApprovedBy: null,
    budgetStatus: 'Approved',
    comments: [],
    createdAt: '2019-03-12T13:18:30.094Z',
    deletedAt: null,
    department: 'Fellowship-Programs',
    gender: 'Male',
    id: 'rlP_5EOkU',
    manager: 'Hope Uwa',
    name: 'Hope Uwa',
    picture: 'https://lh5.googleusercontent.com/-cSAPvfr-h/photo.jpg',
    role: 'Technical Team Lead',
    status: 'Approved',
    stipend: 690,
    timeApproved: '2019-03-12T13:18:46.214Z',
    tripType: 'multi',
    trips: [{
      accommodationType: 'Residence',
      bedId: 10945,
      beds: {id: 10945, bedName: 'Bed 1', booked: false, createdAt: '2018-08-16T11:11:52.181Z', updatedAt: '2018-08-16T11:11:52.181Z',
        rooms:{
          bedCount: 2,
          createdAt: '2018-08-16T11:11:52.181Z',
          faulty: true,
          guestHouseId: 'guest-house-1',
          guestHouses: {id: 'guest-house-1', houseName: 'Mini flat-B', location: 'Lagos, Nigeria', bathRooms: 1, imageUrl: 'https://www.dropbox.com/s/c2n63x2jamh3ndv/guesthouse2.jpg?raw=1', genderPolicy: 'unisex'},
          id: 'room-id-1',
          isDeleted: false,
          roomName: 'Kwetu',
          roomType: 'ensuited',
          updatedAt: '2019-03-23T17:50:09.903Z'}},
      checkInDate: null,
      checkOutDate: null,
      checkStatus: 'Not Checked In',
      createdAt: '2019-03-12T13:18:30.109Z',
      deletedAt: null,
      departureDate: '2019-08-01',
      destination: 'Nairobi, Kenya',
      id: 'GCpkv0WQpg',
      lastNotifyDate: null,
      notificationCount: 0,
      origin: 'Lagos, Nigeria',
      otherTravelReasons: null,
      reasons: {id: 3, title: 'nothing', description: '', createdAt: '2019-02-28T22:46:28.714Z', updatedAt: '2019-02-28T22:46:28.714Z'},
      requestId: 'rlP_5EOkU',
      returnDate: '2019-08-02',
      travelCompletion: 'false',
      travelReasons: 3,
      updatedAt: '2019-03-12T13:18:30.109Z'
    }],
    updatedAt: '2019-03-12T13:18:46.224Z',
    userId: '-LSZHlCYZHY6-9lHqmCY'},
  requestId: 'rlP_5EOkU',
  shouldOpen: false,
  showTravelChecklist: jest.fn(),
  submissionInfo: {
    fetchFailureMessage: '',
    fetchSuccessMessage: 'Checklist with submissions retrieved successfully',
    isFetching: false,
    isLoading: true,
    isUploading: [],
    itemsToCheck: [],
    percentageCompleted: 100,
    postFail: false,
    postSuccess: [],
    requestId: 'xDh20btGz',
    submissions: [
      {destinationName: 'Nairobi, Kenya',
        checklist: [{
          deleteReason: null,
          destinationName: 'Nairobi, Kenya',
          id: 'Hji1FU7q9',
          name: 'visa',
          requiresFiles: true,
          resources: [],
          submissions: [{
            checklistItemId: 'Hji1FU7q9',
            checklistSubmissions: {id: 'Hji1FU7q9'},
            createdAt: '2019-03-12T20:40:53.694Z',
            deletedAt: null,
            id: 'B523ka3vN',
            tripId: 'GCpkv0WQpg',
            updatedAt: '2019-03-12T20:40:53.694Z',
            userUpload: {url: 'http://res.cloudinary.com/authors-haven/image/upload/v1552330953/xbi9b9efov468sqdsyjk.jpg', fileName: 'Passport.jpeg', documentId: 'zu6sKphUj'}}]
        }],
        tripId: 'GCpkv0WQpg'},
      {destinationName: 'Lagos, Nigeria',
        checklist: [],
        tripId: '3OIntw-g9F'}],
    successMessage: '',
    successStatus: false,
    tripType: 'oneWay',
  },
  travelChecklists: {isLoading: false, updatingChecklist: false, creatingChecklist: false, fetchingChecklists: false, checklistItems: [{}],},
  uploadFile: jest.fn(),
  user: {postUserData: [], getUserData: {}, currentUser: {}, errors: {}, getCurrentUserRole: []},
  userReadinessDocument: {passport: [{}]}

};

let wrapper;
describe('<RequestDetails />', () => {
  beforeEach(() => {
    wrapper=  mount (<RequestDetail {...props} />);
  });
  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should return latest date', () => {
    const wrapper = shallow(<RequestDetail {...props} />);
    expect(wrapper.instance().checklistCompletionDate(props.submissionInfo.submissions)).toEqual('12/03/19');
  });
  it('should set current tab to 4 if percentage is 100', () => {
    const wrapper = shallow(<RequestDetail {...props} />);
    wrapper.instance().setSteps(100,
      props.submissionInfo.submissions);
    expect(wrapper.instance().state.currentTab).toEqual(4);
  });
  it('should show Hotel Booking', () => {
    const wrapper = shallow(<RequestDetail {...props} />);
    wrapper.setProps({
      requestData:{
        trips:[{accommodationType: 'Hotel Bookings',
          bedId: 10945,
          beds: null,
          
          createdAt: '2019-03-12T13:18:30.109Z',
          deletedAt: null,
          departureDate: '2019-08-01',
          destination: 'Nairobi, Kenya',
          id: 'GCpkv0WQpg',
          lastNotifyDate: null,
          notificationCount: 0,
          origin: 'Lagos, Nigeria',
          otherTravelReasons: null,
          reasons: {id: 3, title: 'nothing', description: '', createdAt: '2019-02-28T22:46:28.714Z', updatedAt: '2019-02-28T22:46:28.714Z'},
          requestId: 'rlP_5EOkU',
          returnDate: '2019-08-02',
          travelCompletion: 'false',
          travelReasons: 3,
          updatedAt: '2019-03-12T13:18:30.109Z'}]
      }
    });
    expect(wrapper.find('.partition').find('p').at(5).text()).toEqual('Hotel Bookings');
  
  });

});
