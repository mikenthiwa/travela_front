import React from 'react';
import { mount} from 'enzyme';
import FileUploadField from '../CheckListItems/FileUploadField';

describe('<FileUploadField />', () => {
  const props = {
    openModal: jest.fn(),
    closeModal: jest.fn(),
    uploadFile: jest.fn(),
    checklistItem: { id: '1', name:'visa', requiresFile: true, submissions: [{ userUpload: {}}] },
    userReadinessDocument: {visa:[{id: 1, isVerified: true, data: { cloudinaryUrl: 'http/img.png', imageName: 'img.png' }}]},
    fileUploads: { uploadSuccess: [] },
    downloadAttachments: jest.fn(),
    checkId: '1-1',
    tripId: '1',
    requestId: '1',
    postSubmission: jest.fn(),
    itemType: 'duoItem',
    shouldOpen: false,
    modalType: ''
  };

  const setup = props => mount(<FileUploadField {...props} />);
  it('should render the upload button on mount', () => {
    const wrapper = setup(props);
    expect(wrapper.find('.upload-button').length).toBe(1);
    expect(wrapper.find('.upload-button').hasClass('show-in-duo')).toEqual(false);
  });

  it('should show and hide dropdown buttons', () => {
    const wrapper = setup(props);
    const toggleDropDown = jest.spyOn(wrapper.instance(), 'toggleDropDown');
    wrapper.find('.upload-button').find('.upload-btn').simulate('click');
    expect(wrapper.find('.from-uploads').length).toBe(1);
    expect(wrapper.find('.from-computer').length).toBe(1);
    expect(toggleDropDown).toHaveBeenCalled();
    wrapper.find('.upload-button').simulate('click');
    wrapper.instance().hideDropdownItems();
  });

  it('should open file upload if item is ticket on upload button click', () => {
    const newProps = { ...props, itemType: 'travelTicket'}
    const wrapper = setup(newProps);
    const toggleDropDown = jest.spyOn(wrapper.instance(), 'toggleDropDown');
    wrapper.find('.upload-button').find('.upload-btn').simulate('click');
    expect(toggleDropDown).toHaveBeenCalled();
  });

  it('should open modal on verified button click', () => {
    const wrapper = setup(props);
    wrapper.find('.upload-button').simulate('click');
    wrapper.find('.from-uploads').simulate('click');
    expect(props.openModal).toHaveBeenCalledWith(true, 'modal-1-1');
    expect(wrapper.instance().selectFromVerified);
  });

  it('should open file upload if select from computer is clicked ', () => {
    const wrapper = setup(props);
    const selectFromComputer = jest.spyOn(wrapper.instance(), 'selectFromComputer');
    wrapper.find('.upload-button').simulate('click');
    wrapper.find('.from-computer').simulate('click');
    expect(selectFromComputer).toHaveBeenCalled();
  });

  it('should call component will receive props', () => {
    const wrapper = setup(props);
    wrapper.setState({ imageName: 'visa.png'})
    wrapper.setProps({ 
        fileUploads: { uploadSuccess:['1-1']},
        checklistItem: { name: 'visa', submissions: [{ userUpload: {fileName:'visa.png'}}] } 
    });
    expect(wrapper.instance().state).toEqual({
        showDocument: true, fileName: 'visa.png',
        imageName: 'visa.png', showDropDown: false
      })
  });
  it('should submit a document selected from computer', () => {
    const wrapper = setup(props);
    const event = {
        preventDefault: jest.fn(),
        target: {
           files: [{name: 'yellow.png'}]
        }
      };
    wrapper.instance().handleFileChange(event);
    expect(props.uploadFile).toHaveBeenCalled();
  });

  it('shouldn not upload if file size is great than 1.5mb', () => {
    const wrapper = setup(props);
    const checkFileSize = jest.spyOn(wrapper.instance(), 'checkFileSize');
    const event = {
      target: {files: [{size: 10000, name: 'test.png'}]}
    };

    const fileInput = wrapper.find('.upload-file');

    expect(fileInput.length).toBe(1);
    fileInput.simulate('change', event);
    expect(checkFileSize).toHaveBeenCalled();
  });

  it('should submit a document selected from verified', () => {
    const wrapper = setup(props);
    const item =  { selectedId: '1',itemData: { itemName: 'visa.png', cloudinaryUrl: 'http//image.png' }}
    wrapper.instance().handleVerifiedSubmit(item);
    expect(props.postSubmission).toHaveBeenCalled();
  });

  it('should delete a document', () => {
    const wrapper = setup(props);
    const handleDeleteFile = jest.spyOn(wrapper.instance(), 'handleDeleteFile');
    wrapper.setState({ imageName: 'visa.png'})
    wrapper.setProps({ 
        fileUploads: { uploadSuccess:['1-1']},
        checklistItem: { name: 'visa', submissions: [{ userUpload: {fileName:'visa.png'}}] } 
    });
    expect(wrapper.find('.action-btn').length).toBe(2);
    wrapper.find('.action-btn').at(0).simulate('click');
    expect(handleDeleteFile).toHaveBeenCalled();
  });


  it('should download a document', () => {
    const wrapper = setup(props);
    const handleDownloadFile = jest.spyOn(wrapper.instance(), 'handleDownloadFile');
    wrapper.setState({ imageName: 'visa.png'})
    wrapper.setProps({ 
        fileUploads: { uploadSuccess:['1-1']},
        checklistItem: { name: 'visa', submissions: [{ userUpload: {fileName:'visa.png'}}] } 
    });
    expect(wrapper.find('.action-btn').length).toBe(2);
    wrapper.find('.action-btn').at(1).simulate('click');
    expect(handleDownloadFile).toHaveBeenCalled();
  });
});
