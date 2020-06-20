import React from 'react';
import { shallow } from 'enzyme';
import CommentItem from '../CommentItem';

const props = {
  comment: {
    user: {
      picture: '/path/to/image',
      fullName: 'Smith Allen',
    },
    id: '1',
    userId: 1,
    createdAt: '',
    comment: 'Can you clarify why',
    userEmail: 'ik@gmail.com',
  },
  deleteComment: jest.fn(),
  email: 'ik@gmail.com',
  editedLabel: '',
  editReady: false,
  commentToEdit: '',
  activeCommentId: '',
  resetEditing: jest.fn(),
  editComment: jest.fn(),
  commentOnEdit: '',
  editingComment: false,
  handleNoEdit: jest.fn(),
  formatDate: jest.fn(),
  renderCancelButton: jest.fn(),
  currentUser: {
    id: 1,
    picture: '/path/to/image',
    fullName: 'Smith Allen',
  }
};


describe('CommentItem component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CommentItem {...props} />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot', () => {
    const wrapper = shallow(<CommentItem
      comment={{
        user: {
          picture: '/path/to/image',
          fullName: 'Smith Allen',
        },
        id: 1,
        userId: 1,
        createdAt: '',
        comment: 'Can you clarify why',
        userEmail: 'ik@gmail.com',
      }}
      deleteComment={jest.fn()}
      email="ik@gmail.com"
      editedLabel=""
      editReady={false}
      commentToEdit="Can you clarify why"
      activeCommentId=""
      resetEditing={jest.fn()}
      editComment={jest.fn()}
      formatDate={jest.fn()}
      handleNoEdit={jest.fn()}
      renderCancelButton={jest.fn()}
      currentUser={{
        id: 1,
        picture: '/path/to/image',
        fullName: 'Smith Allen',
      }}
    />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.active').length).toEqual(0);
  });

  it('should match snapshot', () => {
    const wrapper = shallow(<CommentItem
      comment={{
        user: {
          picture: '/path/to/image',
          fullName: 'Smith Allen',
        },
        id: 1,
        userId: 1,
        createdAt: '',
        comment: 'Can you clarify why',
        userEmail: 'ik@gmail.com',
      }}
      deleteComment={jest.fn()}
      email="ik@gmail.com"
      editedLabel=""
      editReady={false}
      commentToEdit="Can you clarify why"
      activeCommentId=""
      resetEditing={jest.fn()}
      editComment={jest.fn()}
      formatDate={jest.fn()}
      handleNoEdit={jest.fn()}
      renderCancelButton={jest.fn()}
      currentUser={{
        id: 1,
        picture: '/path/to/image',
        fullName: 'Smith Allen',
      }}
    />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot', () => {
    const wrapper = shallow(<CommentItem
      comment={{
        user: {
          picture: '/path/to/image',
          fullName: 'Smith Allen',
        },
        id: '1',
        userId: 1,
        createdAt: '',
        comment: 'Can you clarify why',
        userEmail: 'ik@gmail.com',
      }}
      deleteComment={jest.fn()}
      email="ik@gmail.com"
      editedLabel=""
      editReady={false}
      commentToEdit="Can you clarify why"
      activeCommentId="1"
      commentOnEdit="1"
      resetEditing={jest.fn()}
      editComment={jest.fn()}
      formatDate={jest.fn()}
      handleNoEdit={jest.fn()}
      renderCancelButton={jest.fn()}
      currentUser={{
        id: 1,
        picture: '/path/to/image',
        fullName: 'Smith Allen',
      }}
    />);
    expect(wrapper.find('.active').length).toEqual(1);
    wrapper.find('.active').simulate('click');
  });

  it('should call closeDeleteCommentModal when delete button is clicked', () => {
    wrapper.instance().closeDeleteCommentModal();
    expect(wrapper.state().deleteModalState).toBe('invisible');
  });

  it('should call handleDeleteComment when delete button is clicked', () => {
    const handleDeleteCommentSpy = jest.spyOn(wrapper.instance(), 'handleDeleteComment');
    wrapper.find('.modal__delete-btn').simulate('click');
    expect(handleDeleteCommentSpy).toHaveBeenCalledTimes(0);
  });

  it('should call confirmDeleteComment when delete button is clicked', () => {
    const confirmDeleteCommentSpy = jest.spyOn(wrapper.instance(), 'confirmDeleteComment');
    wrapper.find('.delete-comment-modal__btn').simulate('click');
    expect(confirmDeleteCommentSpy).toHaveBeenCalledTimes(0);
  });

  it('should display loader when editing a comment', () => {
    wrapper.setProps({ editComment: (comment) => {
      wrapper.setProps({editingComment: true, commentOnEdit: comment.id, activeCommentId: comment.id});
    }});
    wrapper.find('.edit-button').simulate('click');
    expect(wrapper.find('ButtonLoadingIcon[buttonText="Edit"]').props().isLoading).toBeTruthy();
  });

  it('should display loader when deleting a comment', () => {
    wrapper.find('.delete-comment-modal__btn').simulate('click');
    expect(wrapper.find('ButtonLoadingIcon[buttonText="Delete"]').props().isLoading).toBeTruthy();
  });
});
