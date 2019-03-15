import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import TableMenu from '../TableMenu';


let props = {
  request: {
    id: 'xDh20btGz',
    name: 'Amarachukwo Agbo',
    tripType: 'oneWay',
    status: 'Open',
    manager: 'Ezrqn Kiptanui',
    gender: 'Female',
    trips: [],
    department: 'TDD',
    role: 'Learning Facilitator'
  },
  menuOpen: {
    id: 1,
    open: true
  },
  showTravelChecklist: jest.fn(),
  toggleMenu: sinon.spy(() => Promise.resolve()),
  requestStatus: '',
  type: '',
  shouldOpen: false,
  openModal: jest.fn(),
  closeModal: jest.fn(),
  editRequest: sinon.spy(() => Promise.resolve()),
  deleteRequest: sinon.spy(() => Promise.resolve()),
  passportData: {
    id: '788y848y',
    type: 'passport',
    data: {
      passportNumber: '7uuy8',
      name: 'Emeka',
      dateOfIssue: '2018/01/01',
      expiryDate: '2019/01/01',
      dateOfBirth: '2010/01/01'
    }
  },
  visaData: {
    id: '788y848y',
    type: 'visa',
    data: {
      country: 'USA',
      dateOfIssue: '2018/01/01',
      expiryDate: '2019/01/01',
    }
  },
  documentData: {
    id: '788y848y',
    type: 'other',
    data: {
      name: 'Emeka',
      dateOfIssue: '2018/01/01',
      expiryDate: '2019/01/01',
      documentId: 'ikj9kmkt'
    }
  },
  editDocument: sinon.spy(() => Promise.resolve()),
  deleteDocument: sinon.spy(() => Promise.resolve())
};

let wrapper = shallow(<TableMenu {...props} />);

describe('<TableMenu />', () => {
  it('should render the component', () => {
    expect(wrapper.find('.menu__container').length).toBe(1);
    expect(wrapper.find('.fa-ellipsis-v').length).toBe(10);
    expect(wrapper.find('div').length).toBe(15);
  });

  it('should render the component when props change', () => {
    props = {
      ...props,
      requestStatus: 'Open',
      type: 'requests',
    };
    wrapper = shallow(<TableMenu {...props} />);

    expect(wrapper.find('ul').length).toBe(10);
    expect(wrapper.find('li').length).toBe(30);
    expect(wrapper.find('img').length).toBe(30);
  });

  it('should not render the ellipses on verifications table', () => {
    wrapper = mount(<TableMenu {...props} />);
    expect(wrapper.find('.fa-ellipsis-v').length).toBe(10);

    wrapper.setProps({
      type: 'verifications'
    });

    expect(wrapper.find('.fa-ellipsis-v').length).toBe(9);
  });

  it('should render Onclick request works as exepected', () => {
    wrapper = mount(<TableMenu {...props} />);

    const spy = sinon.spy(wrapper.props().toggleMenu);
    const toggleIcon = wrapper.find('#toggleIcon');
    toggleIcon.simulate('click');
    expect(spy.calledOnce).toEqual(false);
  });

  it('should render Onclick request works as exepected', () => {
    wrapper = mount(<TableMenu {...props} />);

    const spy = sinon.spy(wrapper.props().toggleMenu);
    const toggleButton = wrapper.find('#toggleButton');
    toggleButton.simulate('click');
    expect(spy.calledOnce).toEqual(false);
  });

  it('should render Onclick request works as exepected', () => {

    wrapper = mount(<TableMenu {...props} />);

    const { editRequest, request } = props;
    const iconBtn = wrapper.find('#iconBtn');
    iconBtn.simulate('click');
    expect(editRequest.called).toEqual(true);
    expect(editRequest.calledWith(request.id)).toEqual(true);
  });
  
  it('should render Onclick for document works as exepected', () => {
    wrapper = mount(<TableMenu {...props} />);

    const spy = sinon.spy(wrapper.props().toggleMenu);
    const toggleIcon = wrapper.find('#toggleIcon2');
    toggleIcon.at(0).simulate('click');
    expect(spy.calledOnce).toEqual(false);
  });

  it('should render Onclick for editDocument works as exepected', () => {

    wrapper = mount(<TableMenu {...props} />);

    const { editDocument } = props;
    const iconBtn = wrapper.find('#iconBtn2');
    iconBtn.at(0).simulate('click');
    expect(editDocument.called).toEqual(true);
  });

  it('should render Onclick for toggleMenu works as exepected', () => {

    wrapper = mount(<TableMenu {...props} />);

    const { toggleMenu } = props;
    const iconBtn = wrapper.find('#iconBtn2');
    iconBtn.at(0).simulate('click');
    expect(toggleMenu.called).toEqual(true);
  });

  it('should render Onclick request works as exepected', () => {
    wrapper = mount(<TableMenu {...props} />);

    const spy = sinon.spy(wrapper.props().toggleMenu);
    const toggleButton = wrapper.find('#toggleButton2');
    toggleButton.at(0).simulate('click');
    expect(spy.calledOnce).toEqual(false);
  });

  it('should call `showDeleteModal` on click', () => {
    let newProps = {
      ...props,
      requestStatus: 'Open',
      openModal: jest.fn(),
      passportData: {},
      visaData: {},
      documentData: {}
    };
    wrapper = shallow(<TableMenu {...newProps} />);
    const deleteRequest = wrapper.find('li#deleteRequest');
    deleteRequest.simulate('click');
    expect(wrapper.instance().props.openModal).toHaveBeenCalledTimes(1);
  });

  it('should call `confirmDeleteRequest` on click', () => {
    let newProps = {
      ...props,
      deleteRequest: jest.fn(),
      fetchUserRequests: jest.fn(),
      requestStatus: 'Open',
      openModal: jest.fn(),
      closeModal: jest.fn(),
      passportData: {},
      visaData: {},
      documentData: {}
    };
    const event = { preventDefault: jest.fn() };
    wrapper = shallow(<TableMenu {...newProps} />);
    const deleteRequest = wrapper.find('DeleteModal')
      .dive().find('.delete-document-button');
    deleteRequest.simulate('click', event);
    expect(wrapper.instance().props.deleteRequest).toHaveBeenCalledTimes(1);
  });

  it('should call simulate deletion for passport', () => {
    let newProps = {
      ...props,
      request: {},
      visaData: {},
      documentData: {}
    };
    const event = { preventDefault: jest.fn() };
    wrapper = shallow(<TableMenu {...newProps} />);
    const deleteButton = wrapper
      .find('DeleteModal')
      .dive()
      .find('.delete-document-button');
    deleteButton.simulate('click', event);
  });

  it('should call simulate deletion for visa', () => {
    let newProps = {
      ...props,
      request: {},
      passportData: {},
      documentData: {}
    };

    const event = { preventDefault: jest.fn() };
    wrapper = shallow(<TableMenu {...newProps} />);
    const deleteButton = wrapper
      .find('DeleteModal')
      .dive()
      .find('.delete-document-button');
    deleteButton.simulate('click', event);
  });
});
