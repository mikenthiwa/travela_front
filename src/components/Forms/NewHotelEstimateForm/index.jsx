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
  componentDidMount() {
    this.updateStateData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      errors: nextProps.editing
        ? nextProps.hotelEstimates.updatedEstimate.errors
        : nextProps.hotelEstimates.error
    });
  }

  updateStateData =  ({
    editing,
    hotelEstimates: { selectedEstimate }
  }) => {
    if (editing && selectedEstimate) {
      const {
        amount: estimate,
        region: travelRegion,
        country
      } = selectedEstimate;
      const regionState = location.search.includes('country=true')
        ? country
        : travelRegion;

      this.setState({
        values: {
          country: country ? regionState : '',
          travelRegion: travelRegion ? regionState : '',
          estimate
        }
      });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    let { values } = this.state;
    const {
      handleCreateHotelEstimate,
      history,
      closeModal,
      updateHotelEstimate,
      editing,
      hotelEstimates: {
        selectedEstimate: { id }
      }
    } = this.props;
    const fieldToRemove =
      values.travelRegion === '' ? 'travelRegion' : 'country';
    delete values[fieldToRemove];
    if (editing) {
      updateHotelEstimate(id, values, history);
    } else {
      handleCreateHotelEstimate(values, history);
    }
    closeModal();
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
      prevState => {
        return {
          ...prevState,
          values: {
            ...prevState.values,
            estimate: amount
          },
          errors: {},
          isValidAmount: (amount ? (amount > 0 && amount <= 1000) :false),
        };
      },
      this.validate
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
      hotelEstimates: { estimates },
      editing
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
        country:
          countriesWithEstimates.includes(countryValue) && !editing
            ? `A hotel estimate already exists for ${countryValue}.`
            : country.length > 1 &&
              !editing &&
              !this.getCountryChoices().includes(country)
              ? `${country} is not a valid country name.`
              : null,
        travelRegion:
          regionsWithEstimates.includes(regionValue) && !editing
            ? `A hotel estimate already exists for ${regionValue}.`
            : null
      }
    }));
    if ((country.trim().length > 0  && 
    !this.getCountryChoices().includes(country) && !editing) || 
    (travelRegion.trim() == '' && country.trim() == '')) {
      this.setState({ hasBlankFields: true });
    }
    else if (travelRegion == '' && country == '') {
      this.setState({ hasBlankFields: true });
    } else this.setState({ hasBlankFields: false });

    return isValid;
  };

  renderHotelEstimateFieldset = isEmpty => {
    const { values, isValidAmount } = this.state;
    const { editing, hotelEstimates } = this.props;
    const regionfield = location.search.includes('country=true')
      ? ['country', 'filter-dropdown-select']
      : ['travelRegion', 'text'];
    return (
      <HotelEstimateFieldset
        regionfield={regionfield}
        values={values}
        isEmpty={isEmpty}
        amount={values.estimate}
        handleShowEventError={this.handleShowEventError}
        onChangeAmountInput={this.handleOnchange}
        isValidAmount={isValidAmount}
        value="245px"
        editing={editing}
        estimates={hotelEstimates.estimates}
        getCountryChoices={this.getCountryChoices}
      />
    );
  };

  renderForm = () => {
    const { values, hasBlankFields, selection, errors, isValidAmount } = this.state;
    const {
      closeModal,
      hotelEstimates,
      editing,
      updatedEstimate: { isSaving }
    } = this.props;

    let isEmpty;
    if (errors) {
      isEmpty = errors.estimate === 'This field is required';
    }

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
            loading={isSaving}
            send={editing ? 'Save Estimate' : 'Add Estimate'}
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
  history: PropTypes.object,
  editing: PropTypes.bool,
  updateHotelEstimate: PropTypes.func,
  updatedEstimate: PropTypes.object
};

NewHotelEstimateForm.defaultProps = {
  closeModal: () => {},
  hotelEstimates: {},
  history: {
    push: () => {}
  },
  editing: false,
  updateHotelEstimate: () => {},
  updatedEstimate: {
    isSaving: false
  }
};

export default NewHotelEstimateForm;
