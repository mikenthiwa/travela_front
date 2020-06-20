import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal/Modal';
import AddDepartmentForm from '../Forms/AddDepartmentForm';

const DepartmentModal = (
  { shouldOpen,
    closeModal,
    modalType,
    addDepartment,
    editDepartment,
    department
  }
) => {
  const editing = /edit department/.test(modalType);
  return (
    <Modal
      customModalStyles="modal--add-user"
      visibility={shouldOpen && /(edit|add) department/.test(modalType) ? 'visible' : 'invisible'}
      title={`${editing ? 'Edit' : 'Add'} Department`}
      width="480px"
      closeModal={closeModal}
    >
      <AddDepartmentForm
        onCancel={closeModal}
        hasBlankFields={false}
        closeModal={closeModal}
        editing={editing}
        send="Save"
        addDepartment={addDepartment}
        editDepartment={editDepartment}
        department={department}
      />
    </Modal>
  );
};

DepartmentModal.propTypes = {
  shouldOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  modalType: PropTypes.string,
  addDepartment: PropTypes.func,
  editDepartment: PropTypes.func,
  department: PropTypes.object,
};

DepartmentModal.defaultProps = {
  closeModal: null,
  modalType: null,
  addDepartment: null,
  editDepartment: null,
  department: {},
  shouldOpen: false
};

export default DepartmentModal;

