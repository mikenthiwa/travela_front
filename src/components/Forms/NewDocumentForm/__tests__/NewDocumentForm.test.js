import React from 'react';
import toast from 'toastr';
import NewDocumentForm from '..';
import moxios from 'moxios';

toast.error = jest.fn();
const realFileReader = FileReader;

const readAsDataURL = jest.fn(async () => {});
const mockFileReader = jest.fn(() => ({ readAsDataURL }));

describe('<NewDocumentForm />', () => {
  let wrapper;
  const props = {
    user: {
      result: {
        userId: 'user id',
      }
    },
    createDocument: jest.fn(),
    closeModal: jest.fn(),
    isUploading: false,
  };

  const file = new Blob(['This is a valid pdf file'], {type : 'application/pdf'});
  file.name = 'file.pdf';

  const invalidFileType = new Blob(['This is an invalid file type'], {type : 'text/plain'});
  invalidFileType.name = 'invalidFileType.txt';

  const invalidFileSize = new Blob(['x'.repeat(20000001)], {type : 'application/pdf'});
  invalidFileSize.name = 'invalidFileSize.pdf';

  const event = {
    preventDefault: jest.fn(),
    target: {
      files: [file]
    }
  };

  beforeEach(() => {
    wrapper = mount(<NewDocumentForm {...props} />);
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
    toast.error.mockReset();
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call the closeModal prop when click is simulated', () => {
    wrapper.find('#cancel').simulate('click');
    expect(props.closeModal).toHaveBeenCalledTimes(1);
  });

  it('should not crash when a file is not selected', async (done) => {
    event.target.files = [];
    expect(async () => wrapper.find('#select-file').simulate('change', event)).not.toThrow(TypeError);
    done();
  });

  it('should call the FileReader method when change is simulated', done => {
    event.target.files = [file];
    // use mock file reader to ensure the file reader is initialized correctly
    window.FileReader = mockFileReader;
    wrapper.find('#select-file').simulate('change', event);
    expect(readAsDataURL).toHaveBeenCalledWith(file);

    // use the real file reader so that onload is called
    window.FileReader = realFileReader;
    wrapper.find('#select-file').simulate('change', event);
    setTimeout(() => {
      expect(wrapper.state().values.name).toEqual(file.name.replace(/\.[^/.]+$/, ''));
      done();
    }, 100);
  });

  it('should not crash when a problem occurs during upload', async (done) => {
    //set a mock cloudinary URL
    process.env.REACT_APP_CLOUNDINARY_API = 'https://mock-cloudinary-api-fail';

    // set the state with data just enough for submit to be called
    await wrapper.setState({ ...wrapper.state(), values: {
      name: file.name,
      file,
    }});

    moxios.stubRequest(process.env.REACT_APP_CLOUNDINARY_API, { status: 500 });

    await wrapper.simulate('submit');
    moxios.wait(() => {
      expect(toast.error).toHaveBeenCalledWith('Unable to upload document');
      done();
    });
  });

  it('should upload to cloudinary then call createDocument on submit', async (done) => {
    // set the state with data just enough for submit to be called
    wrapper.setState({ ...wrapper.state(), values: {
      name: file.name,
      file,
    }});

    // set the mock cloudinary url to be called
    process.env.REACT_APP_CLOUNDINARY_API = 'https://mock-cloudinary-api-succeed';

    const cloudinaryResponse = {
      public_id: 'public id',
      secure_url: 'secure url',
    };

    // the expected response after uploading to cloudinary
    moxios.stubRequest(process.env.REACT_APP_CLOUNDINARY_API, {
      status: 200,
      response: cloudinaryResponse
    });

    await wrapper.simulate('submit');
    moxios.wait(() => {
      expect(props.createDocument).toHaveBeenCalledWith({
        cloudinary_public_id: cloudinaryResponse.public_id,
        cloudinary_url: cloudinaryResponse.secure_url,
        name: file.name,
        userId: props.user.result.userId,
      });
      done();
    });
  });

  it('shows a toaster if file type is invalid', () => {
    event.target.files = [invalidFileType];
    wrapper.find('#select-file').simulate('change', event);
    expect(toast.error).toHaveBeenCalledWith('Incorrect file type uploaded');
  });

  it('shows a toast error if file size is greater than 20mb', () => {
    event.target.files = [invalidFileSize];
    wrapper.find('#select-file').simulate('change', event);
    expect(toast.error).toHaveBeenCalledWith('Incorrect file size uploaded');
  });

  it('shows progress bar while uploading', () => {
    wrapper.setState({ isSubmitting: true  });
    wrapper.instance().handleUploadProgress({ loaded: 1, total: 2});
    wrapper.update();
    const progressBar = wrapper.find('progress');
    expect(progressBar).toHaveLength(1);
    expect(progressBar.props().value).toEqual(0.5);
  });

  describe('NewDocumentForm.validate', () => {
    it('validates required field', () => {
      wrapper.instance().validate();
      expect(wrapper.state('errors')).toEqual({ name: 'This field is required' });
    });

    it('validates filename', () => {
      wrapper.state('values').name = '12filename'; // set name field value to string starting with digits
      wrapper.instance().validate();
      expect(wrapper.state('errors')).toEqual({
        name: 'File name must start with an alphabet'
      });
    });
  });

});
