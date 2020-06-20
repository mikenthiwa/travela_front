import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DataRow from '../DataRow';
import './index.scss';

const HomeRequests = ({ requests, isLoading, history }) => {
  const computeStatus = (status,budgetStatus) => {
    let reqStatus;
    if (budgetStatus === 'Approved' && status !== 'Verified'){
      reqStatus = 'Checked';
    }
    else{
      reqStatus = status;
    }
    return reqStatus;
  };
  const renderRequests = () => {
    let data;
    if (requests) {
      data = requests.slice(0, 4).map((req) => {
        const [trip] = req.trips;
        const start = moment(trip.departureDate);
        const end = moment(trip.returnDate);

        const days = end.diff(start, 'days') + 1;

        return {
          id: trip.requestId,
          destination: trip.destination.split(',')[0],
          duration: days + ' days',
          status: computeStatus(req.status, req.budgetStatus),
          budgetStatus: req.budgetStatus
        };
      });
    }
    return data;
  };
  
  return (
    <div className="card-layout card-layout--requests">
      <div className="card-layout--requests__header">
        <p>Your Requests</p>
        {renderRequests() && renderRequests().length > 0 && <u><Link to="/requests">View All</Link></u>}
      </div>
      {
        isLoading ?
          <div className="centered-flex">Loading...</div> :
          renderRequests() && renderRequests().length > 0 ?
            (
              <div className="card--request-table">
                <div className="thead">
                  <div>Request ID</div>
                  <div>Destination</div>
                  <div>Duration</div>
                  <div>Status</div>
                </div>
                <div className="tbody">
                  {renderRequests().map(item => <DataRow key={item.id} item={item} history={history} />)}
                </div>
              </div>
            ) : (
              <div className="centered-flex home__new-request">
                <p className="message">You haven’t made any requests</p>
                <Link className="blue-text" to="/requests/new-request">New Request</Link>
              </div>
            )
      }
    </div>
  );
};

HomeRequests.propTypes = {
  requests: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired
};

HomeRequests.defaultProps = {
  requests: []
};

export default HomeRequests;
