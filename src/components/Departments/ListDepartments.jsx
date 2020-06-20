import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import LoadingDepartmentsTable from './DepartmentsTable';
import TemplatesPagination from '../ReminderSetup/TemplatesPagination';

class ListDepartments extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { getAllDepartments, location: { search } } = this.props;
    getAllDepartments(search);
  }

  onPageChange = (direction) => {
    const {
      department: {pagination: {currentPage}},
      getAllDepartments,
      location: {search}
    } = this.props;
    const requestedPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
    const query = `${search}${search ? '&' : '?'}page=${requestedPage}`;
    getAllDepartments(query);
  };

  Pagination = (currentPage, pageCount, onPageChange) => {
    return (
      <TemplatesPagination
        currentPage={currentPage ? currentPage : 1}
        pageCount={pageCount ? pageCount : 1}
        onPageChange={onPageChange} />
    );
  };

  render(){
    const {
      shouldOpen,
      closeModal,
      modalType,
      openModal,
      editDepartments,
      department: {departments, pagination, isLoadingDepartment}
    } = this.props;
    const { currentPage,  pageCount } = pagination;
    return (
      <Fragment>
        <LoadingDepartmentsTable
          editDepartments={editDepartments}
          departments={departments}
          shouldOpen={shouldOpen}
          openModal={openModal}
          closeModal={closeModal}
          modalType={modalType}
        />
        {!isLoadingDepartment && pageCount > 0 && this.Pagination(currentPage, pageCount, this.onPageChange)}
      </Fragment>
    );
  }
}

ListDepartments.propTypes = {
  getAllDepartments: PropTypes.func,
  editDepartments: PropTypes.func,
  shouldOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  modalType: PropTypes.string,
  openModal: PropTypes.func,
  department: PropTypes.object,
  location: PropTypes.object,
};

ListDepartments.defaultProps = {
  getAllDepartments: null,
  editDepartments: null,
  shouldOpen: false,
  closeModal: null,
  modalType: '',
  openModal: null,
  department: {},
  location: {}
};

export default ListDepartments;
