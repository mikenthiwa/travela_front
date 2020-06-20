import React from 'react';
import {shallow} from 'enzyme';
import ConnectedUploadDocument from '../ChecklistBehaviour/UploadDocument/UploadDocument';
import ChecklistBehaviour from '../ChecklistBehaviour/ChecklistBehaviour';

describe('Tests for requester checklist behaviours', () => {
  it('renders upload document behaviour', () => {
    const props = {
      behaviour: {
        type: 'UPLOAD_DOCUMENT',
        payload: 'passport',
        document: {
          data: {
            imageName: 'image.png',
            cloudinaryUrl: 'https://res.cloudinary.com/upload/v156624142'
          }
        }
      }
    };

    const wrapper = shallow(<ChecklistBehaviour {...props} />);
    expect(wrapper.find(ConnectedUploadDocument).length).toEqual(1);
  });
});
