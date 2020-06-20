import React from 'react';
import { shallow, mount } from 'enzyme';
import moxios from 'moxios';
import PreviewDocumentUpload from '../PreviewDocumentUpload';

const props = {
  pdfFile: '',
  progress: 0,
  result: 'Apple.pdf',
  handleBehaviour: jest.fn()
};

beforeEach(() => {
  moxios.install();
});

afterEach(() => {
  moxios.uninstall();
});

describe('<PreviewDocumentUpload />', () => {
  it('should render correctly', () => {
    const wrapper = mount(<PreviewDocumentUpload {...props} />);
    expect(wrapper.find('div'));
  });

  it('should handle file change', () => {
    const wrapper = mount(<PreviewDocumentUpload {...props} />);
    wrapper.find('input').simulate('change', {
      target: {
        files: [ 'Apple.pdf' ]
      }
    });
    wrapper.setState({
      pdfFile: ['Apple.pdf']
    });
    const instance = wrapper.instance();
    instance.props.handleBehaviour('', '', props.pdfFile)
    expect(instance.props.handleBehaviour).toBeCalled();
  });

  it('handles document upload', () => {
    const wrapper = mount(<PreviewDocumentUpload {...props} />);

    global.FileReader = jest.fn().mockImplementation(() => {
      return {
        readAsDataURL: () => 0,
        result: 'fakePdfUrl',
        set onload (callback) {
          callback();
        }
      };
    });

    const event = {
      preventDefault: () => 0,
      target: {
        files: [{
          lastModified: Date.now(),
          lastModifiedDate: new Date(),
          name: 'document.mp4',
          size: 31942026,
          type: 'application/pdf'
        }]
      }
    };
    wrapper.instance().onFileChange(event);
    process.env.REACT_APP_CLOUNDINARY_API = 'https://api.cloudinary.com/v1_1/skybound/image/upload';
    const cloudinaryResponse = {
      public_id: 'public id',
      secure_url: 'secure url',
    };
    moxios.stubRequest(process.env.REACT_APP_CLOUNDINARY_API, {
      status: 200,
      response: cloudinaryResponse
    });
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

  it('cancels document upload', () => {
    const wrapper = mount(<PreviewDocumentUpload {...props} />);
    wrapper.instance().handleUploadProgress({ loaded: 1, total: 2});
    wrapper.update();
    wrapper.instance().cancelUpload();
  });

  it('cancels the result', () => {
    const wrapper = mount(<PreviewDocumentUpload {...props} />);
    wrapper.setState({
      result: null
    });
    wrapper.update();
    wrapper.instance().cancelResult();
  });
});
