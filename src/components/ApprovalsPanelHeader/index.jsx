import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import PageHeader from '../PageHeader';
import ButtonGroup from '../button-group/ButtonGroup';
import HeaderPagination from '../Pagination/HeaderPagination';
import '../RequestPanelHeader/Request.scss';

class ApprovalsPanelHeader extends PureComponent {
  renderButtonGroup = () => {
    const {
      openApprovalsCount,
      pastApprovalsCount,
      fetchApprovals,
      activeStatus,
      type,
      modificationType,
      cancelledTrips,
      modifiedTrips,
      url
    } = this.props;
    return (
      <ButtonGroup
        openApprovalsCount={openApprovalsCount}
        fetchApprovals={fetchApprovals}
        pastApprovalsCount={pastApprovalsCount}
        cancelledTripsCount={cancelledTrips}
        modifiedTripsCount={modifiedTrips}
        modificationType={modificationType}
        url={url}
        type={type}
        budgetChecker={/budget/.test(type)}
        activeStatus={activeStatus}
        buttonsType={type === 'modifications' ? 'modifications': 'approvals'}
      />
    );
  };

  render() {
    const { url, approvalsLength, getApprovalsWithLimit, loading, type } = this.props;
    const title = {
      manager: 'MANAGER APPROVALS',
      budget: 'BUDGET APPROVALS',
      modifications: 'TRIP MODIFICATIONS'
    };
    return (
      <div className="request-panel-header">
        <PageHeader title={title[type]} />
        {
          approvalsLength > 0 && !loading && (
            <div className="open-requests">
              {this.renderButtonGroup()}
              <HeaderPagination getRequestsWithLimit={getApprovalsWithLimit} url={url} />
            </div>
          )}
      </div>
    );
  }
}

ApprovalsPanelHeader.propTypes = {
  openApprovalsCount: PropTypes.number,
  pastApprovalsCount: PropTypes.number,
  fetchApprovals: PropTypes.func.isRequired,
  activeStatus: PropTypes.string,
  approvalsLength: PropTypes.number,
  url: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  cancelledTrips: PropTypes.number,
  modifiedTrips: PropTypes.number,
  type: PropTypes.string.isRequired,
  modificationType: PropTypes.string,
  getApprovalsWithLimit: PropTypes.func.isRequired
};

ApprovalsPanelHeader.defaultProps = {
  activeStatus: 'all',
  openApprovalsCount: null,
  pastApprovalsCount: null,
  cancelledTrips: 0,
  modifiedTrips: 0,
  loading: false,
  approvalsLength: null,
  modificationType: 'all'
};

export default ApprovalsPanelHeader;
