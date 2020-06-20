import React from 'react';
import {PropTypes} from 'prop-types';
import ButtonLoadingIcon from '../../ButtonLoadingIcon';

const SubmitArea = (props) => {
  const { hasBlankFields,onCancel, send, selection, loading, updatingDocument, retrieving, modalType, showPassportForm } = props;
  return (
    <fieldset>
      <div
        className={selection ? `submit-area submit-area--${selection}` : 'submit-area'}>
        {!retrieving && /passport/.test(modalType)?
          (
            <button
              type="button"
              className="bg-btn bg-btn--inactive"
              onClick={onCancel}
              id="cancel"
              disabled={loading || updatingDocument || !showPassportForm}
            >
              Cancel
            </button>
          ):''}
        {!/passport/.test(modalType) ?(
          <button
            type="button" className="bg-btn bg-btn--inactive"
            onClick={onCancel}
            id="cancel"
            disabled={loading || updatingDocument}>
            Cancel
          </button>
        ):''
        }

        {/passport/.test(modalType) ?(
          <button
            type="submit" disabled={hasBlankFields || loading || updatingDocument || !showPassportForm}
            className="bg-btn bg-btn--active" id="submit">
            <ButtonLoadingIcon isLoading={loading || updatingDocument} buttonText={send} />
          </button>
        ):(
          <button
            type="submit" disabled={hasBlankFields || loading || updatingDocument}
            className="bg-btn bg-btn--active" id="submit">
            <ButtonLoadingIcon isLoading={loading || updatingDocument} buttonText={send} />
          </button>)}
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
  updatingDocument: PropTypes.bool.isRequired,
  retrieving: PropTypes.bool,
  modalType: PropTypes.string,
  showPassportForm: PropTypes.bool
};


SubmitArea.defaultProps = {
  selection: '',
  loading: false,
  hasBlankFields: false,
  retrieving: false,
  modalType:'',
  showPassportForm: false
};

export default SubmitArea;
