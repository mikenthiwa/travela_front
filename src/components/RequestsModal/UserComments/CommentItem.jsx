import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../modal/Modal';
import ImageLink from '../../image-link/ImageLink';
import ConnectedCommentBox from '../CommentBox/CommentBox';
import './UserComments.scss';
import ButtonLoadingIcon from '../../Forms/ButtonLoadingIcon';
import defaultProfilePicture from '../../../images/default_profilepic.jpg';

export default class CommentItem extends Component {
  state = {
    deleteModalState: 'invisible',
    deletingComment: false
  };

  handleDeleteComment = () => {
    this.setState({ deleteModalState: 'visible'});
  };

  closeDeleteCommentModal = () => {
    this.setState({ deleteModalState: 'invisible' });
  };

  confirmDeleteComment = () => {
    const { deleteComment, comment } = this.props;
    deleteComment(comment.requestId, comment.id);
    this.setState({ deleteModalState: 'invisible', deletingComment: true });
  };

  renderDeleteOption = () => {
    const { deleteModalState, deletingComment } = this.state;
    const { editingComment, commentOnEdit, comment } = this.props;
    return (
      <Fragment>
        <button
          type="button"
          onClick={this.handleDeleteComment}
          className={`modal__delete-btn ${
            deleteModalState === 'visible' ? 'blue-text' : ''
          }`}
          disabled={deletingComment || (commentOnEdit === comment.id && editingComment)}
        >
          <ButtonLoadingIcon isLoading={deletingComment} buttonText="Delete" />
        </button>
        <Modal
          customModalStyles="delete-comment-modal"
          customOverlayStyle="delete-modal-overlay"
          visibility={deleteModalState}
          closeDeleteModal={this.closeDeleteCommentModal}
          title="Delete Comment ?"
          showOverlay={false}
        >
          <p className="delete-comment-modal__text">
            This action cannot be undone
          </p>
          <button
            className="delete-comment-modal__btn"
            type="button"
            onClick={this.confirmDeleteComment}
          >
            Delete
          </button>
        </Modal>
      </Fragment>
    );
  };

  render() {
    const {
      editedLabel,
      commentToEdit,
      activeCommentId,
      email,
      handleNoEdit,
      resetEditing,
      formatDate,
      comment,
      renderCancelButton,
      editComment,
      editReady,
      currentUser,
      editingComment,
      commentOnEdit,
    } = this.props;
    const { deletingComment } = this.state;
    const profilePic = comment.user.picture
      ? comment.user.picture : defaultProfilePicture;
    return (
      <div className="modal__modal1" key={comment.id}>
        <div className="modal__mdl-icons">
          <ImageLink
            imageSrc={comment.userId === currentUser.id ? currentUser.picture : profilePic}
            altText="avatar"
            imageClass="modal__oval-copy"
          />
          <span className="modal__user-name">
            {comment.userId === currentUser.id ? currentUser.fullName : comment.user.fullName}
          </span>
          <span className="modal__hours-status">
            {formatDate(comment.createdAt)}
          </span>
          {comment && comment.userId === currentUser.id ? (
            <span className="modal__dialog">
              <button
                className={`edit-button ${
                  activeCommentId === comment.id ? 'active' : ''
                }`}
                type="button"
                disabled={(commentOnEdit === comment.id && editingComment) || deletingComment}
                onClick={() => editComment(comment)}
              >
                <ButtonLoadingIcon
                  isLoading={commentOnEdit === comment.id && editingComment}
                  buttonText="Edit" />
              </button>
              {this.renderDeleteOption()}
            </span>
          ) : null}
          {commentToEdit == comment.comment ? (
            <div className="comment-box">
              <ConnectedCommentBox
                startSubmitReady
                handleNoEdit={handleNoEdit}
                afterSubmit={resetEditing}
                editReady={editReady}
                editComment={editComment}
                comment={commentToEdit}
                requestId={comment.requestId || comment.documentId}
                id={comment.id}
              />
              {renderCancelButton()}
            </div>
          ) : (
            <div className="modal__modal2">
              <div
                className="modal__status-update"
                dangerouslySetInnerHTML={{
                  __html: `${comment.comment} ${editedLabel}`
                }}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

CommentItem.defaultProps = {
  commentOnEdit: null,
  editingComment: false
};

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  handleNoEdit: PropTypes.func.isRequired,
  editReady: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  editedLabel: PropTypes.string.isRequired,
  commentToEdit: PropTypes.string.isRequired,
  commentOnEdit: PropTypes.string,
  activeCommentId: PropTypes.string.isRequired,
  resetEditing: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  formatDate: PropTypes.func.isRequired,
  renderCancelButton: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  editingComment: PropTypes.bool,
};
