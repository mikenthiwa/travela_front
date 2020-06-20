import React, { Component } from 'react';
import InputRenderer from '../../FormsAPI';
import inputLabels from '../../FormsMetadata/HelpResources/inputLabels';

class AddHelpResourceField extends Component {
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
            {renderInput('link', 'text',
              {id: 'add-link-label'})}
          </div>
          <div>
            {renderInput('address', 'text',
              {id: 'add-link-address'})}
          </div>
          <span className="link-detail--margin" />
        </div>
      </fieldset>
    );
  }
}

export default AddHelpResourceField;
