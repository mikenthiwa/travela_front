import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import '../../components/Forms/NewRequestForm/NewRequestForm/NewRequestForm.scss';
import './UserProfile.scss';
import updateUserProfile from '../../redux/actionCreator/userProfileActions';
import ProfileForm from '../../components/Forms/ProfileForm';
import Base from '../Base';
import { fetchRoleUsers } from '../../redux/actionCreator/roleActions';
import { getUserData } from '../../redux/actionCreator/userActions';
import { fetchCenters } from '../../redux/actionCreator/centersActions';
import { getOccupation } from '../../redux/actionCreator/occupationActions';


class UserProfile extends Base {

  componentDidMount() {
    const {
      fetchRoleUsers,
      getOccupation,
      fetchCenters,
    } = this.props;

    fetchRoleUsers(53019);
    fetchCenters();
    getOccupation();
  }


  render() {
    const { roleUsers, updateUserProfile, user, occupations,
      fetchUserData, centers, fetchPostUserData, isUpdating } = this.props;
    return (
      <Fragment>
        <h1>PROFILE</h1>
        <div className="main">
          <div className="main--user_profile">
            <ProfileForm
              managers={roleUsers}
              occupations={occupations}
              updateUserProfile={updateUserProfile}
              userData={fetchUserData && fetchUserData.result}
              userDataUpdate={fetchPostUserData}
              user={user}
              centers={centers && centers.centers}
              isUpdating={isUpdating}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

UserProfile.defaultProps = {
  manager: [],
  occupations:[]
};

export const mapStateToProps = ({ user, role, centers, occupations}) => ({
  ...role,
  ...occupations,
  centers,
  fetchUserData: user.getUserData,
  fetchPostUserData: user.postUserData,
  isUpdating: user.isUpdating
});

const actionCreators = {
  updateUserProfile,
  fetchRoleUsers,
  getUserData,
  fetchCenters,
  getOccupation
};

export default connect(
  mapStateToProps,
  actionCreators
)(UserProfile);
