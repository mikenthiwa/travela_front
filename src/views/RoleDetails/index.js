import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { PropTypes } from 'prop-types';
import WithLoadingRoleDetailsTable from '../../components/RoleDetailsTable';
import PageHeader from '../../components/PageHeader';
import Modal from '../../components/modal/Modal';
import Pagination from '../../components/Pagination/Pagination';
import { NewUserRoleForm } from '../../components/Forms';
import { closeModal, openModal } from '../../redux/actionCreator/modalActions';
import {
  deleteUserRole,
  fetchRoleUsers,
  hideDeleteRoleModal,
  putRoleData,
  showDeleteRoleModal,
  updateBudgetChecker,
} from '../../redux/actionCreator/roleActions';
import { fetchCenters, updateUserCenter } from '../../redux/actionCreator/centersActions';
import { getAllUsersEmail, getAllDepartment  } from '../../redux/actionCreator/userActions';
import './RoleDetails.scss';
import NotFound from '../ErrorPages';
import Utils from '../../helper/Utils';


export class RoleDetails extends Component {
  state = {
    headTitle: 'Add User',
    userDetail: {},
  }

  componentDidMount() {
    const page = Utils.getCurrentPage(this);
    const {
      fetchRoleUsers, match: { params }, hideDeleteRoleModal,
      deleteModalState, location
    } = this.props;
    const {search} = location;
    const values = new URLSearchParams(search);
    getAllUsersEmail();
    deleteModalState === 'visible' && hideDeleteRoleModal();
    fetchRoleUsers(params.roleId, page, values.get('search'));
  }

  handleDeleteUserRole = (user) => {
    const { deleteUserRole, match: { params } } = this.props;
    const roleId = params.roleId;
    const { id, fullName } = user;
    deleteUserRole(id, fullName, roleId);
  }

  handleAddUser = () => {
    const { openModal, hideDeleteRoleModal, deleteModalState } = this.props;
    this.setState({ headTitle: 'Add User', userDetail: {} });
    deleteModalState === 'visible' && hideDeleteRoleModal();
    openModal(true, 'new model');
  }

  handleEditRole = (user) => {
    let { openModal, hideDeleteRoleModal, deleteModalState, roleName } = this.props;
    deleteModalState === 'visible' && hideDeleteRoleModal();
    openModal(true, 'new model');
    this.setState({
      headTitle: `Edit ${roleName}`,
      userDetail: user
    });
  }

  handlePageChange = (page, search) => {
    const { location: { pathname }, history } = this.props;
    search ? history.push(`${pathname}?search=${search}&page=${page}`) : history.push(`${pathname}?page=${page}`);
  }

