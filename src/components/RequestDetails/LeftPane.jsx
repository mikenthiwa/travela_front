import React from 'react';
import PropTypes from 'prop-types';
import Trips from './Trips';
import InfoCenter from './InfoCenter';

const LeftPane = ({ request, shouldOpen, openModal, closeModal, travelCosts }) => {
  const { trips } = request;
  return (
    <div className="left-pane">
      <InfoCenter 
        travelCosts={travelCosts}
        request={request}
        shouldOpen={shouldOpen}
        openModal={openModal}
        closeModal={closeModal} 
      />
      <Trips trips={trips} />
    </div>
  );
};

LeftPane.propTypes = {
  request: PropTypes.object.isRequired,
  shouldOpen: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  travelCosts: PropTypes.object.isRequired,
};

export default LeftPane;
