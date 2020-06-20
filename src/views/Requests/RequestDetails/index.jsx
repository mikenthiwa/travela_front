import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty, isEqual } from 'lodash';
import { fetchUserRequestDetails } from '../../../redux/actionCreator/requestActions';
import ConnectedCommentBox from '../../../components/RequestsModal/CommentBox/CommentBox';
import ConnectedUserComments from '../../../components/RequestsModal/UserComments/UserComments';
import hideSection from '../../../helper/hideSection';
import commentIcon from '../../../images/icons/new-request-icons/Chat.svg';
import './RequestDetails.scss';

export class RequestDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentTitle: 'Add Comment',
      collapse: false,
    };
  }

  componentDidMount() {
    const {
      fetchUserRequestDetails,
      match: { params: { requestId } },
    } = this.props;
    fetchUserRequestDetails(requestId);
  }

  showComments = () => {
    const { collapse } = this.state;
    const { collapseValue, commentTitle } = hideSection(collapse);
    this.setState({
      collapse: collapseValue,
      commentTitle: commentTitle,
    });
  };

  renderComments() {
    const { match: { params: { requestId } }, currentUser, email, request } = this.props;
    const { collapse, commentTitle } = this.state;
    return (
      <div className="request-comment">
        <div
          className="comment-area__title"
          id="comment_title"
          onClick={this.showComments}
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
            <div>
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
          ) : null }
        </div>
      </div> 
    );
  }


  render() {
    const {
      request, isLoading,
      match: { params: { requestId } },
      currentUser, email
    } = this.props;
    const headerTags = ['Manager\'s Stage'];
    return (
      <Fragment>
        {this.renderComments()}
      </Fragment>
    );
  }
}

RequestDetailsPage.propTypes = {
  fetchUserRequestDetails: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  request: PropTypes.object,
  isLoading: PropTypes.bool,
  currentUser: PropTypes.object,
  email: PropTypes.object
};

RequestDetailsPage.defaultProps = {
  request: {},
  isLoading: true,
  currentUser: {},
  email: {},
};

const mapStateToProps = (state) => ({
  request: state.requests.requestData,
  isLoading: state.requests.fetchingRequest,
  currentUser: state.user.currentUser,
  email: state.user.getUserData,
});

const actionCreators = {
  fetchUserRequestDetails,
};

export default connect(mapStateToProps, actionCreators)(RequestDetailsPage);
