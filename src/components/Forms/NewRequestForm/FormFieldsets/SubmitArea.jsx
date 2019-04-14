import React, { Component, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import ButtonLoadingIcon from '../../ButtonLoadingIcon';
import commentIcon from '../../../../images/icons/new-request-icons/Chat.svg';
import ConnectedCommentBox from '../../../RequestsModal/CommentBox/CommentBox';
import ConnectedUserComments from '../../../RequestsModal/UserComments/UserComments';
import addCommentIcon from '../../../../images/icons/new-request-icons/AddComment.svg';

class SubmitArea extends Component{
  constructor(props){
    super(props);
    this.state = {
      displayCommentBox: true,
    };
  }
  

  

    commentSession = () =>{
      const { collapsible, collapse, commentTitle, handleComment} = this.props;
      return(
        <div className="submit-area__comment">
          <div
            className="comment-area__title"
            onClick={collapsible}
            onKeyPress={this.handleKeyDown}
            role="button"
            tabIndex={0}>
            <img src={commentIcon} alt="" />
            <span className="comment-area__title__text">
              {commentTitle}
            </span>
          </div>
          <div className="comments-box">
            {collapse ? (
              <ConnectedCommentBox
                requestId={null}
                documentId={null}
                handleComment={handleComment}
                newRequest
              />) : null}
          </div>
        </div>
      );
    };

    

  handleSubmitButtonClick = (event, nextStep) => {
    nextStep && nextStep(event);
  };

  
  
    submitButton = (
      hasBlankFields, loading, isCreating,
      sameOriginDestination, disableOnChangeProfile,
      send, nextStep, isSameDate, inValidOtherReason
    ) => {
      return (
        <button 
          type="submit"
          onClick={e => this.handleSubmitButtonClick(e, nextStep)}
          disabled={inValidOtherReason || isSameDate || hasBlankFields || loading || isCreating ||
           (sameOriginDestination && disableOnChangeProfile)}
          className="bg-btn bg-btn--active"
          id="submit">
          <ButtonLoadingIcon isLoading={loading || isCreating} buttonText={send} />
        </button>
      );
    }
    
    handleCommentBoxDisplay() {
      const { displayCommentBox } = this.state;
      displayCommentBox ?
        this.setState({
          displayCommentBox: false
        }):
        this.setState({
          displayCommentBox: true
        });
    
    }

    renderDisplayCommentBox(text, icon) {
      return (
        <div
          onClick={() => this.handleCommentBoxDisplay()}
          role="presentation"
          className="editRequest__add-comment">
          <img src={icon} alt="comment icon" />
          <span>
            {text}
          </span>
        </div>);
    }

    renderHideCommentText() {
      const { requestData } = this.props;
      const { displayCommentBox } = this.state;
      return (
        <Fragment>
          {displayCommentBox ?
            (
              <div className="editRequest-comment__toggle">
                {this.renderDisplayCommentBox('Hide Comment', addCommentIcon)}
                <div className="editrequest-details__comments">
                  <ConnectedCommentBox requestId={requestData.id} documentId={null} />
                  {this.renderComments()}
                </div>
              </div>
            ):
            this.renderDisplayCommentBox('Show Comment', commentIcon)}
        </Fragment>);
    }
  

    renderAddCommentText() {
      const { requestData } = this.props;
      const { displayCommentBox } = this.state;
      return (
        <Fragment>
          <div className="editRequest-comment__toggle">
            {this.renderDisplayCommentBox('Add Comment', commentIcon)}
            {displayCommentBox && (
              <div className="editrequest-details__comments">
                <ConnectedCommentBox requestId={requestData.id} documentId={null} />
                {this.renderComments()}
              </div>)}
          </div>
        </Fragment>
      );
    }

    renderComment = (comments) => {
      return (
        <div className="submit-area__comment">
          {comments && comments.length < 1 ? (
            <div className="editrequest-comment-box">
              {this.renderAddCommentText()}
            </div>)
            : (
              <div className="editrequest-comment-box">
                {this.renderHideCommentText()}
              </div>)}
        </div>
  
      );
    }
  

    renderComments() {
      const { currentUser, comments } = this.props;
      return(
        <ConnectedUserComments
          comments={comments ? comments.slice(0).reverse() : []}
          email={currentUser.email}
          currentUser={currentUser}
        />
      );
    }

    renderCancelButton(modalType, onEditCancel, onCancel) {
      return (modalType === 'edit accomodation' ? (
        <button
          type="button"
          className="bg-btn bg-btn--inactive"
          id="oncancel" onClick={onEditCancel}>
          Cancel
        </button>)
        : (
          <button
            type="button"
            className="bg-btn bg-btn--inactive"
            onClick={onCancel} id="cancel">
              Cancel
          </button>
        ));
    }

    render(){
      const { hasBlankFields,sameOriginDestination, onCancel, send, modalType, comments,
        onEditCancel, selection, loading, isCreating, disableOnChangeProfile, nextStep,
        editing, isSameDate, inValidOtherReason } = this.props;
     
      return(
        <fieldset className={send==='Next' ?'submit__area-border': null}>
          <div className={selection ? `submit-area submit-area--${selection} mdl-grid` : 'submit-area'}>
            { (send==='Next' && !editing) && this.commentSession() }
            { onCancel ? this.renderCancelButton(modalType, onEditCancel, onCancel) : (<div />)}
            { this.submitButton(
              hasBlankFields, loading, isCreating,
              sameOriginDestination, disableOnChangeProfile,
              send, nextStep, isSameDate, inValidOtherReason
            )
            }
          </div>
          { (send==='Next' && editing) && this.renderComment(comments)} 
        </fieldset>

      );

    }

}

SubmitArea.propTypes = {
  onCancel: PropTypes.func,
  hasBlankFields: PropTypes.bool.isRequired,
  sameOriginDestination: PropTypes.bool,
  send: PropTypes.string.isRequired,
  modalType: PropTypes.string,
  onEditCancel: PropTypes.func,
  selection: PropTypes.string,
  loading: PropTypes.bool,
  isCreating: PropTypes.bool,
  disableOnChangeProfile: PropTypes.bool,
  nextStep: PropTypes.func,
  collapsible: PropTypes.func,
  handleComment: PropTypes.func,
  collapse: PropTypes.bool,
  commentTitle: PropTypes.string,
  currentUser: PropTypes.object,
  requestData: PropTypes.object,
  editing: PropTypes.bool,
  comments: PropTypes.array,
  isSameDate: PropTypes.bool,
  inValidOtherReason : PropTypes.bool
};

SubmitArea.defaultProps = {
  modalType: '',
  selection: '',
  loading: false,
  isCreating: false,
  disableOnChangeProfile: false,
  sameOriginDestination: false,
  onEditCancel: () => {},
  nextStep: () => {},
  onCancel: null,
  collapsible: () => {},
  handleComment: () => {},
  collapse: false,
  commentTitle: '',
  currentUser: {},
  requestData: {},
  editing: false,
  comments: [],
  isSameDate: false,
  inValidOtherReason: false
};

export default SubmitArea;
