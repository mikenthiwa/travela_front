import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import countries from 'world-countries';
import { startCase, toLower } from 'lodash';
import { FormContext, getDefaultBlanksValidatorFor } from '../FormsAPI';
import HotelEstimateFieldset from './FormFieldsets/HotelEstimateDetails';
import SubmitArea from './FormFieldsets/SubmitArea';
import '../NewTravelStipendForm/NewTravelStipendForm.scss';

class NewHotelEstimateForm extends PureComponent {
  constructor(props) {
    super(props);
    this.defaultState = {
      values: {
        travelRegion: '',
        country: '',
        estimate: ''
      },
      errors: {},
      hasBlankFields: true,
      isValidAmount: false
    };
    this.state = { ...this.defaultState };
    this.defaultValidator = getDefaultBlanksValidatorFor(this);
  }

  handleSubmit = event => {
    event.preventDefault();
    let { values } = this.state;
    const { handleCreateHotelEstimate, history } = this.props;
    const fieldToRemove =
      values.travelRegion === '' ? 'travelRegion' : 'country';

    delete values[fieldToRemove];

    handleCreateHotelEstimate(values, history);
  };

  handleShowEventError = event => {
    event.preventDefault();
    this.setState({ isValidAmount: false });
  };

  handleOnchange = event => {
    const {
      target: { value: amount }
    } = event;
    this.setState(
      prevSate => {
        return {
          values: {
            ...prevSate.values,
            estimate: amount
          },
          errors: {},
          isValidAmount: (amount ? (amount > 0 && amount <= 1000) :false),
        };
      },
      () => this.validate()
    );
  };

  getCountryChoices = () => {
    const listOfCountries = countries.map(country => country.name.common);
    const {
      hotelEstimates: { estimates }
    } = this.props;
    const countriesWithEstimates = estimates.map(estimate => estimate.country);
    return listOfCountries.filter(
      country => !countriesWithEstimates.includes(country)
    );
  };

  validate = field => {
    const {
      hotelEstimates: { estimates }
    } = this.props;

    const countriesWithEstimates = estimates.map(estimate => estimate.country);
    const regionsWithEstimates = estimates.map(estimate => estimate.region);
    const isValid = this.defaultValidator(field);
    const {
      values: { country, travelRegion }
    } = this.state;
    const countryValue = startCase(toLower(country));
    const regionValue = startCase(toLower(travelRegion));

    this.setState(prevState => ({
      ...prevState,
      errors: {
        ...prevState.errors,
        country: countriesWithEstimates.includes(countryValue)
          ? `A hotel estimate already exists for ${countryValue}.`
          : country.length > 1 && !this.getCountryChoices().includes(country)
            ? `${country} is not a valid country name.`
            : null,
        travelRegion: regionsWithEstimates.includes(regionValue)
          ? `A hotel estimate already exists for ${regionValue}.`
          : null
      }
    }));
    if ((country.trim().length > 0  && !this.getCountryChoices().includes(country)) || (travelRegion.trim() == '' && country.trim() == '')) {
      this.setState({ hasBlankFields: true });
    }
    else if (travelRegion == '' && country == '') {
      this.setState({ hasBlankFields: true });
    } else this.setState({ hasBlankFields: false });

    return isValid;
  };

  renderHotelEstimateFieldset = isEmpty => {
    const { values, isValidAmount } = this.state;
    const { hotelEstimates } = this.props;
    const regionfield = location.search.includes('country=true')
      ? ['country', 'filter-dropdown-select']
      : ['travelRegion', 'text'];
    return (
      <HotelEstimateFieldset
        regionfield={regionfield}
        values={values}
        isEmpty={isEmpty}
        handleShowEventError={this.handleShowEventError}
        onChangeAmountInput={this.handleOnchange}
        isValidAmount={isValidAmount}
        value="245px"
        estimates={hotelEstimates.estimates}
        getCountryChoices={this.getCountryChoices}
      />
    );
  };

  renderForm = () => {
    const {
      values,
      hasBlankFields,
      selection,
      errors,
      isValidAmount
    } = this.state;
    const { closeModal, hotelEstimates } = this.props;
    const isEmpty = errors.estimate === 'This field is required';

    return (
      <FormContext
        targetForm={this}
        values={values}
        errors={errors}
        validatorName="validate"
      >
        <form onSubmit={this.handleSubmit} className="new-request">
          {this.renderHotelEstimateFieldset(isEmpty)}
          <SubmitArea
            onCancel={closeModal}
            hotelEstimates={hotelEstimates}
            hasBlankFields={hasBlankFields || !isValidAmount}
            selection={selection}
            send="Add Estimate"
          />
        </form>
      </FormContext>
    );
  };

  render() {
    return <div>{this.renderForm()}</div>;
  }
}

NewHotelEstimateForm.propTypes = {
  closeModal: PropTypes.func,
  hotelEstimates: PropTypes.object,
  handleCreateHotelEstimate: PropTypes.func.isRequired,
  history: PropTypes.object
};

NewHotelEstimateForm.defaultProps = {
  closeModal: null,
  hotelEstimates: {},
  history: {
    push: () => {}
  }
};

export default NewHotelEstimateForm;
