import React from 'react';
import {PropTypes} from 'prop-types';
import ButtonLoadingIcon from '../../ButtonLoadingIcon';

const SubmitArea = (props) => {
  const { hasBlankFields, onCancel, send, selection, loading, reversed, onSend} = props;
  return (
    <fieldset>
      <div className={selection ? `submit-area submit-area--${selection}` : 'submit-area'}>
        {
          reversed ? (
            <React.Fragment>
              {CancelButton(onCancel)}
              {SubmitButton(hasBlankFields, loading, send, onSend)}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {SubmitButton(hasBlankFields, loading, send, onSend)}
              {CancelButton(onCancel)}
            </React.Fragment>
          )
        }
      </div>
    </fieldset>
  );
};

const CancelButton = (onCancel) => (
  <button
    type="button"
    className="bg-btn bg-btn--inactive"
    onClick={onCancel}
    id="cancel">
          Cancel
  </button>
);

const SubmitButton = ( hasBlankFields, loading, send, onSend) => (
  <button
    type="submit" disabled={hasBlankFields || loading}
    className="bg-btn bg-btn--active" id="submit"
    onClick={onSend}
  >
    <ButtonLoadingIcon isLoading={loading} buttonText={send} />
  </button>
);

SubmitArea.propTypes = {
  onCancel: PropTypes.func.isRequired,
  hasBlankFields: PropTypes.bool,
  send: PropTypes.string.isRequired,
  selection: PropTypes.string,
  loading: PropTypes.bool,
  reversed: PropTypes.bool,
  onSend: PropTypes.func
};

SubmitArea.defaultProps = {
  hasBlankFields: false,
  reversed: false,
  onSend: () => {}
};

SubmitArea.defaultProps = {
  selection: '',
  loading: false,
};

export default SubmitArea;
