
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { deleteComment } from '../../../redux/actionCreator/commentsActions';
import CommentItem from './CommentItem';
import './UserComments.scss';
import generateDynamicTime from '../../../helper/generateDynamicTime';


export class UserComments extends Component {
  state = {
    commentToEdit: '',
    activeCommentId: '',
    editReady: false,
    commentOnEdit: '',
  };
  editComment = (comment) => {
    localStorage.setItem('comment', comment.comment);
    this.setState ({
      activeCommentId: comment.id,
      commentToEdit: comment.comment,
      editReady: true,
      commentOnEdit: comment.id,
    });
  }

  resetEditing = () => {
    this.setState({
      commentToEdit: '',
      activeCommentId: '',
      editReady: false
    },
    localStorage.removeItem('comment'));
  }

  handleCancelClick = (event) => {
    event.preventDefault();
    this.resetEditing('');
  }

  handleNoEdit = () => {
    this.resetEditing('');
  }

  formatDate(date) {
    return generateDynamicTime(date);
  }

  renderCancelButton = () => {
    return (
      <button
        className="editor__post-btn editor__post-btn post-btn-text button-color" id="cancel-button"
        type="submit" onClick={this.handleCancelClick}>
          Cancel
      </button>
    );
  }

  render() {
    const { commentToEdit, activeCommentId,commentOnEdit,editReady } = this.state;
    const { comments, email, deleteComment, currentUser,
      editingComment } = this.props;
    const sortedComments = comments.sort(function(a, b){
      const firstDate = new Date(a.createdAt), secondDate = new Date(b.createdAt);
      return secondDate - firstDate;
    });
    return sortedComments && sortedComments.map((comment) => {
      const editedLabel = comment.isEdited  ? '<span>(edited)</span>' : '';
      return (
        <CommentItem
          key={comment.id}
          comment={comment}
          deleteComment={deleteComment}
          editingComment={editingComment}
          email={email}
          commentOnEdit={commentOnEdit}
          editReady={editReady}
          handleNoEdit={this.handleNoEdit}
          editedLabel={editedLabel}
          commentToEdit={commentToEdit}
          activeCommentId={activeCommentId}
          renderCancelButton={this.renderCancelButton}
          resetEditing={this.resetEditing}
          editComment={this.editComment}
          formatDate={this.formatDate}
          currentUser={currentUser}
        />
      );
    });
  }
}

UserComments.propTypes = {
  comments: PropTypes.array,
  email:PropTypes.string,
  deleteComment: PropTypes.func,
  currentUser: PropTypes.object,
  editingComment: PropTypes.bool,
};

UserComments.defaultProps = {
  deleteComment: () => {},
  comments: [],
  email: '',
  currentUser: {},
  editingComment: false,
};


const actionCreators = {
  deleteComment,
};

const mapStateToProps = ({comments: { editingComment}}) => ({ editingComment});

export default connect(mapStateToProps, actionCreators)(UserComments);
