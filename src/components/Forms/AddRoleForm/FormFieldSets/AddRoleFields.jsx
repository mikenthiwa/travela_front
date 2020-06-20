import React, { Component } from 'react';
import InputRenderer from '../../FormsAPI';
import inputLabels from '../../FormsMetadata/AddRoleForm/inputLabels';

class AddRoleFields extends Component {
  render() {
    const formMetadata = {
      inputLabels
    };
    this.inputRenderer = new InputRenderer(formMetadata);
    const { renderInput } = this.inputRenderer;

    return (
      <fieldset className="personal-details">
        <div>
          <div style={{ paddingTop: '14px' }}>
            {renderInput('roleName', 'text',
              {id: 'add-role-name'})}
          </div>
          <div>
            {renderInput('description', 'textarea',
              {id: 'add-role-description'})}
          </div>
          <span className="role-description--margin" />
        </div>
      </fieldset>
    );
  }
}

export default AddRoleFields;
