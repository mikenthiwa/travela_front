import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter, Link } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import MutationObserver from 'mutation-observer';
import { props } from 'bluebird';
import NewRequestPageView, { NewRequestPage } from '../NewRequestPage';


global.MutationObserver = MutationObserver;
window.document.getSelection = () => {};

let props1 = {
  requestData: {
    id: 'xDh20btGz',
    name: 'Adeniyi Funmbi',
    tripType: 'oneWay',
    approver: 'Samuel Kubai',
    manager: 'Samuel Kubai',
    timeApproved: '2018-09-20',
    gender: 'male',
    status: 'Verified',
    trips: [
      {
        id: 'fhafi',
        departureDate: '2018-09-20',
        origin: 'Lagos',
        destination: 'Angola',
        returnDate: '2019-09-22'
      }
    ],
    comments:[],
    department: 'TDD',
    role: 'Software Developer'
  },
  fetchingRequest: false,
  fetchUserRequestDetails:jest.fn(),
  user: {
    UserInfo: {
      name: 'John Doe',
      email: 'johnDoe@andela.com'
    },
    currentUser: {
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
    },
  },
  getUserData: jest.fn(),
  page: 'Requests',
  match: {
    params: { requestId: 'xDh20btGx' }
  },
  travelChecklists: {
    checklistItems: [{
      checklist: [{
        deleteReason: null,
        destinationName: 'Default',
        id: '1',
        name: 'Travel Ticket Details',
        requiresFiles: false,
        resources: [{id: '1', label: 'Flight Application Guide', 
          link: 'http://andela.com', checklistItemId: '1'}]}],
      destinationName: 'Angola',
      tripId: 'fhafi'
    }],
    creatingChecklist: false,
    deletedCheckListItems: [],
    error: '',
    fetchingChecklists: false,
    isLoading: false,
    updatingChecklist: false
  },
  submissionInfo: {
    fetchFailureMessage: '',
    fetchSuccessMessage: 'Checklist with submissions retrieved successfully',
    isFetching: false,
    isLoading: true,
    isUploading: [],
    itemsToCheck: [],
    percentageCompleted: 80,
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
            createdAt: '2019-03-12T23:40:53.694Z',
            deletedAt: null,
            id: 'B523ka3vN',
            tripId: 'GCpkv0WQpg',
            updatedAt: '2019-03-12T23:40:53.694Z',
            value: {url: 'http://res.cloudinary.com/authors-haven/image/upload/v1552330953/xbi9b9efov468sqdsyjk.jpg', fileName: 'Passport.jpeg', documentId: 'zu6sKphUj'}}]
        }], 
        tripId: 'GCpkv0WQpg'},
      {destinationName: 'Lagos, Nigeria', 
        checklist: Array(1), 
        tripId: '3OIntw-g9F'}],
    successMessage: '',
    successStatus: false,
    tripType: 'oneWay',
  },
  fileUploads: {
    isUploading: '',
    uploadSuccess: '',
    cloudinaryUrl: '',
    error: ''
    
  },
  modalType: null,
  shouldOpen: false,
  history: {push: jest.fn()},
  closeModal: jest.fn(),
  openModal: jest.fn(),
  postSubmission: jest.fn(),
  userReadinessDocument: {},
  uploadFile: jest.fn(),
  fetchTravelChecklist: jest.fn(),
  fetchUserReadinessDocuments: jest.fn(),
  fetchSubmission: jest.fn()
};

