import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputRenderer from '../../FormsAPI';
import * as formMetadata from '../../FormsMetadata/NewProfileMetadata';

class ProfileDetailsFieldSets extends Component {

  renderFieldSet = (renderInput, onChangeManager) =>  (
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
          {renderInput('role', 'text', {
            className: 'no-disable' })}
        </div>
        <div>
          {renderInput('department', 'text', {
            className: 'no-disable' })}
        </div>
        {renderInput('manager', 'filter-dropdown-select', {
          className: 'profile_dropdown no-disable manager',
          onChange: onChangeManager,
          size: '' })}
        {renderInput('location', 'dropdown-select', {
          className: 'profile_dropdown no-disable', size: ''
        })}
      </div>
    </fieldset>
  );

  render() {
    const { managers, centers, onChangeManager} = this.props;

    const managerNames = managers.map(manager => manager.fullName);
    const centerNames = centers.map(center => center.location.split(',')[0]);

    formMetadata.dropdownSelectOptions.manager = managerNames;
    formMetadata.dropdownSelectOptions.location = centerNames;


    this.inputRenderer = new InputRenderer(formMetadata);
    const { renderInput } = this.inputRenderer;

    return (this.renderFieldSet(renderInput, onChangeManager) );
  }
}
ProfileDetailsFieldSets.propTypes = {
  managers: PropTypes.array,
  centers: PropTypes.array,
  onChangeManager: PropTypes.func
};

ProfileDetailsFieldSets.defaultProps = {
  managers: [],
  centers: [],
  onChangeManager: () => {}
};
export default ProfileDetailsFieldSets;
