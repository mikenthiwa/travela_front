import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import travelaLogo from '../../images/travela-logo.svg';
import infoIcon from '../../images/icon.svg';
import './EmailApproval.scss';
import Preloader from '../../components/Preloader/Preloader';
import {emailApproval} from '../../redux/actionCreator/emailApprovalActions';

class EmailApproval extends Component {
  componentDidMount() {
    const { match: { params }} = this.props;
    this.handleApproval(params);
  }

  handleApproval = ({ type , modelId, approvalType, approvalToken }) => {
    const { emailApproval } = this.props;
    emailApproval({
      requestId: modelId,
      newStatus: approvalType,
      approvalToken,
      budgetStatus: {
        budgetStatus: approvalType
      },
      type
    });
  };


  renderApprovalStatus = () => {
    const { response } = this.props;
    return (
      <div className="approval-container">
        <div className="approval-status">
          <div>
            <img src={infoIcon} alt="" />
          </div>
          <div>
            { response }
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { loading, error } = this.props;
    const Content = this.renderApprovalStatus;
    return (
      <div className="email-approval-page">
        <div className="email-approval-page__content">
          <a href="/">
            <img src={travelaLogo} alt="" />
          </a>
          <div className={`email-approval-page__card ${error ? 'error': ''}`}>
            <div className="card-content">
              {
                loading ?  (
                  <div className="loading-container">
                    <Preloader />
                    <span>Please wait...</span>
                  </div>
                ) : <Content />
              }
            </div>
          </div>
          <a href="/" className="login--link">Login to Travela</a>
        </div>
      </div>
    );
  }
}

EmailApproval.propTypes = {
  match: PropTypes.object.isRequired,
  emailApproval: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  response: PropTypes.string.isRequired
};

const mapStateToProps = ({ emailApproval }) => {
  return emailApproval;
};

export default connect(mapStateToProps, {
  emailApproval
})(EmailApproval);