let props2 = {
  requestData: {
    id: 'xDh20btGz',
    name: 'Adeniyi Funmbi',
    tripType: 'oneWay',
    manager: 'SamuelKubai',
    approver: 'Samuel Kubai',
    timeApproved: '2018-09-20',
    gender: 'Male',
    status: 'Approved',
    trips: [
      {
        id: 'fhafdi',
        departureDate: '2018-09-20',
        origin: 'Lagos',
        destination: 'Angola',
        returnDate: '2019-09-22',
        travelReasons: 44,
      }
    ],
    comments: [],
    department: 'TDD',
    role: 'Software Developer'
  },
  
  fetchingRequest: true,
  fetchUserRequestDetails: jest.fn(),
  user: {
    UserInfo: {
      name: 'John Doe',
      email: 'johnDoe@andela.com'
    },
    currentUser: {
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
    },
  },
  getUserData: jest.fn(),
  page: 'Requests',
  match: {
    params: { requestId: 'xDh20btGx' }
  },
  travelChecklists: {
    checklistItems: [{
      checklist: [{
        deleteReason: null,
        destinationName: 'Default',
        id: '1',
        name: 'Travel Ticket Details',
        requiresFiles: false,
        resources: [{id: '1', label: 'Flight Application Guide', 
          link: 'http://andela.com', checklistItemId: '1'}]}],
      destinationName: 'Angola',
      tripId: 'fhafi'
    }],
    creatingChecklist: false,
    deletedCheckListItems: [],
    error: '',
    fetchingChecklists: false,
    isLoading: false,
    updatingChecklist: false
  },
  submissionInfo: {
    fetchFailureMessage: '',
    fetchSuccessMessage: 'Checklist with submissions retrieved successfully',
    isFetching: false,
    isLoading: true,
    isUploading: [],
    itemsToCheck: [],
    percentageCompleted: 80,
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
            createdAt: '2019-03-12T23:40:53.694Z',
            deletedAt: null,
            id: 'B523ka3vN',
            tripId: 'GCpkv0WQpg',
            updatedAt: '2019-03-12T23:40:53.694Z',
            value: {url: 'http://res.cloudinary.com/authors-haven/image/upload/v1552330953/xbi9b9efov468sqdsyjk.jpg', fileName: 'Passport.jpeg', documentId: 'zu6sKphUj'}}]
        }], 
        tripId: 'GCpkv0WQpg'},
      {destinationName: 'Lagos, Nigeria', 
        checklist: Array(1), 
        tripId: '3OIntw-g9F'}],
    successMessage: '',
    successStatus: false,
    tripType: 'oneWay',
  },
  fileUploads: {
    isUploading: '',
    uploadSuccess: '',
    cloudinaryUrl: '',
    error: ''
  },
  modalType: '',
  shouldOpen: false,
  history: {push: jest.fn()},
  closeModal: jest.fn(),
  openModal: jest.fn(),
  postSubmission: jest.fn(),
  userReadinessDocument: {},
  uploadFile: jest.fn(),
  fetchTravelChecklist: jest.fn(),
  fetchUserReadinessDocuments: jest.fn(),
  fetchSubmission: jest.fn()
};

