import React from 'react';
import PropTypes from 'prop-types';
import TravelReasons from './TravelReasons';
import ActionPane from './ActionPane';
import TripModifications from '../TripModifications';

const RightPane = ({ request,
  renderButtons,
  renderRightPaneQuestion,
  showModifications,
  tripModification,
  updateModification }) => {
  const { trips, modifications, name } = request;
  const currentModification = showModifications && modifications && modifications[0];
  return(
    <div className="right-pane">
      {
        currentModification ? (
          <TripModifications
            tripModification={tripModification}
            updateModification={updateModification}
            modification={currentModification}
            name={name}
          />
        ): (
          <ActionPane
            request={request} renderButtons={renderButtons}
            renderRightPaneQuestion={renderRightPaneQuestion}
          />
        )
      }
      <TravelReasons trips={trips} />
    </div>
  );
};

RightPane.propTypes = {
  request: PropTypes.object.isRequired,
  renderButtons: PropTypes.func.isRequired,
  renderRightPaneQuestion: PropTypes.func.isRequired,
  showModifications: PropTypes.bool,
  updateModification: PropTypes.func.isRequired,
  tripModification: PropTypes.object.isRequired
};

RightPane.defaultProps = {
  showModifications: false
};

export default RightPane;
