import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputRenderer from '../../FormsAPI/Input/confirmDetails';
import * as formMetadata from '../../FormsMetadata/NewRequestFormMetadata';
import ButtonLoadingIcon from '../../ButtonLoadingIcon';

class ConfirmPersonalDetailsFieldset extends Component {
  state = {
    disableInputs:
      localStorage.getItem('checkBox') === 'clicked'
        ? 'disable-details' : '',
  };

  handleDisableInputs = value => {
    const { disableInputs } = this.state;
    const newState = value === 'clicked' ? 'disable-details' : '';
    /** Do not update state if the new value is equal to value already in state */
    if(newState !== disableInputs) {
      this.setState({
        disableInputs: newState
      });
    }
  };

  renderfields = collapse => {
    const { disableInputs } = this.state;
    const { value, managers, occupations, onChangeAutoSuggestion,
      hasBlankFields, loading, send, getUserDetails, nextStep } = this.props;
    const userDetails = Object.keys(getUserDetails).map((key) => {
      return [(key), getUserDetails[key]];
    });
    const manageDepartment = userDetails.filter(userDetail => userDetail.includes('department'));
    const manageLocation = userDetails.filter(userDetail => userDetail.includes('location'));
    const departmentChoices = manageDepartment.map(department => department[1]);
    const locationChoices = manageLocation.map(location => location[1]);
    const managerChoices = managers.map(manager => manager.fullName);
    const occupationChoices = occupations.map(occupation => occupation.occupationName);
    const { renderInput } = this.InputRenderer;
    const disabled  = disableInputs;
    return (
      <div className="">
        {!collapse ? (
          <div className="personal-rectangle-details-items">
            <div className={`input-group-details mdl-grid ${disabled}`}>
              <div className="spaces-right">
                {renderInput('name', 'filter-dropdown-select', {
                  className: 'request_dropdown', disabled: false, required: false,
                })}
              </div>
              <div className="spaces-right">
                {renderInput('gender', 'onboarding-button-toggler', { disabled: false, required: false, })}
              </div>
            </div>
            <div className="input-group-details mdl-grid">
              <div className="spaces-right">
                {renderInput('department', 'filter-dropdown-select', {
                  choices: departmentChoices,
                  disabled: false, size: value,
                  className: 'request_dropdown your-department', required: false,
                  id: 'your-department',
                  onChange: (e) => onChangeAutoSuggestion('department', e)
                })}
              </div>
              <div className="spaces-right">
                {renderInput('role', 'filter-dropdown-select', {
                  choices: occupationChoices,
                  size: value,
                  className: 'request_dropdown  your-role',
                  required: false,
                  id: 'your-role',
                  onChange: (e) => onChangeAutoSuggestion('role', e)
                })}
              </div>
            </div>
            <div className="input-group-details mdl-grid">
              <div className="spaces-right mdl-cell mdl-cell--4-col mdl-cell--6-col-tablet mdl-cell--12-col-phone">
                {renderInput('manager', 'filter-dropdown-select', {
                  choices: managerChoices,
                  size: value,
                  className: 'request_dropdown your-manager',
                  id: 'your-manager',
                  required: false,
                  onChange: (e) => onChangeAutoSuggestion('manager', e)
                })}
              </div>
              <div className="spaces-right mdl-cell mdl-cell--4-col mdl-cell--6-col-tablet mdl-cell--12-col-phone">
                {
                  renderInput('location', 'filter-dropdown-select', {
                    choices: locationChoices,
                    disabled: false,
                    size: value,
                    className: 'request_dropdown user-location',
                    id: 'user-location',
                    required: false,
                    onChange: (e) => onChangeAutoSuggestion('location', e)
                  })
                }
              </div>
            </div>
          </div>
        ) : null}
        <div className="request-submit-area-details">
          <button
            onClick={e => nextStep(e)}
            type="submit"
            className="bg-btn bg-btn--active-1"
            id="submit"
            disabled={hasBlankFields}>
            <ButtonLoadingIcon isLoading={loading} buttonText={send} />
          </button>
        </div>
      </div>
    );
  };

  render() {
    const { collapse, values } = this.props;
    this.InputRenderer = new InputRenderer(formMetadata);

    const disabledFields =
      values.state === 'clicked' ? 'disable-details' : null;
    return (
      <fieldset className={`personal-details ${disabledFields}`}>
        {this.renderfields(collapse)}
      </fieldset>
    );
  }
}

const managers = PropTypes.array;
const getUserDetails = PropTypes.object;
const collapse = PropTypes.bool;
const values = PropTypes.object;
const onChangeAutoSuggestion = PropTypes.func; 
const occupations = PropTypes.array;

ConfirmPersonalDetailsFieldset.propTypes = {
  nextStep: PropTypes.func,
  occupations: occupations.isRequired,
  managers: managers.isRequired,
  getUserDetails: getUserDetails.isRequired,
  collapse: collapse.isRequired,
  onChangeAutoSuggestion: onChangeAutoSuggestion.isRequired,
  values: values,
  value: PropTypes.string,
  hasBlankFields: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  send: PropTypes.string,
};

ConfirmPersonalDetailsFieldset.defaultProps = {
  values: {},
  value: '',
  loading: false,
  send: '',
  nextStep: () => {}
};

export default ConfirmPersonalDetailsFieldset;
