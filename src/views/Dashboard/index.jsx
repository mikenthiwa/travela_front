import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchReadiness, exportReadiness } from '../../redux/actionCreator/travelReadinessActions';
import {  fetchDepartmentTrips } from '../../redux/actionCreator/tripAnalyticsActions';
import { downloadAnalytics } from '../../redux/actionCreator/analyticsActions';
import {
  fetchCalendarAnalytics, downloadCalendarAnalytics
} from '../../redux/actionCreator/travelCalendarActions';
import FilterContext, { Consumer } from './DashboardContext/FilterContext';
import AnalyticsReport from '../../components/AnalyticsReport';
import DashboardHeader from '../../components/DashboardHeader';
import ConnectedAnalytics from '../Analytics';
import TravelCalendar from '../../components/TravelCalendar';
import './index.scss';

export class Dashboard extends Component {

  render() {
    const { fetchDepartmentTrips, departmentTrips, fetchReadiness,readiness,
      exportReadiness, travelCalendar, fetchCalendarAnalytics,
      downloadCalendarAnalytics, downloadAnalytics, currentUser, history } = this.props;
    return (
      <div id="dashboard">
        <FilterContext history={history} user={currentUser}>
          <Consumer>
            {(context) => (
              <Fragment>
                <DashboardHeader downloadCsv={downloadAnalytics} context={context} />
                <ConnectedAnalytics context={context} />
                <AnalyticsReport
                  fetchDepartmentTrips={fetchDepartmentTrips}
                  departmentTrips={departmentTrips}
                  fetchReadiness={fetchReadiness}
                  exportReadiness={exportReadiness}
                  readiness={readiness}
                  context={context}
                />
              </Fragment>
            )}
          </Consumer>
        </FilterContext>
        <TravelCalendar
          fetchCalendarAnalytics={fetchCalendarAnalytics}
          downloadCalendarAnalytics={downloadCalendarAnalytics}
          travelCalendar={travelCalendar}
          user={currentUser}
          history={history}
        />
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
  departmentTrips: PropTypes.shape({}).isRequired,
  fetchDepartmentTrips: PropTypes.func.isRequired,
  fetchReadiness: PropTypes.func.isRequired,
  readiness:  PropTypes.shape({}).isRequired,
  exportReadiness: PropTypes.func.isRequired,
  fetchCalendarAnalytics: PropTypes.func.isRequired,
  downloadCalendarAnalytics: PropTypes.func.isRequired,
  travelCalendar: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired
};

export default connect(mapStateToProps, actions)(Dashboard);
