import React from 'react';
import SubmissionUtils from '../Submissions/SubmissionsUtils';
import tripRequest from '../../../mockData/checklistSubmissionMocks';

describe('SubmissionUtils Component', () => {
  let props = {
    airline: 'Kenya Airways',
    arrivalTime: '2019-07-02T12:00',
    checkId: 'QbSyCm5XIF-1',
    checklistItem: {
      deleteReason: null,
      destinationName: 'Deafult',
      id: 1,
      name: 'Travel Ticket Details',
      requiresFiles: false,
      resources: [
        {
          checklistItemId: 1,
          id: 1,
          label: 'Flight Application Guide',
          link: 'http://andela.com'
        },
      ],
      submissions: [
        {
          checklistItemId: 1,
          checklistSubmissions: {
            id: 1
          },
          createdAt: '2018-12-21T13:53:23.696Z',
          deletedAt: null,
          id: 'jbpZLrts-',
          tripId: 'QbSyCm5XIF',
          updatedAt: '2019-01-02T07:19:56.715Z',
          value: {
            airline: 'Kenya Airways',
            arrivalTime: '2019-07-02T12:00',
            departureTime: '2019-07-02T12:00',
            returnAirline: 'Kenya Airways',
            returnDepartureTime: '2019-07-02T12:00',
            returnTicketNumber: 'KQ12345',
            returnTime: '2019-07-02T12:00',
            ticketNumber: 'KQ5432'
          }
        },
      ],
    },
    departureTime: '2019-07-08T12:00',
    fileUploadData: {
      cloudinaryUrl: '',
      error: '',
      isUploading: '',
      uploadSuccess: 'QbSyCm5XIF-1',
    },
    handleInputChange: jest.fn(),
    handleTextAreaSubmit: jest.fn(),
    handleTicketSubmit: jest.fn(),
    handleUpload: jest.fn(),
    itemsToCheck: [
      'QbSyCm5XIF-1',
      'QbSyCm5XIF-1',
      'QbSyCm5XIF-1'
    ],
    postSuccess: [
      'QbSyCm5XIF-1'
    ],
    request: {...tripRequest},
    returnAirline: 'Kenya Airways',
    submissionText: '',
    ticketNumber: 'KQ123456',
    returnTicketNumber: 'KQ654321',
    setTextArea: jest.fn(),
    setTicketFields: jest.fn(),
    setUploadedFileName: jest.fn(),
    tripType: 'return',
    uploadedFileName: '',
    uploadProcess: 'success',
    trip: tripRequest.trips[0],
    utilsType: 'ticketFieldset',
    uploadedFileDate: '2019-07-08T12:00',
    submitAttachedDocument: jest.fn(),
    hasSelectedDocument: false,
    uploadedFileUrl: '',
    userReadinessDocument: {passport: 
      [{createdAt: '2019-03-11T19:02:34.433Z',
        data: {name: 'Hope Uwa', 
          imageName: 'Passport.jpeg', expiryDate: '01/03/2020', 
          dateOfBirth: '03/28/2001', dateOfIssue: '03/06/2019',
          cloudinaryUrl: 'clodinaryfile.jpg'},
        deletedAt: null,
        id: 'zu6sKphUj',
        isVerified: true,
        type: 'passport',
        updatedAt: '2019-03-11T19:02:34.433Z',
        userId: '-LSZHlCYZHY6-9lHqmCY'}]},
    handleUserDocumentUpload: jest.fn(),
    shouldOpen: false,
    modalType: '',
    setUploadedFile: jest.fn()

  };
  const setup = (props) => mount(<SubmissionUtils {...props} />);

  it('should render the component', () => {
    const wrapper = setup(props);
    const ticketForm = wrapper.find('form');
    const ticketDetailsForm = wrapper.find('.travel-submission-details__return');

    expect(ticketForm.length).toBe(1);
    expect(ticketDetailsForm.length).toBe(2);
  });

  it('should initialize the dates based on the props', () => {
    const wrapper = setup(props);

    wrapper.setProps({returnTime: '2019-07-11T00:00'});
    expect(wrapper.state().returnTime).toEqual('2019-07-11T00:00');
  });

  it('should call the handleInputChange', () => {
    const wrapper = setup(props);
    const input = wrapper.find('input[name="departureTime"]');
    const event = {
      target: {
        value: '2019-07-08T12:00', //foo provided is not in a recognized RFC2822 or ISO format.
        name: 'departureTime',
        type: 'datetime-local'
      }
    };
    input.simulate('change', event);
    expect(props.handleInputChange).toHaveBeenCalled();
  });

  it('should call the handleTicketSubmit', () => {
    const wrapper = setup(props);
    const input = wrapper.find('input[name="departureTime"]');
    const handleTicketSubmitSpy = jest
      .spyOn(wrapper.instance(), 'handleTicketSubmit');
    const event = {
      target: {
        value: '2019-07-08T12:00', //foo provided is not in a recognized RFC2822 or ISO format.
        name: 'departureTime',// name and type needed to successfully simulate change
        type: 'datetime-local'// on the departureTime input
      }
    };
    input.simulate('focus');
    input.simulate('change', event);
    input.simulate('blur');
    expect(handleTicketSubmitSpy).toHaveBeenCalled();
  });

  it('should render select document dropdown', () => {
    props.utilsType = 'uploadField';
    props.checklistItem.submissions= [];
    
    const wrapper = mount(<SubmissionUtils {...props} />);
    const event = {
      target: {
        preventDefault: jest.fn(),
        value: 'picture.jpg, cloudinaryfile.xyz, 1',
      }
    };
    wrapper.setState({
      showUploadedField: false
    });
    const instance = wrapper.instance();
    jest.spyOn(instance, 'toggleDropdownDisplay');
    const selectButton = wrapper.find('.travelSubmission--select__button');
    selectButton.simulate('click', event);
    expect(instance.toggleDropdownDisplay).toBeCalled;
  });

  it('should display modal on click from uploads', () => {
    props.utilsType = 'uploadField';
    props.checklistItem.submissions= [];
    const wrapper = mount(<SubmissionUtils {...props} />);
    const event = {
      target: {
        preventDefault: jest.fn(),
        value: 'picture.jpg, cloudinaryfile.xyz, 1',
      }
    };
    wrapper.setState({
      showUploadedField: false
    });
    const instance = wrapper.instance().props;
    jest.spyOn(instance, 'handleUserDocumentUpload');
    const uploadButton = wrapper.find('.from-uploads');
    uploadButton.simulate('click', event);
    expect(instance.handleUserDocumentUpload).toBeCalled;
    
  });

  it('should display window on click upload from computer', () => {
    props.utilsType = 'uploadField';
    props.checklistItem.submissions= [];
    const wrapper = mount(<SubmissionUtils {...props} />);
    const event = {
      target: {
        preventDefault: jest.fn(),
        value: 'picture.jpg, cloudinaryfile.xyz, 1',
      }
    };
    wrapper.setState({
      showUploadedField: false
    });
    const instance = wrapper.instance();
    jest.spyOn(instance, 'selectFromComputer');
    const uploadButton = wrapper.find('.from-computer');
    uploadButton.simulate('click', event);
    expect(instance.selectFromComputer).toBeCalled;
  });

  it('render radio buttons for document in Modal', () => {
    props.utilsType = 'uploadField';
    props.checklistItem.submissions= [];
    props.shouldOpen = true;
    props.modalType = 'modal-QbSyCm5XIF-1';
    const wrapper = mount(<SubmissionUtils {...props} />);
    const event = {
      target: {
        preventDefault: jest.fn(),
        value: 'picture.jpg, cloudinaryfile.xyz, 1',
      }
    };
    const modalHead = wrapper.find('.modal-title');
    expect(wrapper.instance().renderUserDocumentModalUpload).toBeCalled;
  
    expect(modalHead.text()).toEqual('Select Document');
  });

  it('render radio buttons for document in Modal', () => {
    props.utilsType = 'uploadField';
    props.checklistItem.submissions= [];
    props.shouldOpen = true;
    props.modalType = 'modal-QbSyCm5XIF-1';
    const wrapper = mount(<SubmissionUtils {...props} />);
    const event = {
      target: {
        preventDefault: jest.fn(),
        value: 'picture.jpg, cloudinaryfile.xyz, 1',
      }
    };
    const modalHead = wrapper.find('.modal-title');
    expect(wrapper.instance().renderUserDocumentModalUpload).toBeCalled;
    expect(modalHead.text()).toEqual('Select Document');
  });

  it('render trigger handleRadioSubmit on clicking Attach button', () => {
    props.utilsType = 'uploadField';
    props.checklistItem.submissions= [];
    props.shouldOpen = true;
    props.modalType = 'modal-QbSyCm5XIF-1';
    const wrapper = mount(<SubmissionUtils {...props} />);
    const event = {
      target: {
        preventDefault: jest.fn(),
        value: 'picture.jpg, cloudinaryfile.xyz, 1',
      }
    };
    const radioButton = wrapper.find('.travelSubmission--radio');
    const attachButton = wrapper.find('#attach-button');
    radioButton.simulate('change', event);
    attachButton.simulate('click', event);
    expect(wrapper.instance().selectRadioButton).toBeCalled;
    expect(wrapper.instance().state.selectDocumentInfo).toEqual(event.value);
    expect(wrapper.instance().handleRadioSubmit).toBeCalled;
   
  });


  it('render no document in Modal', () => {
    props.utilsType = 'uploadField';
    props.checklistItem.submissions= [];
    props.userReadinessDocument = {};
    props.shouldOpen = true;
    props.modalType = 'modal-QbSyCm5XIF-1';
    const wrapper = mount(<SubmissionUtils {...props} />);
    const event = {
      target: {
        preventDefault: jest.fn(),
        value: 'picture.jpg, cloudinaryfile.xyz, 1',
      }
    };
    const modalContent = wrapper.find('.travelSubmission--select__no-document');
    const modalHead = wrapper.find('.modal-title');
    expect(wrapper.instance().renderUserDocumentModalUpload).toBeCalled;
    expect(modalContent.text()).toEqual('You have no verified travel document');
    expect(modalHead.text()).toEqual('Select Document');
  });
  it('should render uploadedField when shouploadeField is true', () => {
    props.utilsType = 'uploadField';
    const wrapper = mount(<SubmissionUtils {...props} />);
    wrapper.setState({
      showUploadedField: true
    });
    const radioButton = wrapper.find('.travelSubmission--radio');

    const uploadDate = wrapper.find('.travelSubmission--input__btn--uploadedFileDate');
    expect(uploadDate.text()).toEqual('Uploaded 08-07-19');
  });
  it('should render textarea', () => {
    props.utilsType = 'textarea';
    const wrapper = mount(<SubmissionUtils {...props} />);
    const submitArea =  wrapper.find('textarea[name="submissionText"]');
    let onChangeFn = jest.spyOn(wrapper.instance(), 'handleInputChange');
    const event = { preventDefault: jest.fn(),
      target: {
        name: 'submissionText',
        value: jest.fn(),
        type: 'submit'
      }};
    submitArea.simulate('change', { target: { value: 'Yes'}});
    submitArea.simulate('blur');
    expect(onChangeFn).toBeCalled;
  });

  it('should getItemValue when item changes', ()=>{
    props.checklistItem.submissions=[];
    const wrapper = mount(<SubmissionUtils {...props} />);
    wrapper.setProps={
      checklistItem: {
        submissions: [
          
        ],
      },
    };
    
    expect(wrapper.instance().getItemValue()).toBeCalled;
  });
});
