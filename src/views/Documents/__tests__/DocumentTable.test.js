import React from 'react';
import { shallow } from 'enzyme';
import DocumentTable from '../DocumentTable';

describe('<DocumentTable />', () => {
  const props = {
    documents: [
      {
        id: '1',
        name: 'Passport',
        cloudinary_public_id: 'e93h236FvT',
        cloudinary_url: 'https://image.jpg',
        userId: '-LMgZQKq6MXAj_41iRWi',
        createdAt: '2018-08-16 12:11:52.181+01',
        updatedAt: '2018-08-16 12:11:52.181+01',
      },
      {
        id: '2',
        name: 'Visa',
        cloudinary_public_id: 'e93h236FvT',
        cloudinary_url: 'https://image.url',
        userId: '-LMgZQKq6MXAj_41iRWi',
        createdAt: '2018-08-16 12:11:52.181+01',
        updatedAt: '2018-08-16 12:11:52.181+01',
      }
    ],
    menuOpen: {
      open: true
    },
    toggleMenu: jest.fn(),
    openModal: jest.fn(),
    setItemToDelete: jest.fn(),
    editDocument: jest.fn()
  };
  it('should render correctly with documents', () => {
    const wrapper = shallow(<DocumentTable {...props} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.table__body').length).toBe(1);
  });

  it('should render DocumentItem', () => {

    const wrapper = shallow(<DocumentTable {...props} />);
    expect(wrapper.find('DocumentItem').length).toBe(2);
  });
});
