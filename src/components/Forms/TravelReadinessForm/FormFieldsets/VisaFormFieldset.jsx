import React, { Component } from 'react';
import moment from 'moment';
import {PropTypes} from 'prop-types';
import '../TravelDocument.scss';
import { uniq } from 'lodash';
import countries  from 'world-countries';
import InputRenderer from '../../FormsAPI';
import formMetadata from '../../FormsMetadata/TravelReadinessMetaData/NewVisaMetadata';

class VisaFormFieldSet extends Component {
  getCountry = () => {
    const countryChoices = countries.map(country => country.name.common);
    return uniq(countryChoices);
  }

  render() {
    const {renderInput} = new InputRenderer(formMetadata);
    const { visaType, onChangeVisa, values: { country } } = this.props;
    return (
      <fieldset>
        <div className="input-group visa-input resposive_visa">
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
          {visaType === 'Other'  && renderInput('otherVisaTypeDetails', 'textarea', {
            maxLength:'140',
            rows: '20',
            className: 'other-visa-description'
          })}
        </div>
      </fieldset>
    );
  }
}

VisaFormFieldSet.propTypes={
  visaType: PropTypes.string,
  onChangeVisa: PropTypes.func.isRequired,
  values: PropTypes.object
};

VisaFormFieldSet.defaultProps = {
  visaType: '',
  values: {}
};

export default VisaFormFieldSet;