let props3 = {
  requestData: {
    id: 'xDh20btGz',
    name: 'Adeniyi Funmbi',
    tripType: 'multi',
    manager: 'SamuelKubai',
    approver: 'Samuel Kubai',
    timeApproved: '2018-09-20',
    gender: 'Male',
    status: 'Approved',
    trips: [
      {
        id: '47uy32',
        departureDate: '2018-09-20',
        origin: 'Lagos, Nigeria',
        destination: 'Nairobi, Kenya',
        returnDate: '2018-09-22',
        travelReasons: 44,
        reasons: {
          title: 'reason',
          description: 'description'
        }
      },
      {
        id: '47y73',
        departureDate: '2019-09-24',
        origin: 'Nairobi, Kenya',
        destination: 'Lagos, Nigeria',
        returnDate: null,
        travelReasons: null,
        otherTravelReasons: 'Another Reason'
      }
    ],
    comments: [
      {
        creatingComments: false,
        title: 'title',
        userId: 2,
        user: 'Adeniyi Funmbi',
        createdAt: '2019-09-24'
      },
      {
        title: 'title',
        userId: 2,
        user: 'Adeniyi Funmbi',
        createdAt: '2019-09-24'
      }
    ],
    department: 'TDD',
    role: 'Software Developer'
  },
  fetchingRequest: false,
  fetchUserRequestDetails: jest.fn(),
  user: {
    UserInfo: {
      name: 'John Doe',
      email: 'johnDoe@andela.com'
    },
    currentUser: {
      picture: 'picture',
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
    },
  },
  getUserData: jest.fn(),
  page: 'Requests',
  match: {
    params: { requestId: 'xDh20btGx' }
  },
  travelChecklists: {
    checklistItems: [
      {
        checklist: [{
          deleteReason: null,
          destinationName: 'Default',
          id: '1',
          name: 'Travel Ticket Details',
          requiresFiles: false,
          resources: [{id: '1', label: 'Flight Application Guide', 
            link: 'http://andela.com', checklistItemId: '1'}]}],
        destinationName: 'Nairobi, Kenya',
        tripId: '47uy32'
      },
      {
        checklist: [{
          deleteReason: null,
          destinationName: 'Default',
          id: '1',
          name: 'Travel Ticket Details',
          requiresFiles: false,
          resources: [{id: '1', label: 'Flight Application Guide', 
            link: 'http://andela.com', checklistItemId: '1'}]}],
        destinationName: 'Lagos, Nigeria',
        tripId: '47y73'
      }],
    creatingChecklist: false,
    deletedCheckListItems: [],
    error: '',
    fetchingChecklists: false,
    isLoading: false,
    updatingChecklist: false
  },
  submissionInfo: {
    fetchFailureMessage: '',
    fetchSuccessMessage: 'Checklist with submissions retrieved successfully',
    isFetching: false,
    isLoading: true,
    isUploading: [],
    itemsToCheck: [],
    percentageCompleted: 80,
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
            createdAt: '2019-03-12T23:40:53.694Z',
            deletedAt: null,
            id: 'B523ka3vN',
            tripId: 'GCpkv0WQpg',
            updatedAt: '2019-03-12T23:40:53.694Z',
            value: {url: 'http://res.cloudinary.com/authors-haven/image/upload/v1552330953/xbi9b9efov468sqdsyjk.jpg', fileName: 'Passport.jpeg', documentId: 'zu6sKphUj'}}]
        }], 
        tripId: 'GCpkv0WQpg'},
      {destinationName: 'Lagos, Nigeria', 
        checklist: Array(1), 
        tripId: '3OIntw-g9F'}],
    successMessage: '',
    successStatus: false,
    tripType: 'oneWay',
  },
  fileUploads: {},
  modalType: '',
  shouldOpen: false,
  history: {push: jest.fn()},
  closeModal: jest.fn(),
  openModal: jest.fn(),
  postSubmission: jest.fn(),
  userReadinessDocument: {},
  uploadFile: jest.fn(),
  fetchTravelChecklist: jest.fn(),
  fetchUserReadinessDocuments: jest.fn(),
  fetchSubmission: jest.fn()
};