  renderUserRolePanelHeader() {
    const { roleName, hideDeleteRoleModal, getCurrentUserRole } = this.props;
    const isSuperAdmin = getCurrentUserRole.includes('Super Administrator');
    return (
      <div className="rp-role__header">
        <div className="role-panel-header">
          {roleName && (
            <div className="role-details__header">
              <PageHeader
                addLink={isSuperAdmin}
                iconLink="/settings/roles"
                title={`${roleName}s`}
                actionBtn="Add User"
                hideDeleteRoleModal={hideDeleteRoleModal}
                openModal={this.handleAddUser}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  renderRoles() {
    const {
      error, roleName,
      isFetching, roleUsers,
      deleteModalState, deleteModalRoleId,
      hideDeleteRoleModal, showDeleteRoleModal
    } = this.props;
    return (
      <div className="rp-table">
        <WithLoadingRoleDetailsTable
          isLoading={isFetching}
          roleUsers={roleUsers}
          error={error}
          roleName={roleName}
          handleEditRole={this.handleEditRole}
          handleDeleteUserRole={this.handleDeleteUserRole}
          deleteModalState={deleteModalState}
          deleteModalRoleId={deleteModalRoleId}
          hideDeleteRoleModal={hideDeleteRoleModal}
          showDeleteRoleModal={showDeleteRoleModal}
        />
      </div>
    );
  }

  renderRoleForm() {
    const {
      error, closeModal, shouldOpen, modalType, isUpdating,
      roleName, fetchRoleUsers, fetchCenters, centers, getUsersEmail: allMails,
      putRoleData, updateBudgetChecker, match, getAllUsersEmail, updateUserCenter,updatingRole, departments, getAllDepartment} = this.props;
    const { headTitle, userDetail } = this.state;
    const { params: { roleId } } = match;
    const page = Utils.getCurrentPage(this);

    return (
      <Modal
        closeModal={closeModal}
        customModalStyles="modal--add-user"
        width="480px"
        visibility={
          shouldOpen && modalType === 'new model' ? 'visible' : 'invisible'
        }
        title={headTitle}
      >
        <NewUserRoleForm
          role={roleName}
          roleId={roleId}
          updatingRole={updatingRole || isUpdating}
          errors={error}
          closeModal={closeModal}
          getRoleData={() => fetchRoleUsers(roleId, page)}
          handleUpdateRole={putRoleData}
          fetchCenters={fetchCenters}
          updateBudgetChecker={updateBudgetChecker}
          centers={centers}
          userDetail={userDetail}
          myTitle={headTitle}
          getAllUsersEmail={getAllUsersEmail}
          allMails={allMails}
          departments={departments}
          getAllDepartment={getAllDepartment}
          updateUserCenter={updateUserCenter}
        />
      </Modal>
    );
  }

  renderUserRolePage() {
    const {
      roleUsers,
      meta: { currentPage, pageCount, search }
    } = this.props;

    return (
      <Fragment>
        {this.renderUserRolePanelHeader()}
        {this.renderRoles()}
        {!isEmpty(roleUsers)
          && (
            <Pagination
              currentPage={currentPage}
              pageCount={pageCount}
              onPageChange={(page) => this.handlePageChange(page, search)}
            />
          )
        }
      </Fragment>
    );
  }

  render() {
    const {
      isFetching,
      roleName,
      error,
      roleUsers,
      meta
    } = this.props;
    return (
      <div>
        { meta.search && isEmpty(roleUsers) ? (
          <Fragment>
            {this.renderUserRolePanelHeader()}
            {this.renderRoleForm()}
            <div className="table__requests--empty">
              {
                'No Record found'
              }
            </div>
          </Fragment>
        )
          : (
            <Fragment>
              {!isFetching && !roleName && error && <NotFound redirectLink="/settings/roles" />}
              {this.renderRoleForm()}
              {this.renderUserRolePage()}
            </Fragment>
          )        }
      </div>
    );
  }
}

export const mapStateToProps = ({ modal, role, user, centers }) => ({
  ...user,
  ...modal.modal,
  ...role,
  ...centers,
  isUpatingCenter: centers.update.isLoading
});

RoleDetails.propTypes = {
  roleUsers: PropTypes.array.isRequired,
  location: PropTypes.object,
  updatingRole: PropTypes.bool,
  closeModal: PropTypes.func.isRequired,
  fetchRoleUsers: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.string, PropTypes.bool
  ]),
  isFetching: PropTypes.bool,
  getCurrentUserRole: PropTypes.array.isRequired,
  history: PropTypes.shape({}).isRequired,
  openModal: PropTypes.func.isRequired,
  shouldOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.string,
  match: PropTypes.object.isRequired,
  roleName: PropTypes.string,
  fetchCenters: PropTypes.func.isRequired,
  centers: PropTypes.array,
  putRoleData: PropTypes.func.isRequired,
  updateBudgetChecker: PropTypes.func.isRequired,
  deleteModalRoleId: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]).isRequired,
  deleteModalState: PropTypes.string.isRequired,
  showDeleteRoleModal: PropTypes.func.isRequired,
  hideDeleteRoleModal: PropTypes.func.isRequired,
  deleteUserRole: PropTypes.func.isRequired,
  getAllUsersEmail: PropTypes.func.isRequired,
  getUsersEmail: PropTypes.array,
  meta: PropTypes.object,
  departments: PropTypes.array,
  getAllDepartment: PropTypes.func,
  isUpdating: PropTypes.bool,
  updateUserCenter: PropTypes.func,
};

RoleDetails.defaultProps = {
  isFetching: false,
  location: { search: '' },
  error: '',
  modalType: '',
  roleName: '',
  updatingRole: false,
  isUpdating: false,
  centers: [],
  getUsersEmail: [],
  meta: { currentPage: 1, pageCount: 0, search:'' },
  departments: [],
  getAllDepartment: () => { },
  updateUserCenter:  () => { }

};

const actionCreators = {
  fetchRoleUsers,
  putRoleData,
  openModal,
  closeModal,
  fetchCenters,
  deleteUserRole,
  hideDeleteRoleModal,
  showDeleteRoleModal,
  getAllUsersEmail,
  getAllDepartment,
  updateBudgetChecker,
  updateUserCenter
};

export default connect(
  mapStateToProps,
  actionCreators
)(RoleDetails);
