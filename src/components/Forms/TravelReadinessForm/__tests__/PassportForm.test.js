import toast from 'toastr';
import moxios from 'moxios';
import React from 'react';
import moment from 'moment';
import PassportForm from '../PassportForm';
import PassportDetailsFieldSet from '../FormFieldsets/passportDetails';

toast.success = jest.fn();
toast.error = jest.fn();

describe('<PassportForm/>',  () => {

  let wrapper;

  const props = {
    createTravelReadinessDocument: jest.fn(),
    editTravelReadinessDocument: jest.fn(),
    fetchingDocument: false,
    isLoading: false,
    document: { },
    errors: {},
    fetchUserData: jest.fn(),
    users: [],
    user: {},
    closeModal: jest.fn(),
    onCancel: jest.fn()
  };

  const document = {
    name: 'Mike',
    passportNumber : 'ABC123aemlbczy85',
    nationality : 'Kenyan ',
    placeOfIssue : 'Kenya',
    cloudinaryUrl : 'https://farm4.staticflickr.com/3894/15008518202_c265dfa55f_h.jpeg'
  };


  const passportFile = new Blob(['Passport file'], {type: 'application/msword', name: 'Filename.doc'});

  const event = {
    target: {
      files: [
        passportFile
      ]
    }
  };

  beforeEach(() => {
    wrapper = mount(<PassportForm {...props} />);
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
    jest.resetAllMocks();
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the edit passport document modal', () => {
    const wrapperWithPassportField = mount(
      <PassportForm
        {...props}
        documentType="passport"
        modalType="edit passport"
      />
    );
    expect(
      wrapperWithPassportField.find(PassportDetailsFieldSet))
      .toHaveLength(1);
  });

  it('renders passport  modal with button text \'Add Passport\'', () => {
    const wrapperWithOtherDocumentField = mount(
      <PassportForm {...props} documentType="passport" />
    );
    expect(
      wrapperWithOtherDocumentField.find('button#submit').text()).toEqual('Add Passport');
  });

  it('renders edit passport  modal with button text \'Save Changes\'', () => {
    const wrapperWithOtherDocumentField = mount(
      <PassportForm {...props} documentType="passport" modalType="edit passport" />
    );
    expect(
      wrapperWithOtherDocumentField.find('button#submit').text()).toEqual('Save Changes');
  });

  it('should not submit without document', () => {
    wrapper.setState({values: {...document}});
    wrapper.setProps({document: {data: { imageName: 'image.jpg' }}});
    process.env.REACT_APP_CLOUNDINARY_API = 'https://mock-passport-cloudinary-api-succeed';

    const cloudinaryResponse = {
      url: 'secure url'
    };

    moxios.stubRequest(process.env.REACT_APP_CLOUNDINARY_API, {
      status: 200,
      response: cloudinaryResponse
    });

    wrapper.find('form').simulate('submit');

    moxios.wait(() => {
      expect(wrapper.state().documentUploaded).toBeFalsy();
      expect(toast.error).toHaveBeenCalledWith('Please upload a document.');
    });
  });


  it('should submit if all the data is valid',  () => {
    wrapper.setState({values: {...document}});
    wrapper.find('#select-file').simulate('change', event);
    wrapper.setProps({document: {data: { imageName: 'image.jpg' }}});

    process.env.REACT_APP_CLOUNDINARY_API = 'https://mock-passport-cloudinary-api-succeed';

    const cloudinaryResponse = {
      url: 'secure url'
    };

    moxios.stubRequest(process.env.REACT_APP_CLOUNDINARY_API, {
      status: 200,
      response: cloudinaryResponse
    });

    wrapper.find('form').simulate('submit');

    moxios.wait(() => {
      expect(wrapper.state().documentUploaded).toBeTruthy();
      expect(props.createTravelReadinessDocument).toHaveBeenCalledWith('passport', document);
    });
  });

  it('should toast an error if the passport file does not upload', () => {
    wrapper.setState({values: {...document}});
    wrapper.find('#select-file').simulate('change', event);
    wrapper.setProps({document: {data: { imageName: 'image.jpg' }}});

    process.env.REACT_APP_CLOUNDINARY_API = 'https://mock-passport-cloudinary-api-succeed';

    const cloudinaryResponse = {
      url: 'secure url'
    };

    moxios.stubRequest(process.env.REACT_APP_CLOUNDINARY_API, {
      status: 404,
      response: cloudinaryResponse
    });

    wrapper.setState({documentUploaded: false});
    wrapper.find('form').simulate('submit');
    expect(toast.error).toHaveBeenCalledWith('Invalid file type. Please upload an image');
  });

  it('toasts an error if cloudinary returns an error', () => {
    moxios.stubRequest(process.env.REACT_APP_CLOUNDINARY_API, { status: 500});
    wrapper.find('input[type="file"]').simulate('change', event);
  });

  it('should edit if all the data is valid',  () => {
    const newProps = {
      ...props,
      modalType: 'edit passport'
    };

    wrapper = mount(<PassportForm {...newProps} />);
    wrapper.setState({values: {...document}});
    wrapper.find('input[type="file"]').simulate('change', event);
    wrapper.setProps({document: {data: { imageName: 'image.jpg' }}});

    process.env.REACT_APP_CLOUNDINARY_API = 'https://mock-passport-cloudinary-api-succeed';

    const cloudinaryResponse = {
      url: 'secure url'
    };

    moxios.stubRequest(process.env.REACT_APP_CLOUNDINARY_API, {
      status: 200,
      response: cloudinaryResponse
    });

    wrapper.find('form').simulate('submit');

    moxios.wait(() => {
      expect(wrapper.state().documentUploaded).toBeTruthy();
      expect(props.createTravelReadinessDocument).toHaveBeenCalledWith('passport', document);
    });
  });


  it('should display an error when there is no value in input', () => {
    const formWrapper = mount(
      <PassportForm {...props} documentType="passport" />
    );
    formWrapper.setProps({document: {data: { imageName: 'image.jpg' }}});
    let documentUploaded = false;
    formWrapper.find('form').simulate('submit', {
      preventDefault: () => {
        documentUploaded = true;
      },
    });
    expect(documentUploaded).toBe(true);
  });

  it('should receive new props for the input fields if user wants to edit a document', () => {
    const newProps = {
      ...props,
      editTravelReadinessDocument: jest.fn(),
      document: {
        data: {
          passportNumber: '6yy2',
          name: 'emeka',
          nationality: 'Nigerian',
          placeOfIssue: 'Naija',
          cloudinaryUrl: 'image.com'
        }
      },
      currentDocument: {},
    };
    wrapper = mount(<PassportForm {...newProps} />);
    wrapper.setState({values: {...document}});
  });

  it('should cancel if user no longer wants to edit a document', () => {
    const newProps = {
      ...props,
      editTravelReadinessDocument: jest.fn(),
      document: {
        data: {
          passportNumber: '6yy2',
          name: 'emeka',
          nationality: 'Nigerian',
          placeOfIssue: 'Naija',
          cloudinaryUrl: 'image.com'
        }
      },
      currentDocument: {},
    };
    wrapper = mount(<PassportForm {...newProps} />);
    wrapper.setState({values: {...document}});
  });

  it('should show the year from 18 years ago on the birthdate', () => {
    wrapper = mount(<PassportForm {...props} />);

    const datePicker = wrapper.find('DateInput[name="dateOfBirth"]').find('DatePicker');
    expect(datePicker.props().showYearDropdown).toBeTruthy();
    expect(moment(datePicker.props().maxDate).year()).toEqual(moment().subtract(18,'year').year());
  });
});
