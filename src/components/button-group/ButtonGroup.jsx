import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '../buttons/Buttons';
import './buttonGroup.scss';

class ButtonGroup extends PureComponent {
  filterEntries = (entriesType, statusQuery) => {
    const { fetchRequests, fetchApprovals, url } = this.props;
    const urlSearch = new URLSearchParams(url);
    urlSearch.set('page', 1);
    urlSearch.delete('status');
    urlSearch.delete('type');
    urlSearch.delete('budgetStatus');
    const urlSearchString = `?${urlSearch.toString()}${statusQuery}`;
    if(entriesType === 'requests')
      fetchRequests(urlSearchString);
    else
      fetchApprovals(urlSearchString);
  };

  renderPendingApprovalsButton(){
    const { openApprovalsCount, activeStatus, budgetChecker } = this.props;
    return (
      <Button
        buttonClass={`bg-btn bg-btn--with-badge ${activeStatus === 'open' ?
          'bg-btn--active' : ''}`}
        responsiveText="Open"
        disabled={openApprovalsCount === 0}
        badge={openApprovalsCount}
        showBadge={openApprovalsCount > 0}
        badgeClass={activeStatus === 'open' ?
          'bg-btn--with-badge--active' : 'bg-btn--with-badge__approvals--inactive'}
        buttonId="open-button"
        onClick={() => this.filterEntries( 'approvals',
          `${budgetChecker ? '&budgetStatus=open' : '&status=open'}`)}
        text="Pending Approvals"
      />
    );
  }


  renderApprovalsButton () {
    const {  pastApprovalsCount, activeStatus, budgetChecker } = this.props;
    return (
      <Fragment>
        <Button
          buttonClass={`bg-btn ${activeStatus === 'all' ? 'bg-btn--active' : ''}`}
          text="All"
          buttonId="all-button"
          onClick={() => this.filterEntries('approvals', '')}
        />
        {this.renderPendingApprovalsButton()}
        <Button
          buttonClass={`bg-btn bg-btn--with-badge ${activeStatus === 'past' ? 'bg-btn--active' : ''}`}
          responsiveText="Past"
          buttonId="past-button"
          showBadge={pastApprovalsCount > 0}
          badge={pastApprovalsCount}
          badgeClass={activeStatus === 'past' ?
            'bg-btn--with-badge--active' : 'bg-btn--with-badge__approvals--inactive'}
          text="Past Approvals"
          disabled={pastApprovalsCount === 0}
          onClick={() => this.filterEntries(
            'approvals',
            `${ budgetChecker ? '&budgetStatus=past' : '&status=past'}`)}
        />
      </Fragment>
    );
  }

  renderTripModificationButtons = () => {
    const {  cancelledTripsCount, modifiedTripsCount, modificationType } = this.props;
    return (
      <Fragment>
        <Button
          buttonClass={`bg-btn ${modificationType === 'all' ? 'bg-btn--active' : ''}`}
          text="All"
          buttonId="all-button"
          onClick={() => this.filterEntries('approvals', '')}
        />
        <Button
          buttonClass={`bg-btn bg-btn--with-badge ${modificationType === 'Cancel Trip' ?
            'bg-btn--active' : ''}`}
          responsiveText="Open"
          disabled={cancelledTripsCount === 0}
          badge={cancelledTripsCount}
          showBadge={cancelledTripsCount > 0}
          badgeClass={modificationType === 'Cancel Trip' ?
            'bg-btn--with-badge--active' : 'bg-btn--with-badge__approvals--inactive'}
          buttonId="open-button"
          onClick={() => this.filterEntries( 'approvals','&status=open&type=Cancel Trip')}
          text="Trip Cancellation"
        />
        <Button
          buttonClass={`bg-btn bg-btn--with-badge ${modificationType === 'Modify Dates' ? 'bg-btn--active' : ''}`}
          responsiveText="Past"
          buttonId="past-button"
          showBadge={modifiedTripsCount > 0}
          badge={modifiedTripsCount}
          badgeClass={modificationType === 'Modify Dates' ?
            'bg-btn--with-badge--active' : 'bg-btn--with-badge__approvals--inactive'}
          text="Date Modification"
          disabled={modifiedTripsCount === 0}
          onClick={() => this.filterEntries(
            'approvals', '&status=open&type=Modify Dates')}
        />
      </Fragment>
    );
  }

