import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputRenderer from '../../FormsAPI';
import * as formMetadata from '../../FormsMetadata/NewRequestFormMetadata';
import expand from '../../../../images/expand_more_24px.svg';
import Checkbox from '../../../CheckBox/index';
import ButtonLoadingIcon from '../../ButtonLoadingIcon';

class PersonalDetailsFieldset extends Component {
  state = {
    disableInputs:
      localStorage.getItem('checkBox') === 'clicked'
        ? 'disable-details' : ''
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
    const { value, managers, onChangeManager,
      hasBlankFields, loading, send, completePersonalDetails } = this.props;
    const managerChoices = managers.map(manager => manager.fullName);
    const { renderInput } = this.inputRenderer;
    const disabled = disableInputs;
    return (
      <div>
        {!collapse ? (
          <div className="personal-rectangle">
            <div className={`input-group mdl-grid ${disabled}`}>
              <div className="spaces mdl-cell mdl-cell--4-col mdl-cell--6-col-tablet mdl-cell--12-col-phone">
                {renderInput('name', 'text', { 
                  className: 'request_dropdown', disabled: false })}
              </div>
              <div className="spaces mdl-cell mdl-cell--4-col mdl-cell--6-col-tablet mdl-cell--12-col-phone">
                {renderInput('gender', 'button-toggler', {disabled: false})}
              </div>
              <div className="mdl-cell mdl-cell--4-col mdl-cell--6-col-tablet mdl-cell--12-col-phone">
                {renderInput('department', 'text', { disabled: false, size: value,
                  className: 'request_dropdown'})}
              </div>
            </div>
            <div className={`input-group mdl-grid ${disabled}`}>
              <div className="spaces mdl-cell mdl-cell--4-col mdl-cell--6-col-tablet mdl-cell--12-col-phone">
                {renderInput('role', 'text', {
                  disabled: false,
                  size: value,
                  className: 'request_dropdown',
                  id: 'your-role'
                })}
              </div>
              <div className="spaces mdl-cell mdl-cell--4-col mdl-cell--6-col-tablet mdl-cell--12-col-phone">
                {renderInput('manager', 'filter-dropdown-select', {
                  choices: managerChoices,
                  size: value,
                  className: 'request_dropdown your-manager',
                  id: 'your-manager',
                  onChange: onChangeManager
                })}
              </div>
              <div className="spaces mdl-cell mdl-cell--4-col mdl-cell--6-col-tablet mdl-cell--12-col-phone">
                {
                  renderInput('location', 'text', {
                    disabled: false,
                    size: value,
                    className: 'request_dropdown user-location',
                    id: 'user-location',
                  })
                }
              </div>
            </div>
            <div className="request-submit-area">
              <button
                onClick={e => completePersonalDetails(e)}
                type="submit"
                className="bg-btn bg-btn--active"
                id="submit"
                disabled={hasBlankFields}>
                <ButtonLoadingIcon isLoading={loading} buttonText={send} />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  render() {
    const { collapsible, collapse, title, position, line, values } = this.props;
    this.inputRenderer = new InputRenderer(formMetadata);

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
const collapsible = PropTypes.func;
const collapse = PropTypes.bool;
const title = PropTypes.string;
const position = PropTypes.string;
const values = PropTypes.object;
const onChangeManager = PropTypes.func;

PersonalDetailsFieldset.propTypes = {
  managers: managers.isRequired,
  collapsible: collapsible.isRequired,
  collapse: collapse.isRequired,
  title: title.isRequired,
  position: position.isRequired,
  line: position.isRequired,
  onChangeManager: onChangeManager.isRequired,
  values: values,
  value: PropTypes.string,
  hasBlankFields: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  send: PropTypes.string,
  completePersonalDetails: PropTypes.func
};

PersonalDetailsFieldset.defaultProps = {
  values: {},
  value: '',
  loading: false,
  send: '',
  completePersonalDetails: () => {}
};

export default PersonalDetailsFieldset;
