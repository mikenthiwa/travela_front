import React from 'react';
import PropTypes from 'prop-types';

const ActionPane = ({ request, renderButtons, renderRightPaneQuestion  }) => {
  const { name } = request;
  const paneQuestion = renderRightPaneQuestion(name);
  return (
    <div className="row">
      <p className="text--grey">
        {paneQuestion}
      </p>
      {renderButtons(request)}
    </div>
  );
};

ActionPane.propTypes = {
  request: PropTypes.object.isRequired,
  renderButtons: PropTypes.func.isRequired,
  renderRightPaneQuestion: PropTypes.func.isRequired
};

export default ActionPane;
