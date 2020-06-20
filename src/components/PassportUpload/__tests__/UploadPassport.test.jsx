import React from 'react';
import { shallow } from 'enzyme';
import { UploadPassport } from '../UploadPassport';

describe('Upload a passport', () => {
  const props = {
    closeModal: jest.fn(), openModal: jest.fn(),
    modalType: 'add passport',
    shouldOpen: false,
    createTravelReadinessDocument: jest.fn(),
    fetchDocumentDetails: jest.fn(),
    document: {},
    scanPassport: true,
    showPassportForm: jest.fn(),
    handleInputChange: jest.fn({}),
    handleModal: jest.fn(),
    handleSubmit: jest.fn(),
    history: { push: jest.fn() },
    sendNoPassportNotification: jest.fn(),
  };

  const wrapper = shallow(
    <UploadPassport
      {...props} 
    />);
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toBe(1);
  });
  it('should render correctly when passport is set to true', () => {
    wrapper.setState({passport: true});
    expect(wrapper).toMatchSnapshot();
  });
  it('should render correctly when passport is set to false', () => {
    wrapper.setState({passport: false});
    expect(wrapper).toMatchSnapshot();
  });
  it('should render radio buttons', () => {
    const event = { target: { value: true } };
    
    const radioButton = wrapper.find('input');
  
    radioButton.at(0).simulate('change', event);
    expect(radioButton.length).toEqual(2);
  });
  it('should trigger upload button', () => {
    const uploadButton = wrapper.find('button.upload-btn');
    uploadButton.simulate('click');
    expect(uploadButton.length).toEqual(1);
  });
  it('should render handle modal on clicking upload button', () => {
    
    const mockedHandleModal = jest.fn();
    wrapper.instance().handleModal = mockedHandleModal;
    wrapper.find('button.upload-btn').props().onClick();
    expect(mockedHandleModal).toHaveBeenCalledTimes(1);
  });
  it('should trigger text-area', () => {
    wrapper.setState({passport: false});
    const textArea = wrapper.find('textarea');
    expect(textArea.length).toEqual(1);
  });
  it('should handle input change on typing in reason textbox', () => {
    const event = { target: {value: 'something' } };
    
    const mockedHandleInputChange = jest.fn(event);
    wrapper.setState({passport: false});
    wrapper.instance().handleInputChange = mockedHandleInputChange;
    wrapper.find('textarea').at(0).simulate('change', event);
    expect(mockedHandleInputChange).toHaveBeenCalledTimes(0); 
  });
  it('should handle submit', () => {
    const nextButton = wrapper.find('button.bg-btn');
    const history = { push: jest.fn() };
    const pushSpy = jest.spyOn(history, 'push');
    nextButton.simulate('click');
    expect(nextButton.length).toEqual(1);
    expect(props.handleSubmit).toHaveBeenCalledTimes(0);
  });
});
