import React from 'react';
import { mount} from 'enzyme';
import ChecklistItem from '../CheckListItems/ChecklistItem';

describe('<ChecklistItem />', () => {
    const props = {
      openModal: jest.fn(),
      closeModal: jest.fn(),
      uploadFile: jest.fn(),
      checklistItem: { id: '1', name:'visa', requiresFile: true, submissions: [{ userUpload: {}}] },
      userReadinessDocument: {visa:[{id: 1, isVerified: true, data: { cloudinaryUrl: 'http/img.png', imageName: 'img.png' }}]},
      fileUploads: { uploadSuccess: '', isUploading: '' },
      downloadAttachments: jest.fn(),
      checkId: '1-1',
      tripId: '1',
      requestId: '1',
      postSubmission: jest.fn(),
      itemType: 'duoItem',
      shouldOpen: false,
      modalType: '',
      number: 1
    };
  
    const setup = props => mount(<ChecklistItem {...props} />);

    it('should render the checklist item ', () => {
        const wrapper = setup(props);
        expect(wrapper.find('.body').length).toBe(1);
        expect(wrapper.find('.radio-buttons').length).toBe(1);
      });

    it('should render upload button if yes is selected', () => {
        const wrapper = setup(props);
        wrapper.instance().handleDuoField(false);
        expect(wrapper.find('.upload-button').length).toBe(1);
    });

    it('should should show submission status', () => {
        const wrapper = setup(props);
        wrapper.setProps({
            postSuccess: ['1-1'], 
            checklistItem: {
                id: '1', name:'visa', requiresFile: true,
                submissions: [{userResponse: 'yes', userUpload: {url: 'http//img.png', fileName:'img.png'}}]}
        });
        expect(wrapper.find('.submission-progress__success').length).toBe(1);
    });

});
