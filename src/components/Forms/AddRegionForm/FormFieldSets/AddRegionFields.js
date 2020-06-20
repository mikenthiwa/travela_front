import React, { Component } from 'react';
import InputRenderer from '../../FormsAPI';
import inputLabels from '../../FormsMetadata/TravelRegion/inputLabels';

class AddRegionFields extends Component {
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
            {renderInput('region', 'text',
              {id: 'add-region-name'})}
          </div>
          <div>
            {renderInput('description', 'textarea',
              {id: 'add-region-description'})}
          </div>
          <span className="region-description--margin" />
        </div>
      </fieldset>
    );
  }
}

export default AddRegionFields;
