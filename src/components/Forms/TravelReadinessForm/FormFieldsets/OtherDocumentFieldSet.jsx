import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import InputRenderer from '../../FormsAPI';
import formMetadata from '../../FormsMetadata/TravelReadinessMetaData/OtherDocumentMetaData';

class OtherDocumentFieldSet extends Component {
  render() {
    const { documentTypes: name } = this.props;
    formMetadata.dropdownSelectOptions = { name }; 
    const {renderInput} = new InputRenderer(formMetadata);
    return (
      <fieldset>
        <div className="input-group visa-input">
          {renderInput('name', 'dropdown-select', { className: 'document-types-dropdown' })}
          {renderInput(
            'dateOfIssue',
            'date',
            {
              labelNote: '(Optional)',
              required: false,
              maxDate: moment(),
              showYearDropdown: true
            }
          )}
          {renderInput(
            'documentId',
            'text',
            {
              labelNote: '(Optional)',
              required: false,
            }
          )}
          {renderInput('expiryDate', 'date', {
            minDate: moment(),
            showYearDropdown: true
          })}
        </div>
      </fieldset>
    );
  }
}

OtherDocumentFieldSet.propTypes = {
  documentTypes: PropTypes.array.isRequired
};

export default OtherDocumentFieldSet;
