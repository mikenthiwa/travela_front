import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './home.scss';
import { fetchTeammates } from '../../redux/actionCreator/homeActions';
import GetStarted from '../../components/GetStated';
import Teammates from '../../components/Teammates';
import HomeRequests from '../../components/HomeRequests';

import {
  fetchAvailableRooms, fetchAvailableRoomsSuccess
} from '../../redux/actionCreator/availableRoomsActions';
import {
  fetchUserRequests, createNewRequest, editRequest,
} from '../../redux/actionCreator/requestActions';
import updateUserProfile from '../../redux/actionCreator/userProfileActions';
import { fetchRoleUsers } from '../../redux/actionCreator/roleActions';
import { getOccupation } from '../../redux/actionCreator/occupationActions';

export class Home extends Component {
  constructor(props) {
    super(props);
    const { location } = this.props;
    this.state = {
      url: location.search,
      department: '',
      availableRooms:{}
    };
  }

  componentDidMount() {
    const { url } = this.state;
    const { fetchUserRequests, fetchRoleUsers, getOccupation } = this.props;
    fetchUserRequests(url);
    fetchRoleUsers(53019);
    getOccupation();
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const { department, fetchTeammates, availableRooms, fetchAvailableRooms } = nextProps;

    if(department !== prevState.department) {
      fetchTeammates(department);
      return {department};
    }
    if(availableRooms === prevState.availableRooms){
      fetchAvailableRooms();
      return { availableRooms };
    }

    return null;
  }

  render() {
    const { requests, isFetching, teammates } = this.props;
    return (
      <div>
        <h1 className="home-title">HOME</h1>
        <div className="home">
          <GetStarted />
          <div className="overview">
            <Teammates teammates={teammates} />
            <HomeRequests
              isLoading={isFetching}
              requests={requests}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({requests, user, role, availableRooms, occupations, teammates}) => ({
  ...requests,
  ...role,
  ...occupations,
  teammates: teammates,
  isFetching: requests.isLoading,
  userData: user.getUserData,
  availableRooms,
  department: user.currentUser.department
});

const actionCreators = {
  fetchUserRequests,
  updateUserProfile,
  createNewRequest,
  editRequest,
  fetchAvailableRooms,
  fetchAvailableRoomsSuccess,
  fetchTeammates,
  getOccupation,
  fetchRoleUsers,
};

Home.propTypes = {
  fetchUserRequests: PropTypes.func.isRequired,
  fetchAvailableRooms: PropTypes.func.isRequired,
  fetchTeammates: PropTypes.func.isRequired,
  fetchRoleUsers: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  teammates: PropTypes.object,
  availableRooms: PropTypes.object,
  location: PropTypes.object,
  department: PropTypes.string,
  requests: PropTypes.array,
  getOccupation: PropTypes.func.isRequired
};

Home.defaultProps = {
  requests: [],
  teammates: {},
  availableRooms: {},
  location: { url: '' },
  department: '',
  isFetching: false,
};

export default connect(mapStateToProps, actionCreators)(Home);
