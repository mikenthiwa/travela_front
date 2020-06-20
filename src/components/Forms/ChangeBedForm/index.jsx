import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import InputRenderer, { FormContext, getDefaultBlanksValidatorFor } from '../FormsAPI';
import errorIcon from '../../../images/error_24px.svg';

class ChangeBedForm extends PureComponent {
  state = {
    values: {
      newBed: '',
      changeReason: ''
    },
    errors: {},
    hasBlankFields: true
  }

  validate = getDefaultBlanksValidatorFor(this)

  handleChangeReason = (event) => {
    const {value} = event.target;
    this.setState(prevState => {
      return {
        ...prevState,
        values: {
          ...prevState.values,
          changeReason: value
        }
      };
    }, () => this.validate('changeReason'));
  }
  render() {
    const {values, errors, hasBlankFields} = this.state;
    const { requesterName, bedChoices, handleRoomSubmit,
      loadingBeds, toggleChangeRoomModal, loading } = this.props;
    const formMetadata = {
      inputLabels: {
        newBed: { label: 'Other Available Rooms' }
      }
    };
    const { renderInput } = new InputRenderer(formMetadata);
    return (
      <FormContext targetForm={this} values={values} errors={errors}>
        <form className="change-room-modal__form">
          <div className="change-room-modal__other-available-room">
            {loadingBeds && (
              <div className="change-room-modal__text-center">
                <div className="change-room-modal__ddl-spinner" />
                <p>Checking for rooms...</p>
              </div>
            )}
            {!loadingBeds && bedChoices.length == 0 &&
             (
               <div className="change-room-modal__text-center">
               No beds are available
               </div>
             )}
            {!loadingBeds && bedChoices.length > 0 &&
             renderInput('newBed', 'dropdown-select', {
               size: '100%',
               choices: [...bedChoices, {label: 'Hotel Booking', value: -1}],
             })}
          </div>
          <p className="change-room-modal__reason">
          Reason
            <span className="change-room-modal__important-text">*</span>
          </p>
          <textarea
            name="changeReason"
            type="text"
            className="change-room-modal__input"
            onChange={this.handleChangeReason}
            value={values.changeReason}
          />
          <div className="change-room-modal__disclaimer">
            <img src={errorIcon} alt="caution icon" />
            <span>
              <strong>{requesterName || 'Requester'}</strong>
              &nbsp;will be automatically notified of the room change.
            </span>
          </div>
          <div className="change-room-modal__hr" />
          <div className="change-room-modal__footer">
            {!loading && (
              <div>
                <button
                  type="button"
                  onClick={toggleChangeRoomModal}
                  className="change-room-modal__footer--cancel"
                >
          Cancel
                </button>
                <button
                  type="button"
                  className={!hasBlankFields ?
                    'change-room-modal__footer--save' :
                    'change-room-modal__footer--save-disabled'}
                  disabled={hasBlankFields}
                  onClick={() => handleRoomSubmit(values.newBed, values.changeReason)}
                >
          Save Changes
                </button>
              </div>
            )}
            {loading && (
              <div className="change-room-modal__updating">
                <div className="change-room-modal__ddl-spinner" />
                <p>Updating trip...</p>
              </div>
            )}
          </div>
        </form>
      </FormContext>
    );
  }
}

ChangeBedForm.propTypes = {
  requesterName: PropTypes.string.isRequired,
  handleRoomSubmit: PropTypes.func.isRequired,
  bedChoices: PropTypes.array.isRequired,
  loadingBeds: PropTypes.bool.isRequired, loading: PropTypes.bool.isRequired,
  toggleChangeRoomModal: PropTypes.func.isRequired
};


export default ChangeBedForm;
