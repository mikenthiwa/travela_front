import React from 'react';
import { PropTypes } from 'prop-types';
import ButtonLoadingIcon from '../../ButtonLoadingIcon';

const SubmitArea = props => {
  const {
    onCancel,
    send,
    loading,
    hasBlankFields,
    listAllFlightEstimates: { isLoading }
  } = props;
  return (
    <fieldset>
      <div className="submit-area">
        <button
          type="button"
          className="bg-btn bg-btn--inactive travel-stipends__right"
          onClick={onCancel}
          id="cancel"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={hasBlankFields || loading || isLoading}
          className="bg-btn bg-btn--active"
          id="submit"
        >
          <ButtonLoadingIcon
            isLoading={loading || isLoading}
            buttonText={send}
          />
        </button>
      </div>
    </fieldset>
  );
};

SubmitArea.propTypes = {
  onCancel: PropTypes.func.isRequired,
  send: PropTypes.string.isRequired,
  hasBlankFields: PropTypes.bool,
  loading: PropTypes.bool,
  listAllFlightEstimates: PropTypes.shape({
    isLoading: PropTypes.bool
  })
};

SubmitArea.defaultProps = {
  loading: false,
  hasBlankFields: false,
  listAllFlightEstimates: {
    isLoading: false
  }
};

export default SubmitArea;
