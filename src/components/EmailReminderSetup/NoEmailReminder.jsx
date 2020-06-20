import React from 'react';
import Icon from '../../images/no-document.svg';
import './emailReminderSetup.scss';

const NoEmailReminder = () => {
  return (
    <div className="no-email-icon no-reminder-conditions">
      <img src={Icon} alt="" />
      <p>
        No email reminders have been scheduled to remind travellers when their documents are about to expire
      </p>
    </div>
  );
};

export default NoEmailReminder;
