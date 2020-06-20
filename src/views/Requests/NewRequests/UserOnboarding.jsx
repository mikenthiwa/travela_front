import React from 'react';
import { connect } from 'react-redux';
import Base from '../../Base';
import { UserOnboarding } from '../../../components/Forms';
import updateUserProfile from '../../../redux/actionCreator/userProfileActions';
import { getAllDepartment } from '../../../redux/actionCreator/userActions';
import { fetchRoleUsers } from '../../../redux/actionCreator/roleActions';
import { getOccupation } from '../../../redux/actionCreator/occupationActions';
import Preloader from '../../../components/Preloader/Preloader';
import RequestUtils from '../../../helper/request/RequestUtils';
import '../Requests.scss';

export const UserOnboardingRequestPage = (editing = false) => {
  class ConfirmUserDetails extends Base {
    constructor(props) {
      super(props);
      const {location} = this.props;
      this.state = {
        url: location.search,
        department: '',
      };
    }

    componentDidMount() {
      const {
        fetchRoleUsers, getAllDepartment,
        match, getOccupation
      } = this.props;
      const {params: {request_id}} = match;
      getOccupation();
      getAllDepartment();
      fetchRoleUsers(53019);
    }

    render() {
      const { updateUserProfile, userData, user,
        loading, errors, roleUsers, requestOnEdit, occupations,
        creatingRequest, history, departments,
        fetchingRequest, editingRequest,
      } = this.props;
      const { url } = this.state;
      const manager = requestOnEdit && requestOnEdit.manager;
      const managerName = RequestUtils.getManagerNameOrId(roleUsers, manager);
      if(requestOnEdit) requestOnEdit.manager = managerName;
      return (
        fetchingRequest || roleUsers.length === 0 || !userData.result ? (
          <div className="request-page__preloader">
            <Preloader />
          </div>
        ):
          (
            <UserOnboarding
              updateUserProfile={updateUserProfile} user={user} errors={errors}
              userData={userData && userData.result} occupations={occupations}
              loading={loading} managers={roleUsers} departments={departments}
              creatingRequest={creatingRequest}
              requestOnEdit={requestOnEdit}
              history={history}
              editing={editing} isEditing={editingRequest}
            />)
      );
    }
  }
  return ConfirmUserDetails;
};

const mapStateToProps = ({
  requests, user, role,  occupations,
}) => ({
  ...requests,
  ...role,
  ...occupations,

  isFetching: requests.isLoading,
  userData: user.getUserData,
  department: user.currentUser.department,
});

const actions = () => ({
  updateUserProfile,
  fetchRoleUsers,
  getOccupation,
  getAllDepartment
});

export default (editing = true) => {
  return connect(mapStateToProps, actions())(UserOnboardingRequestPage(editing));
};
