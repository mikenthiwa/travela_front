import React, {Fragment}  from  'react';
import {connect} from 'react-redux';
import VerificationsPanelHeader from '../../components/VerificationsPanelHeader';
import { fetchUserApprovals } from '../../redux/actionCreator/approvalActions';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';
import WithLoadingTable from '../../components/Table';
import Base from '../Base';
import Utils from '../../helper/Utils';
import checkUserPermission from '../../helper/permissions';

export class Verifications extends Base {

  state = {
    clickPage: true,
    activeStatus: Utils.getActiveStatus(this.props.location.search),
    searchQuery:  this.props.location.search,
    requestId: '',
    requestData: {},
  }

  componentDidMount () {
    const { fetchUserApprovals, match: {params: {requestId}} } = this.props;
    const { searchQuery } = this.state;
    const prefix = (searchQuery.indexOf('?') < 0) ? '?' : '&';
    fetchUserApprovals(`/travel-admin${searchQuery}${prefix}`);
    if(requestId){
      this.storeRequestIdApproval(requestId);
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({requestData: nextProps.requests.requestData});
  }

  storeRequestIdApproval = (requestId)=> {
    this.setState({requestId: requestId});
  }

  renderApprovalsTable(){
    const { approvals, history, location, openModal, closeModal,
      shouldOpen, modalType, submissionInfo, match: { path } } = this.props;
    const {requestId, requestData } = this.state;
    return(
      <WithLoadingTable
        requests={approvals.approvals}
        location={location}
        history={history}
        isLoading={approvals.isLoading}
        fetchRequestsError={approvals.fetchApprovalsError}
        message={approvals.message}
        type="verifications"
        requestId={requestId}
        closeModal={closeModal}
        openModal={openModal}
        shouldOpen={shouldOpen}
        modalType={modalType}
        submissionInfo={submissionInfo}
        page="Verifications"
        requestData={requestData}
        isDynamicChecklist={/\/new-requests\//.test(path)}
      />
    );
  }

  fetchFilteredApprovals = (query) => {
    const { history, fetchUserApprovals } = this.props;
    history.location.search == '' ? localStorage.setItem('center', 'All Locations') : null;
    const center = localStorage.getItem('center');
    const centerQuery = center == 'All Locations' ? '' : '&'+'center='+center;
    const prefix = (query.indexOf('?') < 0) ? '?' : '&';
    history.push(`/requests/my-verifications${query}${centerQuery}`);
    fetchUserApprovals(`${query}${prefix}verified=true`);
    this.setState(prevState => ({
      ...prevState,
      activeStatus: Utils.getActiveStatus(query),
      searchQuery: query
    }));
  }

  onPageChange = (page) => {
    const { searchQuery } = this.state;
    const query = Utils.buildQuery(searchQuery, 'page', page);
    this.fetchFilteredApprovals(query);
  }

  getApprovalsWithLimit = (limit) => {
    let { searchQuery } = this.state;
    const { approvals } = this.props;
    this.getEntriesWithLimit(limit, searchQuery, approvals.pagination, this.fetchFilteredApprovals);
  }

  renderVerificationsPaneHeader(loading){
    const { activeStatus, searchQuery } = this.state;
    const { approvals } = this.props;
    const { approvedApprovalsCount, verifiedApprovalsCount } = approvals;
    return(
      <div className="rp-requests__header">
        <VerificationsPanelHeader
          url={searchQuery}
          approvedApprovalsCount={approvedApprovalsCount}
          verifiedApprovalsCount={verifiedApprovalsCount}
          fetchApprovals={this.fetchFilteredApprovals}
          getApprovalsWithLimit={this.getApprovalsWithLimit}
          activeStatus={activeStatus}
          approvalsLength={approvals.approvals.length}
          loading={loading}
        />
      </div>
    );
  }

  render() {
    const { approvals, getCurrentUserRole, history } = this.props;
    const { isLoading } = approvals;
    if (!isLoading && getCurrentUserRole.length > 0) {
      const allowedRoles = ['Travel Administrator', 'Super Administrator', 'Travel Team Member'];
      checkUserPermission(history, allowedRoles, getCurrentUserRole);
    }
    return (
      <Fragment>
        {this.renderVerificationsPaneHeader(approvals.isLoading )}
        {approvals.approvals && this.renderApprovalsTable()}
        {!approvals.isLoading && approvals.approvals.length > 0 &&
          this.renderPagination(approvals.pagination)}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  approvals: state.approvals,
  ...state.modal.modal,
  submissionInfo: state.submissions,
  getCurrentUserRole: state.user.getCurrentUserRole,
  requests: state.requests
});

const actionCreators = {
  fetchUserApprovals,
  openModal,
  closeModal
};

export default connect(mapStateToProps, actionCreators)(Verifications);
