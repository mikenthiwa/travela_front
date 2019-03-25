import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import CheckListSubmissions from '../Submissions/CheckListSubmissions';
import {
  checklistSubmission, fileUploadStore,
  itemsToCheck, requestId,
  percentageCompleted,
} from '../../../mockData/checklistSubmissionMockData';
import { tripRequest } from '../../../mockData/checklistSubmissionMocks';

describe('ChecklistSubmission Component', () => {
  let props = {
    postSubmission: jest.fn(),
    percentageCompleted,
    submissions: checklistSubmission,
    isLoading: false,
    handleFileUpload: jest.fn(),
    fetchUserRequests: jest.fn(),
    closeModal: jest.fn(),
    openModal: jest.fn(),
    itemsToCheck,
    tripType: 'return',
    requestId,
    postSuccess: [...itemsToCheck],
    fileUploads: fileUploadStore,
    isUploadingStage2: [],
    request: {...tripRequest},
    handleUserDocumentUpload: jest.fn(),
    shouldOpen: false,
    modalType: '',
    userReadinessDocument: {},
    showTravelChecklist: jest.fn(),
    history: {
      push: jest.fn()
    }
  };

  const setup = (props) => mount(<BrowserRouter><CheckListSubmissions {...props} /></BrowserRouter>);

  it ('should render the component', () => {
    const wrapper = setup(props);
    const submissionItem = wrapper.find('.travelSubmission--item');
    const submissionItemLink = wrapper
      .find('.travelSubmission--item__resource-link');
    const ticketSubmission = wrapper.find('.ticket-submission');
    const textAreaField = wrapper.find('.travelSubmission--item__textarea');
    const uploadfield = wrapper
      .find('.travelSubmission--input__upload-field');
    const uploadedField = wrapper
      .find('.travelSubmission--input__upload-field__');
    const travelChecklistDestination = wrapper
      .find('.travelCheckList__destination');

    expect(submissionItem.length).toBe(6);
    expect(submissionItemLink.length).toBe(0);
    expect(uploadedField.length).toBe(2);
    expect(ticketSubmission.length).toBe(1);
    expect(uploadfield.length).toBe(1);
    expect(textAreaField.length).toBe(2);
    expect(travelChecklistDestination.length).toBe(1);
  });

  it ('should render no checklist item message if no checklist', () => {
    const wrapper = setup({ ...props, submissions: [] });

    const notFound = wrapper.find('.travelCheckList__not-found');
    expect(notFound.length).toBe(1);
  });

  it ('should render spinner if loading is true', () => {
    const wrapper = setup({ ...props, isLoading: true });

    const spinner = wrapper.find('.loader');
    expect(spinner.length).toBe(1);
  });

});
