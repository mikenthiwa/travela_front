import React, { Component } from 'react';
import InputRenderer from '../../FormsAPI';
import inputLabels from '../../FormsMetadata/NewTravelReasonFormMetadata/inputLabels';
import './newTravelReasonForm.scss';

export default class TravelReasonFieldSet extends Component {
  render() {
    const formMetadata = {
      inputLabels
    };
    this.inputRenderer = new InputRenderer(formMetadata);
    const { renderInput } = this.inputRenderer;
    return (
      <fieldset className="add-checklist">
        <div className="input-group">
          {renderInput('title', 'text')}
          {renderInput('description', 'textarea')}
        </div>
      </fieldset>
    );
  }
}
