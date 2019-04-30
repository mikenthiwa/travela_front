import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AnalyticsCardPlaceholder from '../../components/Placeholders/AnalyticsCardPlaceholder';
import ChartCardPlaceholder from '../../components/Placeholders/ChartCardPlaceholder';
import { fetchAnalytics } from '../../redux/actionCreator/analyticsActions';
import PieChartAnalytics from '../../components/PieChartAnalytics';
import flightTakeoff from '../../images/icons/flight_takeoff.svg';
import pendingIcon from '../../images/icons/pending_icon.svg';
import StatsAnalytics from '../../components/StatsAnalytics';
import flightLand from '../../images/icons/flight_land.svg';
import AnalyticsCard from '../../components/AnalyticsCard';
import flightIcon from '../../images/icons/flight.svg';
import './index.scss';

export class Analytics extends Component {
  componentDidMount() {
    const { fetchAnalytics, context } = this.props;
    const { start, end } = context.state.range;
    const query = `?location=${context.state.city}&dateFrom=${start}&dateTo=${end}`;
    fetchAnalytics(query);
  }

  componentWillReceiveProps(nextProps) {
    const {context, fetchAnalytics} = this.props;
    const {range} = nextProps.context.state;
    if(range.start !== context.state.range.start || range.end !== context.state.range.end) {
      const { start, end } = range;
      const query = `?location=${context.state.city}&dateFrom=${start}&dateTo=${end}`;
      fetchAnalytics(query);
    }
  }

  renderCards = (title, props, link) => {
    const data = props.data;
    const largestFourData = data && data.sort((a, b) => b.value - a.value).slice(0,4);
    const otherArray = data && data.sort((a, b) => b.value - a.value).slice(5, data.length + 1);
    const otherDataValue = otherArray && otherArray.map(data => data.value).reduce((a, b) => a+b, 0);
    const otherData = { name: 'Others', value : otherDataValue};
    const requiredData = largestFourData && data.length > 4 && otherData 
      ? [...largestFourData, otherData] 
      : largestFourData;
    props.data = requiredData;
    return (
      <AnalyticsCard title={title}>
        {
          link ? (
            <Link to={link}><StatsAnalytics {...props} /></Link>
          ) : (
            props.chart ? <PieChartAnalytics {...props} /> : <StatsAnalytics {...props} />
          )
        }
      </AnalyticsCard>
    );
  };

  renderPlaceholders = () => (
    <Fragment>
      <AnalyticsCardPlaceholder />
      <AnalyticsCardPlaceholder />
      <ChartCardPlaceholder />
      <AnalyticsCardPlaceholder />
      <AnalyticsCardPlaceholder />
      <ChartCardPlaceholder />
    </Fragment>
  );

  renderAnalyTicsDetails = ({ analytics, context }) => {
    const {
      totalRequests,
      peopleLeaving,
      peopleVisiting,
      pendingRequests,
      travelDurationBreakdown,
      travelLeadTimeBreakdown,
    } = analytics.payload;
    const { error } = analytics;
    return (
      <Fragment>
        {this.renderCards(
          'Total No. of Travel Requests', 
          { 
            stats: totalRequests, 
            icon: flightIcon, error 
          },
          '/requests/my-verifications'
        )}
        {this.renderCards('Total Number of Pending Requests', 
          { stats: pendingRequests, icon: pendingIcon, error }, 
          '/requests/my-verifications?status=approved')}
        {this.renderCards('Average Travel Duration', 
          {
            data: (analytics.success ? travelDurationBreakdown.durations : []), 
            chart: true, 
            color: 'blue', 
            error
          }
        )}
        <div className="visiting-card">
          {this.renderCards(`No. of People visiting ${context.state.city} Center`,
            {
              stats: peopleVisiting, 
              icon: flightLand, 
              color: 'green', 
              error 
            }
          )}
        </div>
        <div className="leaving-card">
          {this.renderCards(
            `No. of People leaving ${context.state.city} Center`,
            {
              stats: peopleLeaving, 
              icon: flightTakeoff, 
              color: 'brown-orange', 
              error 
            }
          )}
        </div>
        {this.renderCards(
          'Average Travel Request Lead Time', 
          {
            data: (analytics.success ? travelLeadTimeBreakdown.leadTimes : []), 
            chart: true, color: 'orange', error 
          }
        )}
      </Fragment>
    );
  }

  render() {
    const { analytics, context } = this.props;
    return (
      <Fragment>
        {analytics.isLoading ? (
          <div className="analytics">
            {this.renderPlaceholders()}
          </div>
        ) : (
          <div className="analytics">
            {
              this.renderAnalyTicsDetails({ analytics, context })
            }
          </div>
        )}
      </Fragment>
    );
  }
}

Analytics.propTypes = {
  fetchAnalytics: PropTypes.func.isRequired,
  analytics: PropTypes.shape({}).isRequired,
  context: PropTypes.shape({
    state: PropTypes.shape({}).isRequired,
    handleFilter: PropTypes.func.isRequired
  }).isRequired
};

export const mapStateToProps = ({analytics}) => ({
  analytics
});

const actionCreator = {
  fetchAnalytics
};

export default connect(mapStateToProps, actionCreator)(Analytics);
