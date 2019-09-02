import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';
import { addDepartment, getAllDepartments, editDepartment, deleteDepartment, retrieveDepartment } from '../../redux/actionCreator/departmentActions';
import PageHeader from '../../components/PageHeader';
import ListDepartments from '../../components/Departments/ListDepartments';
import AddDepartmentModal from '../../components/Departments/DepartmentsModal';

export class Departments extends Component {
  renderAddDepartmentModal = () => {
    const { openModal } = this.props;
    openModal(true, 'add department');
  };

  addDepartmentAction = (body) => {
    const { addDepartment, history } = this.props;
    return addDepartment(body, history);
  };

  renderEditDepartmentsModal = (id) => {
    const { openModal, getSingleDepartment} = this.props;
    getSingleDepartment(id);
    openModal(true, 'edit department');
  };

  renderPageHeader = (isLoadingDepartment) => {
    return (
      <PageHeader
        title="DEPARTMENTS"
        actionBtn={isLoadingDepartment ? '' : 'Add Department'}
        actionBtnClickHandler={this.renderAddDepartmentModal}
      />);
  };

  render() {
    const {
      location, department,
      department: { isLoadingDepartment },
      getAllDepartments, editDepartment,
      closeModal, history,
      shouldOpen, openModal, modalType,
    } = this.props;
    return (
      <Fragment>
        <div className="reasons-header">
          {this.renderPageHeader(isLoadingDepartment)}
        </div>
        <AddDepartmentModal
          department={department}
          shouldOpen={shouldOpen}
          closeModal={closeModal}
          modalType={modalType}
          editDepartment={editDepartment}
          addDepartment={this.addDepartmentAction}
        />
        <ListDepartments
          editDepartments={this.renderEditDepartmentsModal}
          getAllDepartments={getAllDepartments}
          department={department}
          location={location}
        />
      </Fragment>
    );
  }
}

Departments.propTypes = {
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  getAllDepartments: PropTypes.func,
  getSingleDepartment: PropTypes.func,
  addDepartment: PropTypes.func,
  editDepartment: PropTypes.func,
  shouldOpen: PropTypes.bool,
  modalType: PropTypes.string,
  location: PropTypes.object.isRequired,
  history: PropTypes.object,
  department: PropTypes.object.isRequired,
};

Departments.defaultProps = {
  openModal: null,
  closeModal: null,
  getAllDepartments: null,
  getSingleDepartment: null,
  shouldOpen: false,
  addDepartment: null,
  editDepartment: null,
  modalType: '',
  history: {
    push: () => {}
  },
};

export const mapStateToProps = ({ modal, department }) => ({
  ...modal.modal,
  department
});

const actionCreators = {
  addDepartment,
  getAllDepartments,
  editDepartment,
  deleteDepartment,
  getSingleDepartment: retrieveDepartment,
  openModal,
  closeModal,
};

export default connect(mapStateToProps, actionCreators)(Departments);
