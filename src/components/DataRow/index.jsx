import React from 'react';
import PropTypes from 'prop-types';

const DataRow = ({ item, history }) => {
  const getRequestStatusClassName = (status) => {
    let newStatus = 'data-row__status--approved';
    newStatus = (status === 'Open') ? 'data-row__status--open' : newStatus;
    newStatus = (status === 'Rejected') ? 'data-row__status--rejected' : newStatus;
    newStatus = (status === 'Verified') ? 'data-row__status--verified' : newStatus;
    return newStatus;
  };

  const handleOpenRequest = (e, requestId) => {
    e.preventDefault();
    history.push(`/requests/${requestId}`);
  };

  return (
    <React.Fragment>
      <div className="data-row">
        <div>
          <button className="data-row__button-no-style" type="button" onClick={e => { handleOpenRequest(e, item.id); }}>
            {item.id}
          </button>
        </div>
        <div className="data-row__content">{item.destination}</div>
        <div className="data-row__content">{item.duration}</div>
        <div className={`${getRequestStatusClassName(item.status)} data-row__status`}>{item.status}</div>
      </div>
    </React.Fragment>
  );
};

DataRow.propTypes = {
  item: PropTypes.object,
  history: PropTypes.object.isRequired
};

DataRow.defaultProps = {
  item: {}
};

export default DataRow;