let props4 = {
  requestData: {
    id: 'xDh20btGz',
    name: 'Adeniyi Funmbi',
    tripType: 'multi',
    manager: 'SamuelKubai',
    approver: 'Samuel Kubai',
    timeApproved: '2018-09-20',
    gender: 'Male',
    status: 'Approved',
    trips: [
      {
        id: '47uy32',
        departureDate: '2019-09-20',
        origin: 'Lagos, Nigeria',
        destination: 'Nairobi, Kenya',
        returnDate: '2019-09-22',
        travelReasons: 44,
        reasons: {
          title: 'reason',
          description: 'description'
        }
      },
      {
        id: '47y73',
        departureDate: '2019-09-24',
        origin: 'Nairobi, Kenya',
        destination: 'Lagos, Nigeria',
        returnDate: null,
        travelReasons: null,
        otherTravelReasons: 'Another Reason'
      }
    ],
    comments: [],
    department: 'TDD',
    role: 'Software Developer'
  },
  
  fetchingRequest: false,
  fetchUserRequestDetails: jest.fn(),
  user: {
    UserInfo: {
      name: 'John Doe',
      email: 'johnDoe@andela.com'
    },
    currentUser: {
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
    },
  },
  getUserData: jest.fn(),
  page: 'Requests',
  match: {
    params: { requestId: 'xDh20btGx' }
  },
  travelChecklists: {
    checklistItems: [
      {
        checklist: [{
          deleteReason: null,
          destinationName: 'Default',
          id: '1',
          name: 'Travel Ticket Details',
          requiresFiles: false,
          resources: [{id: '1', label: 'Flight Application Guide', 
            link: 'http://andela.com', checklistItemId: '1'}]}],
        destinationName: 'Nairobi, Kenya',
        tripId: '47uy32'
      },
      {
        checklist: [{
          deleteReason: null,
          destinationName: 'Default',
          id: '1',
          name: 'Travel Ticket Details',
          requiresFiles: false,
          resources: [{id: '1', label: 'Flight Application Guide', 
            link: 'http://andela.com', checklistItemId: '1'}]}],
        destinationName: 'Lagos, Nigeria',
        tripId: '47y73'
      }],
    creatingChecklist: false,
    deletedCheckListItems: [],
    error: '',
    fetchingChecklists: false,
    isLoading: false,
    updatingChecklist: false
  },
  submissionInfo: {
    fetchFailureMessage: '',
    fetchSuccessMessage: 'Checklist with submissions retrieved successfully',
    isFetching: false,
    isLoading: true,
    isUploading: [],
    itemsToCheck: [],
    percentageCompleted: 80,
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
            createdAt: '2019-03-12T23:40:53.694Z',
            deletedAt: null,
            id: 'B523ka3vN',
            tripId: 'GCpkv0WQpg',
            updatedAt: '2019-03-12T23:40:53.694Z',
            value: {url: 'http://res.cloudinary.com/authors-haven/image/upload/v1552330953/xbi9b9efov468sqdsyjk.jpg', fileName: 'Passport.jpeg', documentId: 'zu6sKphUj'}}]
        }], 
        tripId: 'GCpkv0WQpg'},
      {destinationName: 'Lagos, Nigeria', 
        checklist: Array(1), 
        tripId: '3OIntw-g9F'}],
    successMessage: '',
    successStatus: false,
    tripType: 'oneWay',
  },
  fileUploads: jest.fn(),
  modalType: '',
  shouldOpen: false,
  history: {push: jest.fn()},
  closeModal: jest.fn(),
  openModal: jest.fn(),
  postSubmission: jest.fn(),
  userReadinessDocument: {},
  uploadFile: jest.fn(),
  fetchTravelChecklist: jest.fn(),
  fetchUserReadinessDocuments: jest.fn(),
  fetchSubmission: jest.fn()
};


const initialState1 = {
  user: { ...props1.user },
  fetchUserRequestDetails: jest.fn(),
  requests: {
    requestData: props1.requestData,
    fetchingRequest: false
  },
  showCommentBox: true,
  comments:{
    creatingComments: false
  },
  modal: {modal : {shouldOpen: false,
    modalType: null,
    page: null}},
  travelReadinessDocuments: {
    userReadiness: { 
      id: '2',
      fullName: 'Collins Muru',
      email: 'collins.muru@andela.com',
      userId: '-LJNw1BsT0LP_E4l2peP',
      passportName: 'Collins Muru',
      department: 'Fellowship-Programs',
      occupation: 'Technical Team Lead',
      manager: 'Samuel Kubai',
      gender: 'Male',
      location: 'Lagos',
      createdAt: '2019-02-07T10:43:20.083Z',
      updatedAt: '2019-03-11T12:49:42.045Z',
      travelDocuments:{}}
  },
  submissions: props1.submissionInfo
  ,
  fileUploads: {
    isUploading: '',
    uploadSuccess: '',
    cloudinaryUrl: '',
    error: ''
  }

    
};

const initialState2 = {
  user: { currentUser: { ...props2.currentUser }},
  fetchUserRequestDetails: jest.fn(),
  requests: {
    requestData: props2.requestData,
    fetchingRequest: true
  },
  showCommentBox: false,
  comments: {
    creatingComments: false
  },
  modal: {modal : {shouldOpen: false,
    modalType: null,
    page: null}},
  travelReadinessDocuments: {
    userReadiness: { 
      id: '2',
      fullName: 'Collins Muru',
      email: 'collins.muru@andela.com',
      userId: '-LJNw1BsT0LP_E4l2peP',
      passportName: 'Collins Muru',
      department: 'Fellowship-Programs',
      occupation: 'Technical Team Lead',
      manager: 'Samuel Kubai',
      gender: 'Male',
      location: 'Lagos',
      createdAt: '2019-02-07T10:43:20.083Z',
      updatedAt: '2019-03-11T12:49:42.045Z',
      travelDocuments:{}}
  },
  submissions: props2.submissionInfo
  ,
  fileUploads: {
    isUploading: '',
    uploadSuccess: '',
    cloudinaryUrl: '',
    error: ''
  }
};

