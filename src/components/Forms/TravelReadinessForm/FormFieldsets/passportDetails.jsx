import React, { Component } from 'react';
import { uniq } from 'lodash';
import moment from 'moment';
import countries  from 'world-countries';
import InputRenderer from '../../FormsAPI';
import formMetadata from '../../FormsMetadata/TravelReadinessFormMetadata';

class PassportDetailsFieldSet extends Component{

  getNationality = () => {
    const countryChoices = countries.map(country => country.demonym);
    return uniq(countryChoices);
  }
  renderFields = () => {

    const { renderInput } = new InputRenderer(formMetadata);
    return(
      <fieldset>
        <div className="input-group">
          {renderInput('name', 'text', {className: 'fluid'})}
          {renderInput('passportNumber', 'text')}
          {renderInput('nationality', 'filter-dropdown-select',
            { choices: this.getNationality(), size: ''}
          )}
          {renderInput('dateOfBirth', 'date', {
            openToDate: moment().subtract( 18, 'years'),
            maxDate: moment().subtract( 18, 'years').add(1, 'month'),
            showYearDropdown: true
          })}
          {renderInput('dateOfIssue', 'date', {
            maxDate: moment(),
            showYearDropdown: true
          })}
          {renderInput('placeOfIssue', 'text')}
          {renderInput('expiryDate', 'date', {
            minDate: moment(),
            showYearDropdown: true
          })}
        </div>
      </fieldset>
    );
  };

  render() {
    return (
      <div>{this.renderFields()}</div>
    );
  }
}

export default PassportDetailsFieldSet;
