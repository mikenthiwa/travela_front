import React, { Component } from 'react';
import moment from 'moment';
import {PropTypes} from 'prop-types';
import '../TravelDocument.scss';
import { uniq } from 'lodash';
import countries  from 'world-countries';
import InputRenderer from '../../FormsAPI';
import formMetadata from '../../FormsMetadata/TravelReadinessMetaData/NewVisaMetadata';
import { reasonsWarningColor } from '../../NewRequestForm/FormFieldsets/TravelDetailsItem';

class VisaFormFieldSet extends Component {
  renderCharcters = (reasonsLimit, errorMessagePosition, visaType) => {
    return (
      <div
        className={`character__conditions__visa ${errorMessagePosition}`}
        style={{ color: `${reasonsLimit.color}`, display: `${visaType === 'Other' ? 'block' : 'none'}`}}
      >
        {reasonsLimit.charLeft}
      </div>
    );
  }
  getCountry = () => {
    const countryChoices = countries.map(country => country.name.common);
    return uniq(countryChoices);
  }

  render() {
    const {renderInput} = new InputRenderer(formMetadata);
    const { visaType, onChangeVisa, otherVisaTypeDetails, values: { country } } = this.props;
    const characters = otherVisaTypeDetails;
    let charLength = characters ? characters.trim().length : '';
    let reasonsLimit = reasonsWarningColor(charLength, 140);
    let errorMessagePosition = charLength > 70 ? 'error__height-two' : 'error__height-one';
    return (
      <fieldset>
        <div className="input-group visa-input">
          {renderInput('country', 'filter-dropdown-select',
            { choices: this.getCountry(), size: '', value: country }
          )}
          {renderInput('entryType', 'dropdown-select', { size: '' })}
          {renderInput('dateOfIssue', 'date', {
            maxDate: moment(), showYearDropdown: true
          })}
          {renderInput('expiryDate', 'date', {
            minDate: moment(),
            showYearDropdown: true
          })}
          {renderInput('visaType', 'dropdown-select', {
            size: '',
            onChange: onChangeVisa,
            value: visaType
          })}
          {visaType == 'Other'  && renderInput('otherVisaTypeDetails', 'textarea', {
            maxLength:'140',
            rows: '20',
            className: 'other-visa-description'
          })}
          {this.renderCharcters(reasonsLimit, errorMessagePosition, visaType)}
        </div>
      </fieldset>
    );
  }
}

VisaFormFieldSet.propTypes={
  visaType: PropTypes.string,
  onChangeVisa: PropTypes.func.isRequired,
  otherVisaTypeDetails: PropTypes.string,
  values: PropTypes.object
};

VisaFormFieldSet.defaultProps = {
  visaType: '',
  otherVisaTypeDetails: '',
  values: {}
};

export default VisaFormFieldSet;
