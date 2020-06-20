import React, {Fragment } from 'react';

const AlertIcon = (visible, reminder, setItemToDisable) => {
  return (
    <Fragment>
      {
        visible ? (
          <i
            className="tiny material-icons"
            onClick={(event) => {
              setItemToDisable(false,reminder, reminder.reasons[0].reason,event);
            }} role="presentation"
          >
            error
          </i>
        ) : ''
      }
    </Fragment>
  );
};

export default AlertIcon;

