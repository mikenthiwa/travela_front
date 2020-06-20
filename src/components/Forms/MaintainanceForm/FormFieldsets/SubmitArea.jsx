import React from 'react';
import PropTypes from 'prop-types';

const SubmitArea = ({ onCancel, handleDelete }) => (
  <fieldset>
    <div className="delete-maintenance-submit-area">
      <button type="button" className="bg-btn bg-btn--inactive" id="cancel" onClick={onCancel}>
        Cancel
      </button>
      <button type="submit" className="bg-btn bg-btn--active" id="submit" onClick={handleDelete}>
        Delete
      </button>
    </div>
  </fieldset>
);

SubmitArea.propTypes = {
  onCancel: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default SubmitArea;
