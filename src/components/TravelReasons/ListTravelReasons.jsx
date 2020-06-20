import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import LoadingTravelReasonsTable from './TravelReasonsTable';
import TemplatesPagination from '../ReminderSetup/TemplatesPagination';
import DeleteReasonModal from './DeleteTravelReasonModal';

class ListTravelReasons extends Component {

  constructor(props) {
    super(props);
    this.state = { deleteReasonId: 1 };
  }

  componentDidMount() {
    const { fetchAllTravelReasonsAction, location: {search} } = this.props;
    fetchAllTravelReasonsAction(search);
  }

  showDeleteModal = (reasonId) => {
    let { openModal } = this.props;
    this.setState({deleteReasonId: reasonId});
    openModal(true, 'delete reason');
  }

  onPageChange = (direction) => {
    const {
      listTravelReasons: {pagination: {currentPage}},
      fetchAllTravelReasonsAction,
      location: {search}
    } = this.props;
    const requestedPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
    const query = `${search}${search ? '&' : '?'}page=${requestedPage}`;
    fetchAllTravelReasonsAction(query);
  };

  Pagination = (currentPage, pageCount, onPageChange) => {
    return (
      <TemplatesPagination
        currentPage={currentPage ? currentPage : 1}
        pageCount={pageCount ? pageCount : 1}
        onPageChange={onPageChange} />
    );
  };

  renderDeleteModal = (
    closeModal,
    shouldOpen, deleteTravelReason, modalType, deleteReasonId, isDeleting) => {
    return (
      <DeleteReasonModal
        closeModal={closeModal} shouldOpen={shouldOpen} handleDelete={deleteTravelReason}
        modalType={modalType} deleteReasonId={deleteReasonId} isDeleting={isDeleting}
        title="Delete Travel Reason"
      />
    );
  }

  render(){
    const {
      listTravelReasons: { travelReasons, pagination, isLoading, reasonDetails, isFetching },
      editTravelReason,
      renderDisplayTravelReasonDetails,
      shouldOpen,
      closeModal,
      modalType,
      openModal,
      deleteTravelReason,
      isDeleting
    } = this.props;
    const { currentPage,  pageCount } = pagination;
    const { deleteReasonId } = this.state;
    return (
      <Fragment>
        <LoadingTravelReasonsTable
          reasons={travelReasons}
          isLoading={isLoading}
          shouldOpen={shouldOpen}
          showDeleteModal={this.showDeleteModal}
          openModal={openModal}
          closeModal={closeModal}
          modalType={modalType}
          editTravelReason={editTravelReason}
          reasonDetails={reasonDetails}
          isFetching={isFetching}
          deleteTravelReason={deleteTravelReason}
          renderDisplayTravelReasonDetails={renderDisplayTravelReasonDetails}
        />
        {this.renderDeleteModal(closeModal,
          shouldOpen,deleteTravelReason,modalType,deleteReasonId,isDeleting)}
        {!isLoading && pageCount > 0 && this.Pagination(currentPage, pageCount, this.onPageChange)}
      </Fragment>
    );
  }
}

ListTravelReasons.propTypes = {
  fetchAllTravelReasonsAction: PropTypes.func,
  listTravelReasons: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  renderDisplayTravelReasonDetails: PropTypes.func,
  shouldOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  modalType: PropTypes.string,
  editTravelReason: PropTypes.func,
  openModal: PropTypes.func,
  deleteTravelReason: PropTypes.func,
  isDeleting: PropTypes.bool,
};

ListTravelReasons.defaultProps = {
  renderDisplayTravelReasonDetails: null,
  shouldOpen: false,
  closeModal: null,
  fetchAllTravelReasonsAction: null,
  modalType: '',
  editTravelReason: () => {},
  openModal: null,
  deleteTravelReason: () => {},
  isDeleting: false,
};

export default ListTravelReasons;
