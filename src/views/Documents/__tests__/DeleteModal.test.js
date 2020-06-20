import React from 'react';
import { shallow } from 'enzyme';
import DeleteModal from '../DeleteModal';

describe('<DeleteModal />', () => {
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
    closeModal: jest.fn(),
    shouldOpen: false,
    modalType: '',
    deleteUserDocument: jest.fn(),
    documentName: ''
  };
  it('should render correctly', () => {
    const wrapper = shallow(<DeleteModal {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render the modal', () => {
    const wrapper = shallow(<DeleteModal {...props} />);
    wrapper.setProps({ shouldOpen: true,
      modalType: 'delete document', title: 'Delete document' });
    expect(wrapper.find('button').length).toBe(2);
    expect(wrapper.props().children.props.visibility).toBe('visible');
    expect(wrapper.props().children.props.title).toBe('Delete document');
  });
});
