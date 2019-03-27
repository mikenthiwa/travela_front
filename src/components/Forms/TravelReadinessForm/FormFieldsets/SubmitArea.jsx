import React from 'react';
import {PropTypes} from 'prop-types';
import ButtonLoadingIcon from '../../ButtonLoadingIcon';

const SubmitArea = (props) => {
  const { hasBlankFields,onCancel, send, selection, loading, updatingDocument } = props;
  
  return (
    <fieldset>
      <div
        className={selection ? `submit-area submit-area--${selection}` : 'submit-area'}>
        <button
          type="button"
          className="bg-btn bg-btn--inactive"
          onClick={onCancel}
          id="cancel"
          disabled={loading || updatingDocument}
        >
          Cancel
        </button>
        <button
          type="submit" disabled={hasBlankFields || loading || updatingDocument}
          className="bg-btn bg-btn--active" id="submit">
          <ButtonLoadingIcon isLoading={loading || updatingDocument} buttonText={send} />
        </button>
      </div>
    </fieldset>
  );
};

SubmitArea.propTypes = {
  onCancel: PropTypes.func.isRequired,
  hasBlankFields: PropTypes.bool,
  send: PropTypes.string.isRequired,
  selection: PropTypes.string,
  loading: PropTypes.bool,
  updatingDocument: PropTypes.bool.isRequired
};

SubmitArea.defaultProps = {
  selection: '',
  loading: false,
  hasBlankFields: false,
};

export default SubmitArea;
