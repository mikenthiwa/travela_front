import React from 'react';
import PropTypes from 'prop-types';
import ButtonLoadingIcon from '../../ButtonLoadingIcon';

const SubmitArea = ({ onCancel, hasBlankFields, loading, addition }) => (
  <fieldset>
    <div className="submit-area">
      <button type="button" className="bg-btn bg-btn--inactive" id="cancel" onClick={onCancel}>
        Cancel
      </button>
      <button type="submit" className="bg-btn bg-btn--active" id="submit" disabled={hasBlankFields}>
        <ButtonLoadingIcon isLoading={loading} buttonText={`Add ${addition && addition}`} />
      </button>
    </div>
  </fieldset>
);

SubmitArea.propTypes = {
  onCancel: PropTypes.func.isRequired,
  hasBlankFields: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  addition: PropTypes.string,
};

SubmitArea.defaultProps = {
  addition: ''
};
export default SubmitArea;
