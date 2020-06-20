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
    downloadAttachments: jest.fn(),
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
    const travelChecklist = wrapper.find('.travelCheck-list');
    const travelChecklistCardHead = wrapper.find('.travelCheck-list--card__head');
    const checklistItemBody = wrapper.find('.travelCheck-list--card__body');
    expect(travelChecklist.length).toBe(1);
    expect(travelChecklistCardHead.length).toBe(1);
    expect(checklistItemBody.length).toBe(1);
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
      request: {name:'john doe'}
    });
    expect(wrapper.instance().showTravelChecklist).toBeCalled;
  });


});
