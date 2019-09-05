import React from 'react';
import { shallow, mount } from 'enzyme';
import { UploadDocument } from '../ChecklistBehaviour/UploadDocument/UploadDocument';

describe('Upload Document behaviour tests', () => {
  const propsWithUploadPassport  = {
    behaviour: {
      type: 'UPLOAD_DOCUMENT',
      payload: 'passport',
      document: {
        data: {
          imageName: 'image.png',
          cloudinaryUrl: 'https://res.cloudinary.com/upload/v156624142'
        }
      }
    },
    userReadiness: {
      travelDocuments: {
        passport: [
          {
            data: {
              imageName: 'image.png',
              cloudinaryUrl: 'https://res.cloudinary.com/upload/v156624142'
            }
          }
        ],
      }
    },
    user: {
      currentUser: { userId: 2410}
    },
    fetchUserData: jest.fn(),
    fetchDocumentTypes: jest.fn(),
    openModal: jest.fn(),
    closeModal: jest.fn(),
    handleClick: jest.fn(),
    handleBehaviour: jest.fn(),
    shouldOpen: false
  };

  const propsWithUploadVisa  = {
    behaviour: {
      type: 'UPLOAD_DOCUMENT',
      payload: 'visa',
      document: {
        data: {
          imageName: 'image.png',
          cloudinaryUrl: 'https://res.cloudinary.com/upload/v156624142'
        }
      }
    },
    userReadiness: {
      travelDocuments: {
        visa: [
          {
            data: {
              imageName: 'image.png',
              cloudinaryUrl: 'https://res.cloudinary.com/upload/v156624142'
            }
          }
        ],
      }
    },
    user: {
      currentUser: { userId: 2410}
    },
    fetchUserData: jest.fn(),
    fetchDocumentTypes: jest.fn(),
    openModal: jest.fn(),
    closeModal: jest.fn(),
    handleClick: jest.fn()
  };
  
  const propsWithUploadOtherDocument  = {
    behaviour: {
      type: 'UPLOAD_DOCUMENT',
      payload: 'yellow fever card',
      document: {
        data: {
          imageName: 'image.png',
          cloudinaryUrl: 'https://res.cloudinary.com/upload/v156624142'
        }
      }
    },
    userReadiness: {
      travelDocuments: {
        visa: [
          {
            data: {
              imageName: 'image.png',
              cloudinaryUrl: 'https://res.cloudinary.com/upload/v156624142'
            }
          }
        ],
      }
    },
    user: {
      currentUser: { userId: 2410}
    },
    fetchUserData: jest.fn(),
    fetchDocumentTypes: jest.fn(),
    openModal: jest.fn(),
    closeModal: jest.fn(),
    handleClick: jest.fn()
  };

  it('render <RequesterRadio />', () => {
    const wrapper = mount(<UploadDocument {...propsWithUploadPassport} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('render <RequesterRadio />', () => {
    const wrapper = mount(<UploadDocument {...propsWithUploadPassport} />);
    expect(wrapper.find('.upload-behaviour').length).toEqual(1);
  });

  it('should render Dropdown', () => {
    const wrapper = mount(<UploadDocument {...propsWithUploadPassport} />);
    expect(wrapper.find('.document-dropdown').length).toEqual(1);
    wrapper.instance().dropDownOptions();
    wrapper.instance().handleDropDownOnChange();
    expect(propsWithUploadPassport.handleBehaviour).toBeCalled();
  });

  it('should open the add passport modal', () => {
    const wrapper = mount(<UploadDocument {...propsWithUploadPassport} />);
    wrapper.find('.upload-btn').simulate('click');
    wrapper.instance().handleClick();
    wrapper.setProps({ shouldOpen: true,
      modalType: 'add passport', title: 'Add Passport Details' });
    expect(propsWithUploadPassport.openModal).toHaveBeenCalledWith(true, 'add passport');
    wrapper.instance().closeModal();
  });

  it('should open the add visa modal', () => {
    const wrapper1 = mount(<UploadDocument {...propsWithUploadVisa} />);
    wrapper1.find('.upload-btn').simulate('click');
    wrapper1.instance().handleClick();
    expect(propsWithUploadVisa.openModal).toHaveBeenCalledWith(true, 'add visa');
  });

  it('should open the add other document modal', () => {
    const wrapper1 = mount(<UploadDocument {...propsWithUploadOtherDocument} />);
    wrapper1.find('.upload-btn').simulate('click');
    wrapper1.instance().handleClick();
    expect(propsWithUploadOtherDocument.openModal).toHaveBeenCalledWith(true, 'add other');
  });
}); 
