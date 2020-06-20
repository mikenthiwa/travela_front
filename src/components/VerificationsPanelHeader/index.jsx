import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import PageHeader from '../PageHeader';
import ButtonGroup from '../button-group/ButtonGroup';
import Button from '../buttons/Buttons';
import HeaderPagination from '../Pagination/HeaderPagination';
import '../RequestPanelHeader/Request.scss';
import './VerificationsPanelHeader.scss';

class ApprovalsPanelHeader extends PureComponent {
  getUrl (url, flow) {
    const urlSearch = new URLSearchParams(url);
    urlSearch.set('flow', flow);
    urlSearch.set('page', 1);
    return urlSearch.toString();
  }
  renderButtonGroup = () => {
    const {
      openApprovalsCount,
      pastApprovalsCount,
      approvedApprovalsCount,
      verifiedApprovalsCount,
      fetchApprovals,
      activeStatus,
      url
    } = this.props;
    return (
      <ButtonGroup
        openApprovalsCount={openApprovalsCount}
        fetchApprovals={fetchApprovals}
        pastApprovalsCount={pastApprovalsCount}
        approvedApprovalsCount={approvedApprovalsCount}
        verifiedApprovalsCount={verifiedApprovalsCount}
        url={url}
        activeStatus={activeStatus}
        buttonsType="verifications"
      />
    );
  };



  render() {
    const { url, approvalsLength, getApprovalsWithLimit, loading, fetchApprovals } = this.props;
    const originURl = this.getUrl(url, 'origin');
    const destinationURl = this.getUrl(url, 'destination');
    const inflowActive = url.includes('destination');

    return (
      <div className="request-panel-header">
        <PageHeader title="VERIFICATIONS" />
        {
          approvalsLength > 0 && !loading && (
            <div className="open-requests wrap-buttons">
              {this.renderButtonGroup()}
              <div className="other-buttons">
                <div className="flow-button">
                  <Button
                    text="INFLOW"
                    buttonId="inflow"
                    onClick={() => fetchApprovals(`?${destinationURl}`)}
                    buttonClass={`bg-btn ${inflowActive ? 'bg-btn--active' : ''}`}
                  />
                  <Button
                    text="OUTFLOW"
                    buttonId="outflow"
                    onClick={() => fetchApprovals(`?${originURl}`)}
                    buttonClass={`bg-btn ${!inflowActive ? 'bg-btn--active' : ''}`}
                  />
                </div>
                <HeaderPagination
                  getRequestsWithLimit={getApprovalsWithLimit}
                  url={url}
                />
              </div>
            </div>
          )}
      </div>
    );
  }
}

ApprovalsPanelHeader.propTypes = {
  openApprovalsCount: PropTypes.number,
  pastApprovalsCount: PropTypes.number,
  approvedApprovalsCount: PropTypes.number,
  verifiedApprovalsCount: PropTypes.number,
  fetchApprovals: PropTypes.func.isRequired,
  activeStatus: PropTypes.string,
  loading: PropTypes.bool,
  approvalsLength: PropTypes.number,
  url: PropTypes.string.isRequired,
  getApprovalsWithLimit: PropTypes.func.isRequired
};

ApprovalsPanelHeader.defaultProps = {
  activeStatus: 'all',
  openApprovalsCount: null,
  pastApprovalsCount: null,
  approvedApprovalsCount: null,
  verifiedApprovalsCount: null,
  approvalsLength: null,
  loading: false
};

export default ApprovalsPanelHeader;
