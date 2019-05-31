import React from 'react';
import { PropTypes } from 'prop-types';
import ButtonLoadingIcon from '../../ButtonLoadingIcon';

const SubmitArea = props => {
  const {
    hasBlankFields,
    onCancel,
    send,
    loading,
    hotelEstimates: { isLoading }
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
  hasBlankFields: PropTypes.bool.isRequired,
  send: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  hotelEstimates: PropTypes.shape({
    isLoading: PropTypes.bool
  })
};

SubmitArea.defaultProps = {
  loading: false,
  hotelEstimates: {
    isLoading: false
  }
};

export default SubmitArea;
