import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import axios from 'axios';
import toast from 'toastr';
import { isEqual } from 'lodash';
import RequestsModal from '../RequestsModal/RequestsModal';
import Modal from '../modal/Modal';
import './Table.scss';
import withLoading from '../Hoc/withLoading';
import TableMenu from '../TableMenu/TableMenu';
import RequestPlaceholder from '../Placeholders/RequestsPlaceholder';
import getTripDuration from '../../helper/getTripDuration';
import formatTripType from '../../helper/formatTripType';
import retrieveStatusTag from '../../helper/retrieveStatusTag';
import RequestDetailsView from '../../views/Requests/NewRequestPage';

export class Table extends Component {
  state = {
    menuOpen: {
      open: false,
      id: null
    }
  };

  componentDidUpdate(prevProps){
    const {
      requests,
      openChecklist,
      requestId
    } = this.props;
    const { requests: prevRequests } = prevProps;
    if(!isEqual(requests, prevRequests) && openChecklist) {
      const request = requests.find(request => request.id === requestId);
      this.renderPopUp(request, requestId);
    }
  }

  getRequestStatusClassName(status) {
    let newStatus = 'request__status--approved';
    newStatus = (status === 'Open') ? 'request__status--open' : newStatus;
    newStatus = (status === 'Rejected') ? 'request__status--rejected' : newStatus;
    newStatus = (status === 'Verified') ? 'request__status--verified' : newStatus;
    newStatus = (status === 'Checked') ? 'request__status--checked': newStatus;
    return newStatus;
  }

  renderPopUp = (request, requestId) => {
    const { openModal } = this.props;
    // if request does not exist
    if(!request) return toast.error('This checklist cannot be found!');
    // if document has not been approved
    if(request.status !== 'Approved') return openModal(true, 'travel checklist');
    // if document has been approved
    this.toggleMenu(requestId, request, true);
  }

  toggleMenu = (requestId, request, status) => {
    const { setOpenChecklist, openModal } = this.props;
    if(status) {
      this.setState(
        () => ({ menuOpen: { open: true, id: request.id, request } }),
        () => openModal(true, 'upload submissions')
      );
      return setOpenChecklist(false);
    }
    const { menuOpen } = this.state;
    if (menuOpen.id !== requestId) {
      return this.setState({
        menuOpen: {
          open: true,
          id: requestId,
          request
        }
      });
    }
    this.setState({
      menuOpen: {
        open: !menuOpen.open,
        id: requestId,
        request
      }
    });
  }

  handleClickRequest = requestId => {
    const {
      history,
      location: { pathname }
    } = this.props;
    history.push(`${pathname}${/\/$/.test(pathname) ? '': '/'}${requestId}`);
  };

  getApprovalStatus = (status, budgetStatus) => {
    if (status === 'Verified'){
      return status;
    }
    return budgetStatus === 'Checked' || budgetStatus === 'Rejected' ?
      budgetStatus :
      status;
  };

  computeRequestStatus({status, budgetStatus}) {
    const { approvalsType } = this.props;

    if(approvalsType === 'budget') {
      return budgetStatus;
    }

    budgetStatus = budgetStatus === 'Approved' ? 'Checked' : budgetStatus;

    return this.getApprovalStatus(status, budgetStatus);

  }

  renderError(error) {
    return <div className="table__requests--error">{error}</div>;
  }

  renderNoRequests(message) {
    return (
      <div className="table__requests--empty">
        {
          message
        }
      </div>
    );
  }
  renderRequestStatus(request){
    const {
      editRequest, type, uploadTripSubmissions, deleteRequest,
      openModal, closeModal, shouldOpen, modalType, history
    } = this.props;
    const { menuOpen } = this.state;
    return (
      <div>
        <div className="table__menu">
          <div
            id={`status-${request.id}`}
            className={this.getRequestStatusClassName(this.computeRequestStatus(request))}
          >
            {this.computeRequestStatus(request)}
          </div>
          {
            type !== 'approvals' && (
              <TableMenu
                deleteRequest={deleteRequest} editRequest={editRequest}
                closeModal={closeModal}
                uploadTripSubmissions={uploadTripSubmissions}
                requestStatus={request.status} type={type} modalType={modalType}
                menuOpen={menuOpen} request={request} openModal={openModal}
                toggleMenu={this.toggleMenu} shouldOpen={shouldOpen}
                history={history}
              />
            )
          }
        </div>
      </div>
    );
  }

  renderApprovalsIdCell(request) {
    return (
      <td className="mdl-data-table__cell--non-numeric table__data freeze table__data-pointer">
        <div
          onKeyPress={() => {}}
          onClick={() => this.handleClickRequest(request.id)}
          role="button"
          tabIndex="0"
          className="button-outline table__id-pointer"
        >
          {request.id}
        </div>
      </td>
    );
  }

  renderName(type, request) {
    return (type === 'approvals' || type === 'verifications') && (
      <td className="mdl-data-table__cell--non-numeric table__data table__data-pointer pl-sm-100">
        {request.name}
      </td>
    );
  }

  renderTravelCompletion(type, travelCompletion) {
    return (type === 'requests' || type === 'verifications') && (
      <td className="mdl-data-table__cell--non-numeric table__data table__data-pointer">
        {travelCompletion || '0% complete'}
      </td>
    );
  }
  renderTravelDuration(type) {
    return type === 'verifications' ? '' : (
      <th className="mdl-data-table__cell--non-numeric table__head">
      Duration
      </th>
    );
  }

