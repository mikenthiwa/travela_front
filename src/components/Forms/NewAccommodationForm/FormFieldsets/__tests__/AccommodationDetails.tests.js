import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import AccommodationDetails from '../AccommodationDetails';

describe ('Remove Room', () => {
  const props = {
    handleImageChange: jest.fn(),
    displayImage: jest.fn(),
    addRoomOnClick: jest.fn(),
    handleInputChange: jest.fn(),
    handleLocation: jest.fn(),
    removeRoom: jest.fn(),
    documentId: 2,
    handleDropDown: jest.fn(),
    modalType: ''
  };
  const spy = sinon.spy();
  const wrapper = shallow(<AccommodationDetails {...props} removeRoom={spy} />);
  
  it('should remove room', () => {
    wrapper.find('img').at(0).simulate('click');
    expect(spy.calledOnce).toBe(true);
  });
});
