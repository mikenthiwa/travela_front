import React from 'react';
import toast from 'toastr';
import moxios from 'moxios';
import moment from 'moment';
import withTravelReadinessForm from '../withTravelReadinessForm';
import VisaFormFieldset from '../../Forms/TravelReadinessForm/FormFieldsets/VisaFormFieldset';
import OtherDocumentFieldSet from '../../Forms/TravelReadinessForm/FormFieldsets/OtherDocumentFieldSet';
import FileUploadField from '../../Forms/TravelReadinessForm/FormFieldsets/FileUploadField';
import PassportDetailsFieldSet from '../../Forms/TravelReadinessForm/FormFieldsets/passportDetails';


const props = {
  errors: {},
  createTravelReadinessDocument: jest.fn(),
  closeModal: jest.fn(),
  fetchUserData: jest.fn(),
  scanPassport: jest.fn(),
  user: {
    currentUser: {
    }
  },
  editTravelReadinessDocument: jest.fn(),
  document: {},
  handleSubmit: jest.fn(),
  modalType: '',
  passportInfo:{
    passportData:{
  }}, 
  scanning:false, 
  showPassportForm:true

};
const passportInfo = {
  "passportData": {
    "country": "Portugal",
    "names": "INES         C  C",
    "number": "1700044",
    "birthDay": moment(),
    "expirationDate": moment(),
    "dataOfIssue": moment(),
    "nationality": "Portugees",
    "validScore": 62,
    "sex": "F",
    "surname": "GARCAO DE MAGALHAES",
    "imageLink": "http://cloudinary/image.jpg"
  }
}

const OtherDocumentDefault  = withTravelReadinessForm(OtherDocumentFieldSet, 'other', {
  values: {
    name: '',
    expiryDate: moment(),
    dateOfIssue: moment()
  },
  errors: {},
  hasBlankFields: true,
  documentUploaded: false,
  uploadingDocument: false,
  image: '',
});

const document = {
  country: 'USA',
  image : 'https://farm4.staticflickr.com/3894/15008518202_c265dfa55f_h.jpeg',
  name: 'Chris AKanmu',
  expiryDate: moment(),
  dateOfIssue: moment()
};



const NewOtherDocument= withTravelReadinessForm(OtherDocumentFieldSet, 'other', {
  values: {
    name: 'emeka',
    expiryDate: moment(),
    dateOfIssue: moment()
  },
  errors: {},
  hasBlankFields: true,
  uploadingDocument: false,
  documentUploaded: true,
  image: '',
});

const NewPassportDocument = withTravelReadinessForm(PassportDetailsFieldSet, 'passport', {
  values: {
      name: '',
      passportNumber: '',
      nationality:'',
      dateOfBirth: moment(),
      dateOfIssue:  moment(),
      placeOfIssue: '',
      expiryDate:  moment()
    },
   
    image: '',
    imageChanged: false,
    documentUploaded: false,
    uploadingDocument: false,
    errors: {},
    hasBlankFields: true
});

const NewOtherDocumentII  = withTravelReadinessForm(OtherDocumentFieldSet, 'other', {
  values: {
    name: 'emeka',
    expiryDate: moment(),
    dateOfIssue: moment()
  },
  errors: {},
  hasBlankFields: true,
  uploadingDocument: false,
  documentUploaded: true,
  image: 'image.jpeg'
});


const YellowFeverDocument  = withTravelReadinessForm(OtherDocumentFieldSet, 'other', {
  values: {
    name: 'Yellow Fever',
    expiryDate: moment(),
    dateOfIssue: moment(),
    documentId : 'Not Applicable'
  },
  errors: {},
  hasBlankFields: true,
  uploadingDocument: false,
  documentUploaded: true,
  image: 'image.jpeg',
  scanning: false,
  showForm: true
});

const VisaDefault = withTravelReadinessForm(VisaFormFieldset, 'visa', {
  values: {
    name: '',
    expiryDate: moment(),
    dateOfIssue: moment()
  },
  value: {
    name: '',
    expiryDate: moment(),
    dateOfIssue: moment()
  },
  errors: {},
  hasBlankFields: true,
  uploadingDocument: false,
  documentUploaded: false,
  image: ''
});


