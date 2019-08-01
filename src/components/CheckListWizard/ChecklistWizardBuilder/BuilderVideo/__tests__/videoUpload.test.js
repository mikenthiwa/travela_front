import React from 'react';
import toast from 'toastr';
import moxios from 'moxios';
import {shallow, mount} from 'enzyme';
import VideoOptions from '../index';

describe('test the video upload component', () => {

  const props = {
    item: {
      id: '1',
      name: 'great video',
      behaviour: {},
    },
    handleItems: jest.fn(),
  };

  const mountWrapper = mount(<VideoOptions {...props} />);

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  const file = new Blob(['This is a valid video file'], {type : 'video/mp4'});
  file.name = 'file.mp4';
  const event = {
    preventDefault: jest.fn(),
    target: {
      files: [file]
    }
  };

  it('handles video upload', () => {
    const wrapper = mount(<VideoOptions {...props} />);

    global.FileReader = jest.fn().mockImplementation(() => {
      return {
        readAsDataURL: () => 0,
        result: 'fakeVideoUrl',
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
          name: 'VID_20190508_203435.mp4',
          size: 31942026,
          type: 'video/mp4'
        }]
      }
    };
    process.env.REACT_APP_CLOUNDINARY_API = 'https://mock-cloudinary-api-pass';
    const cloudinaryResponse = {
      public_id: 'public id',
      secure_url: 'secure url'
    };
    moxios.stubRequest(process.env.REACT_APP_CLOUNDINARY_API, {
      status: 200,
      response: cloudinaryResponse
    });
    wrapper.instance().onChange(event);
    wrapper.instance().handleUrlButtonClick();

  });

  it('shows progress bar while uploading', () => {
    const wrapper = mount(<VideoOptions {...props} />);
    wrapper.instance().handleUploadProgress({ loaded: 1, total: 2});
    wrapper.update();
    wrapper.setState({progress: 0.5, showUploadName: true});
    wrapper.update();
    const progressBar = wrapper.find('.progress-bar');
    expect(progressBar).toHaveLength(1);
    expect(progressBar.props().value).toEqual(50);
  });

  it('cancels video upload', () => {
    const wrapper = mount(<VideoOptions {...props} />);
    wrapper.instance().handleUploadProgress({ loaded: 1, total: 2});
    wrapper.update();
    wrapper.instance().cancelUpload();
  });

  it('should hit onChange', () => {
    mountWrapper.setState({showUrlInput: true})
    .find('input.video-upload-url-input').simulate('change', {target: {value: 'https://youtube.com/xRsdsyu' }});
    expect(mountWrapper.props().handleItems).toHaveBeenCalledTimes(4);
  });

  it('should not crash when a problem occurs during upload', () => {
    const wrapper = mount(<VideoOptions {...props} />);
    process.env.REACT_APP_CLOUNDINARY_API = 'https://mock-cloudinary-api-fail';
    wrapper.setState({ ...wrapper.state(), videoFile: file});
    moxios.stubRequest(process.env.REACT_APP_CLOUNDINARY_API, { status: 500 });
    moxios.wait(() => {
      expect(toast.error).toHaveBeenCalledWith('Video Upload failed');
      done();
    });
    wrapper.instance().onChange(event);
  });

  it('renders correctly', () => {});
    shallow(<VideoOptions {...props} />);
});
