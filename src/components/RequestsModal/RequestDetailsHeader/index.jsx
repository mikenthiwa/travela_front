import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import generateDynamicDate from '../../../helper/generateDynamicDate';

export default class RequestDetailsHeader extends PureComponent {
  getTripType(requestData) {
    const {tripType} = requestData;
    switch (tripType) {
    case 'multi':
      return 'Multi City';
    case 'oneWay':
      return 'One Way Trip';
    default: /* istanbul ignore next */
      return 'Return Trip';
    }
  }
  render() {
    const {requestData} = this.props;
    return (
      <div className="request-details--header">
        <span className="request-type">
          <span className="label">
            Request type:&nbsp;
          </span>
          <b>
            {this.getTripType(requestData)}
          </b>
        </span>
        <span className="date-submitted">
          <span className="label">
            Date submitted:&nbsp;
          </span>
          <b>
            {generateDynamicDate(requestData, requestData.createdAt)}
          </b>
        </span>
      </div>
    );
  }
}

RequestDetailsHeader.propTypes = {
  requestData: PropTypes.object.isRequired
};