const wrapperWithOtherDocumentField = mount(
  <OtherDocumentDefault {...props} />
);
const wrapperWithVisaDocumentField = mount(
  <VisaDefault {...props} />
);
const wrapperwithPassportDocumentField = mount(
  <VisaDefault {...props} />
)
const textFile = new Blob(['This is a text file'], {type : 'text/plain'});
textFile.name = 'textFile.txt';

const validFile = {
  name: 'file.png',
  size: 10000000,
  type: 'image/png'
};

const invalidFileSize = {name: 'invalidFileSize.jpg',
size: 10000000000000,
type: 'image/png'}


toast.error = jest.fn();
const event = {
  preventDefault: jest.fn(),
  target:{
    files: [validFile]
  }
};

describe('<OtherDocumentForm />', () => {
  let createTravelReadinessDocument, editTravelReadinessDocument;
  createTravelReadinessDocument = jest.fn();
  editTravelReadinessDocument = jest.fn();

  const wrapper = mount(
    <OtherDocumentDefault {...props} />
  );
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

  it('renders other document modal', () => {
    expect(
      wrapperWithOtherDocumentField.find(FileUploadField))
      .toHaveLength(1);
  });

  it('renders other document modal with button text \'Add Document\'', () => {
    expect(
      wrapperWithOtherDocumentField.find('button#submit').text()).toEqual('Add Document');
  });

  it('renders the edit other document modal', () => {
    expect(
      wrapperWithOtherDocumentField.find(FileUploadField))
      .toHaveLength(1);
  });

  it('renders the edit other document modal with button text \'Save Changes\'', () => {
    const wrapper = mount(<OtherDocumentDefault {...props} modalType="edit other" />);
    expect( wrapper.find('button#submit').text()).toEqual('Save Changes');
  });

  it('should close the modal when the cancel button is clicked', () => {
    wrapperWithOtherDocumentField.find('button#cancel').simulate('click');
    expect(props.closeModal).toHaveBeenCalled();
  });

  it('renders visa  modal', () => {
    expect(
      wrapperWithVisaDocumentField.find(VisaFormFieldset))
      .toHaveLength(1);
  });

  it('renders edit visa  modal', () => {
    expect(
      wrapperWithVisaDocumentField.find(VisaFormFieldset))
      .toHaveLength(1);
  });

  it('should upload a file', () => {
    const cloudinaryResponse = {
      url: 'secure url'
    };
    moxios.stubRequest(process.env.REACT_APP_CLOUNDINARY_API, {
      status: 200,
      response: cloudinaryResponse
    });
    wrapper.find('#select-file').simulate('change', event);

    setTimeout(()=>{
      expect(wrapper.state().image).toEqual(validFile);
    }, 5000)
  });


  it('should upload a file for edit', () => {
    const newProps = {
      ...props,
      modalType: 'edit visa'
    };
    const cloudinaryResponse = {
      url: 'secure url'
    };
    moxios.stubRequest(process.env.REACT_APP_CLOUNDINARY_API, {
      status: 200,
      response: cloudinaryResponse
    });
    const wrapper = mount(<VisaDefault {...newProps} />);
    wrapper.find('#select-file').simulate('change', event);
    setTimeout(()=>{
      expect(wrapper.state().image).toEqual(validFile);
    }, 5000)
  });

  it('toasts an error if cloudinary returns an error', () => {
    moxios.stubRequest(process.env.REACT_APP_CLOUNDINARY_API, { status: 500});
    wrapper.find('#select-file').simulate('change', event);
  });

  it('renders visa  modal with button text \'Add Visa\'', () => {
    const wrapperWithOtherDocumentField = mount(
      <VisaDefault {...props} />
    );
    expect(
      wrapperWithOtherDocumentField.find('button#submit').text()).toEqual('Add Visa Details');
  });

  it('should update the existing document', () => {
    wrapperWithOtherDocumentField.setProps({
      ...props,
      modalType: 'edit',
      document: {
        data: {
          name: 'Document name',
          expiryDate: '',
          dateOfIssue: ''
        }
      },
      fetchingDocument: true
    });
    expect(wrapperWithOtherDocumentField.state('values').name).toEqual('Document name');
  });

  it('should update the visa document', () => {
    wrapperWithVisaDocumentField.setProps({
      ...props,
      document: {
        data: {
          country: 'Kenya',
        }
      },
      fetchingDocument: true
    });
    const { country } = wrapperWithVisaDocumentField.instance().props.document.data;
    expect(country).toEqual('Kenya');
  });

  it('renders edit visa  modal with button text \'Save Changes\'', () => {
    const wrapperWithOtherDocumentField = mount(
      <VisaDefault {...props} modalType="edit visa" />
    );
    expect(
      wrapperWithOtherDocumentField.find('button#submit').text()).toEqual('Save Changes');
  });

  it('should call the handleSubmit method for document edits', () => {
    const newProps = {
      ...props,
      modalType: 'edit visa',
      documentType: 'visa',
      document: {data: { imageName: 'image.jpg' }}, 
    }
    const wrapperWithOtherDocumentField = mount(
      <NewOtherDocument {...newProps} />
    );

    const instance = wrapperWithOtherDocumentField.instance();
    jest.spyOn(instance, 'handleSubmit');
    let documentUploaded = false;
    wrapperWithOtherDocumentField.find('form').simulate('submit', {
      preventDefault: () => {
        documentUploaded = true;
      },
    });
    expect(documentUploaded).toBe(true);
  });

  it('should reload the documents when the component is unmounted', () => {
    const wrapper = mount(<OtherDocumentDefault {...props} />);
    wrapper.unmount();

    expect(props.fetchUserData).toHaveBeenCalled();
  });

  it('should call the handleSubmit method for document edits', () => {
    const newProps = {
      ...props,
      modalType: 'edit visa',
      documentType: 'visa',
      document: {data: { imageName: 'image.jpg' }}
    };
    const wrapperWithOtherDocumentField = mount(
      <NewOtherDocumentII {...newProps} />
    );

    const instance = wrapperWithOtherDocumentField.instance();
    jest.spyOn(instance, 'handleSubmit');
    let documentUploaded = false;
    wrapperWithOtherDocumentField.find('form').simulate('submit', {
      preventDefault: () => {
        documentUploaded = true;
      },
    });
    expect(documentUploaded).toBe(true);
  });

  it('should call the handleSubmit method for document addition', () => {
    const wrapperWithOtherDocumentField = mount(
      <NewOtherDocument {...props} />
    );
    
    let documentUploaded = false;
    wrapperWithOtherDocumentField.setProps({document: {data: { imageName: 'image.jpg' }}});
    wrapperWithOtherDocumentField.find('form').simulate('submit', {
      preventDefault: () => {
        documentUploaded = true;
      },
    });
    expect(documentUploaded).toBe(true);
  });

  it('should call the handleSubmit method for editing visa', () => {
    const newProps = {
      ...props,
      document: {
        type: 'visa',
        data: {
          country: 'Naija',
          cloudinaryUrl: 'image.jpg',
          imageName: 'image.jpg'
        }
      },
      currentDocument: {},
      handleSubmit: jest.fn(),
      modalType: 'edit visa',
    };

    const wrapperWithOtherDocumentField = mount(
      <NewOtherDocument {...newProps} />
    );

    let documentUploaded = false;
    wrapperWithOtherDocumentField.find('form').simulate('submit', {
      preventDefault: () => {
        documentUploaded = true;
      },
    });
    expect(documentUploaded).toBe(true);
    expect(wrapperWithOtherDocumentField.find('FileUploadField').text()).toContain('image.jpg');
  });

  it('should call the handleSubmit method for editing others', () => {
    const newProps = {
      ...props,
      document: {
        type: 'other',
        data: {
          name: 'other',
          documentId: '1234',
          cloudinaryUrl: 'image.jpg',
          imageName: 'image.jpg'
        }
      },
      currentDocument: {},
      handleSubmit: jest.fn(),
      modalType: 'edit other',
    };

    const wrapperWithOtherDocumentField = mount(
      <NewOtherDocument {...newProps} />
    );

    let documentUploaded = false;
    wrapperWithOtherDocumentField.find('form').simulate('submit', {
      preventDefault: () => {
        documentUploaded = true;
      },
    });
    expect(documentUploaded).toBe(true);
    expect(wrapperWithOtherDocumentField.find('FileUploadField').text()).toContain('image.jpg');
  });
  it('should display cloudinary url incase the imageName is not specified', () => {
    const newProps = {
      ...props,
      document: {
        type: 'other',
        data: {
          name: 'other',
          documentId: '1234',
          cloudinaryUrl: 'http://cloudinary/image.jpg'
        }
      },
      currentDocument: {},
      handleSubmit: jest.fn(),
      modalType: 'edit other',
    };

    const wrapperWithOtherDocumentField = mount(
      <NewOtherDocument {...newProps} />
    );
    expect(wrapperWithOtherDocumentField.find('FileUploadField').text()).toContain('http://cloudinary/image.jpg');
  });

  it('should return hasBlankFields==true if name is missing but image in uploaded', () => {
    const newProps = {
      ...props,
      document: {
        type: 'other',
        data: {
          name: 'other',
          documentId: '1234',
          cloudinaryUrl: 'http://cloudinary/image.jpg'
        }
      },
      currentDocument: {},
      handleSubmit: jest.fn(),
      modalType: 'edit other',
    };

    const cloudinaryResponse = {
      url: 'secure url'
    };
    moxios.stubRequest(process.env.REACT_APP_CLOUNDINARY_API, {
      status: 200,
      response: cloudinaryResponse
    });
   ;


    const wrapperWithOtherDocumentField = mount(
      <NewOtherDocument {...newProps} handleUpload={jest.fn()} />
    );
    
    wrapperWithOtherDocumentField.instance().setState({
      imageChanged: true,
      image: 'image.jpg',
      values:{
        name: '',
        dateOfIssue: moment(),
        expiryDate: moment(),
        image: 'image.jpg'}
    });
    const validFile = {
      name: 'file.png',
      size: 10000000,
      type: 'image/png'
    };
    const event = {
      preventDefault: jest.fn(),
      target:{
        files: [validFile]
      }};
    wrapperWithOtherDocumentField.instance().handleUpload(event);

     setTimeout(()=>{
      expect(wrapperWithOtherDocumentField.instance().state.hasBlankFields).toBe(true);
    }, 5000)
  
    wrapperWithOtherDocumentField.instance().setState({
      imageChanged: true,
      image: 'image.jpg',
      values:{
        name: 'Kalyango',
        dateOfIssue: moment(),
        expiryDate: moment(),
        image: 'image.jpg'}
    });
    wrapperWithOtherDocumentField.instance().handleUpload(event);
    setTimeout(()=>{
      expect(wrapperWithOtherDocumentField.instance().state.hasBlankFields).toBe(false);
    }, 5000)
   
  });

  it('Maximum size should be 10MB', ()=>{
    const newProps = {
      ...props,
      modalType: 'add visa'
    };
    const invalidFileSize =  {
      name: 'file.png',
      size: 50000000,
      type: 'image/png'
    };
    invalidFileSize.name = 'file.png';
    const event = {
      preventDefault: jest.fn(),
      target:{
        files: [invalidFileSize]
      }};
    const wrapper = mount(<VisaDefault {...newProps} />);
    event.target.files = [invalidFileSize];
    wrapper.find('#select-file').simulate('change', event);
    expect(toast.error).toHaveBeenCalledWith('This upload has exceeded the 10 MB limit that is allowed');
  });

  it('Image should be png/jpg/jpeg', ()=>{
    const newProps = {
      ...props,
      modalType: 'add visa'
    };
    const invalidFileSize =  {
      name: 'file.png',
      size: 50000000,
      type: 'image/mbp'
    };
    invalidFileSize.name = 'file.png';
    const event = {
      preventDefault: jest.fn(),
      target:{
        files: [invalidFileSize]
      }};
    const wrapper = mount(<VisaDefault {...newProps} />);
    event.target.files = [invalidFileSize];
    wrapper.find('#select-file').simulate('change', event);
    expect(toast.error).toHaveBeenCalledWith('Invalid file type. Please upload an image');
  });

  it('should create visa if all the data is valid',  () => {
    const newProps = {
      ...props,
      modalType: 'add visa'
    };

    const wrapper = mount(<VisaDefault {...newProps} />);
    wrapper.setState({values: {...document}});
    wrapper.find('#select-file').simulate('change', event);


    process.env.REACT_APP_CLOUNDINARY_API = 'https://mock-passport-cloudinary-api-succeed';

    const cloudinaryResponse = {
      url: 'secure url'
    };

    moxios.stubRequest(process.env.REACT_APP_CLOUNDINARY_API, {
      status: 200,
      response: cloudinaryResponse
    });

    wrapper.find('.travel-document-form').simulate('submit');

    moxios.wait(() => {
      expect(wrapper.state().documentUploaded).toBeTruthy();
      expect(createTravelReadinessDocument).toHaveBeenCalledWith('visa', document);
    });
  });

  it('should edit visa if all the data is valid',  () => {
    const newProps = {
      ...props,
      modalType: 'edit visa',
    };

    const wrapper = mount(<VisaDefault {...newProps} />);
    wrapper.setState({values: {...document}});
    wrapper.find('#select-file').simulate('change', event);


    process.env.REACT_APP_CLOUNDINARY_API = 'https://mock-passport-cloudinary-api-succeed';

    const cloudinaryResponse = {
      url: 'secure url'
    };

    moxios.stubRequest(process.env.REACT_APP_CLOUNDINARY_API, {
      status: 200,
      response: cloudinaryResponse
    });

    wrapper.find('.travel-document-form').simulate('submit');

    moxios.wait(() => {
      expect(wrapper.state().documentUploaded).toBeTruthy();
      expect(editTravelReadinessDocument).toHaveBeenCalledWith('visa', document);
    });
  });

  it('should display progress when uploading', () => {
    const wrapper = mount(<NewOtherDocument {...props} />);
    wrapper.instance().handleUploadProgress({ loaded: 20, total: 100});
    wrapper.setState({ uploadingDocument: true});
    expect(wrapper.state('uploadProgress')).toEqual(0.2);
    expect(wrapper.find('.progress-bar').length).toEqual(1);
  });

  it('should display an error when no value is input', () => {
    const formWrapper = mount(
      <VisaDefault {...props} />
    );
    let documentUploaded = false;
    formWrapper.setProps({document: {data: { imageName: 'image.jpg' }}});
    formWrapper.find('form').simulate('submit', {
      preventDefault: () => {
        documentUploaded = true;
      },
    });
    expect(documentUploaded).toBe(true);
  });

  it('should toast an error if the document file does not upload', () => {
    wrapper.setState({values: {...document}});
    wrapper.find('#select-file').simulate('change', event);

    process.env.REACT_APP_CLOUNDINARY_API = 'https://mock-passport-cloudinary-api-succeed';

    const cloudinaryResponse = {
      data:{url: 'secure url'}
    };

    moxios.stubRequest(process.env.REACT_APP_CLOUNDINARY_API, {
      status: 404,
      response: cloudinaryResponse
    });

    wrapper.setState({documentUploaded: false});
    wrapper.find('.travel-document-form').simulate('submit');
    expect(toast.error).toHaveBeenCalledTimes(0);
  });

  it('should display errors when received from the api', () => {
    wrapper.setProps({ errors: { cloudinaryUrl: 'Please provide a document'}});
    expect(wrapper.state().errors).toEqual({cloudinaryUrl: 'Please provide a document'});
  });

  it('calls componentWillReveiveProps and update the state', () => {
    wrapper.setProps({
      ...props,
      values: {
        country: 'USA',
      },
    });
    expect(wrapper.instance().state.values.country).toBe('USA');
  });

  it('should toast an error if the visa file does not upload', () => {
    wrapper.setState({values: {...document}});
    wrapper.find('#select-file').simulate('change', event);

    process.env.REACT_APP_CLOUNDINARY_API = 'https://mock-passport-cloudinary-api-succeed';

    const cloudinaryResponse = {
      url: 'secure url'
    };

    moxios.stubRequest(process.env.REACT_APP_CLOUNDINARY_API, {
      status: 404,
      response: cloudinaryResponse
    });

    wrapper.setState({documentUploaded: false});
    wrapper.find('.travel-document-form').simulate('submit');
    expect(toast.error).toHaveBeenCalledTimes(0);
  });

  it('should not change the image when no image is selected', () => {
    const noImage = {...event, target: { files: [null]}};
    const fileInput = wrapper.find('input[type="file"]');

    fileInput.simulate('change', event);

    const { target: { files: expected }} = event;
    expect(wrapper.state('image')).toEqual(expected[0]);
    fileInput.simulate('change', noImage);

    expect(wrapper.state('image')).toEqual(expected[0]);
  });

  it('shows a toaster if file size is invalid', () => {
    event.target.files = [invalidFileSize];
    wrapper.find('#select-file').simulate('change', event);
    expect(toast.error).toHaveBeenCalledWith('This upload has exceeded the 10 MB limit that is allowed');
  });

  it('should call the handleSubmit method for document addition', () => {
    const wrapperWithOtherDocumentField = mount(
      <YellowFeverDocument {...props} />
    );
    
    let documentUploaded = false;
    wrapperWithOtherDocumentField.setProps({document: {data: { imageName: 'image.jpg' }}});
    wrapperWithOtherDocumentField.find('#select-file').simulate('change', {
      preventDefault:()=>{
        documentUploaded = true;
      },
    });
    expect(documentUploaded).toBe(true);
    expect(wrapperWithOtherDocumentField.state().uploadingDocument).toEqual(false);
    expect(wrapperWithOtherDocumentField.state().scanning).toEqual(false);
    expect(wrapperWithOtherDocumentField.state().showForm).toEqual(true);
  });

  it('should return text from scanned Yellow Fever card', () => {
    const wrapperWithOtherDocumentField = mount(
      <YellowFeverDocument {...props} />
    );
    global.Tesseract = {
      TesseractWorker : jest.fn(() => ({
        recognize: jest.fn(() => ({
          progress: jest.fn().mockImplementation(() => Promise.resolve({
            lines: [
              {
                words: Array(7), text: 'e s (] e e e S↵', confidence: 30.161697387695312
              },
              {
                words: Array(8), text: 'INTERNATIONAL CERTIFICATE OF VACCINATION CERTIFICAT INTERNATIONAL DE VACCINATION↵', confidence: 91.99420166015625
              },
              {
                words: Array(5), text: 'OR PROPHYLAXIS OU DE PROPHYLAXIE↵', confidence: 82.91642761230469
              }
            ]
          }))
        }))}))
    };

    const instance = wrapperWithOtherDocumentField.instance();
    jest.spyOn(instance, 'handleUpload');
    let documentUploaded = false;
    wrapperWithOtherDocumentField.find('#select-file').simulate('change', async ()=> {
      documentUploaded = true;
      await global.Tesseract.TesseractWorker().recognize('image.jpeg');
      expect(wrapperWithOtherDocumentField.state().name).toEqual('Yellow Fever');
      expect(wrapperWithOtherDocumentField.state().documentId).toEqual('Not Applicable');
    });
  });


  it('should return text from scanned images', () => {
    const wrapperWithOtherDocumentField = mount(
      <NewOtherDocument {...props} />
    );
    global.Tesseract = {
      TesseractWorker : jest.fn(() => ({
        recognize: jest.fn(() => ({
          progress: jest.fn().mockImplementation(() => Promise.resolve({
            lines: [
              {
                words: Array(7), text: 'e s (] e e e S↵', confidence: 30.161697387695312
              },
              {
                words: Array(8), text: 'This application ensures that users to create articles', confidence: 91.99420166015625
              },
              {
                words: Array(5), text: ', read articles, like rate and share articles', confidence: 82.91642761230469
              }
            ]
          }))
        }))}))
    };

    const instance = wrapperWithOtherDocumentField.instance();
    jest.spyOn(instance, 'handleUpload');
    let documentUploaded = false;
    wrapperWithOtherDocumentField.find('#select-file').simulate('change', async ()=> {
      documentUploaded = true;
      await global.Tesseract.TesseractWorker().recognize('image.jpeg');
      expect(wrapperWithOtherDocumentField.state().name).toEqual('Other Document');
      expect(wrapperWithOtherDocumentField.state().documentId).toEqual('');
    });
  });

  it('should scan passport on edit', () =>{
    const newProps = {
      ...props,
      modalType: 'edit passport',
      showPassportForm: false,
      document: {
        data: {
          name: 'kevin Munene',
          passportNumber: '99292',
          nationality: 'Kenyan',
          dateOfBirth: moment(),
          dateOfIssue: moment(),
          placeOfIssue: 'Kenya',
          expiryDate: moment(),
          documentId: '1234',
          cloudinaryUrl: 'http://cloudinary/image.jpg',
          imageName: 'ken.jpg'
        }
      },
    };
    const cloudinaryResponse = {
      secure_url: 'http://cloudinary/image.jpg'
    };
    moxios.stubRequest(process.env.REACT_APP_CLOUNDINARY_API, {
      status: 200,
      response: cloudinaryResponse
    });
    const validFile = {
      name: 'file.png',
      size: 10000000,
      type: 'image/png'
    };
    const event = {
      preventDefault: jest.fn(),
      target:{
        files: [validFile]
      }};

    const documentId = 1234;

    const wrapperPassport = mount(<NewPassportDocument {...newProps} handleUpload={jest.fn()} />);
    wrapperPassport.find('#select-file').simulate('change', event);

    wrapperPassport.instance().setState({
          imageChanged: true,
          image: 'image.jpg',
          values:{
            name: 'kevin Munene',
            passportNumber: '99292',
            nationality: 'Kenyan',
            dateOfBirth:  moment(),
            dateOfIssue: moment(),
            placeOfIssue: 'Kenya',
            expiryDate: moment(),
            documentId: '1234',
            cloudinaryUrl: cloudinaryResponse.secure_url,
            imageName: 'ken.jpg'}
        });

    wrapperPassport.instance().handleUpload(event);

    setTimeout(()=>{
      expect(props.scanPassport).toHaveBeenCalledWith(cloudinaryResponse.secure_url);
    }, 5000);
    wrapperPassport.instance().scanUpdatePopulates(passportInfo.passportData, 'edit passport', documentId);
  expect(wrapperPassport.instance().state.hasBlankFields).toBe(false);
  });

it('should upload an image', () =>{
  const newProps = {
    ...props,
    modalType: 'add passport',
    showPassportForm:false,
    passportInfo,
  };
  const cloudinaryResponse = {
    secure_url: 'http://cloudinary/image.jpg'
  };
  moxios.stubRequest(process.env.REACT_APP_CLOUNDINARY_API, {
    status: 200,
    response: cloudinaryResponse
  });
  const validFile = {
    name: 'file.png',
    size: 10000000,
    type: 'image/png'
  };
  const event = {
    preventDefault: jest.fn(),
    target:{
      files: [validFile]
    }};

  const wrapperPassport = mount(<NewPassportDocument {...newProps} handleUpload={jest.fn()} />);
  wrapperPassport.find('#select-file').simulate('change', event);
  wrapperPassport.instance().handleUpload(event);
  setTimeout(()=>{
    expect(props.scanPassport).toHaveBeenCalledWith(cloudinaryResponse.secure_url);
  }, 5000);
  wrapperPassport.instance().scanUpdatePopulates(passportInfo.passportData, 'add passport');
  setTimeout(()=>{
    expect(wrapperPassport.find('FileUploadField').text()).toContain(cloudinaryResponse.secure_url);
  }, 5000);
});
});
