import React from 'react';
import { shallow, mount } from 'enzyme';
import travelChecklistMockData from '../../../mockData/travelChecklistMockData';
import TravelCheckListPage from '../index';

describe('TravelChecklist Component', () => {
  let props = {
    request: {
      approver: 'John Doe',
      approverImage: 'xyz.jpeg',
      budgetApprovedAt: null,
      budgetApprovedBy: null,
      budgetStatus: 'Approved',
      comments: [],
      createdAt: '2019-03-09T22:45:33.286Z',
      deletedAt: null,
      department: 'Fellowship-Programs',
      gender: 'Male',
      id: 'c1Bwhq0KY',
      manager: 'John Doe',
      name: 'John Doe',
      picture: 'abc.jpg',
      role: 'Technical Team Lead',
      status: 'Approved',
      stipend: 123,
      timeApproved: '2019-03-09T22:45:54.887Z',
      travelCompletion: '25% complete',
      tripType: 'oneWay',
      trips: [{
        accommodationType: 'Hotel Booking',
        bedId: null,
        beds: null,
        checkInDate: null,
        checkOutDate: null,
        checkStatus: 'Not Checked In',
        createdAt: '2019-03-09T22:45:33.305Z',
        deletedAt: null,
        departureDate: '2019-06-01',
        destination: 'Nairobi, Kenya',
        id: 'Li3gOhUUCG',
        lastNotifyDate: null,
        notificationCount: 0,
        origin: 'Lagos, Nigeria',
        otherTravelReasons: null,
        reasons: {id: 3, title: 'nothing', description: '', 
          createdAt: '2019-02-28T22:46:28.714Z', updatedAt: '2019-02-28T22:46:28.714Z'},
        requestId: 'c1Bwhq0KY',
        returnDate: '2019-07-01',
        travelCompletion: 'false',
        travelReasons: 3,
        updatedAt: '2019-03-09T22:45:33.305Z',
      }]
    },
    modalType: '',
    openModal: jest.fn(),
    fetchSubmission: jest.fn(),
    postSubmission: jest.fn(),
    isFetching: false,
    showTravelChecklist: jest.fn(),
    closeModal: () => {},
    shouldOpen: false,
    userReadinessDocument: {},
    history: { push: jest.fn()},
    travelChecklists: {
      checklistItems: travelChecklistMockData,
      isLoading: false
    },
    submissionInfo: {
      submissions : [], 
      isUploading: [], 
      percentageCompleted: 80,
      itemsToCheck: [], 
      postSuccess: [], 
      tripType: 'return',
    },
    fileUploads: {
      cloudinaryUrl: '',
      error: '',
      isUploading: '',
      uploadSuccess: ''
    },
    uploadFile: jest.fn(),
    hideSubmit: null
  };

  const setup = (props) => mount(<TravelCheckListPage {...props} />);

  it ('should render the component', () => {
    const wrapper = setup(props);
    expect(wrapper).toMatchSnapshot();
    const travelChecklistRow = wrapper.find('.travelCheckList__row');
    const progressBarText2 = wrapper.find('.progressBar__text-head');
    const progressBarText1 = wrapper.find('.progressBar__text-foot');
    const travelChecklistCardHead = wrapper.find('.travelCheckList--card__head');
    const checklistItem = wrapper.find('.travelCheck-list');
    const progressBarMessage = wrapper.find('.progressBar__message');
    expect(travelChecklistRow.length).toBe(1);
    expect(progressBarText2.text()).toBe('You are');
    expect(progressBarText1.text()).toBe('Travel Ready');
    expect(progressBarMessage.text()).toBe('Complete the checklist to continue');
    expect(travelChecklistCardHead.length).toBe(2);
    expect(checklistItem.length).toBe(1);
  });
  
  it('should render submit button', () => {
    props.submissionInfo.percentageCompleted= 100;
    const wrapper = setup(props);
    const submitButton = wrapper.find('#submit-button');
    expect(submitButton.text()).toEqual('SUBMIT');
  });

  it('should call showTravelChecklist on componentWillRecieveProps', () => {
    const wrapper = setup(props);
    wrapper.setProps = {
      fileUploads: {
        uploadSuccess: '1234'
      }
    };
    expect(wrapper.instance().componentWillReceiveProps(props)).toBeCalled;
    expect(wrapper.instance().props.showTravelChecklist(props.request)).toBeCalled;
  });

  it('should uploadFile when handleFileUpload is called', ()=>{
    const wrapper = setup(props);
    wrapper.instance().handleFileUpload( {}, 1, 1, 1);
    expect(wrapper.instance().props.uploadFile).toBeCalled;
  });

  it('should open a modal when handleUserDocumentUpload is triggered', () => {
    const wrapper = setup(props);
    wrapper.instance().handleUserDocumentUpload('modal-1');
    expect(wrapper.instance().props.openModal(true, 'modal-1')).toBeCalled;
  });

  it('should return to requests page', () =>{
    const wrapper = setup(props);
    wrapper.instance().returnToRequestPage();
    expect(wrapper.props.history).toBeCalled;
  });

  it('should call showTravelChecklist when upload is successful', () => {
    const wrapper = setup(props);
    wrapper.setProps({
      fileUploads: {
        uploadSuccess: 'succesfully'
      },
      showTravelChecklist: jest.fn(),
      request: {}
    });
    expect(wrapper.instance().showTravelChecklist).toBeCalled;
  });


});
