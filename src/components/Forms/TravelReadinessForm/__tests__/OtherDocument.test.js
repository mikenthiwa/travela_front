import React from 'react';
import toast from 'toastr';
import moxios from 'moxios';
import OtherDocumentForm from '../OtherDocumentForm';


const props = {
  errors: {},
  createTravelReadinessDocument: jest.fn(),
  closeModal: jest.fn(),
  openModal: jest.fn(),
  fetchUserData: jest.fn(),
  scanPassport: jest.fn(),
  user: {}, 
  showPassportForm:false,
  retrieving:false, 
  modalType:'add other',
  passportInfo:{
    passportData:{}
  }
};

const textFile = new Blob(['This is a text file'], {type : 'text/plain'});
textFile.name = 'textFile.txt';

const validFile = new Blob(['This is a valid png file'], {type : 'image/png', size: 1092});
validFile.name = 'file.png';

toast.error = jest.fn();
const event = {
  preventDefault: jest.fn(),
  target:{
    files: [validFile]
  }
};

describe('<OtherDocumentForm />', () => {
  const wrapper = mount(<OtherDocumentForm {...props} />);
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


  it('closes modal on cancel', () => {
    expect(wrapper.find('#cancel').length).toEqual(1);
    wrapper.find('#cancel').simulate('click', event);
    expect(props.closeModal).toHaveBeenCalled();
  });

  it('handles submit', () => {
    moxios.stubRequest(
      process.env.REACT_APP_CLOUNDINARY_API,
      { status: 200, data: { url: 'url' } }
    );
    wrapper.setProps({document: {data: { imageName: 'image.jpg' }}});
    wrapper.state().file = validFile;
    wrapper.find('.travel-document-form').simulate('submit', event);
    moxios.wait(() => {
      expect(props.createTravelReadinessDocument).toHaveBeenCalled();
    });
  });

  it('changes state accordingly',  () => {
    moxios.stubRequest(
      process.env.REACT_APP_CLOUNDINARY_API,
      { status: 200, data: { url: 'url' } }
    );
    wrapper.find('#select-file').simulate('change', event);
    moxios.wait(() => {
      expect(wrapper.state().cloudinaryUrl).toEqual();
      expect(wrapper.find('.input-group').length).toEqual(1);
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
    setTimeout(()=>{
      expect(props.closeModal).toHaveBeenCalled();
    }, 5000)
  });
});
