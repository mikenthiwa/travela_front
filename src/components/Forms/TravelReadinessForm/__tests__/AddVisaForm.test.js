import React from 'react';
import toast from 'toastr';
import moxios from 'moxios';
import AddVisaForm from '../AddVisaForm';


const props = {
  errors: {},
  createTravelReadinessDocument: jest.fn(),
  closeModal: jest.fn(),
  fetchUserData: jest.fn(),
  user: {}
};

const textFile = new Blob(['This is a text file'], {type : 'text/plain'});
textFile.name = 'textFile.txt';

const validFile = new Blob(['This is a valid png file'], {type : 'image/png', size: 1092});
validFile.name = 'filenamewhichistoolongibetyoucantreadthiscozitsgreaterthan50characters.png';

toast.error = jest.fn();
const event = {
  preventDefault: jest.fn(),
  target:{
    files: [validFile]
  }
};

describe('<AddVisaForm />', () => {
  const wrapper = mount(<AddVisaForm {...props} />);
  process.env.REACT_APP_CLOUNDINARY_API = 'https://api.cloudinary.com/v1_1/skybound/image/upload';
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
    toast.error.mockReset();
  });
  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders file selector', () => {
    wrapper.find('.travel-document-select-file');
    expect(wrapper.find('.travel-document-select-file').length).toEqual(1);
  });

  it('handles submit', () => {
    moxios.stubRequest(
      process.env.REACT_APP_CLOUNDINARY_API, 
      { status: 200, data: { url: 'url' } }
    );
    wrapper.state().file = validFile;
    wrapper.setProps({document: {data: { imageName: 'image.jpg' }}});
    wrapper.find('.travel-document-form').simulate('submit', event);
    moxios.wait(() => {
      expect(props.createTravelReadinessDocument).toHaveBeenCalled();
    });
  });

  it('Check for hasBlankFields when different visa types are selected',  () => {
    wrapper.setProps({
      modalType: 'add visa'
    });

    const expectedValues = {
      country: 'Uganda',
      entryType: 'Single',
      dateOfIssue: '03/01/2018',
      expiryDate: '10/27/2019',
      otherVisaTypeDetails: '',
      visaType: 'Other',
      imageName: 'image.jpg'
    };

    expect(
      wrapper.find(
        '.document-input__input-container__prompts__text p'
      ).at(0).text()).toEqual('Choose from computer');
    wrapper.find('#select-file').simulate('change', event);
    wrapper.find('.occupationInput').simulate('change', {
      target: {
        value: 'Uganda'
      }});
    
    wrapper.find('.select-dropdown').at(0).simulate('click');
    const activeEntryType = wrapper.find('.select-menu--active');
    activeEntryType.find('#choice').at(1).simulate('click');
   
    wrapper.find('input[name="dateOfIssue"]').simulate('change', {target: {value: '03/01/2018'}});
    wrapper.find('input[name="expiryDate"]').simulate('change', {target: {value: '10/27/2019'}});
    wrapper.find('.select-dropdown').at(1).simulate('click');
    const activeSeletMenu = wrapper.find('.select-menu--active');
    activeSeletMenu.find('#choice').at(5).simulate('click');
    const { values, hasBlankFields } = wrapper.state();
    expect(values).toMatchObject(expectedValues);
    expect(hasBlankFields).toEqual(true);

    wrapper.find('.other-visa-description').at(3).simulate('change', {target: {value: 'visa option'}});
    wrapper.find('#select-file').simulate('change', event);
    const { hasBlankFields: hasBlankFields2 } = wrapper.state();
    expect(hasBlankFields2).toEqual(false);

    activeSeletMenu.find('#choice').at(1).simulate('click');
    const { hasBlankFields: hasBlankFields3 } = wrapper.state();
    expect(hasBlankFields3).toEqual(false);
  });

  it('Renders Visa modal with button text \'Add Visa Details\'', () => {
    expect(
      wrapper.find('button#submit').text()).toEqual('Add Visa Details');
  });
  it('Renders Visa modal with modal title text \'Attach the image of your visa page\'', () => {
    expect(
      wrapper.find('.travel-document-select-file p').at(0).text()).toEqual(
      'Attach the image or PDF of your visa document'
    );
  });

  it('Renders Visa modal with modal title text \'Maximum file size - 10MB\'', () => {
    expect(
      wrapper.find('.maximum-file-size').text()).toEqual('Maximum file size - 10MB');
  });

  it('changes state accordingly',  () => {
    moxios.stubRequest(
      process.env.REACT_APP_CLOUNDINARY_API, 
      { status: 200, data: { url: 'url' } }
    );
    wrapper.find('#select-file').simulate('change', event);
    moxios.wait(() => {
      expect(wrapper.state().cloudinaryUrl).toEqual();
    });
  });

  it('toasts an error if file is invalid', () => {
    event.target.files = [textFile];
    wrapper.find('#select-file').simulate('change', event);
    expect(toast.error).toHaveBeenCalled();
  });

  it('toasts an error if cloudinary returns an error', () => {
    moxios.stubRequest(process.env.REACT_APP_CLOUNDINARY_API, { status: 500});
    wrapper.find('#select-file').simulate('change', event);
  });

  it('closes modal on cancel', () => {
    expect(wrapper.find('#cancel').length).toEqual(1);
    wrapper.find('#cancel').simulate('click', event);
    expect(props.closeModal).toHaveBeenCalled();
  });

});
