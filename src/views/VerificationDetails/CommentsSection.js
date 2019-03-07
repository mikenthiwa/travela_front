import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import ConnectedUserComments from '../../components/RequestsModal/UserComments/UserComments';
import ConnectedCommentBox from '../../components/RequestsModal/CommentBox/CommentBox';

export default function CommentsSection({request, requestId, currentUser, email, displayComments}) {
 
  return (
    <div className={`comments-section--${displayComments}`}>
      {
        !isEmpty(request) ? (
          <div className="request-comment">
            <ConnectedCommentBox
              requestId={requestId}
              documentId={null}
            />
            <ConnectedUserComments
              comments={request.comments}
              email={email.result && email.result.email}
              currentUser={currentUser}
            />
          </div> 
        ): ''
      }
    </div>
  );
}

CommentsSection.defaultProps = {
  request: {},
  currentUser: {},
  email: {},
};

CommentsSection.propTypes = {
  requestId: PropTypes.string.isRequired,
  request: PropTypes.object,
  currentUser: PropTypes.object,
  email: PropTypes.object,
  displayComments: PropTypes.bool.isRequired
};
