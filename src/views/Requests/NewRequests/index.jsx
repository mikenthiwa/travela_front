import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Base from '../../Base';
import { NewRequestForm } from '../../../components/Forms';
import {
  fetchAvailableRooms, fetchAvailableRoomsSuccess
} from '../../../redux/actionCreator/availableRoomsActions';
import {
  fetchUserRequests, createNewRequest, editRequest, fetchEditRequest
} from '../../../redux/actionCreator/requestActions';
import updateUserProfile from '../../../redux/actionCreator/userProfileActions';
import { openModal } from '../../../redux/actionCreator/modalActions';
import { fetchRoleUsers } from '../../../redux/actionCreator/roleActions';
import { getOccupation } from '../../../redux/actionCreator/occupationActions';
import {fetchAllTravelReasons} from '../../../redux/actionCreator/listTravelReasonsActions';
import { fetchAllTravelStipends } from '../../../redux/actionCreator/travelStipendsActions';
import { fetchTravelChecklist } from '../../../redux/actionCreator/travelChecklistActions';
import { validateTrips } from '../../../redux/actionCreator/tripActions';
import Preloader from '../../../components/Preloader/Preloader';
import '../Requests.scss';

export const RequestPage = (editing = false) => {
  class NewRequests extends Base {
    constructor(props) {
      super(props);
      const {location} = this.props;
      this.state = {
        url: location.search,
        department: '',
        availableRooms: {}
      };
    }

    componentDidMount() {
      const {
        fetchRoleUsers, fetchAllTravelReasons,
        match, fetchEditRequest
      } = this.props;
      const {params: {request_id}} = match;
      fetchRoleUsers(53019);
      fetchAllTravelReasons('');
      if (editing) {
        fetchEditRequest(request_id);
      }

    }

    render() {
      const { updateUserProfile, userData, fetchPostUserData, user, createNewRequest, listTravelReasons,
        loading, errors, roleUsers, requestOnEdit, editRequest, fetchUserRequests, occupations,
        travelChecklists, fetchTravelChecklist, fetchAvailableRooms, availableRooms,
        fetchAvailableRoomsSuccess, creatingRequest, fetchAllTravelReasons, history,
        fetchAllTravelStipends, travelStipends, validateTrips, fetchingRequest, editingRequest, comments
      } = this.props;
      const { url } = this.state;
      return (
        fetchingRequest ? (
          <div className="request-page__preloader">
            <Preloader />
          </div>
        ):
          (
            <NewRequestForm
              updateUserProfile={updateUserProfile} user={user} errors={errors}
              userData={userData && userData.result} occupations={occupations}
              handleCreateRequest={createNewRequest} handleEditRequest={editRequest}
              loading={loading} managers={roleUsers} availableRooms={availableRooms}
              fetchAvailableRooms={fetchAvailableRooms} fetchAvailableRoomsSuccess={fetchAvailableRoomsSuccess}
              creatingRequest={creatingRequest} userDataUpdate={fetchPostUserData}
              fetchAllTravelReasons={fetchAllTravelReasons} listTravelReasons={listTravelReasons}
              travelChecklists={travelChecklists} fetchTravelChecklist={fetchTravelChecklist}
              requestOnEdit={requestOnEdit} fetchUserRequests={() => fetchUserRequests(url)}
              history={history} fetchAllTravelStipends={fetchAllTravelStipends} travelStipends={travelStipends}
              validateTrips={validateTrips} editing={editing} isEditing={editingRequest} comments={comments}
            />)
      );
    }
  }
  return NewRequests;
};

const mapStateToProps = ({
  requests, user, role, availableRooms, occupations,
  modal, teammates, travelReason, travelStipends, travelChecklist
}) => ({
  ...requests,
  ...role,
  ...occupations,
  ...modal.modal,
  teammates: teammates,
  isFetching: requests.isLoading,
  userData: user.getUserData,
  availableRooms,
  department: user.currentUser.department,
  listTravelReasons: travelReason,
  travelStipends,
  travelChecklists: travelChecklist,
});

const actions = () => ({
  fetchUserRequests,
  updateUserProfile,
  createNewRequest,
  editRequest,
  openModal,
  fetchAvailableRooms,
  fetchAvailableRoomsSuccess,
  fetchRoleUsers,
  getOccupation,
  fetchAllTravelReasons,
  fetchAllTravelStipends,
  fetchTravelChecklist,
  validateTrips,
  fetchEditRequest
});

export default (editing = false) => {
  return connect(mapStateToProps, actions())(RequestPage(editing));
};
