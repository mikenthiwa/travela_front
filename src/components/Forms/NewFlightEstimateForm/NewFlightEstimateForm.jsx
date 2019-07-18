import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { uniq } from 'lodash';
import countries from 'world-countries';
import { FormContext, getDefaultBlanksValidatorFor } from '../FormsAPI';
import FlightEstimateFieldset from './FormFieldsets/FlightEstimateDetails';
import SubmitArea from './FormFieldsets/SubmitArea';
import '../NewTravelStipendForm/NewTravelStipendForm.scss';

class NewFlightEstimateForm extends PureComponent {
  constructor(props) {
    super(props);
    this.defaultState = {
      values: {
        origin: {},
        destination: {},
        flightEstimate: '',
      },
      errors: {},
      isValidAmount: false,
      hasBlankFields: true,
      isValid: true,
    };
    this.state = { ...this.defaultState };
    this.defaultValidator = getDefaultBlanksValidatorFor(this);
  }

  componentDidMount() {
    this.updateStateData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({errors: nextProps.editing
      ? nextProps.listAllFlightEstimates.updatedEstimate.errors
      : nextProps.listAllFlightEstimates.error });
  }

  updateStateData = ({ editing, listAllFlightEstimates: { selectedEstimate } }) => {
    const { 
      originCountry, originRegion, 
      destinationCountry, destinationRegion
    } = selectedEstimate;
    const values = {};
    
    if (originCountry) {
      values.origin = {
        option: 'Countries',
        value: originCountry
      };
    } else if (originRegion) {
      values.origin = {
        option: 'Regions',
        value: originRegion
      };
    } 
    if (destinationCountry) { 
      values.destination = {
        option: 'Countries',
        value: destinationCountry
      };
    } else if (destinationRegion) {
      values.destination = {
        option: 'Regions',
        value: destinationRegion
      };
    }

    if (editing && selectedEstimate ) {
      const { amount } = selectedEstimate;
      this.setState({
        values: {
          flightEstimate: amount,
          origin: values.origin.value,
          destination: values.destination.value
        }
      });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    let { values : { origin, destination, flightEstimate } } = this.state;
    const {
      handleCreateFlightEstimate,
      updateFlightEstimate,
      history,
      closeModal,
      editing,
      listAllFlightEstimates: { selectedEstimate: { id } }
    } = this.props;
    const updatedValues = {};
    updatedValues.flightEstimate = parseInt(flightEstimate);

    if (origin.option === 'Countries') {
      updatedValues.originCountry = origin.value;
    } else {
      updatedValues.originRegion = origin.value;
    }

    if ( destination.option === 'Countries') {
      updatedValues.destinationCountry = destination.value;
    } else {
      updatedValues.destinationRegion  = destination.value;
    }

    if (editing) {
      updateFlightEstimate(id, updatedValues, history);
    } else {
      handleCreateFlightEstimate(updatedValues, history);
    }
    closeModal();
  };

  handleShowEventError = (event) => {
    event.preventDefault();
    this.setState({ isValidAmount: false });
  };

  handleOnchange = (event) => {
    const { target: { value: amount } } = event;
    this.setState(prevSate => {
      return {
        values: {
          ...prevSate.values,
          flightEstimate: amount
        },
        errors: {},
        isValidAmount: (amount ? (amount > 0 && amount <= 5000)  : false),
      };
    }, this.validate);
  };

  getCountryChoices = () => {
    const listOfCountries = countries.map((country) => country.name.common);
    return listOfCountries;
  };

  getTravelRegions = () => {
    const { travelRegion } = this.props;
    const travelRegions = travelRegion.map((region) => {
      return region.region;
    });
    return travelRegions;
  };

  validate = field => {
    const { editing, listAllFlightEstimates: { flightEstimates } } = this.props;
    const existingEstimates = [];
    flightEstimates.map(
      estimate => {
        const newObject = {
          origin: estimate.originCountry || estimate.originRegion,
          destination: estimate.destinationCountry || estimate.destinationRegion
        };
        existingEstimates.push(newObject);
      }
    );

    const { values: { origin ,destination, flightEstimate } } = this.state;
    const withEstimates = existingEstimates.filter(estimate =>{
      return estimate.origin === origin.value && estimate.destination === destination.value ;  
    });

    const isValid = this.defaultValidator(field);
    this.setState(prevState => ({
      ...prevState,
      errors: {
        ...prevState.errors,
        origin: !editing && (origin.value 
        && origin.value === destination.value) ?
          'Origin can not be the same as the destination' : '' ||
          !editing && (!origin.value) ?
            'This field is required' : '' ||
          withEstimates.length > 0 ?  
              `A flight Estimate already exists from ${origin.value} to ${destination.value}` : '',
        destination: !editing && (destination.value
        && origin.value === destination.value) ?
          'Destination can not be the same as the origin' : '' ||
          !editing && (!destination.value && flightEstimate != '') ?
            'This field is required' : '' ||
          withEstimates.length > 0 ? 
              `A flight Estimate already exists from ${origin.value} to ${destination.value}` : '',
      }
    }));

    if ((!origin.value || !destination.value) && !editing)  {
      this.setState({ hasBlankFields: true });
    } else if (origin.value && destination.value &&
      origin.value === destination.value && !editing ) {
      this.setState({ hasBlankFields: true });
    } else if (withEstimates.length > 0) {
      this.setState({ hasBlankFields: true });
    } else this.setState({ hasBlankFields: false });

    return isValid;
  };

  renderFlightEstimateFieldset = (isEmpty) => {
    const options = [
      {
        name: 'Countries',
        items: uniq(this.getCountryChoices())
      },
      {
        name: 'Regions',
        items: this.getTravelRegions()
      }
    ];

    const { values, isValidAmount } = this.state;
    const { editing, listAllFlightEstimates } = this.props;
    return (
      <FlightEstimateFieldset
        values={values}
        isEmpty={isEmpty}
        amount={values.flightEstimate}
        handleShowEventError={this.handleShowEventError}
        onChangeAmountInput={this.handleOnchange}
        isValidAmount={isValidAmount}
        value="245px"
        editing={editing}
        flightEstimates={listAllFlightEstimates.flightEstimates}
        options={options}
      />
    );
  };

  renderForm = () => {
    const { errors, values,
      selection,
      errors: {
        flightEstimate
      },
      isValidAmount,
      hasBlankFields
    } = this.state;
    const {
      closeModal,
      listAllFlightEstimates,
      editing,
      updatedEstimate: { isSaving }
    } = this.props;

    const isEmpty = flightEstimate === 'This field is required';
    return (
      <FormContext
        targetForm={this}
        values={values}
        errors={errors}
        validatorName="validate">
        <form onSubmit={this.handleSubmit} className="new-request">

          {this.renderFlightEstimateFieldset(isEmpty)}
          <SubmitArea
            onCancel={closeModal}
            listAllFlightEstimates={listAllFlightEstimates}
            hasBlankFields={hasBlankFields || !isValidAmount}
            selection={selection}
            loading={isSaving}
            send={editing ? 'Save Estimate' : 'Add Estimate'} />
        </form>
      </FormContext>
    );
  };

  render() {
    return (
      <div>
        {this.renderForm()}
      </div>
    );
  }
}

NewFlightEstimateForm.propTypes = {
  closeModal: PropTypes.func,
  listAllFlightEstimates: PropTypes.object,
  handleCreateFlightEstimate: PropTypes.func.isRequired,
  history: PropTypes.object,
  editing: PropTypes.bool,
  updateFlightEstimate: PropTypes.func,
  updatedEstimate: PropTypes.object,
  travelRegion: PropTypes.array.isRequired
};

NewFlightEstimateForm.defaultProps = {
  closeModal: null,
  listAllFlightEstimates: {},
  history: {
    push : () => {}
  },
  editing: false,
  updateFlightEstimate: () => {},
  updatedEstimate: {
    isSaving: false
  }
};

export default NewFlightEstimateForm;