  renderRequest(request, type) {
    const { trips, travelCompletion } = request;
    const tripTypeFormatted = formatTripType(request.tripType);
    const travelDuration =
      request.tripType !== 'oneWay' ? getTripDuration(trips) : 'Not applicable';
    return (
      <tr key={request.id} className="table__row table__effects">
        {this.renderApprovalsIdCell(request)}
        {this.renderName(type, request)}
        <td
          className={`mdl-data-table__cell--non-numeric table__data table__data-pointer ${
            type === 'requests' ? 'pl-sm-100' : ''
          }`}
        >
          {tripTypeFormatted}
        </td>
        <td className="mdl-data-table__cell--non-numeric table__data table__data-pointer">
          {trips.length > 0 && trips[0].origin}
        </td>
        {type === 'verifications' ? '' : (
          <td className="mdl-data-table__cell--non-numeric table__data table__data-pointer">
            {travelDuration}
          </td>
        ) }
        <td className="mdl-data-table__cell--non-numeric table__data table__data-pointer">
          {moment(request.updatedAt).format('DD MMM YYYY')}
        </td>
        { this.renderTravelCompletion(type, travelCompletion)}
        <td className="mdl-data-table__cell--non-numeric table__requests__status table__data table__data-pointer">
          {this.renderRequestStatus(request)}
        </td>
      </tr>
    );
  }

  renderTableHead(type) {
    return (
      <tr>
        <th className="mdl-data-table__cell--non-numeric bb-md-0 table__head freeze">
          Request ID
        </th>
        {(type === 'approvals' || type === 'verifications')&& (
          <th className="mdl-data-table__cell--non-numeric table__head pl-sm-100">
            Owner
          </th>
        )}
        <th
          className={`mdl-data-table__cell--non-numeric table__head ${
            type === 'requests' ? 'pl-sm-100' : ''
          }`}
        >
          Trip Type
        </th>
        <th className="mdl-data-table__cell--non-numeric table__head">
          Origin
        </th>
        {this.renderTravelDuration(type)}
        <th className="mdl-data-table__cell--non-numeric table__head">
          Date Created
        </th>
        { (type === 'requests' || type === 'verifications') && (
          <th className="mdl-data-table__cell--non-numeric table__head">
            Travel checklist
          </th>
        )}
        <th className="mdl-data-table__cell--non-numeric table__head table__head--last">
          Status
        </th>
      </tr>
    );
  }

  renderDetailsModal() {
    const { closeModal, shouldOpen, modalType, requestId, page, requestData, type } = this.props;
    const redirectLink = ['Verifications', 'Approvals'].includes(page) ?
      `/my-${page.toLowerCase()}` : '';
    return (
      <Modal
        requestId={requestId}
        closeModal={closeModal}
        width="900px"
        modalId="request-details-modal"
        modalContentId="request-details-modal-content"
        visibility={
          shouldOpen && modalType === 'request details'
            ? 'visible'
            : 'invisible'
        }
        title={`#${requestId} Request Details`}
        modalBar={
          <div className="table__modal-bar-text">{retrieveStatusTag(requestData, type)}</div>
        }
      >
        {(type === 'verifications' || type === 'approvals') &&
          <RequestsModal navigatedPage={page} redirectLink={redirectLink} requestId={requestId} />
        }
        {(type !== 'verifications' && type !== 'approvals') &&
          <RequestDetailsView navigatedPage={page} redirectLink={redirectLink} requestId={requestId} />
        }
      </Modal>
    );
  }

  render() {
    const { requests, type, fetchRequestsError, message, requestId } = this.props;
    return (
      <Fragment>
        <div className="table__container">
          {fetchRequestsError && this.renderError(fetchRequestsError)}
          {requests &&
            requests.length > 0 && (
            <table className="mdl-data-table mdl-js-data-table table__requests">
              <thead>{this.renderTableHead(type)}</thead>
              <tbody className="table__body">
                {requests.map(request => this.renderRequest(request, type))}
              </tbody>
            </table>
          )}
          {!fetchRequestsError &&
            !requests.length &&
            this.renderNoRequests(message)}
          {requestId && this.renderDetailsModal()}
        </div>
      </Fragment>
    );
  }
}

Table.propTypes = {
  requests: PropTypes.array,
  type: PropTypes.string,
  fetchRequestsError: PropTypes.string,
  closeModal: PropTypes.func,
  shouldOpen: PropTypes.bool,
  modalType: PropTypes.string,
  requestId: PropTypes.string,
  requestData: PropTypes.object,
  message: PropTypes.string,
  page: PropTypes.string,
  editRequest: PropTypes.func,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  openChecklist: PropTypes.bool,
  uploadTripSubmissions: PropTypes.func,
  deleteRequest: PropTypes.func,
  approvalsType: PropTypes.string,
  openModal: PropTypes.func.isRequired,
  setOpenChecklist: PropTypes.func,
};

Table.defaultProps = {
  type: 'requests',
  fetchRequestsError: null,
  requests: [],
  approvalsType: '',
  closeModal: () => {},
  shouldOpen: false,
  modalType: null,
  message: '',
  page: '',
  requestId: '',
  requestData: {},
  deleteRequest: () => {},
  editRequest: () => {},
  uploadTripSubmissions: () => {},
  openChecklist: false,
  setOpenChecklist: () => {},
};

export default withLoading(Table, RequestPlaceholder);
