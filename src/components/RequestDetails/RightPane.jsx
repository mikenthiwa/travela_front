import React from 'react';
import PropTypes from 'prop-types';
import TravelReasons from './TravelReasons';
import ActionPane from './ActionPane';

const RightPane = ({ request,
  renderButtons,
  renderRightPaneQuestion, }) => {
  const { trips, name } = request;
  return(
    <div className="right-pane">
      <ActionPane
        request={request} renderButtons={renderButtons}
        renderRightPaneQuestion={renderRightPaneQuestion}
      />
      <TravelReasons trips={trips} />
    </div>
  );
};

RightPane.propTypes = {
  request: PropTypes.object.isRequired,
  renderButtons: PropTypes.func.isRequired,
  renderRightPaneQuestion: PropTypes.func.isRequired,
};

export default RightPane;
