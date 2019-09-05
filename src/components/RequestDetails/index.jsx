import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import './RequestDetails.scss';
import backButton from '../../images/back-icon.svg';
import LeftPane from './LeftPane';
import RightPane from './RightPane';
import Preloader from '../Preloader/Preloader';
import Utils from '../../helper/Utils';
import HeaderTags from './HeaderTags';

class RequestDetails extends Component {

  renderLoader = () => (<Preloader />);

  returnEmptyError() {
    return <h1 className="error-msg">This request does not exist</h1>;
  }

  renderRequest = (request) => {
    const { renderButtons, renderRightPaneQuestion, shouldOpen, openModal, closeModal, travelCosts} = this.props;
    return (
      <div className="main-container">
        <LeftPane 
          travelCosts={travelCosts}
          request={request}
          shouldOpen={shouldOpen}
          openModal={openModal}
          closeModal={closeModal}
        />
        <RightPane
          request={request} renderButtons={renderButtons}
          renderRightPaneQuestion={renderRightPaneQuestion}
        />
      </div>
    );
  };

  render() {
    const {
      request, requestId,
      isLoading, pathname, history, submissionInfo, isDynamicChecklist
    } = this.props;
    const body = isLoading
      ? this.renderLoader() : (isEmpty(request)
        ? this.returnEmptyError()
        : this.renderRequest(request));
    const url = Utils.renderLink(pathname);
    return (
      <div className="approval">
        <div className="header-container">
          <h1 className="header text--black">
            <span role="presentation" onClick={() => history.goBack()}>
              <img src={backButton} className="header__link" alt="back icon" />
            </span>
          </h1>
          <div className="progress-tags">
            <div>{`REQUEST #${requestId}`}</div>
            <HeaderTags
              request={request}
              submissionInfo={submissionInfo}
              isDynamicChecklist={isDynamicChecklist}
            />
          </div>
        </div>
        {body}
      </div>
    );
  }
}

RequestDetails.propTypes = {
  request: PropTypes.object,
  isLoading: PropTypes.bool,
  renderButtons: PropTypes.func.isRequired,
  requestId: PropTypes.string.isRequired,
  renderRightPaneQuestion: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  submissionInfo: PropTypes.object.isRequired,
  shouldOpen: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  travelCosts: PropTypes.object,
  isDynamicChecklist: PropTypes.bool.isRequired,
};

RequestDetails.defaultProps = {
  request: {},
  isLoading: true,
  travelCosts: {
    isLoading: false,
    stipends: [],
    flightCosts: [],
    hotelEstimates: []
  }
};


export default RequestDetails;