const initialState3 = {
  user: { ...props3.user },
  fetchUserRequestDetails: jest.fn(),
  requests: {
    requestData: props3.requestData,
    fetchingRequest: false
  },
  showCommentBox: false,
  comments: {
    creatingComments: false
  },
  modal: {modal : {shouldOpen: false,
    modalType: null,
    page: null}},
  travelReadinessDocuments: {
    userReadiness: { 
      id: '2',
      fullName: 'Collins Muru',
      email: 'collins.muru@andela.com',
      userId: '-LJNw1BsT0LP_E4l2peP',
      passportName: 'Collins Muru',
      department: 'Fellowship-Programs',
      occupation: 'Technical Team Lead',
      manager: 'Samuel Kubai',
      gender: 'Male',
      location: 'Lagos',
      createdAt: '2019-02-07T10:43:20.083Z',
      updatedAt: '2019-03-11T12:49:42.045Z',
      travelDocuments:{}}
  },
  submissions: props3.submissionInfo,
  fileUploads: {
    isUploading: '',
    uploadSuccess: '',
    cloudinaryUrl: '',
    error: ''
  }
};

const initialState4 = {
  user: { ...props4.user },
  fetchUserRequestDetails: jest.fn(),
  requests: {
    requestData: props3.requestData,
    fetchingRequest: false
  },
  showCommentBox: false,
  comments: {
    creatingComments: false
  },
  modal: {modal : {shouldOpen: false,
    modalType: null,
    page: null}},
  travelReadinessDocuments: {
    userReadiness: { 
      id: '2',
      fullName: 'Collins Muru',
      email: 'collins.muru@andela.com',
      userId: '-LJNw1BsT0LP_E4l2peP',
      passportName: 'Collins Muru',
      department: 'Fellowship-Programs',
      occupation: 'Technical Team Lead',
      manager: 'Samuel Kubai',
      gender: 'Male',
      location: 'Lagos',
      createdAt: '2019-02-07T10:43:20.083Z',
      updatedAt: '2019-03-11T12:49:42.045Z',
      travelDocuments:{}}
  },
  submissions: props4.submissionInfo,
  fileUploads: {
    isUploading: '',
    uploadSuccess: '',
    cloudinaryUrl: '',
    error: ''
  }
    
};

const mockStore = configureStore();
let wrapper;
let wrapped;

describe('<Request Page>', () => {
  it('renders appropriately', () => {
    const store = mockStore(initialState1);
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <NewRequestPageView {...props1} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });

  it('renders appropriately with null fetching request false and request approved', () => {
    const store = mockStore(initialState3);
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <NewRequestPageView {...props3} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });

  it('renders appropriately with null fetching request false and request approved for multicity', () => {
    const store = mockStore(initialState4);
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <NewRequestPageView {...props4} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });

  it('renders appropriately with null fetching request true and request approved', () => {
    const store = mockStore(initialState2);
    wrapped = mount(
      <Provider store={store}>
        <MemoryRouter>
          <NewRequestPageView {...props2} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapped).toMatchSnapshot();
    expect(wrapped.length).toBe(1);
    wrapped.unmount();
  });

  it('should simulate click on comment button', () => {
    const store = mockStore(initialState1);
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <NewRequestPageView {...props1} />
        </MemoryRouter>
      </Provider>
    );

    const inst = wrapper.find('RequestDetails').instance();
    const spy = jest.spyOn(inst, 'handleDisplayCommentBox');

    wrapper.find('.requestDetails__add-comment').simulate('click');
    wrapper.find('.requestDetails__add-comment').simulate('click');

    expect(spy).toBeCalled();
    wrapper.unmount();
  });

  it('should call fetchsubmission', () => {

    wrapper = shallow(<NewRequestPage {...props1} />);

    const request = { id: 1, tripType: 'return', requestId: 1};
    let fetchSubmission = jest.spyOn(
      wrapper.instance().props,
      'fetchSubmission'
    );

    wrapper.instance().handleShowTravelChecklist(request);
    expect(fetchSubmission).toHaveBeenCalled();
     
  });
});
