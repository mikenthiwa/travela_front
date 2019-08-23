import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';


const NotifyEmail = ({ behaviour }) => {
  const { payload: { recipient } } = behaviour;
  return(
    <div className="notify-email-behaviour wrapper">
      <p className="notify-email-behaviour text">
        {`${recipient || ''}${' will be sent a notification'}`}
      </p>
    </div>
  );
};

NotifyEmail.propTypes = {
  behaviour: PropTypes.object.isRequired,
};

export default NotifyEmail;
