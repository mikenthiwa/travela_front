import React from 'react';
import {PropTypes} from 'prop-types';
import '../TravelStipends.scss';
import ButtonLoadingIcon from '../../Forms/ButtonLoadingIcon';

const SubmitArea = (props) => {
  const { hasBlankFields, onCancel, send, selection, loading, onSend} = props;
  return (
    <fieldset>
      <div className={selection ? `submit-area submit-area--${selection}`
        : 'submit-area'}>
        <button
          type="button"
          className="bg-btn bg-btn--inactive"
          onClick={onCancel}
          id="cancel">
          Cancel
        </button>
        <button
          type="submit" disabled={hasBlankFields || loading}
          className={loading ? 'bg-btn button__disabled':
            'bg-btn bg-btn--active--delete-stipend'}
          id="submit"
          onClick={onSend}
        >
          <ButtonLoadingIcon isLoading={loading} buttonText={send} />
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
  onSend: PropTypes.func
};

SubmitArea.defaultProps = {
  hasBlankFields: false,
  onSend: () => {}
};

SubmitArea.defaultProps = {
  selection: '',
  loading: false,
};

export default SubmitArea;
