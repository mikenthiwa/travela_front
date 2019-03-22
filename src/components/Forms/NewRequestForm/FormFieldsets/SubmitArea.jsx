import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import ButtonLoadingIcon from '../../ButtonLoadingIcon';
import commentIcon from '../../../../images/icons/new-request-icons/Chat.svg';
import ConnectedCommentBox from '../../../RequestsModal/CommentBox/CommentBox';

class SubmitArea extends Component{
  constructor(props){
    super(props);
  }

    commentSession = () =>{
      const { collapsible, collapse, commentTitle, handleComment } = this.props;
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
      send, nextStep
    ) => {
      return (
        <button 
          type="submit"
          onClick={e => this.handleSubmitButtonClick(e, nextStep)}
          disabled={hasBlankFields || loading || isCreating || (sameOriginDestination && disableOnChangeProfile)}
          className="bg-btn bg-btn--active"
          id="submit">
          <ButtonLoadingIcon isLoading={loading || isCreating} buttonText={send} />
        </button>
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
      const { hasBlankFields,sameOriginDestination, onCancel, send, modalType,
        onEditCancel, selection, loading, isCreating, disableOnChangeProfile, nextStep
      } = this.props;
      return(
        <fieldset className={send==='Next' ?'submit__area-border': null}>
          <div className={selection ? `submit-area submit-area--${selection}` : 'submit-area'}>
            {send==='Next' && this.commentSession() }
            { onCancel ? this.renderCancelButton(modalType, onEditCancel, onCancel) : (<div />)}
            { this.submitButton(
              hasBlankFields, loading, isCreating,
              sameOriginDestination, disableOnChangeProfile,
              send, nextStep
            )
            }
          </div>
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
  commentTitle: PropTypes.string
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
  commentTitle: ''
};

export default SubmitArea;
