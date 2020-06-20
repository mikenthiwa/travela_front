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
import { fetchTravelCostsByLocation } from '../../../redux/actionCreator/travelCostsActions';
import { fetchTravelChecklist } from '../../../redux/actionCreator/travelChecklistActions';
import { validateTrips } from '../../../redux/actionCreator/tripActions';
import Preloader from '../../../components/Preloader/Preloader';
import RequestUtils from '../../../helper/request/RequestUtils';
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
        match, fetchEditRequest, getOccupation
      } = this.props;
      const {params: {request_id}} = match;
      getOccupation();
      fetchRoleUsers(53019);
      fetchAllTravelReasons('');
      if (editing) {
        fetchEditRequest(request_id);
      }

    }

    render() {
      const { updateUserProfile, userData, fetchPostUserData, user, createNewRequest, listTravelReasons,
        loading, errors, roleUsers, requestOnEdit, editRequest, fetchUserRequests, occupations,
        travelChecklists, fetchTravelChecklist, fetchAvailableRooms, availableRooms, travelCosts,
        fetchAvailableRoomsSuccess, creatingRequest, fetchAllTravelReasons, history, fetchTravelCostsByLocation,
        fetchAllTravelStipends, fetchTravelStipendsByLocation, travelStipends, validateTrips, fetchingRequest, editingRequest, comments
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
              fetchTravelStipendsByLocation={fetchTravelStipendsByLocation} fetchTravelCostsByLocation={fetchTravelCostsByLocation}
              history={history} fetchAllTravelStipends={fetchAllTravelStipends} travelStipends={travelStipends}
              validateTrips={validateTrips} editing={editing} isEditing={editingRequest} comments={comments} travelCosts={travelCosts}
            />)
      );
    }
  }
  return NewRequests;
};

const mapStateToProps = ({
  requests, user, role, availableRooms, occupations,
  modal, teammates, travelReason, travelStipends, travelChecklist, travelCosts
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
  travelCosts,
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
  fetchTravelCostsByLocation,
  fetchTravelChecklist,
  validateTrips,
  fetchEditRequest
});

export default (editing = false) => {
  return connect(mapStateToProps, actions())(RequestPage(editing));
};
