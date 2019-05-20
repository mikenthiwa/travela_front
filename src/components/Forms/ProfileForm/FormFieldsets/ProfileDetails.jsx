import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputRenderer from '../../FormsAPI';
import * as formMetadata from '../../FormsMetadata/NewProfileMetadata';

class ProfileDetailsFieldSets extends Component {

  renderFieldSet = (renderInput, onChangeAutoSuggestion) =>  (
    <fieldset className="personal-details">
      <div className="legend">
        <span className="personal-details-text">
          Personal Details
        </span>
      </div>
      <div className="input-group profile-input">
        <div>
          {renderInput('name', 'text',{ disabled: true })}
        </div>
        {renderInput('gender', 'button-toggler')}
        <div>
          {renderInput('role', 'filter-dropdown-select', {
            className: 'profile_dropdown no-disable role',
            onChange: (e) => onChangeAutoSuggestion('role', e),
            size: '' })}
        </div>
        <div>
          {renderInput('department', 'text', {
            className: 'no-disable' })}
        </div>
        {renderInput('manager', 'filter-dropdown-select', {
          className: 'profile_dropdown no-disable manager',
          onChange: (e) => onChangeAutoSuggestion('manager', e),
          size: '' })}
        {renderInput('location', 'dropdown-select', {
          className: 'profile_dropdown no-disable', size: ''
        })}
      </div>
    </fieldset>
  );

  render() {
    const { managers, centers, onChangeAutoSuggestion} = this.props;

    const managerNames = managers.map(manager => manager.fullName);
    const centerNames = centers.map(center => center.location.split(',')[0]);

    formMetadata.dropdownSelectOptions.manager = managerNames;
    formMetadata.dropdownSelectOptions.location = centerNames;


    this.inputRenderer = new InputRenderer(formMetadata);
    const { renderInput } = this.inputRenderer;

    return (this.renderFieldSet(renderInput, onChangeAutoSuggestion) );
  }
}
ProfileDetailsFieldSets.propTypes = {
  managers: PropTypes.array,
  centers: PropTypes.array,
  onChangeAutoSuggestion: PropTypes.func
};

ProfileDetailsFieldSets.defaultProps = {
  managers: [],
  centers: [],
  onChangeAutoSuggestion: () => {}
};
export default ProfileDetailsFieldSets;
