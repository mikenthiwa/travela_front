import React from 'react';
import { shallow } from 'enzyme';
import moxios from 'moxios';
import TicketUpload from '../TicketUpload';

describe('Ticket Upload Test Suite', () => {
  const props = {
    handleTicketUpload: jest.fn(), 
    ticket: 'some.png',
    id: '2',
    onChange: jest.fn(),
  };

  const wrapper = shallow(<TicketUpload {...props} />);

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  const file = new Blob(['This is a file'], {type : 'image/*'});
  file.name = 'file.png';
  const event = {
    preventDefault: jest.fn(),
    target: {
      files: [file]
    }
  };

  global.FileReader = jest.fn().mockImplementation(() => {
    return {
      readAsDataURL: () => 0,
      result: 'fakeFile',
      set onload (callback) {
        callback();
      }
    };
  });



  it('should render correctly', () => {
    expect(wrapper.length).toBe(1);
  });

  it('should handle ticket change', () => {
    global.FileReader = jest.fn().mockImplementation(() => {
      return {
        readAsDataURL: () => 0,
        result: 'fakeFile',
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
          name: 'some.png',
          size: 31942026,
          type: 'image/*'
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
    
    wrapper.instance().handleChange(event);
  });

  it('should handle ticket upload', () => {
    wrapper.setState({uploading: true});
    wrapper.find('input').simulate('change', event);
    expect(props.handleTicketUpload).toHaveBeenCalled();
  });

  it('should handle delete function', () => {
    props.handleTicketUpload.mockClear();
    const wrapper2 = mount(<TicketUpload {...props} />);
    wrapper2.instance().handleDelete();
    expect(props.handleTicketUpload).toHaveBeenCalledWith('');
  });

  it('should handle download', () => {
    wrapper.instance().handleDownload();
  });
});
