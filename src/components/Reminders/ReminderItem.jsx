import React from 'react';
import PropTypes from 'prop-types';

const ReminderItem = ({ reminder, index, conditionName }) => (
  <div>
    <p className="frequncy_count">
      Reminder
      {' '}
      {index}
    </p>
    <div className="reminder__condition">
      <p>{conditionName}</p>
      <span className="frequency">
        {`To be sent ${reminder.frequency} to Expiry`}
      </span>
    </div>
  </div>
);

ReminderItem.propTypes = {
  reminder: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  conditionName: PropTypes.string.isRequired,
};

export default ReminderItem;