  renderRequestsButton (openRequestsCount, pastRequestsCount) {
    const { activeStatus } = this.props;
    return (
      <Fragment>
        <Button
          buttonClass={`bg-btn ${activeStatus === 'all' ? 'bg-btn--active' : ''}`}
          text="All"
          buttonId="all-button"
          onClick={() => this.filterEntries('requests', '')}
        />
        <Button
          buttonClass={`bg-btn bg-btn--with-badge ${activeStatus === 'open' ?
            'bg-btn--active' : ''}`}
          text="Open Requests"
          responsiveText="Open"
          buttonId="open-button"
          disabled={openRequestsCount === 0}
          badge={openRequestsCount}
          showBadge={openRequestsCount > 0}
          badgeClass={activeStatus === 'open' ?
            'bg-btn--with-badge--active' : 'bg-btn--with-badge--inactive'}
          onClick={() => this.filterEntries('requests', '&status=open')}
        />
        <Button
          buttonClass={`bg-btn ${activeStatus === 'past' ? 'bg-btn--active' : ''}`}
          disabled={pastRequestsCount === 0}
          text="Past Requests"
          responsiveText="Past"
          buttonId="past-button"
          onClick={() => this.filterEntries('requests', '&status=past')}
        />
      </Fragment>
    );
  }

  renderVerificationButton () {
    const { approvedApprovalsCount, verifiedApprovalsCount, activeStatus } = this.props;
    return (
      <Fragment>
        <Button
          buttonClass={`bg-btn ${activeStatus === 'all' ? 'bg-btn--active' : ''}`}
          text="All"
          buttonId="all-button"
          onClick={() => this.filterEntries('approvals', '')}
        />
        <Button
          buttonClass={`bg-btn bg-btn--with-badge ${activeStatus === 'approved' ?
            'bg-btn--active' : ''}`}
          responsiveText="Pending"
          disabled={approvedApprovalsCount === 0}
          badge={approvedApprovalsCount}
          showBadge={approvedApprovalsCount > 0}
          badgeClass={activeStatus === 'approved' ?
            'bg-btn--with-badge--active' : 'bg-btn--with-badge__approvals--inactive'}
          buttonId="open-button"
          onClick={() => this.filterEntries('approvals', '&status=approved')}
          text="Pending Verifications"
        />
        <Button
          buttonClass={`bg-btn bg-btn--with-badge ${activeStatus === 'verified' ? 'bg-btn--active' : ''}`}
          responsiveText="Past"
          badge={verifiedApprovalsCount}
          showBadge={verifiedApprovalsCount > 0}
          badgeClass={activeStatus === 'verified' ?
            'bg-btn--with-badge--active' : 'bg-btn--with-badge__approvals--inactive'}
          buttonId="past-button"
          text="Past Verifications"
          disabled={verifiedApprovalsCount === 0}
          onClick={() => this.filterEntries('approvals', '&status=verified')}
        />
      </Fragment>
    );
  }


  render() {
    const { buttonsType, openRequestsCount, pastRequestsCount } = this.props;
    return (
      <div className="button-group">
        { buttonsType === 'approvals' && this.renderApprovalsButton()}
        { buttonsType === 'requests' &&
          this.renderRequestsButton(openRequestsCount, pastRequestsCount) }
        { buttonsType === 'verifications' && this.renderVerificationButton()}
        { buttonsType === 'modifications' && this.renderTripModificationButtons()}
      </div>
    );
  }
}

ButtonGroup.propTypes = {
  openRequestsCount: PropTypes.number,
  pastRequestsCount: PropTypes.number,
  pastApprovalsCount: PropTypes.number,
  openApprovalsCount: PropTypes.number,
  approvedApprovalsCount: PropTypes.number,
  verifiedApprovalsCount: PropTypes.number,
  fetchApprovals: PropTypes.func,
  fetchRequests: PropTypes.func,
  url: PropTypes.string,
  budgetChecker: PropTypes.bool,
  buttonsType: PropTypes.string.isRequired,
  activeStatus: PropTypes.string,
  modifiedTripsCount: PropTypes.number,
  cancelledTripsCount: PropTypes.number,
  modificationType: PropTypes.string
};

ButtonGroup.defaultProps = {
  openRequestsCount: null,
  pastRequestsCount: null,
  modifiedTripsCount: 0,
  cancelledTripsCount: 0,
  pastApprovalsCount: null,
  openApprovalsCount: null,
  approvedApprovalsCount: null,
  verifiedApprovalsCount: null,
  fetchApprovals: null,
  fetchRequests: null,
  budgetChecker: false,
  url: '',
  activeStatus: 'all',
  modificationType: 'all'
};


export default ButtonGroup;
