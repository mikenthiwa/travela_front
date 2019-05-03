import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal/Modal';
import Utils from '../../helper/Utils';
import withLoading from '../Hoc/withLoading';
import './RoleDetailsTable.scss';

const testColor = {
  color: 'blue',
};
export class RoleDetailsTable extends PureComponent {
  showDeleteModal = (roleId) => {
    const { showDeleteRoleModal } = this.props;
    showDeleteRoleModal(roleId);
  }

  closeDeleteModal = () => {
    const { hideDeleteRoleModal } = this.props;
    hideDeleteRoleModal();
  }

  renderDeleteModal = (user) => {
    const { handleDeleteUserRole, deleteModalState } = this.props;
    return (
      <Modal
        customModalStyles="delete-role-modal"
        customOverlayStyle="delete-modal-overlay position-below"
        visibility={deleteModalState}
        closeDeleteModal={this.closeDeleteModal}
        title="Remove Member ?"
        showOverlay={false}
      >
        <p className="delete-comment-modal__text">
          This action cannot be undone!
        </p>
        <button
          className="delete-comment-modal__btn"
          type="button"
          onClick={() => handleDeleteUserRole(user)}
        >
          Delete
        </button>
      </Modal>
    );
  }

  renderRoleUser(roleUser) {
    const { handleEditRole, deleteModalRoleId, deleteModalState, roleName } = this.props;
    const showTip = roleName === 'Budget Checker' ? Utils.returnTip(roleUser.budgetCheckerDepartments, 'name')
      : Utils.returnTip(roleUser.centers, 'location');
    return (
      <tr key={roleUser.id} className="table__row">
        <td
          className="mdl-data-table__cell--non-numeric table__data freeze role-user__name table__data-pointer">
          {roleUser.fullName}
        </td>
        <td className="mdl-data-table__cell--non-numeric table__data pl-sm-120 tool__tip__container" style={{ position: 'relative !important' }}>
          {
            roleName === 'Budget Checker' ?
              roleUser.budgetCheckerDepartments.length :
              roleUser.centers.length
          }
          <span className={showTip.length  > 0  ? 'tool__tip' : ''} style={{ left: '9%' }}>{showTip}</span>
        </td>
        <td
          className="mdl-data-table__cell--non-numeric table__requests__status table__data delete"
          style={testColor}>
          <span
            onClick={() => handleEditRole(roleUser)} id="editButton" role="presentation"
            onKeyDown={this.key}>
                  Edit
                  &ensp;  &ensp;  &ensp; &ensp;
          </span>
          &ensp;
          <span
            onClick={() => this.showDeleteModal(roleUser.id)}
            id="deleteButton"
            role="presentation"
            onKeyDown={this.key}>
            Delete
            {
              deleteModalRoleId === roleUser.id && deleteModalState === 'visible' &&
              this.renderDeleteModal(roleUser)
            }
          </span>
        </td>
      </tr>
    );
  }

  renderNoUsers(roleName) {
    return (
      <div className="table__requests--empty">
        {`No ${roleName.toLowerCase()} at the moment`}
      </div>);
  }

  renderError(error) {
    return <div className="table__requests--error">{error}</div>;
  }

  renderTableHead(roleName) {
    return (
      <tr>
        <th className="mdl-data-table__cell--non-numeric bb-md-0 table__head freeze request_id ">
          Name
        </th>
        <th className="mdl-data-table__cell--non-numeric table__head pl-sm-100d description-left">
          {
            roleName === 'Budget Checker' ? 'Department' :
              'Centers'
          }
        </th>
        <th className="mdl-data-table__cell--non-numeric table__head table__head--last">
          Actions
        </th>
      </tr>
    );
  }

  render() {
    const { roleUsers, error, roleName } = this.props;
    return (
      <Fragment>
        <div className="table__container user-roles">
          {error && this.renderError(error)}
          {roleUsers &&
            roleUsers.length > 0 ? (
              <table className="mdl-data-table mdl-js-data-table table__requests">
                <thead>
                  {this.renderTableHead(roleName)}
                </thead>
                <tbody className="table__body approvals_table_body">
                  {roleUsers.map(user => this.renderRoleUser(user, roleName))}
                </tbody>
              </table>
            ) : null}
          {!error && roleUsers.length === 0
            && this.renderNoUsers(roleName)}
        </div>
      </Fragment>
    );
  }
}

RoleDetailsTable.propTypes = {
  roleUsers: PropTypes.array,
  handleEditRole: PropTypes.func,
  handleDeleteUserRole: PropTypes.func,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  roleName: PropTypes.string,
  deleteModalState: PropTypes.string,
  deleteModalRoleId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  hideDeleteRoleModal: PropTypes.func,
  showDeleteRoleModal: PropTypes.func,
};

RoleDetailsTable.defaultProps = {
  roleUsers: [],
  error: '',
  roleName: '',
  handleEditRole: () => { },
  deleteModalState: 'invisible',
  deleteModalRoleId: 0,
  hideDeleteRoleModal: () => { },
  showDeleteRoleModal: () => { },
  handleDeleteUserRole: () => { },
};

export default withLoading(RoleDetailsTable);
