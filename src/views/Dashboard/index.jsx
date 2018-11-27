/* eslint-disable */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchReadiness, exportReadiness } from '../../redux/actionCreator/travelReadinessActions';
import {  fetchDepartmentTrips } from '../../redux/actionCreator/tripAnalyticsActions';
import { downloadAnalytics } from '../../redux/actionCreator/analyticsActions';
import {fetchCalendarAnalytics, downloadCalendarAnalytics} from '../../redux/actionCreator/travelCalendarActions';
import FilterContext, { Consumer } from './DashboardContext/FilterContext';
import AnalyticsReport from '../../components/AnalyticsReport';
import DashboardHeader from '../../components/DashboardHeader';
import checkUserPermission from '../../helper/permissions';
import ConnectedAnalytics from '../Analytics';
import TravelCalendar from '../../components/TravelCalendar';
import './index.scss';

export class Dashboard extends Component {

  render() {
    const { fetchDepartmentTrips, departmentTrips, fetchReadiness,readiness,
      history, getCurrentUserRole, isLoaded, exportReadiness, travelCalendar, fetchCalendarAnalytics,
      downloadCalendarAnalytics, downloadAnalytics } = this.props;
    if (isLoaded) {
      const allowedRoles = ['Travel Administrator', 'Super Administrator', 'Travel Team Member'];
      checkUserPermission(history, allowedRoles, getCurrentUserRole);
    }
    return (
      <div id="dashboard">
        <FilterContext>
          <Consumer>
            {(context) => (
              <Fragment>
                <DashboardHeader downloadCsv={downloadAnalytics} context={context} />
                <ConnectedAnalytics context={context} />
              </Fragment>
            )}
          </Consumer>
        </FilterContext>
        <AnalyticsReport
          fetchDepartmentTrips={fetchDepartmentTrips}
          departmentTrips={departmentTrips}
          fetchReadiness={fetchReadiness}
          exportReadiness={exportReadiness}
          readiness={readiness}
        />
        <TravelCalendar
          fetchCalendarAnalytics={fetchCalendarAnalytics}
          downloadCalendarAnalytics={downloadCalendarAnalytics}
          travelCalendar={travelCalendar} />
      </div>
    );
  }
}

const actions = {
  fetchDepartmentTrips, fetchReadiness, downloadAnalytics,
  fetchCalendarAnalytics, downloadCalendarAnalytics,
  exportReadiness
};

export const mapStateToProps = ({user, analytics, readiness, travelCalendar}) => ({
  getCurrentUserRole: user.getCurrentUserRole,
  departmentTrips: analytics.departmentTrips,
  readiness,
  isLoaded: user.isLoaded,
  travelCalendar: travelCalendar
});

Dashboard.propTypes = {
  history: PropTypes.shape({}).isRequired,
  downloadAnalytics: PropTypes.func.isRequired,
  getCurrentUserRole: PropTypes.array.isRequired,
  departmentTrips: PropTypes.shape({}).isRequired,
  fetchDepartmentTrips: PropTypes.func.isRequired,
  fetchReadiness: PropTypes.func.isRequired,
  readiness:  PropTypes.shape({}).isRequired,
  isLoaded: PropTypes.bool.isRequired,
  exportReadiness: PropTypes.func.isRequired,
  fetchCalendarAnalytics: PropTypes.func.isRequired,
  downloadCalendarAnalytics: PropTypes.func.isRequired,
  travelCalendar: PropTypes.object.isRequired
};

export default connect(mapStateToProps, actions)(Dashboard);
