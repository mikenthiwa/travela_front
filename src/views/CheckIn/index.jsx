import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import WithLoadingTable from '../../components/Table';
import PageHeader from '../../components/PageHeader';
import Table from '../../components/CheckInTable';
import Utils from '../../helper/Utils';
import Base from '../Base';
import {
  fetchTrips,
  updateTrip
} from '../../redux/actionCreator/tripActions';

export class CheckIn extends Base {

  constructor (props){
    super(props);
  }

  componentDidMount() {
    this.props.fetchTrips();
  }

  handleCheckStatus = (tripId, checkType) => {
    const { updateTrip } = this.props;
    const tripData = {
      checkType
    };
    updateTrip({tripId, tripData});
  }
  render() {
    const { trips, tripError } = this.props;
    const dateToday = moment(new Date()).format('YYYY-MM-DD');
    return (
      <Fragment>
        <div>
          <PageHeader title="RESIDENCE" />
          <Table
            trips={trips.filter((trip) => trip.checkStatus !== 'Checked Out')}
            tripError={tripError}
            residenceClassName="residence__text"
            dateToday={dateToday}
            handleCheckStatus={this.handleCheckStatus} />
        </div>
        <div>
          <PageHeader
            title="Past Check-in's"
            titleClassName="past_checkin_header"
          />
          <Table
            trips={trips.filter((trip) => trip.checkStatus === 'Checked Out')}
            handleCheckStatus={this.handleCheckStatus} />
        </div>
      </Fragment>
    );
  }
}

export const mapStateToProps = ({ trips }) => ({
  ...trips
});

const actionCreators = {
  fetchTrips,
  updateTrip
};

export default connect(
  mapStateToProps,
  actionCreators
)(CheckIn);
