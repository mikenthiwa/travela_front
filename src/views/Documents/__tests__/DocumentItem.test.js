import React from 'react';
import { shallow } from 'enzyme';
import DocumentItem from '../DocumentItem';

describe('<DocumentItem />', () => {
  const props = {
    document: {
      id: '1',
      name: 'Passport',
      cloudinary_public_id: 'e93h236FvT',
      cloudinary_url: 'https://image.jpg',
      userId: '-LMgZQKq6MXAj_41iRWi',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    menuOpen: {
      open: true
    },
    toggleMenu: jest.fn(),
    openModal: jest.fn(),
    setItemToDelete: jest.fn(),
    editDocument: jest.fn()
  };

  it('should render correctly with image icon', () => {
    const wrapper = shallow(<DocumentItem {...props} />);
    expect(wrapper.find('img').length).toBe(1);
  });

  it('should render correctly with file icon', () => {
    props.document.cloudinary_url = 'https://image.pdf';
    const wrapper = shallow(<DocumentItem {...props} />);
    expect(wrapper.find('img').length).toBe(1);
  });

});
