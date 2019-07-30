import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const checkEmail = string => regex.test(string);

const NotifyEmail = ({ behaviour }) => {
  const { payload } = behaviour;
  return(
    <div className="notify-email-behaviour wrapper">
      <p className="notify-email-behaviour text">
        {`${payload}${checkEmail(payload) ? ' will be sent a notification' : ''}`}
      </p>
    </div>
  );
};

NotifyEmail.propTypes = {
  behaviour: PropTypes.object.isRequired,
};

export default NotifyEmail;
